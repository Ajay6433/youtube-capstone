import Channel from '../models/Channel.model.js';

// Create a new channel
export async function createChannel(req, res) {
  try {
    const { channelName, description } = req.body;

    // Prevent multiple channels with same name by same user
    const existing = await Channel.findOne({ channelName, owner: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'You already have a channel with this name' });
    }

    const channel = await Channel.create({
      channelName,
      owner: req.user.id,
      description,
      channelBanner: req.body.channelBanner || undefined
    });

    return res.status(201).json({ message: 'Channel created successfully', channel });
  } catch (error) {
    console.error("Error creating channel:", error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Get channel by ID
export async function getChannel(req, res) {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'name email avatar'); // fetch basic user info

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    return res.status(200).json({ channel });
  } catch (error) {
    console.error("Error fetching channel:", error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
