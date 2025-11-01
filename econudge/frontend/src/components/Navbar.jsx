import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">EcoNudge 🌿</span>
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="btn-link">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <span className="user-label">{user.full_name}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
