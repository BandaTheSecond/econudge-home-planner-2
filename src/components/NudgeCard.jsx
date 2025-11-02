import React from "react";

export default function NudgeCard({ title, description, category, difficulty }) {
  return (
    <div className="card nudge-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="nudge-meta">
        <span className="badge">{category}</span>
        <span className="badge badge-secondary">{difficulty}</span>
      </div>
    </div>
  );
}
