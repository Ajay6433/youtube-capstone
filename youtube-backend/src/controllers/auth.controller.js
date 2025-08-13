import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.utils.js';
import bcrypt from 'bcrypt';
import { generateFromEmail } from 'unique-username-generator';

export async function register(req, res) {
    try {
      const { name, email, password } = req.body;
      const username = generateFromEmail(email, 4); // create unique username from email
  
      console.log("req.body:", req.body);
      console.log("req.file:", req.file);
  
      // Check if user already exists by email OR generated username
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email or username' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Set avatar URL
      let avatarUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // default
      if (req.file && req.file.path) {
        avatarUrl = req.file.path; // Cloudinary URL if uploaded
      }
  
      // Create user
      const newUser = await User.create({
        username,
        name,
        email,
        password: hashedPassword,
        avatar: avatarUrl
      });
  
      // Remove password before sending response
      const userResponse = newUser.toObject();
      delete userResponse.password;
  
      return res.status(201).json({
        message: 'User registered successfully',
        user: userResponse
      });
    } catch (error) {
      console.error("Error registering user", error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message
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