import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ChartCard({ title, data, xKey = "label", yKey = "value" }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer minWidth={300} minHeight={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey={yKey} strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
