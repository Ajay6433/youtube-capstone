import dotenv from 'dotenv';
dotenv.config(); // <-- ensures env vars exist here in ESM
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default cloudinary;  // <-- Export the cloudinary instance itself
