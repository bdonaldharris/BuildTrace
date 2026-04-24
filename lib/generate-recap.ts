import { BuildRecap, SourceChunk, SourceChunkType } from "./types";
import { mockRecap } from "./mock-recap";

const CHUNK_TYPE_LABELS: Record<SourceChunkType, string> = {
  ai_chat: "AI Chat / Prompt",
  terminal: "Terminal Output",
  error: "Error / Blocker",
  decision: "Decision",
  commit: "Commit",
  note: "Note",
  demo: "Demo",
};

export function chunksToNotes(chunks: SourceChunk[]): string {
  return chunks
    .map((chunk) => `[${CHUNK_TYPE_LABELS[chunk.type]}] ${chunk.title}\n${chunk.content}`)
    .join("\n\n---\n\n");
}

export async function generateRecap(rawNotes: string): Promise<BuildRecap> {
  try {
    const res = await fetch("/api/generate-recap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: rawNotes }),
    });

    if (!res.ok) return mockRecap;

    const data = await res.json();
    return data.recap ?? mockRecap;
  } catch {
    return mockRecap;
  }
}
