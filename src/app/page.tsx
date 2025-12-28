"use client"
import { useState } from "react";
import VideoInputForm from "../components/VideoInput";
import ResultCard from "../components/ResultCard";
import LoadingSpinner from "../components/Loadingsprinner";
import EmptyState from "../components/EmptyState"; 

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="relative min-h-screen py-20 px-4 overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
          Insight<span className="text-emerald-500">Tube.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          AI-driven intelligence for YouTube content. Extract 
          <span className="text-white"> insights</span>, <span className="text-white">topics</span>, and 
          <span className="text-white"> summaries</span> in seconds.
        </p>
      </div>

      <VideoInputForm 
        onStart={() => { setLoading(true); setError(""); setResult(null); }}
        onResult={(data) => { setLoading(false); setResult(data); }}
        onError={(msg) => { setLoading(false); setError(msg); }}
      />

      {loading && (
        <div className="mt-20 flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner />
          <p className="text-emerald-500 font-mono text-sm animate-pulse tracking-widest uppercase">Analyzing video through GPT-4o-mini...</p>
        </div>
      )}

      {error && (
        <div className="mt-12 max-w-2xl mx-auto p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-center font-medium">
          ⚠️ {error}
        </div>
      )}

      {!loading && !result && !error && <EmptyState/>}
      {result && <ResultCard data={result} />}
    </div>
  );
}

// PAHATA THIYENA EMPTYSTATE FUNCTION EKA ME FILE EKEN AIN KARANNA. 
// MOKADA OYA EKA IMPORT KARANNE '../components/EmptyState' WALIN.