import {useVideos} from "../context/VideoContext";
import VideoGrid from "../components/VideoGrid";
import HomeSidebar from "../components/sidebar/HomeSidebar";

export default function Home() {
  const { videos, loading } = useVideos();

  if (loading) {
    return <p className="text-center mt-10">Loading videos...</p>;
  }

  return (

    <div className="flex bg-white mt-16 min-h-screen">
      <div></div>
      <HomeSidebar />
      <div className="p-4 md:ml-20 flex-1 overflow-y-auto">
        <VideoGrid videos={videos} />
    </div>
    </div>
  );
}
