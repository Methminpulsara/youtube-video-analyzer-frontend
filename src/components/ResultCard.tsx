import { useState } from "react";
import { ConfidenceGauge } from "./charts/ConfidenceGauge";
import { InsightChart } from "./charts/InsightChart";
import { TimelineChart } from "./charts/TimelineChart";
import { TopicChart } from "./charts/TopicChart";
import { WordFrequencyChart } from "./charts/WordFrequencyChart";

import InsightList from "./InsighList";
import TopicList from "./TopicList";

interface TranscriptChunk {
  index: number;
  text: string;
}

interface ResultCardProps {
  data: any;
}

export default function ResultCard({ data }: ResultCardProps) {
  const [expanded, setExpanded] = useState(false);

  // ----- Safe data extraction -----
  const chunks: TranscriptChunk[] = Array.isArray(data?.transcript_chunks)
    ? data.transcript_chunks
    : [];

  const transcriptFromChunks = chunks.length
    ? chunks
        .sort((a, b) => a.index - b.index)
        .map((c) => c.text)
        .join(" ")
    : "";

  const transcript: string =
    transcriptFromChunks ||
    (typeof data?.transcript === "string" ? data.transcript : "");

  const topics = Array.isArray(data?.topics) ? data.topics : [];
  const insights = Array.isArray(data?.insights) ? data.insights : [];

  const truncatedTranscript =
    transcript.length > 500 ? transcript.slice(0, 500) + "..." : transcript;

  const displayTranscript = expanded ? transcript : truncatedTranscript;

  return (
    <div className="mt-8 space-y-6">
      {/* Header Card */}
      <div className="p-6 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 rounded-2xl shadow-2xl border border-gray-700/70 backdrop-blur-xl">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              {data?.metadata?.title || "Video Analysis"}
            </h2>
            <div className="text-sm text-gray-400">
              {data?.metadata?.author || "Unknown"} •{" "}
              {data?.metadata?.video_id || ""}
            </div>
          </div>

          <div className="px-4 py-2 bg-emerald-900/70 border border-emerald-700/70 rounded-lg text-emerald-300 text-sm font-medium shadow-lg backdrop-blur-md">
            Processing: {(data?.processing_time || 0).toFixed(2)}s
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-emerald-500 rounded"></span>
            Summary
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {typeof data?.summary === "string" && data.summary.length
              ? data.summary
              : "No summary"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 rounded-2xl shadow-2xl border border-gray-700/70 backdrop-blur-xl">
            <h4 className="font-semibold text-gray-200 text-lg mb-4">
              Topics & Insights
            </h4>

            <TopicList topics={topics} />
            <InsightList insights={insights} />
          </div>

          <div className="p-6 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 rounded-2xl shadow-2xl border border-gray-700/70 backdrop-blur-xl">
            <h4 className="font-semibold text-gray-200 text-lg mb-4">
              Transcript
            </h4>

            <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-700/70 max-h-80 overflow-auto backdrop-blur-lg">
              <pre className="text-sm font-sans text-gray-400 whitespace-pre-wrap break-words leading-relaxed">
                {displayTranscript || "No transcript available."}
              </pre>
            </div>

            {transcript.length > 500 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 px-4 py-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                {expanded ? "← Show Less" : "Show More →"}
              </button>
            )}
          </div>
        </div>

        {/* Right Column (Charts) */}
        <div className="space-y-4">
          <div className="font-semibold text-gray-200 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 p-4 rounded-2xl shadow-xl border border-gray-700/70 backdrop-blur-xl">
            <h4 className="font-semibold mb-2">Analytics Dashboard</h4>
            <TopicChart topics={topics} />
            <InsightChart insights={insights} />
            <ConfidenceGauge
              topics={topics}
              insights={insights}
              transcript={transcript}
            />
          </div>
          </div>
        </div>
        </div>
  )};