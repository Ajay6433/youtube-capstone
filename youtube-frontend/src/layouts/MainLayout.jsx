import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: "70px", padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}
