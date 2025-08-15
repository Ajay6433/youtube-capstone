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
    default: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png' // fallback banner
  },
  subscribers: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;
