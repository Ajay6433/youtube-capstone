import {useEffect, useState, useMemo } from "react";
import { useVideos } from "../context/VideoContext";
import VideoGrid from "../components/VideoGrid";
import HomeSidebar from "../components/sidebar/HomeSidebar";
import VideoFilterBar from "../components/homePage/VideoFilterBar";


export default function Home() {
  // Get filtered videos and loading state from context
  const { filteredVideos, loading } = useVideos();
  const [videosToDisplay, setVideosToDisplay] = useState([]);

  //Whenever filteredVideos updates, refresh the page data
  useEffect(() => {
    setVideosToDisplay(filteredVideos);
  }, [filteredVideos]);
  // Show loading or no videos message if applicable
  if (loading) {
    return <p className="text-center mt-10">Loading videos...</p>;
  }

  return (
    <div className="flex bg-white mt-16 min-h-screen">
      {/* Sidebar and main content */}
      <HomeSidebar />
      <div className="p-4 md:ml-20 flex-1 overflow-y-auto">
        <VideoFilterBar />
        <VideoGrid videos={videosToDisplay} />
      </div>
    </div>
  );
}
