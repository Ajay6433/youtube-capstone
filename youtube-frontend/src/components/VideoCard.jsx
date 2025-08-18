export default function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200">
      <a href={`/videos/${video._id}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </a>
      <div className="p-3 flex">
        <img
          src={video.avatar || "/default-avatar.png"} // fallback avatar
          alt={video.channelName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{video.title}</h3>
          <p className="text-xs text-gray-600">{video.channelName}</p>
          <p className="text-xs text-gray-500">
            {video.views} views • {video.likes} likes
          </p>
        </div>
      </div>
    </div>
  );
}
