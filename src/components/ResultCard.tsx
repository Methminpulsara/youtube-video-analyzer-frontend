"use client";
import { useState, useRef } from "react";
import TopicList from "./TopicList";
import InsightList from "./InsighList";
import { TopicChart } from "./charts/TopicChart"; 
import { InsightChart } from "./charts/InsightChart";
import { ConfidenceGauge } from "./charts/Charts"; 
import {WordFrequencyChart} from  '../components/charts/WordFrequencyChart'

// Props walata TypeScript interface eka
interface ResultCardProps {
  data: {
    metadata?: {
      video_id?: string;
      title?: string;
      author?: string;
    };
    summary?: string;
    topics?: any[];
    insights?: any[];
    transcript_chunks?: { text: string }[];
    key_moments?: { timestamp: string; description: string }[];
    processing_time?: number;
  };
}

export default function ResultCard({ data }: ResultCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  const transcript = data?.transcript_chunks?.map(c => c.text).join(" ") || "";
  const keyMoments = data?.key_moments || [];

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Action Buttons */}
      <div className="flex justify-end mb-6 print:hidden">
        <button 
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl border border-gray-700 transition-all shadow-xl"
        >
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Report (PDF)
        </button>
      </div>

      <div ref={printRef} className="print:p-8 print:bg-white print:text-black">
        
        {/* 1. Modern Header */}
        <div className="mb-8 p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/10 transition-all"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {data?.metadata?.video_id && (
              <div className="relative flex-shrink-0">
                <img
                  src={`https://img.youtube.com/vi/${data.metadata.video_id}/maxresdefault.jpg`}
                  alt="Thumbnail"
                  className="w-full md:w-72 h-auto rounded-2xl shadow-2xl border border-gray-700/50 object-cover transform hover:scale-[1.02] transition-transform"
                  onError={(e: any) => { e.target.src = `https://img.youtube.com/vi/${data?.metadata?.video_id}/mqdefault.jpg` }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-950/60 to-transparent"></div>
              </div>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-tight print:text-black">
                  {data?.metadata?.title || "Video Analysis Report"}
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                  <p className="text-emerald-400 font-bold flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {data?.metadata?.author || "Content Creator"}
                  </p>
                  <span className="text-gray-500 font-mono">ID: {data?.metadata?.video_id}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-gray-800/50 pt-6">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Processing</p>
                  <p className="text-lg font-mono text-gray-300">{(data?.processing_time || 0).toFixed(2)}s</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Model</p>
                  <p className="text-lg font-mono text-gray-300">GPT-4o-mini</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Key Moments Section */}
        {keyMoments.length > 0 && (
          <div className="mb-8 p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl">
            <h3 className="text-white font-bold flex items-center gap-2 mb-6 text-lg tracking-wide uppercase">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Key Moments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyMoments.map((moment, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-black/30 border border-gray-800 rounded-2xl hover:border-emerald-500/30 transition-all">
                  <span className="text-emerald-500 font-mono font-bold text-sm bg-emerald-500/10 px-2 py-1 rounded h-fit">
                    {moment.timestamp}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed">{moment.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. AI Summary Section */}
        <div className="mb-8 p-8 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <h3 className="text-emerald-400 font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-widest">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Executive Summary
          </h3>
          <p className="text-gray-200 leading-relaxed text-xl italic font-light print:text-black">
            {data?.summary}
          </p>
        </div>

        {/* 4. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Topics & Insights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl">
              <TopicList topics={data?.topics} />
              <div className="my-8 border-t border-gray-800/50"></div>
              <InsightList insights={data?.insights} />
            </div>

            {/* Aluth Section: Word Frequency Analytics */}
            <WordFrequencyChart transcript={transcript} />

            {/* Transcript Preview */}
            <div className="p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl print:hidden">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Transcript Preview</h4>
              <div className={`relative transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[5000px]' : 'max-h-48'}`}>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap font-mono italic">
                  {transcript}
                </p>
                {!expanded && <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-gray-950 to-transparent"></div>}
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 text-emerald-400 text-sm font-bold hover:text-emerald-300 transition-colors flex items-center gap-2"
              >
                {expanded ? "Collapse Content ↑" : "Read Full Transcript ↓"}
              </button>
            </div>
          </div>

          {/* Right Column - Analytics Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-gradient-to-b from-gray-800/50 to-gray-950 border border-gray-700/50 rounded-3xl sticky top-8 print:static">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2 print:text-black">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Visual Analytics
              </h4>
              <div className="space-y-10">
                {/* 1. Aluth Confidence Gauge */}
                <ConfidenceGauge topics={data?.topics} insights={data?.insights} transcript={transcript} />
                
                <div className="border-t border-gray-800/50"></div>
                
                <TopicChart topics={data?.topics} />
                <div className="border-t border-gray-800/50"></div>
                <InsightChart insights={data?.insights} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}