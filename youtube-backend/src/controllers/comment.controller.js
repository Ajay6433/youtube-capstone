import Comment from "../models/Comment.model.js";
import Video from "../models/Video.model.js";

// Add a comment to a video
// POST /api/comments/:videoId
export async function addComment(req, res) {
  try {
    const { videoId } = req.params;
    const { text } = req.body;

    // Basic validation
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // Create comment
    const comment = await Comment.create({
      text,
      video: videoId,
      user: req.user.id
    });

    // Populate user info
    const populatedComment = await comment.populate("user", "name avatar");

    return res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//Get comments for a video
//GET /api/comments/:videoId
export async function getComments(req, res) {
  try {
    const { videoId } = req.params;
    // Fetch comments and populate user info
    const comments = await Comment.find({ video: videoId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// Update comment a comment
// PUT /api/comments/:id
export async function updateComment(req, res) {
  try {
    const { id } = req.params;  // comment ID
    const { text } = req.body;

    // Fetch comment
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Ownership check
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this comment" });
    }

    // Update content
    comment.text = text || comment.text;
    await comment.save();

    return res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

//Delete a comment
//DELETE /api/comments/:id
export async function deleteComment(req, res) {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id).populate("video");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only comment owner OR video owner can delete
    if (
      comment.user.toString() !== req.user.id &&
      comment.video.uploader.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }
    // Delete comment
    await comment.deleteOne();
    // Success response
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
