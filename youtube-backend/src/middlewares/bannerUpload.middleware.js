import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Set up Cloudinary storage configuration for uploaded files
const storage = new CloudinaryStorage({
  cloudinary, // use our configured cloudinary instance
  params: {
    folder: "banners", // store files in the "banners" folder in Cloudinary
    allowed_formats: ["jpeg", "jpg", "png", "webp"], // only allow these formats
    transformation: [{ width: 1280, height: 720, crop: "fill" }] // resize/crop images to 1280x720
  }
});

// Create a multer upload middleware using the Cloudinary storage
const uploadBanner = multer({ storage });
export default uploadBanner;
