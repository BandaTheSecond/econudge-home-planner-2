import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function Settings() {
  const { user } = useApp();

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h1>Settings</h1>
        <div className="card">
          <p><strong>Name:</strong> {user?.full_name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </main>
    </div>
  );
}
