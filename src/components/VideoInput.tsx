"use client"
import { useState } from "react";
import { analyzeVideo } from "../lib/api";

export default function VideoInputForm({ onStart, onResult, onError }) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("full");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      return onError("Please enter a valid YouTube link.");
    }
    onStart();
    try {
      const res = await analyzeVideo(url, type);
      if (res.success) onResult(res);
      else onError(res.error);
    } catch (err) {
      onError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto z-10">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative p-8 bg-gray-900 border border-gray-800 rounded-3xl shadow-3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">YouTube URL</label>
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste video link here..."
              className="w-full bg-black/40 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-gray-600"
            />
          </div>
          <div className="md:col-span-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Analysis Depth</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="full">Comprehensive Full Analysis</option>
              <option value="summary_only">Quick Summary Only</option>
            </select>
          </div>
        </div>
        <button className="w-full mt-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.98]">
          Start AI Analysis
        </button>
      </div>
    </form>
  );
}