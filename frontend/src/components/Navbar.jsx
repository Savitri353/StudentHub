import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import "./Navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");

  const departments = [
    "Artificial Intelligence and Machine Learning",
    "Automobile Engineering",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "Environmental Engineering",
    "Information Technology",
    "Inst. & Control Engg.",
    "Mechanical Engineering",
    "Plastic Technology",
    "Robotics and Automation",
    "Rubber Technology",
    "Science and Humanities",
    "Textile Technology",
  ];

  // Check login status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/auth/profile", {
          withCredentials: true,
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  // Search handler
  const handleSearch = () => {
    const query = new URLSearchParams({
      title,
      semester,
      department,
    }).toString();

    navigate(`/?${query}`);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });

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

      {/* Search Section */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search by title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Semester</option>
          <option value="1">Sem 1</option>
          <option value="2">Sem 2</option>
          <option value="3">Sem 3</option>
          <option value="4">Sem 4</option>
          <option value="5">Sem 5</option>
          <option value="6">Sem 6</option>
          <option value="7">Sem 7</option>
          <option value="8">Sem 8</option>
        </select>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Department</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Links */}
      <div className="navbar-links">
        {/* Add Book only when logged in */}
        {isLoggedIn && (
          <Link to="/add-book" className="nav-btn">
            Add Book
          </Link>
        )}

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
