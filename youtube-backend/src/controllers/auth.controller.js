import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.utils.js';
import bcrypt from 'bcrypt';
import { generateFromEmail } from 'unique-username-generator';

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const username = generateFromEmail(email, 4); // create unique username from email

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

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
      token, // return token so user is immediately logged in
    });

  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

  

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken({ id: user._id });
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
        console.log("Error signing in", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}