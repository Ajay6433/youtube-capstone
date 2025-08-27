import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/UserContext'
import { VideoProvider } from './context/VideoContext'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <VideoProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </VideoProvider>
  </UserProvider>
)
