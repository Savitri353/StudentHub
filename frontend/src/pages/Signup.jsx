import axios from "../api/axios";
import { useState } from "react";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/auth/signup",
        form,
        { withCredentials: true }
      );

      const role = res.data.user.role;

      if (role === "admin") {
        window.location.href = "/admin/AdminDashboard";
      } else {
        window.location.href = "/";
      }

    } catch (error) {
      console.log("Signup error:", error.response);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-heading">Create Account</h2>

        <input
          className="signup-input"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="signup-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value }) 
          }
        />
        
        <input
          className="signup-input"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })}  maxLength={10}
        />


        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
}
