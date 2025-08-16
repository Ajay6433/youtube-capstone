import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Storage configuration for video thumbnails
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "video-thumbnails", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1280, height: 720, crop: "fill" }] // Standard YouTube HD thumbnail size
  },
});

const uploadThumbnail = multer({ storage });

export default uploadThumbnail;
