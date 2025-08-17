import { useEffect } from "react";
import axios from "axios";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton = () => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID, // from GCP
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

      console.log("Login success:", res.data);

      // You can save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      alert("Google Login Successful!");
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
