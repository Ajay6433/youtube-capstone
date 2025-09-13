import { Form } from "react-router-dom";
import formatNumber from "../../utils/FormatNumber"
import api from "../../api/api";

export default function ChannelVideoCard({ video }) {

  async function channelPageDetails() {
    let channel = await api.get(`/channel/${video.channelId._id}`);
    console.log("Fetched channel data:", channel);
    channel = channel.data.channel;
    sessionStorage.setItem("channel", JSON.stringify(channel));
    window.location.href = `/channel/${video.channelId._id}`;
  }



  return (
    <div className="w-full max-w-xs sm:max-w-sm cursor-pointer mx-auto">
      {/* Thumbnail */}
      <a href={`/videos/${video._id}`} className="block">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 sm:h-64 object-cover rounded-xl hover:rounded-none duration-500"
        />
      </a>

      {/* Video info */}
      <div className="flex mt-3">
        {/* Channel avatar */}
        <img
          src={video.avatar || "/default-avatar.png"}
          onClick={channelPageDetails}
          alt={video.channelName}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 mr-2 sm:mr-3"
        />

        {/* Text details */}
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600"
            onClick={channelPageDetails}
          >{video.channelName}</p>
          <p className="text-xs sm:text-sm text-gray-500">
            {formatNumber(video.views)} views · {formatNumber(video.likes)} likes
          </p>
        </div>
      </div>
    </div>
  );
}
