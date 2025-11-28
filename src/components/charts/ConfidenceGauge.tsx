"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadialBarChart, RadialBar, Legend } from "recharts";

// ConfidenceGauge Component - Modern Dark Theme
function computeConfidence(topics, insights, transcript) {
  const tCount = (topics || []).length;
  const iCount = (insights || []).length;
  const len = (transcript || "").split(/\s+/).filter(Boolean).length;
  let score = 0.4 + Math.min(0.2, tCount * 0.08) + Math.min(0.15, iCount * 0.05) + Math.min(0.25, Math.log10(Math.max(len,1))/5);
  score = Math.max(0, Math.min(0.98, score));
  return Math.round(score * 100);
}

export function ConfidenceGauge({ topics, insights, transcript }) {
  const value = computeConfidence(topics || [], insights || [], transcript || "");
  const data = [{ name: "confidence", value, fill: "#10b981" }];

  return (
    <div className="mt-4 p-4 bg-gray-800  rounded-xl border border-gray-700">
      <h5 className="text-sm font-semibold text-gray-300 mb-3">AI Confidence Score</h5>
      <div style={{ width: "100%", height: 180 }}>
        <ResponsiveContainer>
          <RadialBarChart 
            innerRadius="60%" 
            outerRadius="90%" 
            data={data} 
            startAngle={180} 
            endAngle={0}
          >
            <RadialBar 
              minAngle={15} 
              background={{ fill: '#374151' }}
              clockWise 
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-2">
        <div className="text-3xl font-bold text-emerald-400">{value}%</div>
        <div className="text-xs text-gray-500 mt-1">Confidence Level</div>
      </div>
    </div>
  );
}