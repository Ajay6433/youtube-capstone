import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      background: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      <Link to="/">YouTube Clone</Link>

      {user ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img 
            src={user.avatar} 
            alt="avatar" 
            style={{ width: "35px", height: "35px", borderRadius: "50%", marginRight: "10px" }}
          />
          <span>{user.name}</span>
          <button style={{ marginLeft: "10px" }} onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </header>
  );
}
