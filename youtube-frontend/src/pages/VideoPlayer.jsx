
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

import VideoGrid from "../components/VideoGrid";


export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  // Mock comments for now
  const [comments] = useState([
    { user: "Alice", text: "Great video!", avatar: "/default-avatar.png" },
    { user: "Bob", text: "Very informative.", avatar: "/default-avatar.png" },
    { user: "Charlie", text: "Loved the editing!", avatar: "/default-avatar.png" },
  ]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/videos/${id}`);
        setVideo(res.data.video);
        console.log(res.data.video);
      } catch (error) {
        console.error("Error fetching video:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

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
        <div className="w-full max-w-3xl">
          {/* Video Player */}
          <div className="w-full aspect-[16/9] bg-black rounded-xl overflow-hidden mb-4">
            <iframe
              src={video.video}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-contain"
            ></iframe>
          </div>

          {/* Video Info */}
          <h1 className="text-2xl font-bold mb-1">{video.title}</h1>
          <div className="flex flex-wrap items-center text-sm mb-2">
            <span>{video.views} views</span>
            <span className="mx-2">•</span>
            <span>{video.likes} likes</span>
          </div>

          {/* Channel Info & Subscribe */}
          <div className="flex items-center mt-4 mb-4">
            <img
              src={video.avatar || "/default-avatar.png"}
              alt={video.channelName}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h2 className="font-medium ">{video.channelName}</h2>
              <p className="text-xs ">{video.handle}</p>
            </div>
            <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition font-semibold">
              Subscribe
            </button>
          </div>

          {/* Description */}
          <div className="bg-gray-100 text-gray-700 rounded-lg p-4  mb-6">
            {video.description}
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="space-y-4">
              {comments.map((c, i) => (
                <div key={i} className="flex items-start">
                  <img src={c.avatar} alt={c.user} className="w-9 h-9 rounded-full mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{c.user}</div>
                    <div className="text-sm">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* VideoGrid on the right, single column */}
      <aside className="hidden md:flex flex-col w-96 p-4 space-y-4 border-l">
        <VideoGrid singleColumn />
      </aside>
    </div>
  );
}
