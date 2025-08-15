import express from 'express';
import { createChannel, getChannel} from '../controllers/channel.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected routes
router.post('/create', protect, createChannel);
router.get('/:id', protect, getChannel);

export default router;