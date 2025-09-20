# YouTube Clone

This is a full-stack YouTube Clone application built with a React frontend and Node.js/Express backend. The project is fully dockerized for easy setup and deployment.

## 🚀 Quick Start: Run with Docker

1. **Ensure Docker is installed** on your system.
2. **Clone the repository** and navigate to the project root.
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both `youtube-backend` and `youtube-frontend` folders and fill in required values.
4. **Build and start containers:**
   ```powershell
   docker-compose up --build
   ```
5. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)

---

## 📦 Project Structure

- `youtube-backend/` — Node.js/Express REST API
- `youtube-frontend/` — React + Vite frontend
- `docker-compose.yml` — Multi-container orchestration

---

## 🛠️ Backend (`youtube-backend`)
- **Tech:** Node.js, Express, MongoDB
- **Features:**
  - User authentication (JWT, Google OAuth)
  - Video upload (Cloudinary integration)
  - Channel management
  - Comments
  - RESTful API endpoints
- **Key files:**
  - `src/server.js` — Entry point
  - `src/routes/` — API routes
  - `src/controllers/` — Business logic
  - `src/models/` — Mongoose models
  - `src/middlewares/` — Auth & upload middlewares

---

## 🎬 Frontend (`youtube-frontend`)
- **Tech:** React, Vite, Tailwind CSS
- **Features:**
  - Home, Login, Signup, Channel, Video Player pages
  - Video grid & cards
  - Channel creation & editing
  - Comments & suggested videos
  - Responsive design
- **Key files:**
  - `src/pages/` — Main pages
  - `src/components/` — UI components
  - `src/context/` — React Context for user & video state
  - `src/api/api.js` — API calls

---

## 🐳 Dockerized Setup
- **Backend & Frontend containers** defined in `docker-compose.yml`
- Each service has its own `dockerfile`
- Environment variables managed via `.env` files

---

## 📝 Development
- To run locally without Docker:
  - Backend: `cd youtube-backend && npm install && npm start`
  - Frontend: `cd youtube-frontend && npm install && npm run dev`

---

## 📄 License
MIT
