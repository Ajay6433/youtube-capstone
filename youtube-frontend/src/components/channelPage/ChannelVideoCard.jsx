import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import formatNumber from "../../utils/FormatNumber";
import api from "../../api/api";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext"
import EditVideoModal from "./EditVideoModal";

export default function ChannelVideoCard({ video, onDelete }) {
  let { user } = useContext(UserContext);
  const [showEditModal, setShowEditModal] = useState(false);

  async function channelPageDetails() {
    let channel = await api.get(`/channel/${video.channelId._id}`);
    console.log("Fetched channel data:", channel);
    channel = channel.data.channel;
    sessionStorage.setItem("channel", JSON.stringify(channel));
    window.location.href = `/channel/${video.channelId._id}`;
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this video?")) {
      try {
        await api.delete(`/videos/${video._id}`,
          {
            headers: {
              Authorization: `JWT ${user?.token}`,
            },
          }
        );
        toast.success("Video deleted successfully");
        if (onDelete) {
          onDelete(video._id);
        } else {
         setTimeout(() => { window.location.reload(); }, 1000);
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("Failed to delete video. Please try again.");
      }
    }
  }

  const isOwner = user && video.channelId && user.user.id === video.uploader._id;
  // console.log("video.channelId:", video.channelId, user?.user?.id, video.channelId?._id);
  // console.log("isOwner:", isOwner);


  return (
    <div className="w-full max-w-xs sm:max-w-sm cursor-pointer mx-auto">
      {/* Thumbnail */}
      <a href={`/videos/${video._id}`} className="block">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 sm:h-64 object-cover rounded-xl hover:rounded-none duration-500"
        />
      </a>

      {/* Video info */}
      <div className="flex mt-3">
        {/* Channel avatar */}
        <img
          src={video.avatar || "/default-avatar.png"}
          onClick={channelPageDetails}
          alt={video.channelName}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 mr-2 sm:mr-3"
        />

        {/* Text details */}
        <div className="flex flex-col overflow-hidden w-full">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
            {video.title}
          </h3>
          <p
            className="text-xs sm:text-sm text-gray-600 cursor-pointer"
            onClick={channelPageDetails}
          >
            {video.channelName}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            {formatNumber(video.views)} views · {formatNumber(video.likes)} likes
          </p>

          {/* Show buttons only if owner */}
          {isOwner && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-2 py-0.5 text-xs border border-blue-400 text-blue-600 bg-white rounded hover:bg-blue-50 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-0.5 text-xs border border-red-400 text-red-600 bg-white rounded hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          )}
          {showEditModal && (
            <EditVideoModal
              video={video}
              setShowEditModal={setShowEditModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
