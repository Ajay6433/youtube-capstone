import express from "express";
import { createChannel,getChannel, getChannelByUser } from "../controllers/channel.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import uploadBanner from "../middlewares/bannerUpload.middleware.js";

const router = express.Router();

// Create a new channel
// - Protected route (requires authentication)
// - Uploads a single banner image before creating the channel
router.post("/create", protect, uploadBanner.single("channelBanner"), createChannel);

// Get channel by user (fetch the channel owned by a specific user)
router.get("/owner/:userId", getChannelByUser);

// Get channel by its ID
router.get("/:id", getChannel);

// Export the router to be used in the main app
export default router;
