export default function TopicList({ topics }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Key Topics</h4>
      <div className="grid gap-3">
        {topics.map((t, i) => (
          <div key={i} className="group p-4 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold border border-emerald-500/20">
                {i + 1}
              </div>
              <div>
                <div className="font-bold text-gray-100 group-hover:text-emerald-400 transition-colors">{t.name}</div>
                <div className="text-sm text-gray-400 mt-1 leading-relaxed">{t.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}