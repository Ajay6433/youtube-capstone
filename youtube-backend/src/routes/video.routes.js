import express from "express";
import {
  getAllVideos,
  getVideoById,
  getVideosByChannel,
  getTrendingVideos,
  updateVideo,
  deleteVideo
} from "../controllers/video.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import uploadThumbnail from "../middlewares/uploadThumbnail.middleware.js";


const router = express.Router();

// Public routes (for displaying videos)
router.get("/", getAllVideos);                     // GET all videos
router.get("/trending", getTrendingVideos);         // GET top trending videos
router.get("/:id", getVideoById);                   // GET single video (auto increments views)
router.get("/channel/:channelId", getVideosByChannel); // GET videos by channel (with pagination)

// Protected routes

router.put("/:id", protect, uploadThumbnail.single("thumbnail"), updateVideo);
router.delete('/:id',protect, deleteVideo);


export default router;
