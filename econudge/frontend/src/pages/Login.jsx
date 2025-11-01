import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api.js";
import { useApp } from "../context/AppContext.jsx";

export default function Login() {
  const { login, setLoading } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.access_token);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        {error && <p className="error-text">{error}</p>}

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
          Login
        </button>

        <p className="auth-alt">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
