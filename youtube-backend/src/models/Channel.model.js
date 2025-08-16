import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  channelBanner: {
    type: String,
    default: 'https://res.cloudinary.com/dfpavmulj/image/upload/v1755338799/youtubeBanner-Hero_m33z7c.webp' // fallback banner
  },
  subscribers: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;
