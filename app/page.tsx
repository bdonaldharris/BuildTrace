"use client";

import { useState } from "react";
import Image from "next/image";
import { BuildRecap, SourceChunk } from "@/lib/types";
import { sampleChunks } from "@/lib/sample-chunks";
import { generateRecap, chunksToNotes } from "@/lib/generate-recap";
import BuildInput from "@/components/build-input";
import TimelineView from "@/components/timeline-view";
import InsightPanel from "@/components/insight-panel";
import PublishOutputTabs from "@/components/publish-output-tabs";
import { Button } from "@/components/ui/button";

type WorkspaceTab = "capture" | "recap" | "publish";

const TABS: { id: WorkspaceTab; label: string }[] = [
  { id: "capture", label: "Capture Sources" },
  { id: "recap", label: "Build Recap" },
  { id: "publish", label: "Publish Your Build" },
];

const CHUNK_TYPE_LABELS: Record<string, string> = {
  ai_chat: "AI Chat",
  terminal: "Terminal",
  error: "Error",
  decision: "Decision",
  commit: "Commit",
  note: "Note",
  demo: "Demo",
};

function chunkTypeSummary(chunks: SourceChunk[]): string {
  const counts: Record<string, number> = {};
  for (const c of chunks) counts[c.type] = (counts[c.type] ?? 0) + 1;
  return Object.entries(counts)
    .map(([t, n]) => `${n} ${CHUNK_TYPE_LABELS[t] ?? t}`)
    .join(" · ");
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("capture");
  const [chunks, setChunks] = useState<SourceChunk[]>([]);
  const [recap, setRecap] = useState<BuildRecap | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadSample = () => {
    setChunks(sampleChunks);
    setRecap(null);
  };

  const handleAddChunk = (chunk: SourceChunk) => {
    setChunks((prev) => [...prev, chunk]);
    setRecap(null);
  };

  const handleUpdateChunk = (updated: SourceChunk) => {
    setChunks((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setRecap(null);
  };

  const handleRemoveChunk = (id: string) => {
    setChunks((prev) => prev.filter((c) => c.id !== id));
    setRecap(null);
  };

  const handleClearSession = () => {
    setChunks([]);
    setRecap(null);
  };

  const handleGenerate = async () => {
    if (chunks.length === 0) return;
    setIsLoading(true);
    try {
      const notes = chunksToNotes(chunks);
      const result = await generateRecap(notes);
      setRecap(result);
      setActiveTab("recap");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="BuildTrace"
                width={160}
                height={107}
                className="shrink-0"
              />
              <span className="inline-flex items-center rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-400 border border-violet-500/20">
                Beta
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20">
                Blackathon · Coding with AI Track
              </span>
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                No setup required
              </span>
            </div>
          </div>

          <div className="mt-4 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
              Turn messy build sessions into{" "}
              <span className="text-violet-400">proof of progress.</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              BuildTrace helps builders transform rough notes, AI conversations, decisions,
              blockers, and next steps into a clean project timeline, insight recap, and
              publish-ready content.
            </p>
          </div>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 items-start">
          {/* Workspace shell */}
          <div className="rounded-xl border border-border bg-card/30 overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-stretch border-b border-border bg-background/40 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 whitespace-nowrap px-5 py-3.5 text-sm font-medium transition-colors focus-visible:outline-none ${
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {tab.label}

                  {tab.id === "capture" && chunks.length > 0 && (
                    <span className="inline-flex items-center rounded-full bg-violet-500/15 px-1.5 text-[11px] font-medium text-violet-400 leading-5">
                      {chunks.length}
                    </span>
                  )}

                  {(tab.id === "recap" || tab.id === "publish") && recap && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 text-[11px] text-emerald-400 leading-5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                      Ready
                    </span>
                  )}

                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab panels */}
            <div className="p-6 sm:p-8">
              {/* ── TAB: Capture Sources ──────────────────── */}
              {activeTab === "capture" && (
                <div className="space-y-6">
                  {chunks.length === 0 && !isLoading && (
                    <div className="rounded-xl border border-violet-500/25 bg-violet-500/5 p-5">
                      <p className="text-xs font-mono text-violet-400/80 mb-2">
                        {"// start here"}
                      </p>
                      <p className="text-base font-semibold text-foreground mb-1">
                        Ready to trace a build?
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Load the sample session for the fastest demo — no API key required.
                        It tells the story of building BuildTrace itself.
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Button
                          onClick={handleLoadSample}
                          size="lg"
                          className="bg-violet-600 hover:bg-violet-500 text-white border-0 px-6"
                        >
                          Load Sample Session
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          or add your own sources below ↓
                        </span>
                      </div>
                    </div>
                  )}

                  {chunks.length > 0 && (
                    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background/40 px-4 py-3 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">
                          {chunks.length} source{chunks.length !== 1 ? "s" : ""} captured
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {chunkTypeSummary(chunks)}
                        </span>
                      </div>
                      <button
                        onClick={handleClearSession}
                        className="text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors shrink-0"
                      >
                        Clear session
                      </button>
                    </div>
                  )}

                  <BuildInput
                    chunks={chunks}
                    onAddChunk={handleAddChunk}
                    onUpdateChunk={handleUpdateChunk}
                    onRemoveChunk={handleRemoveChunk}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {/* ── TAB: Build Recap ──────────────────────── */}
              {activeTab === "recap" && (
                <>
                  {!recap ? (
                    <EmptyState
                      message="No recap yet. Capture sources first, then generate your build recap."
                      ctaLabel="Go to Capture Sources"
                      onCta={() => setActiveTab("capture")}
                    />
                  ) : (
                    <div className="space-y-8">
                      {/* Recap ready summary */}
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <span className="text-sm font-semibold text-emerald-400">
                              Recap ready
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-foreground">
                            {recap.sessionTitle}
                          </h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            {chunks.length} source{chunks.length !== 1 ? "s" : ""} &middot;{" "}
                            {recap.timeline.length} event{recap.timeline.length !== 1 ? "s" : ""} &middot;{" "}
                            {recap.decisions.length} decision{recap.decisions.length !== 1 ? "s" : ""} &middot;{" "}
                            {(recap.builderTakeaways ?? []).length} takeaway{(recap.builderTakeaways ?? []).length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <Button
                          onClick={() => setActiveTab("publish")}
                          className="shrink-0 bg-violet-600 hover:bg-violet-500 text-white border-0"
                        >
                          Continue to Publish →
                        </Button>
                      </div>

                      {/* Session summary */}
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        {recap.summary}
                      </p>

                      {/* Timeline — full width horizontal carousel */}
                      <TimelineView timeline={recap.timeline} />

                      {/* Insights — below timeline, 2-col grid */}
                      <InsightPanel
                        decisions={recap.decisions}
                        blockers={recap.blockers}
                        nextSteps={recap.nextSteps}
                        builderTakeaways={recap.builderTakeaways}
                      />

                      {/* Bottom CTA */}
                      <div className="border-t border-border pt-6 flex justify-end">
                        <Button
                          onClick={() => setActiveTab("publish")}
                          className="bg-violet-600 hover:bg-violet-500 text-white border-0"
                        >
                          Continue to Publish →
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ── TAB: Publish Your Build ───────────────── */}
              {activeTab === "publish" && (
                <>
                  {!recap ? (
                    <EmptyState
                      message="Nothing to publish yet. Generate a recap first."
                      ctaLabel="Go to Capture Sources"
                      onCta={() => setActiveTab("capture")}
                    />
                  ) : (
                    <PublishOutputTabs publishOutputs={recap.publishOutputs} />
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── Builder Note (right rail) ──────────────────── */}
          <aside className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 lg:sticky lg:top-8">
            <p className="text-xs font-mono text-amber-400/70 mb-4">
              {"// builder note"}
            </p>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="text-muted-foreground">
                The work is real, but the story often disappears.
              </p>
              <p className="text-muted-foreground">
                BuildTrace helps builders preserve the decisions, blockers, pivots, and
                breakthroughs behind what they built.
              </p>
              <p className="font-medium text-foreground">
                For Black builders, visibility is not just promotion. It is proof, momentum,
                and ownership.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-amber-500/15">
              <p className="text-xs text-muted-foreground/60 italic">
                Built by B Donald Harris · Blackathon 2025
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-muted-foreground">
            BuildTrace · Blackathon 2025 · Coding with AI Track
          </p>
          <p className="text-xs text-muted-foreground italic">
            The work is real. Now the story can be too.
          </p>
        </div>
      </footer>
    </div>
  );
}

function EmptyState({
  message,
  ctaLabel,
  onCta,
}: {
  message: string;
  ctaLabel: string;
  onCta: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mb-2">
        <svg
          className="w-5 h-5 text-muted-foreground/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <p className="text-muted-foreground max-w-sm text-sm">{message}</p>
      <Button variant="outline" onClick={onCta}>
        {ctaLabel}
      </Button>
    </div>
  );
}
