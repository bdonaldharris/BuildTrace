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
```

---

## Event Types — Reference

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
Raw Notes (string)
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

---

## Sample Data

The sample session lives in `lib/sample-data.ts` as a plain string — raw, realistic-looking messy notes. When the user clicks **Load Sample**, this string fills the textarea.

The mock output lives in `lib/mock-recap.ts` as a complete `BuildRecap` object. It is used when:
- No `OPENAI_API_KEY` is set
- The API call fails
- JSON parsing fails

This ensures the app always works during the demo.
