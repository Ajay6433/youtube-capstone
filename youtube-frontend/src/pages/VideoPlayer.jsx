
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import SuggestedVideos from "../components/videoPlayer/SuggestedVideos";
import { useVideos } from "../context/VideoContext";
import Comments from "../components/videoPlayer/Comments";
import api from "../api/api";

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { videos } = useVideos();

  // Find the video by ID whenever `id` or `videos` change
  useEffect(() => {
    if (videos.length > 0) {
      const currentVideo = videos.find((v) => v._id === id);
      setVideo(currentVideo);
      setLoading(false);
    }
  }, [id, videos]);

  // Filter out the current video from suggestions
  const filteredVideos = videos.filter(v => v._id !== id);

  // Show loading or video details
  if (loading) {
    return <p className="text-center mt-10">Loading video...</p>;
  }

  // Redirect to home if no video is found
  if (!video) {
    return <p className="text-center mt-10">Video not found.</p>;
  }

  // Handle channel page details 
  async function channelPageDetails() {
    let channel = await api.get(`/channel/${video.channelId._id}`);
    channel = channel.data.channel;
    sessionStorage.setItem("channel", JSON.stringify(channel));
    window.location.href = `/channel/${video.channelId._id}`;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white mt-16 min-h-screen">
      {/* Main video area */}
      <main className="w-full md:flex-1 flex flex-col items-center px-2 sm:px-4 md:px-8 py-4 md:py-8">
        <div className="w-full max-w-full sm:max-w-2xl">
          {/* Video Player */}
          <div className="w-full aspect-[16/9] bg-black rounded-xl overflow-hidden mb-4">
            <iframe
              src={`${video.video}?autoplay=1&mute=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-contain"
            ></iframe>
          </div>

          {/* Video Info */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 break-words">{video.title}</h1>

          {/* Channel Info & Subscribe */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mt-4 mb-4 w-full">
            <div className="flex items-center justify-start gap-2 sm:gap-4">
              <img
                src={video.avatar || "/default-avatar.png"}
                alt={video.channelName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" 
                onClick={channelPageDetails}
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1">
                  <h2 className="font-semibold text-sm sm:text-base" onClick={channelPageDetails}>{video.channelName}</h2>
                </div>
                <span className="text-xs text-gray-500">{video.subscribers || '988K'} subscribers</span>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-2 sm:mt-0">
              <button className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-900 transition">
                Subscribe
              </button>
              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {/* Like/Dislike pill */}
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <button className="flex items-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-gray-200 focus:outline-none">
                    <BiLike className="w-5 h-5 mr-1" />
                    {video.likes || '266K'}
                  </button>
                  <div className="w-px h-6 bg-gray-300" />
                  <button className="flex items-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-gray-200 focus:outline-none">
                    <BiDislike className="w-5 h-5 mr-1" />
                    {video.dislikes || '26'}
                  </button>
                </div>
                <button className="flex items-center bg-gray-100 px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200">
                  <TbShare3 className="w-5 h-5 mr-1" />
                  Share
                </button>
                <button className="flex items-center bg-gray-100 px-2 py-2 rounded-full hover:bg-gray-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="4" r="2" /><circle cx="10" cy="10" r="2" /><circle cx="10" cy="16" r="2" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-100 text-gray-700 rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex flex-wrap items-center text-xs sm:text-sm mb-2">
              <span>{video.views} views</span>
              <span className="mx-2">•</span>
              <span>{video.likes} likes</span>
            </div>
            <div className="whitespace-pre-line break-words">{video.description}</div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <Comments videoId={video._id} />
          </div>
        </div>
      </main>
      {/* Suggested Videos on the right for desktop, at bottom for mobile */}
      <aside className="w-full md:w-116 p-2 sm:p-4 space-y-4 md:block hidden">
        <SuggestedVideos videos={filteredVideos} />
      </aside>
      {/* Mobile/Tablet: show suggested videos at bottom */}
      <div className="block md:hidden w-full p-2 sm:p-4">
        <h2 className="text-lg font-semibold mb-2">Suggested Videos</h2>
        <SuggestedVideos videos={filteredVideos} />
      </div>
    </div>
  );
}
