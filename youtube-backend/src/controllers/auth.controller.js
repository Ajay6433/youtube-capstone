import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.utils.js';
import bcrypt from 'bcrypt';
import { generateFromEmail } from 'unique-username-generator';
import { OAuth2Client } from 'google-auth-library';

// Accessing the Google Client ID stored into the env file
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Controller for the google login
export const googleLogin = async (req, res) => {
  try {
    const { id_token } = req.body; // frontend will send this token
    if (!id_token) {
      return res.status(400).json({ message: "ID token is required" });
    }

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    //Getting the payload
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    const username = generateFromEmail(email, 4); // create unique username from email
    // Generating random password for the Google user
    const randomPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);

    // If not, register new user automatically
    if (!user) {
      user = await User.create({
        username,
        name,
        email,
        password: randomPassword, 
        // If profile picture is not available then using a default one
        avatar: picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      });
    }

    // Generate JWT
    const token = generateToken({id: user._id});

    // Success reponse
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Controller to register a new user
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const username = generateFromEmail(email, 4); // create unique username from email

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default avatar URL
    let avatarUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    if (req.file && req.file.path) {
      avatarUrl = req.file.path; // Cloudinary secure URL
    }

    // Create user
    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      avatar: avatarUrl
    });

    // Generate JWT token
    const token = generateToken({ id: newUser._id });

    // Prepare response object without password
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token, 
    });

  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Controller for login
export async function login(req, res) {
    try {
        // Getting details from the request body
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // If email don't match
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // If password don't match
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generating JWT token
        const token = generateToken({ id: user._id });
        // Success response
        return res.status(200).json({
            message: 'Sign in successful', token, user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
      // Handle errors
        console.log("Error signing in", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

