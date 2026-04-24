import { TimelineEvent, TimelineEventType } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

const eventStyles: Record<
  TimelineEventType,
  { badge: string; dot: string; label: string }
> = {
  prompt: {
    badge: "bg-blue-100 text-blue-700 border border-blue-200",
    dot: "bg-blue-400",
    label: "Prompt",
  },
  decision: {
    badge: "bg-purple-100 text-purple-700 border border-purple-200",
    dot: "bg-purple-400",
    label: "Decision",
  },
  code_change: {
    badge: "bg-green-100 text-green-700 border border-green-200",
    dot: "bg-green-400",
    label: "Code Change",
  },
  blocker: {
    badge: "bg-red-100 text-red-700 border border-red-200",
    dot: "bg-red-400",
    label: "Blocker",
  },
  fix: {
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    dot: "bg-orange-400",
    label: "Fix",
  },
  commit: {
    badge: "bg-slate-100 text-slate-700 border border-slate-200",
    dot: "bg-slate-400",
    label: "Commit",
  },
  outcome: {
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-400",
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
      <div className="relative space-y-3">
        {timeline.map((event) => {
          const style = eventStyles[event.type];
          return (
            <Card key={event.id} className="border-0 ring-1 ring-border/60 shadow-none">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs text-muted-foreground font-mono mt-1 w-5 shrink-0 text-right">
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
                      <p className="text-xs text-muted-foreground/60 mt-1">
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
