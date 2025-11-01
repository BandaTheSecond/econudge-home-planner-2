import { useContext, useEffect, useState } from "react";
import client from "../api/client";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      // calls /api/external/weather (backend should proxy to a real weather API)
      try {
        const res = await client.get("/external/weather");
        setWeather(res.data);
      } catch (err) {
        // ignore
      }
    }
    loadWeather();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to EcoNudge — track small eco actions, plan them, and earn points.</p>

      {weather && (
        <div className="weather-card card">
          <div className="weather-main">
            <div className="weather-temp">{Math.round(weather.current.temp)}°</div>
            <div className="weather-desc">{weather.current.description}</div>
          </div>
          <div className="weather-forecast">
            {weather.daily?.slice(0,5).map((d, i) => (
              <div key={i} className="forecast-day">
                <div>{new Date(d.dt * 1000).toLocaleDateString(undefined, {weekday: 'short'})}</div>
                <div>{Math.round(d.temp.day)}°</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
