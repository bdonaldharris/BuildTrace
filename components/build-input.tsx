"use client";

import { useState, useRef } from "react";
import { SourceChunk, SourceChunkType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CHUNK_TYPES: {
  value: SourceChunkType;
  label: string;
  dotClass: string;
  badgeClass: string;
}[] = [
  {
    value: "ai_chat",
    label: "AI Chat",
    dotClass: "bg-violet-400",
    badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  },
  {
    value: "terminal",
    label: "Terminal",
    dotClass: "bg-emerald-400",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  },
  {
    value: "error",
    label: "Error",
    dotClass: "bg-red-400",
    badgeClass: "bg-red-500/15 text-red-300 border-red-500/25",
  },
  {
    value: "decision",
    label: "Decision",
    dotClass: "bg-blue-400",
    badgeClass: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  },
  {
    value: "commit",
    label: "Commit",
    dotClass: "bg-slate-400",
    badgeClass: "bg-slate-500/15 text-slate-300 border-slate-500/25",
  },
  {
    value: "note",
    label: "Note",
    dotClass: "bg-amber-400",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  },
  {
    value: "demo",
    label: "Demo",
    dotClass: "bg-pink-400",
    badgeClass: "bg-pink-500/15 text-pink-300 border-pink-500/25",
  },
];

function getChunkMeta(type: SourceChunkType) {
  return CHUNK_TYPES.find((t) => t.value === type) ?? CHUNK_TYPES[0];
}

interface BuildInputProps {
  chunks: SourceChunk[];
  onAddChunk: (chunk: SourceChunk) => void;
  onRemoveChunk: (id: string) => void;
  onLoadSample: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function BuildInput({
  chunks,
  onAddChunk,
  onRemoveChunk,
  onLoadSample,
  onGenerate,
  isLoading,
}: BuildInputProps) {
  const [type, setType] = useState<SourceChunkType>("ai_chat");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const canAdd = content.trim().length > 0;
  const canGenerate = chunks.length > 0 && !isLoading;

  function handleAdd() {
    if (!canAdd) return;
    onAddChunk({
      id: `chunk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      title: title.trim() || getChunkMeta(type).label,
      content: content.trim(),
    });
    setTitle("");
    setContent("");
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setContent(text);
      setTitle(file.name.replace(/\.[^.]+$/, ""));
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  const meta = getChunkMeta(type);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-mono text-violet-400/60 uppercase tracking-widest mb-1">
          {"// 01. capture"}
        </p>
        <h2 className="text-lg font-semibold text-foreground">Add your build sources</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Add chunks from your session — AI chats, terminal output, errors, decisions,
          commits, notes. Or{" "}
          <button
            onClick={onLoadSample}
            disabled={isLoading}
            className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors disabled:opacity-50"
          >
            load the sample session
          </button>{" "}
          to see it in action.
        </p>
      </div>

      {/* Type selector */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Source type</p>
        <div className="flex flex-wrap gap-1.5">
          {CHUNK_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                type === t.value
                  ? t.badgeClass
                  : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dotClass}`} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          placeholder={`Title — e.g. "${meta.label} · ${
            type === "ai_chat"
              ? "Choosing the stack"
              : type === "error"
              ? "CSS variable conflict"
              : type === "commit"
              ? "feat: initial scaffold"
              : type === "terminal"
              ? "npm run build output"
              : type === "decision"
              ? "App Router vs Pages Router"
              : type === "demo"
              ? "Live walkthrough notes"
              : "Session notes"
          }"`}
          className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors"
        />

        {/* Content + upload */}
        <div className="relative">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste or type your content here — AI responses, terminal output, error messages, decisions, anything..."
            className="min-h-32 font-mono text-sm resize-y leading-relaxed"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1 rounded border border-border bg-muted/40 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              title="Upload .txt or .md file"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.md"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        </div>
      </div>

      {/* Add action */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleAdd}
          disabled={!canAdd}
          variant="secondary"
          size="sm"
          className="gap-1.5"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add chunk
        </Button>
        {chunks.length === 0 && (
          <span className="text-xs text-muted-foreground/50 italic">
            No API key required — sample session uses mock data
          </span>
        )}
      </div>

      {/* Chunks list */}
      {chunks.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-mono text-muted-foreground/50">
            {chunks.length} chunk{chunks.length !== 1 ? "s" : ""} captured
          </p>

          <div className="space-y-2">
            {chunks.map((chunk) => {
              const chunkMeta = getChunkMeta(chunk.type);
              return (
                <div
                  key={chunk.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card/60 px-3 py-2.5 group"
                >
                  <span
                    className={`mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${chunkMeta.badgeClass}`}
                  >
                    {chunkMeta.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {chunk.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 line-clamp-1 opacity-70">
                      {chunk.content}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveChunk(chunk.id)}
                    className="mt-0.5 text-muted-foreground/30 hover:text-muted-foreground transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                    title="Remove chunk"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Generate */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-border">
            <Button
              onClick={onGenerate}
              disabled={!canGenerate}
              size="lg"
              className="px-8 shrink-0 bg-violet-600 hover:bg-violet-500 text-white border-0 disabled:opacity-40"
            >
              {isLoading ? "Generating recap..." : "Generate Recap →"}
            </Button>
            <span className="text-xs text-muted-foreground/50 italic">
              No API key required
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
