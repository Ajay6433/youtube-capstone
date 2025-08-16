import Video from "../models/Video.model.js";

/**
 * @desc Get all videos (no pagination)
 * @route GET /api/videos
 * @access Public
 */
export async function getAllVideos(req, res) {
  try {
    const { search, category } = req.query;

    // Build query dynamically
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = { $in: [category] };
    }

    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .populate("channelId", "channelName channelBanner")  // if channel ref exists
      .populate("uploader", "name avatar");

    return res.status(200).json({ count: videos.length, videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

/**
 * @desc Get single video and increment views
 * @route GET /api/videos/:id
 * @access Public
 */
export async function getVideoById(req, res) {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channelId", "channelName channelBanner")
      .populate("uploader", "name avatar");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // increment views
    video.views += 1;
    await video.save();

    return res.status(200).json({ video });
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

/**
 * @desc Get videos by channel with pagination
 * @route GET /api/videos/channel/:channelId?page=1
 * @access Public
 */
export async function getVideosByChannel(req, res) {
  try {
    const { channelId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ channelId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("uploader", "name avatar");

    const total = await Video.countDocuments({ channelId });

    return res.status(200).json({
      page,
      total,
      videos
    });
  } catch (error) {
    console.error("Error fetching channel videos:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

/**
 * @desc Get trending videos (top by views)
 * @route GET /api/videos/trending
 * @access Public
 */
export async function getTrendingVideos(req, res) {
  try {
    const videos = await Video.find()
      .sort({ views: -1 })
      .limit(10)
      .populate("channelId", "channelName channelBanner")
      .populate("uploader", "name avatar");

    return res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
