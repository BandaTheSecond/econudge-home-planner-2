import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api.js";
import { useApp } from "../context/AppContext.jsx";

export default function Register() {
  const { login } = useApp();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.access_token);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        {error && <p className="error-text">{error}</p>}

        <label>Full name</label>
        <input
          name="full_name"
          type="text"
          required
          value={form.full_name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary">
          Sign up
        </button>

        <p className="auth-alt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
