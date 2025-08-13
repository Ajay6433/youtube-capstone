# YouTube Clone Backend Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/youtube-clone?retryWrites=true&w=majority

# JWT Secret Key (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Google OAuth (optional - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Replace `username`, `password`, and `cluster` in the connection string

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login
- `POST /google` - Google OAuth login
- `GET /profile` - Get user profile (protected)

### Request Examples

#### Register User
```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Login User
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Google OAuth
```json
POST /api/auth/google
{
  "email": "john@gmail.com",
  "name": "John Doe",
  "picture": "https://example.com/avatar.jpg",
  "googleId": "google-user-id-123"
}
```

## Features

- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Google OAuth support
- ✅ Protected routes
- ✅ MongoDB Atlas integration
- ✅ Error handling
- ✅ CORS enabled
