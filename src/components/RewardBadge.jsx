import React from "react";

export default function RewardBadge({ label, points }) {
  return (
    <div className="reward-badge">
      <span>{label}</span>
      <strong>{points} pts</strong>
    </div>
  );
}
