import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Basic user info
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    
    // Profile picture - stores URL to image
    avatar: {
        type: String,
        default: ""
    },
    
    // When user was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Create User model
const User = mongoose.model('User', userSchema);

export default User;