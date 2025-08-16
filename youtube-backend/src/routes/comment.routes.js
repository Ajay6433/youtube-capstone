import express from "express";
import { addComment, getComments, deleteComment, updateComment } from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create comment on video
router.post("/:videoId", protect, addComment);

// Get comments for a video
router.get("/:videoId", getComments);

// Update own comment
router.put("/:id", protect, updateComment);

// Delete own comment
router.delete("/:id", protect, deleteComment);

export default router;
