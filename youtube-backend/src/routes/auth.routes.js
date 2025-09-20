import express from 'express';
import { register, login, googleLogin } from '../controllers/auth.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.post('/google', googleLogin);


export default router;
