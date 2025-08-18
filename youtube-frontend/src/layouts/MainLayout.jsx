import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

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
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-3">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://www.svgrepo.com/show/13671/youtube.svg"
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold text-gray-800">
              YouTube Clone
            </span>
          </Link>

          {/* Right: User section */}
          <div>
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
                <span className="font-medium text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm py-4 border-t">
        &copy; {new Date().getFullYear()} YouTube Clone by You
      </footer>
    </div>
  );
}
