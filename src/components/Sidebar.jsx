import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" end className="sidebar-link">
        Dashboard
      </NavLink>
      <NavLink to="/planner" className="sidebar-link">
        Planner
      </NavLink>
      <NavLink to="/rewards" className="sidebar-link">
        Rewards
      </NavLink>
      <NavLink to="/reports" className="sidebar-link">
        Reports
      </NavLink>
      <NavLink to="/settings" className="sidebar-link">
        Settings
      </NavLink>
    </aside>
  );
}
