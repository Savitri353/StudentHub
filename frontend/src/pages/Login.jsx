import axios from "../api/axios";
import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      alert("Login successful");
      // console.log(res.data.user);
        const role = res.data.user.role;

      if (role === "admin") {
        window.location.href = "/admin/AdminDashboard";
      } else {
        window.location.href = "/";
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-heading">Login</h2>

        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
