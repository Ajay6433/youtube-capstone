import { useState } from "react";
import api from "../../api/api"
import toast from "react-hot-toast";

export default function UploadVideoModal({ setShowUploadModal }) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    thumbnail: null,
    thumbnailPreview: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShowUploadModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        thumbnail: file,
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
      formData.append("category", form.category);
      formData.append("link", form.link);
      if (form.thumbnail) {
        formData.append("thumbnail", form.thumbnail);
      }

      const res = await api.post("/videos/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${user?.token}`,
        },
      });

      toast.success(res.data.message || "Video uploaded successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        link: "",
        thumbnail: null,
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
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-lg p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={handleClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Upload Video</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Thumbnail Upload */}
          <label className="flex flex-col items-center cursor-pointer">
            <div className="w-32 h-20 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
              {form.thumbnailPreview ? (
                <img
                  src={form.thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">Select Thumbnail</span>
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
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Write description about the video"
            value={form.description}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Pick a category"
            value={form.category}
            onChange={handleChange}
            required
          />

          {/* Link */}
          <input
            type="url"
            name="link"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="https://"
            value={form.link}
            onChange={handleChange}
            required
          />

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm">{error}</div>}

          {/* Action Buttons */}
          <div className="flex justify-end w-full gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
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
