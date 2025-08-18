import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/UserContext'

createRoot(document.getElementById('root')).render(
    <UserProvider>
      <App />
    <Toaster position="top-center" reverseOrder={false} />
    </UserProvider>
)
