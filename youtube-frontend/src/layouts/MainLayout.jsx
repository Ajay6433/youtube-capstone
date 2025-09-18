import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-0 m-0">
        <Outlet />
      </main>
    </div>
  );
}
