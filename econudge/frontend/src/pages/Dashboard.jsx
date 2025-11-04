import { useContext, useEffect, useState } from "react";
import client from "../api/client";
import { AuthContext } from "../context/AuthContext";

// ✅ Moved helper outside component
const createRecommendations = (plans, weather) => {
  const recs = [];

  if (plans.length === 0) {
    recs.push("Start by adding your first eco-plan in the Planner!");
  }

  if (!weather || weather.current.temp > 25) {
    recs.push("Consider walking or biking instead of driving on hot days.");
  }

  recs.push("Complete daily nudges to earn more points.");
  recs.push("Check your carbon footprint in Reports.");

  return recs;
};

// ✅ Simple loading skeleton / spinner
const LoadingCard = ({ title }) => (
  <div className="card loading-card animate-pulse">
    <h3>{title}</h3>
    <p className="muted">Loading data...</p>
    <div className="loading-bar bg-gray-200 h-3 rounded w-3/4 mb-2"></div>
    <div className="loading-bar bg-gray-200 h-3 rounded w-2/3"></div>
  </div>
);

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [plans, setPlans] = useState([]);
  const [carbonData, setCarbonData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => console.log("Location access denied")
      );
    }

    async function loadData() {
      try {
        // Load weather
        const weatherRes = await client.get("/api/weather/weather");
        setWeather(weatherRes.data);
      } catch {
        setWeather({
          current: { temp: 22, description: "Sunny" },
          location: "Your Location",
          daily: [
            { dt: Date.now() / 1000, temp: { day: 22 } },
            { dt: (Date.now() + 86400000) / 1000, temp: { day: 24 } },
            { dt: (Date.now() + 172800000) / 1000, temp: { day: 20 } },
          ],
        });
      }

      try {
        // Load recent plans
        const plansRes = await client.get("/planner/");
        setPlans(plansRes.data.slice(0, 3));
      } catch {
        console.log("Plans fetch failed");
      }

      try {
        // Load carbon data
        const carbonRes = await client.get("/api/weather/carbon");
        setCarbonData(carbonRes.data);
      } catch {
        setCarbonData({
          emissions: 2.5,
          energy: 15.3,
          unit: "kg CO2/day",
        });
      }

      // ✅ generate recommendations
      setRecommendations(createRecommendations(plans, weather));
      setLoading(false);
    }

    loadData();
  }, [user, plans, weather]);

  if (loading) {
    return (
      <div>
        <h2>Dashboard</h2>
        <p className="mb-4">Welcome to EcoNudge — preparing your insights...</p>
        <div className="dashboard-grid">
          <LoadingCard title="🌤️ Weather & Location" />
          <LoadingCard title="🌱 Carbon & Energy" />
          <LoadingCard title="📅 Recent Plans" />
          <LoadingCard title="💡 Recommendations" />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <p className="mb-4">
        Welcome to EcoNudge — track small eco actions, plan them, and earn
        points.
      </p>

      <div className="dashboard-grid">
        {/* Weather & Location */}
        <div className="card weather-card">
          <h3>🌤️ Weather & Location</h3>
          {location && (
            <p className="muted">
              Lat: {location.lat.toFixed(2)}, Lon: {location.lon.toFixed(2)}
            </p>
          )}
          <div className="weather-main">
            <div className="weather-temp">
              {Math.round(weather.current.temp)}°C
            </div>
            <div className="weather-desc">{weather.current.description}</div>
            <div className="weather-forecast">
              {weather.daily?.slice(0, 3).map((d, i) => (
                <div key={i} className="forecast-day">
                  <div>
                    {new Date(d.dt * 1000).toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </div>
                  <div>{Math.round(d.temp.day)}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carbon Emissions */}
        <div className="card carbon-card">
          <h3>🌱 Carbon & Energy</h3>
          <div>
            <div className="kpi">
              <div className="kpi-title">Daily CO2 Emissions</div>
              <div className="kpi-value">{carbonData.emissions} kg</div>
            </div>
            <div className="kpi">
              <div className="kpi-title">Energy Usage</div>
              <div className="kpi-value">{carbonData.energy} kWh</div>
            </div>
          </div>
        </div>

        {/* Recent Plans */}
        <div className="card plans-card">
          <h3>📅 Recent Plans</h3>
          {plans.length > 0 ? (
            <div className="plans-list">
              {plans.map((plan) => (
                <div key={plan.id} className="plan-item">
                  <div className="plan-title">{plan.title}</div>
                  <div className="plan-date">
                    {new Date(plan.scheduled_for).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              No plans yet. <a href="/planner">Add your first plan!</a>
            </p>
          )}
        </div>

        {/* Recommendations */}
        <div className="card recommendations-card">
          <h3>💡 Recommendations</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <p>Get started with your eco-friendly journey:</p>
        <div
          className="card-inline"
          style={{ gap: "12px", marginTop: "12px" }}
        >
          <a href="/nudges" className="btn primary">
            View Nudges
          </a>
          <a href="/planner" className="btn">
            Plan Actions
          </a>
          <a href="/rewards" className="btn">
            Earn Rewards
          </a>
        </div>
      </div>
    </div>
  );
}
