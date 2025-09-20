import { verifyToken } from '../utils/jwt.utils.js';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // if JWT is not provided from the frontend
  if (!authHeader || !authHeader.startsWith('JWT')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // Accessing Token
  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token); // returns payload if valid
    req.user = decoded;                 // attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
