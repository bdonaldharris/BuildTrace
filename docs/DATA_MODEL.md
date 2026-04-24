# BuildTrace — Data Model

All data lives in memory during the session. No database. No persistence.

The types below live in `lib/types.ts`.

---

## Types

```typescript
export type TimelineEventType =
  | "prompt"
  | "decision"
  | "code_change"
  | "blocker"
  | "fix"
  | "commit"
  | "outcome";

export type TimelineEvent = {
  id: string;
  order: number;
  type: TimelineEventType;
  title: string;
  description: string;
  source?: string; // optional: "GPT-4", "terminal", "manual", etc.
};

export type BuildRecap = {
  sessionTitle: string;
  summary: string;
  timeline: TimelineEvent[];
  decisions: string[];
  blockers: string[];
  nextSteps: string[];
  builderTakeaways?: string[]; // lessons and reflections from the session
  publishOutputs: {
    linkedInPost: string;
    readmeRecap: string;
    demoScript: string;
    builderReflection: string;
  };
};

export type SourceChunkType =
  | "ai_chat"
  | "terminal"
  | "error"
  | "decision"
  | "commit"
  | "note"
  | "demo";

export type SourceChunk = {
  id: string;         // unique, e.g. "chunk-1713123456789-ab3f"
  type: SourceChunkType;
  title: string;      // short label for the chunk
  content: string;    // raw text content
};
```

---

## SourceChunk Types — Reference

| Type | When to Use |
|---|---|
| `ai_chat` | An AI prompt/response exchange that influenced the build |
| `terminal` | Terminal output, command results, build logs |
| `error` | Error messages, stack traces, failed commands |
| `decision` | A meaningful architectural or implementation choice |
| `commit` | A git commit message or checkpoint summary |
| `note` | Freeform notes, reflections, or session thoughts |
| `demo` | Demo notes, walkthrough steps, or presentation prep |

---

## TimelineEvent Types — Reference

| Type | When to Use |
|---|---|
| `prompt` | An AI prompt was sent and influenced the build |
| `decision` | A meaningful architectural or implementation choice was made |
| `code_change` | A meaningful code addition, refactor, or deletion |
| `blocker` | Something stopped progress — an error, confusion, or dependency issue |
| `fix` | A blocker was resolved |
| `commit` | A git commit or checkpoint was made |
| `outcome` | A working result, demo milestone, or shipped feature |

---

## Data Flow

```
SourceChunk[] (user input)
    ↓
chunksToNotes(chunks) → formatted string
    ↓
POST /api/generate-recap
    ↓
OpenAI API (or mock fallback)
    ↓
JSON string → JSON.parse()
    ↓
BuildRecap object
    ↓
React state → UI rendering
```

### Chunk-to-notes format

`chunksToNotes()` in `lib/generate-recap.ts` formats each chunk as:

```
[AI Chat / Prompt] Choosing the stack
<content>

---

[Error / Blocker] shadcn initialization failure
<content>
```

Each chunk is separated by `\n\n---\n\n` so the AI can clearly distinguish sources.

---

## Sample Data

The sample session lives in `lib/sample-chunks.ts` as a `SourceChunk[]` array — 8 realistic chunks covering the BuildTrace build story. When the user clicks **Load Sample Session**, these chunks populate the capture panel.

The mock output lives in `lib/mock-recap.ts` as a complete `BuildRecap` object. It is used when:
- No `OPENAI_API_KEY` is set
- The API call fails
- JSON parsing fails

This ensures the app always works during the demo.
