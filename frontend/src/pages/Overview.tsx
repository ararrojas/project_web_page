import { useEffect, useState } from "react";
import { getStats } from "../api";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Legend } from "recharts";
import "./Overview.css";

export default function Overview() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized");
      return;
    }

    getStats(token)
      .then(setStats)
      .catch((e) => setError(String(e?.message ?? e)));
  }, []);

  if (!stats) return <div>Loading...</div>;
  const COLORS = ["#6E6E68", "#ED615F"];
  const pieData = (stats.charts.inventory_pie ?? []).map((d: any, i: number) => ({ label: d.label, stock: d.stock, fill: COLORS[i] }));
  const totalSold = stats?.summary?.total_sold ?? 0;
  const avgGain = stats?.summary?.avg_gain ?? 0;
  return (
      <div className="chart-container" style={{ height: 320 }}>
        <div className="stats-row">
          <div className="stat-box stat-box-left">
            <div className="stat-label">Total products sold</div>
            <div className="stat-value">{totalSold}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Average gain per product</div>
            <div className="stat-value">{avgGain}</div>
          </div>
          </div>
  
          <h3 className="chart-title">Inventory (Best Sellers vs Regular)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="stock"
                nameKey="label"
                outerRadius={100}
                label
              >
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
}