"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export function TopicChart({ topics }) {
  const data = (topics || []).map((t) => ({ name: t.name, count: 1 }));
  const merged = {};
  data.forEach(d => merged[d.name] = (merged[d.name] || 0) + d.count);
  const final = Object.entries(merged).map(([name, count]) => ({ name, count }));

  if (final.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <div className="text-sm text-gray-500 text-center py-8">No topic data available</div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
      <h5 className="text-sm font-semibold text-gray-300 mb-3">Topic Analysis</h5>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={final} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#e5e7eb'
              }}
              cursor={{ fill: 'rgba(55, 65, 81, 0.3)' }}
            />
            <Bar 
              dataKey="count" 
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
