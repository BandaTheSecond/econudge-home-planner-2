import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import RewardBadge from "../components/RewardBadge.jsx";
import api from "../api/api.js";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);

  const fetchRewards = () => {
    api.get("/rewards/").then((res) => setRewards(res.data));
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h1>Rewards</h1>
        <div className="reward-grid">
          {rewards.map((r) => (
            <RewardBadge key={r.id} {...r} />
          ))}
        </div>
      </main>
    </div>
  );
}
