"use client"
import LoadingSpinner from "../components/Loadingsprinner";
import { useState } from "react";
import VideoInputForm from "../components/VideoInput";
import ResultCard from "../components/ResultCard";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Video Analyzer Pro
          </h1>
          <p className="text-gray-400 text-lg">
            Crafting digital experiences with <span className="text-emerald-400">motion</span> and <span className="text-teal-400">code</span>
          </p>
        </div>

        <VideoInputForm
          onStart={() => { setLoading(true); setError(""); setResult(null); }}
          onResult={(data) => { setLoading(false); setResult(data); }}
          onError={(msg) => { setLoading(false); setError(msg); }}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-900 border border-red-700 rounded-xl text-red-300 text-center">
            {error}
          </div>
        )}

        {loading && <LoadingSpinner />}
        {result && <ResultCard data={result} />}
      </div>
    </div>
  );
}
