import Channel from '../models/Channel.model.js';

// Create a new channel
export async function createChannel(req, res) {
  try {
    const { channelName, description } = req.body;

    // Ensure no duplicate channel for same user
    const existing = await Channel.findOne({ channelName, owner: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "You already have a channel with this name" });
    }

    // Channel Banner URL
    const bannerUrl = req.file && req.file.path ? req.file.path : undefined;

    // Create channel
    const channel = await Channel.create({
      channelName,
      owner: req.user.id,
      description,
      channelBanner: bannerUrl // if undefined, schema default kicks in
    });
    // Success response
    return res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    // Handle errors
    console.error("Error creating channel:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// Get Channel By User ID
export async function getChannelByUser(req, res) {
  try {
    // Getting user ID from the params
    const { userId } = req.params;

    const channel = await Channel.findOne({ owner: userId })
      .populate("owner", "name email avatar username"); //Populate method returns the owner details too

    // If no channel found
    if (!channel) {
      return res.status(404).json({ message: "No channel found for this user" });
    }
    // Sucess response
    return res.status(200).json({ channel });
  } catch (error) {
    // Handle errors
    console.error("Error fetching channel by user:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


// Get channel by ID
export async function getChannel(req, res) {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'name email avatar'); // fetch basic user info
    // If no channel found
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    // Sucess response
    return res.status(200).json({ channel });
  }
  catch (error) {
    // Handle errors
    console.error("Error fetching channel:", error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}