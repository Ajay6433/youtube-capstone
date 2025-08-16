import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    video: {
      type: String, // YouTube embed URL
      required: true,
    },
    thumbnail: {
      type: String, // Thumbnail URL
      required: true,
    },
    category: [
      {
        type: String,
        trim: true,
        index: true, // enables filtering by category
      },
    ],
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
      index: true, // query videos by channel
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // query videos by uploader
    },
    channelName: {
      type: String,
      required: true,
      trim: true,
    },
    handle: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String, // Channel or user avatar for quick display
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Full-text search index for title + description
videoSchema.index({ title: "text", description: "text" });

const Video = mongoose.model("Video", videoSchema);
export default Video;
