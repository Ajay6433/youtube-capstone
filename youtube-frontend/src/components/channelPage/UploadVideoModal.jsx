import { useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function UploadVideoModal({ setShowUploadModal, channelId }) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

    console.log(user.user)
  const [form, setForm] = useState({
    title: "",
    category: [], // ✅ changed to array
    thumbnail: "",
    description: "",
    video: "",
    channelName: user?.user?.username || "@123",
    channelId: channelId || "",
    uploader: user?.user?.id || null,
    handle: user?.user?.username || "@123",
    avatar: user.user.avatar || "",
    views: 0,
    likes: 0,
    dislikes: 0,
    thumbnailFile: null, // local file reference
    thumbnailPreview: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => setShowUploadModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value.split(",").map((c) => c.trim());
    setForm((prev) => ({ ...prev, category: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        thumbnailFile: file,
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("video", form.video);
      formData.append("channelName", form.channelName);
      formData.append("channelId", form.channelId);
      formData.append("uploader", form.uploader);
      formData.append("handle", form.handle);
      formData.append("avatar", form.avatar);
      formData.append("views", form.views);
      formData.append("likes", form.likes);
      formData.append("dislikes", form.dislikes);
      form.category.forEach((cat, index) => {
        formData.append(`category[${index}]`, cat);
      });
      if (form.thumbnailFile) formData.append("thumbnail", form.thumbnailFile);
      else if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      const res = await api.post("/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${user?.token}`,
        },
      });

      console.log(res.data);
      toast.success(res.data.message || "Video uploaded successfully!");

      setForm({
        title: "",
        category: [],
        thumbnail: "",
        description: "",
        video: "",
        channelName: "",
        channelId: channelId || "",
        uploader: user?.user?.id || null,
        handle: "",
        avatar: "",
        views: 0,
        likes: 0,
        dislikes: 0,
        thumbnailFile: null,
        thumbnailPreview: null,
      });

      setTimeout(() => handleClose(), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
      toast.error(err.response?.data?.message || "Failed to upload video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Upload Video
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Thumbnail Upload */}
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-36 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
              {form.thumbnailPreview ? (
                <img
                  src={form.thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm text-center px-2">
                  Click to select thumbnail
                </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
          </label>

          {/* Title */}
          <input
            type="text"
            name="title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white resize-none"
            placeholder="Write description about the video"
            value={form.description}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            placeholder="Enter categories separated by commas"
            value={form.category.join(", ")}
            onChange={handleCategoryChange}
            required
          />

          {/* Video Link */}
          <input
            type="url"
            name="video"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            placeholder="https://"
            value={form.video}
            onChange={handleChange}
            required
          />

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center text-sm font-medium">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
