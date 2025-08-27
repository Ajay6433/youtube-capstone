import VideoCard from "./VideoCard";

export default function VideoGrid({ videos, singleColumn }) {
  if (!videos || videos.length === 0) {
    return <p className="text-center mt-10">No videos available</p>;
  }

  const gridClass = singleColumn
    ? "flex flex-col gap-4"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6";

  return (
    <div className={gridClass}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}
