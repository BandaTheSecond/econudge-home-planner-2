import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Planner from "./pages/Planner.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import Rewards from "./pages/Rewards.jsx";
import { useApp } from "./context/AppContext.jsx";

function PrivateRoute({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/planner"
        element={
          <PrivateRoute>
            <Planner />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/rewards"
        element={
          <PrivateRoute>
            <Rewards />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
