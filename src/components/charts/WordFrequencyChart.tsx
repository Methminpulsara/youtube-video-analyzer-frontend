"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter(w => w.length > 2 && !["the","and","for","with","that","this","you","are","was"].includes(w));
}

export function WordFrequencyChart({ transcript }) {
  const tokens = tokenize(transcript || "");
  const freq = {};
  tokens.forEach(t => freq[t] = (freq[t] || 0) + 1);
  const arr = Object.entries(freq).map(([k, v]) => ({ word: k, count: v }));
  arr.sort((a,b) => b.count - a.count);
  const top = arr.slice(0, 10);
  
  if (top.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <div className="text-sm text-gray-500 text-center py-8">No words to analyze</div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
      <h5 className="text-sm font-semibold text-gray-300 mb-3">Top 10 Words</h5>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <BarChart 
            data={top} 
            layout="vertical"
            margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              dataKey="word" 
              type="category" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              width={50}
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
              fill="#06b6d4"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
