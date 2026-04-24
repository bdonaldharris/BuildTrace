"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BuildInputProps {
  notes: string;
  setNotes: (v: string) => void;
  onLoadSample: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function BuildInput({
  notes,
  setNotes,
  onLoadSample,
  onGenerate,
  isLoading,
}: BuildInputProps) {
  const hasNotes = notes.trim().length > 0;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Add your build notes</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Paste anything from your session — AI prompts, terminal output, errors,
          decisions, commit messages, random thoughts.
        </p>
      </div>

      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="9:12am — asked GPT-4o about the best stack for this project...
Got an error: Cannot read properties of undefined reading 'map'...
Decided to use App Router because it colocates API routes better...
Fixed the CSS conflict by clearing globals.css before re-running shadcn init..."
        className="min-h-56 font-mono text-sm resize-y leading-relaxed"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Button
          onClick={onGenerate}
          disabled={isLoading || !hasNotes}
          size="lg"
          className="px-8 shrink-0"
        >
          {isLoading ? "Generating recap..." : "Generate Recap →"}
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">or</span>
          <Button variant="outline" onClick={onLoadSample} disabled={isLoading}>
            Load Sample Session
          </Button>
        </div>

        <span className="text-xs text-muted-foreground sm:ml-auto italic">
          No API key required
        </span>
      </div>
    </section>
  );
}
