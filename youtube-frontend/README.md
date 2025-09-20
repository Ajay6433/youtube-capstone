# YouTube Clone Frontend

> **Built with AI-powered precision and modern web technologies.**  
> [GitHub Repository](https://github.com/Ajay6433/youtube-capstone)

---

## 🌟 Overview

This is the frontend of a full-stack YouTube Clone, designed to deliver a seamless video streaming experience. Built with React, Vite, and Tailwind CSS, it offers a modern, responsive, and feature-rich interface that rivals the original. The project leverages AI-driven best practices for code quality, UX, and maintainability.

---

## 🚀 Features & Functionalities

- **Home Page:** Trending videos grid, category filtering, responsive layout
- **Authentication:** Secure login & signup, Google OAuth, persistent sessions
- **Channel Management:** Create/edit/manage channels, upload banners, view channel videos
- **Video Upload & Playback:** Upload videos/thumbnails, edit details, custom player, suggested videos
- **Comments:** Add/view/manage comments, real-time updates
- **Search:** Powerful search bar/modal, instant results
- **Sidebar & Navigation:** Home, channel, profile navigation, burger menu for mobile
- **User Profile:** View/manage profile, avatar, details
- **Modern UI:** Tailwind CSS, dark mode ready
- **API Integration:** Connects to backend REST API, error/loading states

---

## 🛠️ Tech Stack

- **React** — UI library
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first styling
- **Axios** — API requests
- **Cloudinary** — Video/image hosting (via backend)
- **Docker** — Containerized deployment

---

## 📦 Folder Structure

- `src/pages/` — Main pages (Home, Login, Signup, Channel, Video Player)
- `src/components/` — UI components (VideoCard, VideoGrid, Channel, Header, Sidebar, Comments, Modals, Search, Profile, etc.)
- `src/context/` — React Context for user & video state
- `src/api/api.js` — API calls
- `src/utils/` — Utility functions (FormatNumber, GoogleLoginButton)
- `src/layouts/` — Main layout
- `src/assets/` — Images (login illustration, user, branding)
- `public/` — Static assets

---

## 🐳 Dockerized Setup

This frontend is fully dockerized for easy deployment. See the root README for instructions to run with Docker Compose.

---

## 📝 How to Run Locally

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the development server:
   ```powershell
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 License
MIT
