"use client";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, RadialBarChart, RadialBar 
} from "recharts";

// TypeScript Interfaces
interface Topic { name: string; count: number; }
interface Insight { type: string; content: string; }

// 1. Confidence Gauge (Dark Theme)
export function ConfidenceGauge({ topics, insights, transcript }: { topics: any[], insights: any[], transcript: string }) {
  const tCount = (topics || []).length;
  const iCount = (insights || []).length;
  const len = (transcript || "").split(/\s+/).filter(Boolean).length;
  
  let score = 0.4 + Math.min(0.2, tCount * 0.08) + Math.min(0.15, iCount * 0.05) + Math.min(0.25, Math.log10(Math.max(len, 1)) / 5);
  const value = Math.round(Math.max(0, Math.min(0.98, score)) * 100);
  
  const data = [{ name: "confidence", value, fill: "#10b981" }];

  return (
    <div className="p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl">
      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">AI Confidence Score</h5>
      <div style={{ width: "100%", height: 160 }}>
        <ResponsiveContainer>
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={180} endAngle={0}>
            <RadialBar background={{ fill: '#1f2937' }} dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center -mt-8">
        <div className="text-3xl font-black text-emerald-400">{value}%</div>
        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Accuracy Level</div>
      </div>
    </div>
  );
}

// 2. Insight Chart (Dark Theme)
const INSIGHT_COLORS = ["#10b981", "#06b6d4", "#f59e0b", "#ef4444", "#8b5cf6"];

export function InsightChart({ insights }: { insights: Insight[] }) {
  const counts: Record<string, number> = {};
  (insights || []).forEach((ins) => {
    const t = (ins.type || "general").toLowerCase();
    counts[t] = (counts[t] || 0) + 1;
  });

  const data = Object.entries(counts).map(([name, value]) => ({ 
    name: name.charAt(0).toUpperCase() + name.slice(1), value 
  }));

  return (
    <div className="p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl">
      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Insights Analysis</h5>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
              {data.map((_, i) => <Cell key={i} fill={INSIGHT_COLORS[i % INSIGHT_COLORS.length]} stroke="none" />)}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#10b981' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 3. Topic Chart (Dark Theme)
export function TopicChart({ topics }: { topics: any[] }) {
  const final = (topics || []).map(t => ({ name: t.name.substring(0, 12), count: 1 }));
  
  return (
    <div className="p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl">
      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Topic Density</h5>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={final}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px', fill: '#9ca3af' }} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
              contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }} 
            />
            <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}