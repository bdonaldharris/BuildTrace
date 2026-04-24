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
    <div className="space-y-6">
      <InsightSection
        title="Key Decisions"
        items={decisions}
        dotColor="bg-purple-400"
      />
      <InsightSection
        title="Blockers Resolved"
        items={blockers}
        dotColor="bg-red-400"
      />
      <InsightSection
        title="Next Steps"
        items={nextSteps}
        dotColor="bg-emerald-400"
      />
      {builderTakeaways.length > 0 && (
        <InsightSection
          title="Builder Takeaways"
          items={builderTakeaways}
          dotColor="bg-amber-400"
          note="Lessons and reflections from this session"
        />
      )}
    </div>
  );
}

function InsightSection({
  title,
  items,
  dotColor,
  note,
}: {
  title: string;
  items: string[];
  dotColor: string;
  note?: string;
}) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">None recorded</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
