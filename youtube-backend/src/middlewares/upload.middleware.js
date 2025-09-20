import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Configure Cloudinary storage for user avatars
const storage = new CloudinaryStorage({
  cloudinary, // use the configured Cloudinary instance from the config folder
  params: {
    folder: 'avatars', // store files inside the "avatars" folder in Cloudinary
    allowed_formats: ['jpeg', 'jpg', 'png'], // restrict uploads to these formats
    transformation: [
      { width: 300, height: 300, crop: 'fill' } // resize/crop images to 300x300
    ]
  },
});

// Create multer upload middleware using the Cloudinary storage
const upload = multer({ storage });

// Export the middleware so it can be used in routes
export default upload;
