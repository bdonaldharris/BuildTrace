"use client";

import { useState, useRef, useEffect } from "react";
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
  onUpdateChunk: (chunk: SourceChunk) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function BuildInput({
  chunks,
  onAddChunk,
  onRemoveChunk,
  onUpdateChunk,
  onGenerate,
  isLoading,
}: BuildInputProps) {
  const [type, setType] = useState<SourceChunkType>("ai_chat");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingChunk, setEditingChunk] = useState<SourceChunk | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const canAdd = content.trim().length > 0;
  const meta = getChunkMeta(type);
  const formVisible = chunks.length === 0 || showAddForm;

  function handleAdd() {
    if (!canAdd) return;
    onAddChunk({
      id: `chunk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      title: title.trim() || meta.label,
      content: content.trim(),
    });
    setTitle("");
    setContent("");
    setShowAddForm(false);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setContent(ev.target?.result as string);
      setTitle(file.name.replace(/\.[^.]+$/, ""));
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="space-y-4">
      {/* When no chunks: show explanation + full form */}
      {chunks.length === 0 && (
        <p className="text-sm text-muted-foreground">
          A source is any piece of evidence from your build — an AI prompt, terminal output,
          error, decision, commit note, or reflection. Add as many as you have.
        </p>
      )}

      {/* Generate action — top priority when chunks exist */}
      {chunks.length > 0 && (
        <div className="rounded-lg border border-violet-500/25 bg-violet-500/5 px-5 py-4">
          <p className="text-xs text-muted-foreground mb-3">
            {isLoading
              ? "Running your sources through the AI analysis..."
              : `${chunks.length} source${chunks.length !== 1 ? "s" : ""} ready — generate a structured build recap.`}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              onClick={onGenerate}
              disabled={isLoading}
              size="lg"
              className="bg-violet-600 hover:bg-violet-500 text-white border-0 disabled:opacity-50 px-6"
            >
              {isLoading
                ? "Generating your build recap..."
                : `Generate Recap from ${chunks.length} Source${chunks.length !== 1 ? "s" : ""} →`}
            </Button>
            <span className="text-xs text-muted-foreground/60 italic">No API key required</span>
          </div>
        </div>
      )}

      {/* Build Sources grid */}
      {chunks.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-3">
            Build Sources
            <span className="ml-1.5 text-muted-foreground/50">— click any tile to edit</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {chunks.map((chunk) => {
              const chunkMeta = getChunkMeta(chunk.type);
              return (
                <button
                  key={chunk.id}
                  onClick={() => setEditingChunk(chunk)}
                  className="group text-left rounded-xl border border-border bg-card/60 p-3 hover:border-violet-500/30 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start justify-between gap-1.5 mb-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${chunkMeta.badgeClass}`}
                    >
                      {chunkMeta.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors mt-0.5 shrink-0">
                      Edit ↗
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1 line-clamp-1">
                    {chunk.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono line-clamp-2 leading-relaxed">
                    {chunk.content}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add source — collapsible toggle when chunks exist */}
      {chunks.length > 0 && (
        <div>
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className={`w-3 h-3 transition-transform ${formVisible ? "rotate-45" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {formVisible ? "Hide form" : "Add another source"}
          </button>
        </div>
      )}

      {/* Add source form — always visible when no chunks, collapsible when chunks exist */}
      {formVisible && (
        <div className="space-y-3">
          {/* Type selector */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Source type</p>
            <div className="flex flex-wrap gap-1.5">
              {CHUNK_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                    type === t.value
                      ? t.badgeClass
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dotClass}`} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title + content */}
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
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste or type your content here — AI responses, terminal output, errors, decisions, anything..."
              className="min-h-28 font-mono text-sm resize-y leading-relaxed"
            />
            <div className="flex items-center justify-end">
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-1 rounded border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
                Upload .txt/.md
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

          {/* Add chunk */}
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
            Add source
          </Button>
        </div>
      )}

      {/* Edit modal */}
      {editingChunk && (
        <EditChunkModal
          key={editingChunk.id}
          chunk={editingChunk}
          onSave={(updated) => {
            onUpdateChunk(updated);
            setEditingChunk(null);
          }}
          onDelete={(id) => {
            onRemoveChunk(id);
            setEditingChunk(null);
          }}
          onClose={() => setEditingChunk(null)}
        />
      )}
    </div>
  );
}

function EditChunkModal({
  chunk,
  onSave,
  onDelete,
  onClose,
}: {
  chunk: SourceChunk;
  onSave: (chunk: SourceChunk) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const [type, setType] = useState<SourceChunkType>(chunk.type);
  const [title, setTitle] = useState(chunk.title);
  const [content, setContent] = useState(chunk.content);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSave() {
    onSave({ ...chunk, type, title: title.trim() || type, content: content.trim() });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit source"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground">Edit Source</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground/50 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="px-5 py-5 space-y-4">
          {/* Type selector */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Source type</p>
            <div className="flex flex-wrap gap-1.5">
              {CHUNK_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                    type === t.value
                      ? t.badgeClass
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dotClass}`} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Content</p>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-36 font-mono text-sm resize-y leading-relaxed"
            />
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
          {/* Delete */}
          <div>
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Delete this source?</span>
                <button
                  onClick={() => onDelete(chunk.id)}
                  className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-xs text-muted-foreground/40 hover:text-red-400 transition-colors"
              >
                Delete source
              </button>
            )}
          </div>

          {/* Save / Cancel */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!content.trim()}
              className="bg-violet-600 hover:bg-violet-500 text-white border-0 disabled:opacity-50"
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
