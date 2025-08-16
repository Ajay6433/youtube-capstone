import express from "express";
import { createChannel, getChannel } from "../controllers/channel.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import uploadBanner from "../middlewares/bannerUpload.middleware.js";

const router = express.Router();

router.post("/create", protect, uploadBanner.single("channelBanner"), createChannel);
router.get("/:id", getChannel);

export default router;
