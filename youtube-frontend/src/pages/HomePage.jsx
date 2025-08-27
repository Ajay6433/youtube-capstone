import {useVideos} from "../context/VideoContext";
import VideoGrid from "../components/VideoGrid";

export default function Home() {
  const { videos, loading } = useVideos();

  if (loading) {
    return <p className="text-center mt-10">Loading videos...</p>;
  }

  return (

    <div>
      <div></div>
      <div className="p-4">
        <VideoGrid videos={videos} />
    </div>
    </div>
  );
}
