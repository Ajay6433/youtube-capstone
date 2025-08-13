import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import upload from '../middlewares/upload.middleware.js';
// import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', upload.single('avatar'), register);
router.post('/login', login);


export default router;
