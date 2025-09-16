import { useState, useMemo } from "react";
import { useVideos } from "../../context/VideoContext";

export default function VideoFilterBar() {
  const { videos, setFilteredVideos } = useVideos();
  const [activeFilter, setActiveFilter] = useState("All");

  // ✅ Dynamically generate filters based on video categories
  const FILTERS = useMemo(() => {
    const uniqueCategories = new Set();
    videos.forEach((video) => {
      if (Array.isArray(video.category)) {
        video.category.forEach((cat) => uniqueCategories.add(cat));
      }
    });
    return ["All", ...Array.from(uniqueCategories)];
  }, [videos]);

  function handleFilterClick(filter) {
    setActiveFilter(filter);

    if (filter === "All") {
      setFilteredVideos(videos); // reset to all videos
    } else {
      const filtered = videos.filter((video) =>
        video.category.some(
          (cat) => cat?.toLowerCase() === filter.toLowerCase()
        )
      );
      setFilteredVideos(filtered);
    }
  }

  return (
    <div className="flex overflow-x-auto space-x-3 mb-4 no-scrollbar">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
            activeFilter === filter
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
