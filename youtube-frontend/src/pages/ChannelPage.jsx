import { useMemo, useContext } from "react";
import { useVideos } from "../context/VideoContext";
import ChannelVideoGrid from "../components/channelPage/ChannelVideoGrid";
import { UserContext } from "../context/UserContext";

export default function ChannelPage() {
  const { videos } = useVideos();
  const {user} = useContext(UserContext);
  console.log("User from context:", user);

  // Get channel from localStorage
  let channel = sessionStorage.getItem("channel");
  channel = channel ? JSON.parse(channel) : null;

  if (!channel) {
    window.location.href = "/";
  }

  // ✅ useMemo to compute filtered videos based on uploader
  const channelVideos = useMemo(() => {
    if (!videos || !channel) return [];
    return videos.filter(
      (video) => String(video.uploader._id) === String(channel.owner._id)
    );
  }, [videos, channel?.owner?._id]);




  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-40 sm:h-64 mb-4 overflow-hidden rounded-lg mt-18 px-2 sm:px-4">
        <img src={channel?.channelBanner} alt="Channel Banner" className="w-full h-40 sm:h-64 object-cover rounded" />
      </div>
      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-2 sm:px-4 mb-6 text-center sm:text-left">
        <img
          src={channel?.owner.avatar || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
          alt="Channel Avatar"
          className="w-28 h-28 sm:w-48 sm:h-48 rounded-full mx-auto sm:mx-0"
        />
        <div className="flex flex-col items-center sm:items-start w-full">
          <h1 className="text-2xl sm:text-3xl font-bold break-words">{channel?.channelName || "Unnamed Channel"}</h1>
          <span className="text-sm text-gray-500 flex flex-col sm:flex-row items-center sm:items-center my-2 gap-1 sm:gap-2">
            <p className="text-gray-600">@{channel?.owner.username || "Unknown Owner"}</p>
            <p className="hidden sm:block text-gray-600 mx-1">•</p>
            <p className="text-gray-600">Subscribers: {channel?.subscribers?.length || 0}</p>
          </span>
          <p className="text-gray-600 max-w-xs sm:max-w-full">{channel?.description || "No description available."}</p>
         {
            user.user.id === channel.owner._id ? (
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition w-full sm:w-auto">
                Edit Channel
              </button>
            ) : (
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition w-full sm:w-auto">
                Subscribe
              </button>
            )
         }
        </div>
      </div>
      {/* Videos */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold px-2 sm:px-4 mb-4">Videos</h2>
        {
          channelVideos.length > 0 ? (
            <ChannelVideoGrid videos={channelVideos} singleColumn={false}/>
          ) : (
            <p className="text-center text-gray-600">No videos uploaded yet.</p>
          )
        }
      </div>
    </div>
  );
}
