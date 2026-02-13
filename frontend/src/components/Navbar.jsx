import { Link, useNavigate,useLocation  } from "react-router-dom";
import axios from "../api/axios";
import "./Navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

    // Check login status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/auth/profile", {
          withCredentials: true
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <h2 className="navbar-logo">
        <Link to="/">StudentHub</Link>
      </h2>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/add-book" className="nav-btn">
           Add Book
        </Link>

       

          {/* 👇 CONDITIONAL RENDERING */}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
         {isLoggedIn && (
          <>
          <Link to="/profile" className="nav-link">
          My Profile
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
          </>
            )}
      </div>
    </nav>
  );
}
