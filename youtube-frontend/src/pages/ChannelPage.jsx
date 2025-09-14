import { useMemo, useContext, useEffect, useState } from "react";
import { useVideos } from "../context/VideoContext";
import ChannelVideoGrid from "../components/channelPage/ChannelVideoGrid";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import UploadVideoModal from "../components/channelPage/UploadVideoModal";

export default function ChannelPage() {
  const { videos } = useVideos();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [currentChannel, setCurrentChannel] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (!id) {
      window.location.href = "/";
      return;
    }

    // Decide whether to load from sessionStorage or localStorage
    const sessionChannel = sessionStorage.getItem("channel");
    const localChannel = localStorage.getItem("channel");

    const parsedSession = sessionChannel ? JSON.parse(sessionChannel) : null;
    const parsedLocal = localChannel ? JSON.parse(localChannel) : null;

    if (parsedSession && parsedSession._id === id) {
      console.log("Viewing channel from sessionStorage");
      setCurrentChannel(parsedSession);
    } else if (parsedLocal && parsedLocal._id === id) {
      console.log("Viewing owner channel from localStorage");
      setCurrentChannel(parsedLocal);
    } else {
      console.warn("No channel found for this id!");
      setCurrentChannel(null);
    }
  }, [id]);

  // Safe ownership check
  const isOwner = !!(
    user?.user?.id &&
    currentChannel?.owner?._id &&
    String(user.user.id) === String(currentChannel.owner._id)
  );

  // Filter videos
  const channelVideos = useMemo(() => {
    if (!videos || !currentChannel) return [];
    return videos.filter(
      (video) => String(video.uploader._id) === String(currentChannel.owner._id)
    );
  }, [videos, currentChannel?.owner?._id]);

  if (!currentChannel) {
    return <p className="text-center mt-10">Loading channel...</p>;
  }

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-40 sm:h-64 mb-4 overflow-hidden rounded-lg mt-18 px-2 sm:px-4">
        <img
          src={currentChannel.channelBanner}
          alt="Channel Banner"
          className="w-full h-40 sm:h-64 object-cover rounded"
        />
      </div>

      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-2 sm:px-4 mb-6 text-center sm:text-left">
        <img
          src={
            currentChannel.owner.avatar ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt="Channel Avatar"
          className="w-28 h-28 sm:w-48 sm:h-48 rounded-full mx-auto sm:mx-0"
        />
        <div className="flex flex-col items-center sm:items-start w-full">
          <h1 className="text-2xl sm:text-3xl font-bold break-words">
            {currentChannel.channelName}
          </h1>
          <span className="text-sm text-gray-500 flex flex-col sm:flex-row items-center my-2 gap-1 sm:gap-2">
            <p className="text-gray-600">@{currentChannel.owner.username}</p>
            <p className="hidden sm:block text-gray-600 mx-1">•</p>
            <p className="text-gray-600">
              Subscribers: {currentChannel.subscribers?.length || 0}
            </p>
          </span>
          <p className="text-gray-600 max-w-xs sm:max-w-full">
            {currentChannel.description}
          </p>

          {/* Conditional Buttons */}
          {isOwner ? (
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
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
        </div>
      </div>

      {/* Videos */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold px-2 sm:px-4 mb-4">
          Videos
        </h2>
        {channelVideos.length > 0 ? (
          <ChannelVideoGrid videos={channelVideos} singleColumn={false} />
        ) : (
          <p className="text-center text-gray-600">
            No videos uploaded yet.
          </p>
        )}
      </div>
      {showUploadModal && (
        <UploadVideoModal
          setShowUploadModal={setShowUploadModal}
          channelId={currentChannel._id}
        />
      )}
    </div>
  );
}
