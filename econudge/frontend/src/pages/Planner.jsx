import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import api from "../api/api.js";

export default function Planner() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const fetchTasks = () => {
    api.get("/planner/").then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    await api.post("/planner/", { task });
    setTask("");
    fetchTasks();
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h1>Planner</h1>
        <form className="inline-form" onSubmit={handleAdd}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add an eco task..."
          />
          <button className="btn-primary" type="submit">
            Add
          </button>
        </form>

        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className={`task-item status-${t.status}`}>
              <span>{t.task}</span>
              <span className="status-pill">{t.status}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
