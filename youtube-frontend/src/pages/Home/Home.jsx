import { useEffect, useState } from "react";
import api from "../../api/api";
import VideoGrid from "../../components/VideoGrid";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/videos");
        setVideos(res.data.videos); // assuming your backend sends { videos: [...] }
      } catch (error) {
        console.error("Error fetching videos:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading videos...</p>;
  }

  return (
    <div className="p-4">
      <VideoGrid videos={videos} />
    </div>
  );
}
