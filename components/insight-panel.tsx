interface InsightPanelProps {
  decisions: string[];
  blockers: string[];
  nextSteps: string[];
  builderTakeaways?: string[];
}

export default function InsightPanel({
  decisions,
  blockers,
  nextSteps,
  builderTakeaways = [],
}: InsightPanelProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground mb-4">Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InsightCard
          title="Key Decisions"
          items={decisions}
          dotClass="bg-violet-400"
          borderClass="border-violet-500/20"
          titleClass="text-violet-400"
        />
        <InsightCard
          title="Blockers Resolved"
          items={blockers}
          dotClass="bg-red-400"
          borderClass="border-red-500/20"
          titleClass="text-red-400"
        />
        <InsightCard
          title="Next Steps"
          items={nextSteps}
          dotClass="bg-emerald-400"
          borderClass="border-emerald-500/20"
          titleClass="text-emerald-400"
        />
        {builderTakeaways.length > 0 && (
          <InsightCard
            title="Builder Takeaways"
            items={builderTakeaways}
            dotClass="bg-amber-400"
            borderClass="border-amber-500/20"
            titleClass="text-amber-400"
            note="Lessons and reflections from this session"
          />
        )}
      </div>
    </div>
  );
}

function InsightCard({
  title,
  items,
  dotClass,
  borderClass,
  titleClass,
  note,
}: {
  title: string;
  items: string[];
  dotClass: string;
  borderClass: string;
  titleClass: string;
  note?: string;
}) {
  return (
    <div className={`rounded-xl border bg-card/50 p-4 ${borderClass}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
        <h3 className={`text-sm font-semibold ${titleClass}`}>{title}</h3>
      </div>
      {note && <p className="text-xs text-muted-foreground mb-2">{note}</p>}
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">None recorded</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${dotClass}`} />
              <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
