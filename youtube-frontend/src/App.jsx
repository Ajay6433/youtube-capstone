import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
// import Signup from "./pages/signUp/Signup";
import VideoPlayer from "./pages/VideoPlayer";
import LoginPage from "./pages/LoginPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="video/:id" element={<VideoPlayer />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
          {/* <Route path="signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
}
