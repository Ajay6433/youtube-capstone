import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton = () => {

  const {login} = useContext(UserContext);
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID, 
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" } // custom styling
    );
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      // Send id_token to backend
      const res = await axios.post("http://localhost:8080/api/auth/google", {
        id_token: response.credential,
      });

      // Save user data in context
      login(res.data.user);
      // Redirect to home page
      window.location.href = "/";

      // You can save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      toast.success("Google Login Successful!");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Google Login Failed!");
    }
  };

  return (
    <div>
      <div id="googleBtn"></div>
    </div>
  );
};

export default GoogleLoginButton;
