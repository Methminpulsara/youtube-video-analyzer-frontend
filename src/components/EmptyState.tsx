export default function EmptyState() {
  return (
    <div className="mt-16 text-center animate-in fade-in zoom-in duration-700">
      <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
        <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">Ready to Analyze?</h3>
      <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
        Paste a YouTube URL above to extract deep insights, structured topics, and an AI-powered summary instantly.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto opacity-50">
        {['AI Summary', 'Key Topics', 'Insights', 'Timestamps'].map((feature) => (
          <div key={feature} className="px-4 py-2 rounded-xl border border-gray-800 text-xs font-mono text-gray-500">
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}