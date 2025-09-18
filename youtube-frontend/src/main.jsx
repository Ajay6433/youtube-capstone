import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/UserContext'
import { VideoProvider } from './context/VideoContext'

createRoot(document.getElementById('root')).render(
  // Context providers for user and video data
  <UserProvider>
    <VideoProvider>
      <App />
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </VideoProvider>
  </UserProvider>
)
