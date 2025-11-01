import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import api from "../api/api.js";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/reports/").then((res) => setReports(res.data));
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h1>Reports</h1>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Total Tasks</th>
                <th>Completed</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{r.period}</td>
                  <td>{r.total_tasks}</td>
                  <td>{r.completed_tasks}</td>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
