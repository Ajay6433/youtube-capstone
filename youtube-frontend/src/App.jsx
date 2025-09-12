import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import VideoPlayer from "./pages/VideoPlayer";
import LoginPage from "./pages/LoginPage";
import ChannelPage from "./pages/ChannelPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="videos/:id" element={<VideoPlayer />} />
          <Route path="channel/:id" element={<ChannelPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
          <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
