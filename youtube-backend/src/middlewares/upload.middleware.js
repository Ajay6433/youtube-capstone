import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars',             // folder name in Cloudinary
    allowed_formats: ['jpeg', 'jpg', 'png'],
    transformation: [{ width: 300, height: 300, crop: 'fill' }] // optional resize
  },
});
console.log("Consoling from the configuration file");


const upload = multer({ storage });
export default upload;
