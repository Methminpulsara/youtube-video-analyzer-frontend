"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export function TimelineChart({ transcript }) {
  const text = transcript || "";
  const buckets = 10;
  const words = text.split(/\s+/).filter(Boolean);
  const len = words.length || 1;
  const per = Math.ceil(len / buckets);
  const data = [];
  
  for (let i = 0; i < buckets; i++) {
    const start = i * per;
    const slice = words.slice(start, start + per);
    data.push({ 
      bucket: `${i * 10}-${(i + 1) * 10}%`, 
      count: slice.length 
    });
  }

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
      <h5 className="text-sm font-semibold text-gray-300 mb-3">Transcript Timeline</h5>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="bucket" 
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
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#14b8a6" 
              strokeWidth={3}
              dot={{ fill: '#14b8a6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
