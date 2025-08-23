import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/header/Navbar";

export default function MainLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-100 text-center text-sm py-4 border-t">
        &copy; {new Date().getFullYear()} YouTube Clone by You
      </footer> */}
    </div>
  );
}
