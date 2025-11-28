"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const INSIGHT_COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export function InsightChart({ insights }) {
  const counts = {};
  (insights || []).forEach((ins) => {
    const t = (ins.type || "general").toLowerCase();
    counts[t] = (counts[t] || 0) + 1;
  });

  const data = Object.entries(counts).map(([key, value]) => ({ 
    name: key.charAt(0).toUpperCase() + key.slice(1), 
    value 
  }));
  
  if (data.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <div className="text-sm text-gray-500 text-center py-8">No insight data available</div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
      <h5 className="text-sm font-semibold text-gray-300 mb-3">Insights Distribution</h5>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie 
              dataKey="value" 
              data={data} 
              cx="50%" 
              cy="50%" 
              outerRadius={80}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={INSIGHT_COLORS[idx % INSIGHT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#e5e7eb'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}