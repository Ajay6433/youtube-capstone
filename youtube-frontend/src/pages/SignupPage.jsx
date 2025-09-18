import api from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null, // file object
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }
    // Send the form data to the server
    try {
      const res = await api.post("/auth/register", formDataToSend, {
        //Using cloudinary for image upload so setting content-type to multipart/form-data
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Signup successful!");
      //Redirecting to login page after 1 second
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Signup form */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-gray-700 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>
        {/* Link to login page */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
