import api from "../../api/api";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../../utils/GoogleLoginButton";

export default function Login() {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData, { withCredentials: true });
      // Fetch and store channel info if available
      let channel = null;
      try {
        const channelRes = await api.get(`/channel/owner/${res.data.user.id}`);
        channel = channelRes.data.channel;
        localStorage.setItem("channel", JSON.stringify(channel));
      } catch (channelError) {
        if (channelError.response?.status === 404) {
          localStorage.removeItem("channel"); // clear stale channel if any
        } else {
          console.error("Error fetching channel:", channelError);
        }
      }
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Login successful!");
      // send user data to context
      login(res.data);
      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed!";
      toast.error(msg);
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      {/* Login form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white text-black flex flex-col justify-center p-6 sm:p-8 md:p-8 rounded-xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
          Sign in to YouTube
        </h2>

        {errorMsg && (
          <div className="text-red-600 text-sm text-center mb-4">{errorMsg}</div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-4 text-base sm:text-lg border border-black rounded-lg mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-4 text-base sm:text-lg border border-black rounded-lg mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <div className="flex justify-center mb-4 sm:mb-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-3/4 bg-red-600 text-white py-3 rounded-full transition text-sm sm:text-base ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
              }`}
          >
            {loading ? "Logging in..." : "Continue to Login"}
          </button>
        </div>
        <hr />
        <p className="text-center text-sm mb-4 sm:mb-6">or</p>
        <div className="flex justify-center mb-4 sm:mb-6">
          <GoogleLoginButton />
        </div>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-600 font-medium">
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
