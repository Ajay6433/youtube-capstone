# YouTube Clone Backend

A Node.js + Express backend for a YouTube-like application. Features user authentication (JWT & Google OAuth), video management, channels, and comments. Built with MongoDB and Mongoose.

## Project Structure

```
backend/
  ├── src/
  │   ├── config/        # DB connection, cloudinary config, etc.
  │   ├── controllers/   # API logic
  │   ├── models/        # Mongoose schemas
  │   ├── routes/        # API endpoints
  │   ├── middlewares/   # Auth middleware (JWT)
  │   ├── utils/         # Helper functions
  │   └── server.js      # Main server file
  ├── package.json
  └── README.MD
```

## Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

## Setup Instructions

1. **Clone the repository**
   ```powershell
   git clone <your-repo-url>
   cd youtube-backend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory:
     ```env
     PORT=5000
     MONGODB_URI=<your-mongodb-uri>
     CLIENT_URL=http://localhost:3000
     JWT_SECRET=<your-jwt-secret>
     GOOGLE_CLIENT_ID=<your-google-client-id>
     ```

4. **Start the server**
   ```powershell
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

## API Endpoints

### Auth Routes (`/api/auth`)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login with email & password
- `POST /api/auth/google` — Login/Register with Google OAuth

### Channel Routes (`/api/channel`)
- `GET /api/channel/:id` — Get channel by ID
- `POST /api/channel` — Create a new channel
- `PUT /api/channel/:id` — Update channel info
- `DELETE /api/channel/:id` — Delete a channel

### Video Routes (`/api/videos`)
- `GET /api/videos` — List all videos
- `GET /api/videos/:id` — Get video by ID
- `POST /api/videos` — Upload a new video
- `PUT /api/videos/:id` — Update video info
- `DELETE /api/videos/:id` — Delete a video

### Comment Routes (`/api/comments`)
- `GET /api/comments/:videoId` — Get comments for a video
- `POST /api/comments` — Add a comment
- `DELETE /api/comments/:id` — Delete a comment

## Middleware
- JWT authentication for protected routes
- CORS enabled for frontend integration

## Notes
- Make sure your MongoDB server is running and accessible.
- For Google OAuth, set up a Google Cloud project and get your client ID.
- Default avatars are used if none provided.

## License
MIT

## Contact
For questions or issues, open an issue or contact the maintainer.


