import { useMemo, useContext, useEffect, useState } from "react";
import { useVideos } from "../context/VideoContext";
import ChannelVideoGrid from "../components/channelPage/ChannelVideoGrid";
import UploadVideoModal from "../components/channelPage/UploadVideoModal";
import { UserContext } from "../context/UserContext";

export default function ChannelPage() {
  const { videos } = useVideos();
  const { user } = useContext(UserContext);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [channel, setChannel] = useState(null);

  useEffect(() => {
    // Read the flag to know where to get channel from
    const source = sessionStorage.getItem("channelSource"); // "local" | "session"

    if (source === "local") {
      // Get from localStorage if user came from My Channel button
      const localChannel = localStorage.getItem("channel");
      if (localChannel) setChannel(JSON.parse(localChannel));
    } else {
      // Default: get from sessionStorage (normal channel navigation)
      const sessionChannel = sessionStorage.getItem("channel");
      if (sessionChannel) setChannel(JSON.parse(sessionChannel));
    }
  }, []);

  // Redirect to home if no channel found
  useEffect(() => {
    if (!channel) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 300); // small delay to allow channel to load
      return () => clearTimeout(timer);
    }
  }, [channel]);

  const isOwner =
    user?.user?.id && channel?.owner?._id
      ? String(user.user.id) === String(channel.owner?._id)
      : false;

  const channelVideos = useMemo(() => {
    if (!videos || !channel) return [];
    return videos.filter(
      (video) => String(video.uploader._id) === String(channel.owner._id)
    );
  }, [videos, channel?.owner?._id]);

  if (!channel) return null; // prevent rendering until channel is set

  return (
    <div className="w-full">
      {/* Banner section */}
      <div className="w-full h-40 sm:h-64 mb-4 overflow-hidden rounded-lg mt-18 px-2 sm:px-4">
        <img
          src={channel?.channelBanner}
          alt="Channel Banner"
          className="w-full h-40 sm:h-64 object-cover rounded"
        />
      </div>

      {/* Channel Info section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-2 sm:px-4 mb-6 text-center sm:text-left">
        {/* Channel avatar */}
        <img
          src={
            channel?.owner.avatar ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt="Channel Avatar"
          className="w-28 h-28 sm:w-48 sm:h-48 rounded-full mx-auto sm:mx-0"
        />
        <div className="flex flex-col items-center sm:items-start w-full">
          <h1 className="text-2xl sm:text-3xl font-bold break-words">
            {channel?.channelName || "Unnamed Channel"}
          </h1>
          <span className="text-sm text-gray-500 flex flex-col sm:flex-row items-center my-2 gap-1 sm:gap-2">
            <p className="text-gray-600">@{channel?.owner.name || "Unknown Owner"}</p>
            <p className="hidden sm:block text-gray-600 mx-1">•</p>
            <p className="text-gray-600">
              Subscribers: {channel?.subscribers?.length || 0}
            </p>
          </span>
          <p className="text-gray-600 max-w-xs sm:max-w-full">
            {channel?.description || "No description available."}
          </p>

          {isOwner ? (
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                onClick={() => setShowUploadModal(true)}
              >
                Upload Video
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition">
                Manage Videos
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                Subscribe
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition">
                Join
              </button>
            </div>
          )}

          {/* Upload Video Modal */}
          {showUploadModal && (
            <UploadVideoModal
              setShowUploadModal={setShowUploadModal}
              channelId={channel?._id}
            />
          )}
        </div>
      </div>

      {/* Channel videos section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold px-2 sm:px-4 mb-4">
          Videos
        </h2>
        {channelVideos.length > 0 ? (
          <ChannelVideoGrid videos={channelVideos} singleColumn={false} />
        ) : (
          <p className="text-center text-gray-600">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
