"use client";

import { useState } from "react";
import { BuildRecap } from "@/lib/types";
import { sampleData } from "@/lib/sample-data";
import { generateRecap } from "@/lib/generate-recap";
import BuildInput from "@/components/build-input";
import TimelineView from "@/components/timeline-view";
import InsightPanel from "@/components/insight-panel";
import PublishOutputTabs from "@/components/publish-output-tabs";

const HOW_IT_WORKS = [
  {
    num: "01",
    title: "Capture the mess",
    desc: "Paste raw notes — prompts, errors, decisions, commits. No cleanup needed.",
  },
  {
    num: "02",
    title: "Understand the build",
    desc: "Get a clear timeline, key decisions, blockers resolved, and builder takeaways.",
  },
  {
    num: "03",
    title: "Share the story",
    desc: "Copy a LinkedIn post, README recap, demo script, or builder reflection.",
  },
] as const;

export default function Home() {
  const [notes, setNotes] = useState("");
  const [recap, setRecap] = useState<BuildRecap | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadSample = () => {
    setNotes(sampleData);
    setRecap(null);
  };

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    setIsLoading(true);
    try {
      const result = await generateRecap(notes);
      setRecap(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="border-b border-border bg-background">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Top row: wordmark + badge */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              BuildTrace
            </span>
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground border border-border">
              Hackathon POC · Demo-first · No setup required
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground leading-tight max-w-2xl">
            Turn messy build sessions into proof of progress.
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            BuildTrace helps builders transform rough notes, AI conversations, decisions,
            blockers, and next steps into a clean project timeline, insight recap, and
            publish-ready content.
          </p>

          {/* Blackathon badge */}
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
              Blackathon · Coding with AI Track
            </span>
          </div>

          {/* How it works — compact 3-step row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
            {HOW_IT_WORKS.map(({ num, title, desc }) => (
              <div key={num} className="bg-background p-4">
                <span className="text-xs font-mono text-muted-foreground/50">{num}</span>
                <p className="text-sm font-semibold text-foreground mt-1">{title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 space-y-12">
        {/* Input */}
        <BuildInput
          notes={notes}
          setNotes={setNotes}
          onLoadSample={handleLoadSample}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {/* Results — rendered after generate */}
        {recap && (
          <div className="space-y-10">
            {/* Summary */}
            <section className="border-t border-border pt-10">
              <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-2">
                Recap
              </p>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {recap.sessionTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {recap.summary}
              </p>
            </section>

            {/* Timeline + Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TimelineView timeline={recap.timeline} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Insights</h2>
                <InsightPanel
                  decisions={recap.decisions}
                  blockers={recap.blockers}
                  nextSteps={recap.nextSteps}
                  builderTakeaways={recap.builderTakeaways}
                />
              </div>
            </div>

            {/* Publish Your Build */}
            <div className="border-t border-border pt-10">
              <PublishOutputTabs publishOutputs={recap.publishOutputs} />
            </div>
          </div>
        )}
      </main>

      {/* ── Why this matters ────────────────────────────────── */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-2">
              Why this matters
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Builders often lose the story behind what they built: decisions, blockers,
              pivots, and breakthroughs. BuildTrace helps preserve that process so builders
              can reflect, improve, and share their work.
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">
              For Black builders, visibility is not just promotion. It is proof, momentum,
              and ownership of the work.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-muted-foreground">
            Built by{" "}
            <span className="font-medium text-foreground">B Donald Harris</span> ·
            Blackathon 2025
          </p>
          <p className="text-xs text-muted-foreground italic">
            The work is real. Now the story can be too.
          </p>
        </div>
      </footer>
    </div>
  );
}
