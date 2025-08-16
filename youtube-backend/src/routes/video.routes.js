import express from "express";
import {
  getAllVideos,
  getVideoById,
  getVideosByChannel,
  getTrendingVideos,
} from "../controllers/video.controller.js";


const router = express.Router();

// Public routes (for displaying videos)
router.get("/", getAllVideos);                     // GET all videos
router.get("/trending", getTrendingVideos);         // GET top trending videos
router.get("/:id", getVideoById);                   // GET single video (auto increments views)
router.get("/channel/:channelId", getVideosByChannel); // GET videos by channel (with pagination)

export default router;
