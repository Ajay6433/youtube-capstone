import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/videos/${id}`);
        setVideo(res.data.video); // backend should send { video: {...} }
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
    <div className="max-w-5xl mx-auto mt-6 p-4">
      {/* Video Player */}
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <iframe
          src={video.video}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>

      {/* Video Info */}
      <h1 className="text-xl font-semibold text-gray-900">{video.title}</h1>
      <p className="text-sm text-gray-600 mt-1">{video.views} views • {video.likes} likes</p>

      {/* Channel Info */}
      <div className="flex items-center mt-4">
        <img
          src={video.avatar || "/default-avatar.png"}
          alt={video.channelName}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h2 className="font-medium text-gray-800">{video.channelName}</h2>
          <p className="text-xs text-gray-600">{video.handle}</p>
        </div>
        <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Subscribe
        </button>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700">{video.description}</p>
    </div>
  );
}
