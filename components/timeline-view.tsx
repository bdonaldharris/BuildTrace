"use client";

import { useRef } from "react";
import { TimelineEvent, TimelineEventType } from "@/lib/types";

const eventStyles: Record<TimelineEventType, { badge: string; label: string }> = {
  prompt: {
    badge: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    label: "AI Prompt",
  },
  decision: {
    badge: "bg-blue-500/15 text-blue-300 border border-blue-500/25",
    label: "Decision",
  },
  code_change: {
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
    label: "Code Change",
  },
  blocker: {
    badge: "bg-red-500/15 text-red-300 border border-red-500/25",
    label: "Blocker",
  },
  fix: {
    badge: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
    label: "Fix",
  },
  commit: {
    badge: "bg-slate-500/15 text-slate-300 border border-slate-500/25",
    label: "Commit",
  },
  outcome: {
    badge: "bg-green-500/15 text-green-300 border border-green-500/25",
    label: "Outcome",
  },
};

interface TimelineViewProps {
  timeline: TimelineEvent[];
}

export default function TimelineView({ timeline }: TimelineViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">
          Build Timeline
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {timeline.length} events
          </span>
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll timeline left"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll timeline right"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: "oklch(0.25 0 0) transparent" }}
      >
        {timeline.map((event) => {
          const style = eventStyles[event.type];
          return (
            <div
              key={event.id}
              className="shrink-0 w-72 rounded-xl border border-border bg-card/60 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground/60 w-4 shrink-0 text-right">
                  {event.order}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
                >
                  {style.label}
                </span>
              </div>

              <p className="text-sm font-semibold text-foreground leading-snug">
                {event.title}
              </p>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 flex-1">
                {event.description}
              </p>

              {event.source && (
                <p className="text-[11px] text-muted-foreground/50 mt-auto pt-1 border-t border-border/40">
                  via {event.source}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
