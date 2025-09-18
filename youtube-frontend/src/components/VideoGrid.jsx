import VideoCard from "./VideoCard";

export default function VideoGrid({ videos, singleColumn }) {
  // If no videos, show message
  if (!videos || videos.length === 0) {
    return <p className="text-center mt-10">No videos available</p>;
  }
  // For responsive grid layout
  const gridClass = singleColumn ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3";

  return (
    <div className={`grid ${gridClass} gap-4 sm:gap-6 px-2 sm:px-0`}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}
