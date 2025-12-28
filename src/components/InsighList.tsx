export default function InsightList({ insights }) {
  if (!insights || insights.length === 0) return null;

  const getTypeStyle = (type) => {
    const t = type?.toLowerCase();
    if (t?.includes('positive')) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (t?.includes('negative')) return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    if (t?.includes('technical') || t?.includes('design')) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-800/50">
      <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Key Insights</h4>
      <div className="grid gap-3">
        {insights.map((ins, i) => (
          <div key={i} className="p-4 bg-gray-900/40 border border-gray-800 rounded-2xl hover:bg-gray-800/40 transition-all">
            <p className="text-sm text-gray-300 italic">"{ins.content}"</p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getTypeStyle(ins.type)}`}>
                {ins.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}