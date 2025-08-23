import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }) {
  if (!videos || videos.length === 0) {
    return <p className="text-center mt-10">No videos available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}
