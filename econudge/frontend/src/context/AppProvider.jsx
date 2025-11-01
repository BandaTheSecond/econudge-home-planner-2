import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext.jsx";
import api from "../api/api.js";

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("access_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("access_token");
        });
    }
  }, [token]);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("access_token", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AppContext.Provider value={{ user, token, login, logout, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
}
