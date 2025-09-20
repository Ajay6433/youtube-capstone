import Video from "../models/Video.model.js";

// Upload a video
// POST /api/videos
export async function uploadVideo(req, res) {
  try {

    const {
      title,
      description,
      category,
      video,
      channelName,
      channelId,
      uploader,
      handle,
      avatar,
      views,
      likes,
      dislikes,
    } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Thumbnail upload failed" });
    }

    const newVideo = new Video({
      title,
      description,
      category,
      video,
      channelName,
      channelId,
      uploader,
      handle,
      avatar,
      views: views || 0,
      likes: likes || 0,
      dislikes: dislikes || 0,
      thumbnail: req.file.path, // coming from multer/cloudinary
    });

    await newVideo.save();

    return res
      .status(201)
      .json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}


// Get all videos (no pagination)
// GET /api/videos
export async function getAllVideos(req, res) {
  try {
    const { search, category } = req.query; //Right now handling this search from the frontend only can be modified to the backend as well

    // Build query dynamically
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = { $in: [category] };
    }

    // Fetch videos 
    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .populate("channelId", "channelName channelBanner")
      .populate("uploader", "name avatar");

    // Success response
    return res.status(200).json({ count: videos.length, videos });
  } catch (error) {
    // Handle errors
    console.error("Error fetching videos:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// Get single video and increment views
// GET /api/videos/:id
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

// Get videos by channel with pagination
// GET /api/videos/channel/:channelId
export async function getVideosByChannel(req, res) {
  try {
    const { channelId } = req.params;
    // Pagination 
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ channelId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("uploader", "name avatar");
    // Total videos
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

// Get trending videos (top by views)
// GET /api/videos/trending

export async function getTrendingVideos(req, res) {
  try {
    // Controller for get the videos based on the high number of views calling them trending, Not implemented in the frontend
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

// Update a video
// PUT /api/videos/:id
export async function updateVideo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    // Find a video
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // Ownership check
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this video" });
    }

    // Update fields if provided
    if (title) video.title = title;
    if (description) video.description = description;
    if (category) video.category = category;

    // If thumbnail uploaded via multer + cloudinary
    if (req.file && req.file.path) {
      video.thumbnail = req.file.path; // Cloudinary URL
    }

    await video.save();

    return res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    console.error("Error updating video:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// Delete a video
// DELETE /api/videos/:id
export async function deleteVideo(req, res) {
  try {
    const { id } = req.params;
    // Find a video based on id
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // Ownership check
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this video" });
    }
    // Delete video
    await video.deleteOne();
    // Success response
    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting video:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
