import { useState } from "react";
import api from "../../api/api";
import userImage from "../../assets/user.png";
import toast from "react-hot-toast";

export default function ChannelModal({ setShowChannelModal }) {
  // State to hold form data
  const [form, setForm] = useState({
    bannerPreview: null,
    channelBanner: null,
    channelName: "",
    description: "",
  });
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  // Error & Success states
  const handleClose = () => {
    setShowChannelModal(false);
  };
  // Handle banner file selection
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        channelBanner: file,
        bannerPreview: URL.createObjectURL(file),
      }));
    }
  };
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    // Prepare form data for channel creation
    try {
      const formData = new FormData();
      formData.append("channelName", form.channelName);
      formData.append("description", form.description);
      if (form.channelBanner) {
        formData.append("channelBanner", form.channelBanner);
      }
      // Send POST request to create channel
      const res = await api.post("/channel/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${user.token}`,
        },
      });
      // On success, store channel info in localStorage
      localStorage.setItem("channel", JSON.stringify(res.data));
      console.log(res.data);
      toast.success(res.data.message || "Channel created successfully!");
      setSuccess("Channel created successfully!");
      
      setForm({
        bannerPreview: null,
        channelBanner: null,
        channelName: "",
        description: "",
      });
      window.location.reload();

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create channel");
      toast.error(err.response?.data?.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={handleClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6">How you'll appear</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          {/* Profile Picture Upload */}
          <label className="flex flex-col items-center cursor-pointer mb-2">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
              {form.bannerPreview ? (
                <img
                  src={form.bannerPreview}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={userImage} alt="Default User" className="w-full h-full object-cover" />
              )}
            </div>
            <span className="text-blue-600 text-sm underline">Select Thumbnail picture</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
          </label>

          {/* Channel Name */}
          <input
            type="text"
            name="channelName"
            className="w-full border rounded-lg px-4 py-2 mb-2"
            placeholder="Name"
            value={form.channelName}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <input
            type="text"
            name="description"
            className="w-full border rounded-lg px-4 py-2 mb-2"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          {/* Action Buttons */}
          <div className="flex justify-end w-full gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create channel"}
            </button>
          </div>
        </form>

        {/* T&C Description */}
        <p className="text-xs text-gray-500 mt-4">
          By clicking Create Channel you agree to YouTube's Terms of Service. Changes made to your
          name and profile picture are visible only on YouTube and not other Google services.
        </p>
      </div>
    </div>
  );
}
