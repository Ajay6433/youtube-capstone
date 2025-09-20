import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined'); // prevent token generation without a secret
        }
        // Sign the payload into a JWT with 1-hour expiry
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        console.log("Error generating token", error);
    }
};

export const verifyToken = (token) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined'); // prevent verification without a secret
        }
        // Decode and verify token authenticity
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log("Error verifying token", error);
    }
};
