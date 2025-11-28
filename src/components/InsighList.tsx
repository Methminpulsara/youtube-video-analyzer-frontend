export default  function InsightList({ insights }) {
  if (!insights || insights.length === 0) {
    return <div className="text-sm text-gray-500 mt-3 italic">No insights found.</div>;
  }
  
  const typeColors = {
    Design: "bg-purple-900 text-purple-300 border-purple-700",
    Technical: "bg-blue-900 text-blue-300 border-blue-700",
    Business: "bg-orange-900 text-orange-300 border-orange-700"
  };
  
  return (
    <div className="mt-4 space-y-3">
      {insights.map((ins, i) => (
        <div key={i} className="p-4 bg-gray-800 border border-gray-700 rounded-xl hover:border-teal-500 transition-all">
          <div className="text-sm text-gray-300">{ins.content}</div>
          <div className="mt-2">
            <span className={`text-xs px-3 py-1 rounded-full border ${typeColors[ins.type] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
              Type: {ins.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}