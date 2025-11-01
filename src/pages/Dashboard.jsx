import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import NudgeCard from "../components/NudgeCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import api from "../api/api.js";

export default function Dashboard() {
  const [nudges, setNudges] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    api.get("/nudges/").then((res) => setNudges(res.data)).catch(() => {});
    api.get("/external/weather?city=Nairobi").then((res) => setWeather(res.data)).catch(() => {});
  }, []);

  const chartData = [
    { label: "Mon", value: 3 },
    { label: "Tue", value: 2 },
    { label: "Wed", value: 5 },
    { label: "Thu", value: 4 },
    { label: "Fri", value: 6 },
  ];

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h1>Dashboard</h1>

        {weather && (
          <div className="weather-box">
            <h3>Weather in {weather.city}</h3>
            <p>{weather.temperature_c}°C – {weather.condition}</p>
            <p>Humidity: {weather.humidity}% | Wind: {weather.wind_kph} kph</p>
          </div>
        )}

        <div className="grid-2">
          <ChartCard title="Weekly Eco Actions" data={chartData} />

          <div className="card">
            <h3>Latest Nudges</h3>
            <div className="nudge-list">
              {nudges.length === 0 ? (
                <p>No nudges yet</p>
              ) : (
                nudges.map((n) => (
                  <NudgeCard key={n.id} {...n} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
