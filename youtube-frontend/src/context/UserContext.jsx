import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);
  }, []);

  // login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logout successful!");
    // Redirect to login page after logout
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
