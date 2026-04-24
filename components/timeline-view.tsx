import { TimelineEvent, TimelineEventType } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

const eventStyles: Record<
  TimelineEventType,
  { badge: string; dot: string; label: string }
> = {
  prompt: {
    badge: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    dot: "bg-violet-400",
    label: "AI Prompt",
  },
  decision: {
    badge: "bg-blue-500/15 text-blue-300 border border-blue-500/25",
    dot: "bg-blue-400",
    label: "Decision",
  },
  code_change: {
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
    dot: "bg-emerald-400",
    label: "Code Change",
  },
  blocker: {
    badge: "bg-red-500/15 text-red-300 border border-red-500/25",
    dot: "bg-red-400",
    label: "Blocker",
  },
  fix: {
    badge: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
    dot: "bg-amber-400",
    label: "Fix",
  },
  commit: {
    badge: "bg-slate-500/15 text-slate-300 border border-slate-500/25",
    dot: "bg-slate-400",
    label: "Commit",
  },
  outcome: {
    badge: "bg-green-500/15 text-green-300 border border-green-500/25",
    dot: "bg-green-400",
    label: "Outcome",
  },
};

interface TimelineViewProps {
  timeline: TimelineEvent[];
}

export default function TimelineView({ timeline }: TimelineViewProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Build Timeline</h2>
      <div className="relative space-y-2">
        {timeline.map((event) => {
          const style = eventStyles[event.type];
          return (
            <Card
              key={event.id}
              className="border-0 ring-1 ring-border/40 shadow-none bg-card/60"
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs text-muted-foreground/40 font-mono mt-1 w-5 shrink-0 text-right">
                    {event.order}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
                      >
                        {style.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {event.title}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                    {event.source && (
                      <p className="text-xs text-muted-foreground/40 mt-1">
                        via {event.source}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
