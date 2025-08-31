
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiLike , BiDislike  } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";

import SuggestedVideos from "../components/videoPlayer/SuggestedVideos";
import { useVideos } from "../context/VideoContext";
// import Comments from "../components/videoPlayer/Comments";


export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const {videos} = useVideos();

  useEffect(() => {
    if (videos.length > 0) {
      const currentVideo = videos.find((v) => v._id === id);
      setVideo(currentVideo);
      setLoading(false);
    }
  }, [id, videos]);

  const filteredVideos = videos.filter(v => v._id !== id);

  if (loading) {
    return <p className="text-center mt-10">Loading video...</p>;
  }

  if (!video) {
    return <p className="text-center mt-10">Video not found.</p>;
  }

  return (
  <div className="flex bg-white mt-16 min-h-screen">
      {/* Main video area */}
      <main className="flex-1 flex flex-col items-center px-2 md:px-8 py-8">
        <div className="w-full max-w-2xl">
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
          <h1 className="text-2xl font-bold mb-1">{video.title}</h1>
          

          {/* Channel Info & Subscribe */}
          <div className="flex items-center justify-between gap-4 mt-4 mb-4 w-full">
            <div className="flex items-center justify-start gap-4">
              <img
              src={video.avatar || "/default-avatar.png"}
              alt={video.channelName}
              className="w-12 h-12 rounded-full"x
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1">
                <h2 className="font-semibold text-base">{video.channelName}</h2>
              </div>
              <span className="text-xs text-gray-500">{video.subscribers || '988K'} subscribers</span>
            </div>
            </div>
            <button className="ml-4 bg-red-600 text-white px-6 py-2 rounded-full font-semibold text-base hover:bg-gray-900 transition">
              Subscribe
            </button>
            {/* Action buttons */}
              <div className="flex items-center gap-2 ml-4">
                {/* Like/Dislike pill */}
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none">
                    <BiLike className="w-5 h-5 mr-1" />
                    {video.likes || '266K'}
                  </button>
                  <div className="w-px h-6 bg-gray-300" />
                  <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none">
                    <BiDislike className="w-5 h-5 mr-1" />
                    {video.dislikes || '26'}
                  </button>
                </div>
              <button className="flex items-center bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">
                <TbShare3 className="w-5 h-5 mr-1" />
                Share
              </button>
              <button className="flex items-center bg-gray-100 px-2 py-2 rounded-full hover:bg-gray-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="4" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="16" r="2"/></svg>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-100 text-gray-700 rounded-lg p-4  mb-6">
            <div className="flex flex-wrap items-center text-sm mb-2">
            <span>{video.views} views</span>
            <span className="mx-2">•</span>
            <span>{video.likes} likes</span>
          </div>
            {video.description}
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            {/* <Comments videoId={video._id} /> */}
          </div>
        </div>
      </main>
      {/* VideoGrid on the right, single column */}
      <aside className="hidden md:flex flex-col w-116 p-4 space-y-4 ">
        <SuggestedVideos videos={filteredVideos} />
      </aside>
    </div>
  );
}
