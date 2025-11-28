"use client";

import { useState } from "react";
import { analyzeVideo } from "../lib/api";

export default function VideoInputForm({ onStart, onResult, onError }) {
  const [url, setUrl] = useState("");
  const [analysisType, setAnalysisType] = useState("full");

  // -----------------------------------------
  // Submit handler
  // -----------------------------------------
  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!url) {
      onError("Please enter a YouTube URL");
      return;
    }

    try {
      onStart();

      // Call the fixed API function
      const res = await analyzeVideo(url, analysisType as
        "full" | "summary_only" | "topics_only" | "insights_only");

      if (!res || !res.success) {
        onError(res?.error || "Analysis failed");
        return;
      }

      onResult(res);
    } catch (err: any) {
      onError(err?.message || "Network or server error");
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">YouTube URL</label>
          <input
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">Analysis Type</label>
          <select 
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
          >
            <option value="full">Full</option>
            <option value="summary_only">Summary Only</option>
            <option value="topics_only">Topics Only</option>
            <option value="insights_only">Insights Only</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={submit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Analyze Video
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Backend: {process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api/v1"}
        </div>
      </div>
    </div>
  );
}
