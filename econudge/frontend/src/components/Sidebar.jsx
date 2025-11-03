import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Dashboard", icon: "🏠" },
    { to: "/planner", label: "Planner", icon: "📅" },
    { to: "/reports", label: "Reports", icon: "📊" },
    { to: "/nudges", label: "Nudges", icon: "💡" },
    { to: "/rewards", label: "Rewards", icon: "🎁" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">EcoNudge</h2>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={location.pathname === item.to ? "active" : ""}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
