import { Link } from "react-router-dom";
import { formatDaysAgo } from "../../utils/FormatNumber";

export default function SuggestedVideos({ videos }) {
	if (!videos || videos.length === 0) {
		return <p className="text-center mt-10">No videos available</p>;
	}

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:flex flex-col gap-4 lg:gap-0 lg:pr-6 lg:pt-6 lg:mb-2">
			{videos.map((video) => (
				<Link
					to={`/videos/${video._id}`}
					key={video._id}
					className="flex lg:mb-4 lg:p-0 cursor-pointer group no-underline text-inherit"
				>
					<div className="flex-shrink-0 w-40 h-24 rounded-xl overflow-hidden bg-gray-200 mr-3">
						<img
							src={video.thumbnail || "/default-thumbnail.png"}
							alt={video.title}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
						/>
					</div>
					<div className="flex flex-col flex-1 min-w-0">
						<div className="flex justify-between items-start">
							<h3 className="font-semibold pt-[4px] text-sm line-clamp-2 mb-1 leading-tight">{video.title}</h3>
							<button className="flex items-center px-2 py-2 rounded-full hover:bg-gray-200">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="4" r="2" /><circle cx="10" cy="10" r="2" /><circle cx="10" cy="16" r="2" /></svg>
							</button>
						</div>
						<div className="flex items-center gap-2 mb-1">
							<span className="text-xs text-gray-700 truncate">{video.channelName}</span>
						</div>
						<div className="text-xs text-gray-500 flex gap-2">
							<span>{video.views} views</span>
							<span>•</span>
							<span>{formatDaysAgo(video.updatedAt) || "1 day ago"}</span>
						</div>
					</div>
				</Link>
			))}
			<button className="btn btn-outline btn-info rounded-full md:col-span-2 mt-2">Show more</button>
		</div>
	);
}
