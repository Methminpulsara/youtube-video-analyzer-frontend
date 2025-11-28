export default function TopicList({ topics }) {
  if (!topics || topics.length === 0) {
    return <div className="text-sm text-gray-500 mt-3 italic">No topics found.</div>;
  }
  
  return (
    <div className="mt-4 space-y-3">
      {topics.map((t, i) => (
        <div key={i} className="p-4 bg-gray-800 border border-gray-700 rounded-xl hover:border-emerald-500 transition-all">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
            <div className="flex-1">
              <div className="font-semibold text-gray-200">{t.name}</div>
              <div className="text-sm text-gray-400 mt-1">{t.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
