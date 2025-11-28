import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api/v1";

export async function analyzeVideo(
  youtubeUrl: string,
  analysisType: "full" | "summary_only" | "topics_only" | "insights_only" = "full"
) {
  const url = `${API_BASE}/analyze`;

  const resp = await axios.post(
    url,
    {
      youtube_url: youtubeUrl,      // FIXED
      analysis_type: analysisType,  // FIXED
    },
    {
      timeout: 120000,
    }
  );

  return resp.data;
}
