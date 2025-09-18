import { useState, useEffect } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

export default function EditVideoModal({ setShowEditModal, video }) {
  // Get user data from local storage
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // State to hold form data
  const [form, setForm] = useState({
    title: "",
    category: [],
    thumbnail: "",
    description: "",
    video: "",
    thumbnailFile: null,
    thumbnailPreview: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prefill form when video data is passed
  useEffect(() => {
    if (video) {
      setForm({
        title: video.title || "",
        category: video.category || [],
        thumbnail: video.thumbnail || "",
        description: video.description || "",
        video: video.video || "",
        thumbnailFile: null,
        thumbnailPreview: video.thumbnail || null,
      });
    }
  }, [video]);

  // Close modal
  const handleClose = () => setShowEditModal(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category input changes
  const handleCategoryChange = (e) => {
    const value = e.target.value.split(",").map((c) => c.trim());
    setForm((prev) => ({ ...prev, category: value }));
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        thumbnailFile: file,
        // Create a preview URL for the selected thumbnail
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Prepare form data for video update
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("video", form.video);
      form.category.forEach((cat, index) => {
        formData.append(`category[${index}]`, cat);
      });

      if (form.thumbnailFile) {
        formData.append("thumbnail", form.thumbnailFile);
      } else if (form.thumbnail) {
        formData.append("thumbnail", form.thumbnail);
      }

      // Send PUT request to update video
      const res = await api.put(`/videos/${video._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Send JWT token for authentication
          Authorization: `JWT ${user?.token}`,
        },
      });

      toast.success(res.data.message || "Video updated successfully!");
      setTimeout(() => handleClose(), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update video");
      toast.error(err.response?.data?.message || "Failed to update video");
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
          Edit Video
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
              className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
