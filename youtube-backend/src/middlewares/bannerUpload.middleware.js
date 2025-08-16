import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "banners",
    allowed_formats: ["jpeg", "jpg", "png", "webp"],
    transformation: [{ width: 1280, height: 720, crop: "fill" }]
  }
});

const uploadBanner = multer({ storage });
export default uploadBanner;
