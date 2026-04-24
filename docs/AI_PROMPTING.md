# BuildTrace — AI Prompting Strategy

---

## Overview

The AI's job is to take raw, messy build notes and return a strictly typed `BuildRecap` JSON object. Nothing more.

- Input: freeform string (prompts, errors, commits, decisions, notes)
- Output: valid JSON matching the `BuildRecap` type
- Fallback: if the call fails or JSON parsing fails, return the mock recap silently

The app must never crash or show an error screen during the demo.

---

## System Prompt

```
You are BuildTrace, an AI that helps developers reconstruct and document their build sessions.

Your job is to analyze raw, messy development notes — which may include AI prompts, terminal output, error messages, commits, decisions, and freeform thoughts — and return a clean, structured build recap.

Return ONLY valid JSON matching this exact structure. Do not include any explanation, markdown formatting, or text outside the JSON object.

{
  "sessionTitle": "string — short descriptive title for the session",
  "summary": "string — 2-3 sentences summarizing what was built, why, and what was accomplished",
  "timeline": [
    {
      "id": "string — unique id like 'evt-1'",
      "order": number,
      "type": "prompt | decision | code_change | blocker | fix | commit | outcome",
      "title": "string — short title for this event",
      "description": "string — 1-2 sentences describing what happened",
      "source": "string — optional, e.g. 'GPT-4', 'terminal', 'manual'"
    }
  ],
  "decisions": ["string — one key decision per item, written as a complete sentence"],
  "blockers": ["string — one blocker per item, written as a complete sentence"],
  "nextSteps": ["string — one next step per item, written as a concrete action"],
  "builderTakeaways": ["string — 3-5 lessons, insights, or reflections from the session"],
  "publishOutputs": {
    "linkedInPost": "string — 150-250 word LinkedIn post in first person, professional but conversational, with hashtags",
    "readmeRecap": "string — a project README in markdown with sections: What I Built, Problem Solved, Tech Stack, Key Decisions, How to Run, Status",
    "demoScript": "string — a 2-minute demo script with sections: Opening, The Demo, The Close — formatted with stage directions",
    "builderReflection": "string — a personal reflection covering: What I set out to do, What actually happened, What surprised me, What I'd do differently, What I'm most proud of, What I learned"
  }
}

Guidelines:
- Extract 5-12 timeline events from the notes. Don't invent events not implied by the notes.
- Decisions should reflect meaningful choices, not trivial ones.
- Blockers should reflect actual friction, errors, or confusion.
- Next steps should be concrete and actionable.
- Builder takeaways should feel personal and honest — lessons a builder would actually want to remember.
- Publish outputs should be polished and highlight real accomplishment.
- Tone: confident, builder-focused, clear, honest.
```

---

## User Prompt Template

```
Here are my raw build notes from a recent AI-assisted development session. Please analyze them and return a structured recap as JSON.

---

{RAW_NOTES}

---

Return only the JSON object. No explanation.
```

---

## API Call Setup (`lib/generate-recap.ts`)

```typescript
export async function generateRecap(rawNotes: string): Promise<BuildRecap> {
  try {
    const res = await fetch("/api/generate-recap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: rawNotes }),
    });

    if (!res.ok) return mockRecap;

    const data = await res.json();
    return data.recap ?? mockRecap;
  } catch {
    return mockRecap;
  }
}
```

---

## API Route (`app/api/generate-recap/route.ts`)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockRecap } from "@/lib/mock-recap";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ recap: mockRecap });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(notes) },
        ],
        temperature: 0.4,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) return NextResponse.json({ recap: mockRecap });

    const data = await response.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "";

    // Strip markdown code block wrappers if present
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const recap = JSON.parse(cleaned);
    return NextResponse.json({ recap });
  } catch {
    return NextResponse.json({ recap: mockRecap });
  }
}
```

---

## Mock Fallback

The mock recap (`lib/mock-recap.ts`) is a complete, realistic `BuildRecap` object. It:
- Tells the story of building BuildTrace itself (meta and compelling for the demo)
- Includes 13 timeline events ordered by the actual build sequence
- Includes decisions, blockers, next steps, and builder takeaways
- Includes all four publish output formats with real, copy-ready content:
  - LinkedIn Post
  - README Recap (markdown format)
  - Demo Script (2-minute script with stage directions)
  - Builder Reflection (personal first-person account)

The mock ensures the demo works 100% without any API key or network call.

---

## Reliability Rules

1. Never let a failed API call crash the app — always return the mock
2. Wrap all `JSON.parse()` calls in try/catch — return the mock on failure
3. The sample session + mock fallback path must be tested and confirmed working before starting on the live AI path
4. Temperature 0.4 keeps output structured; don't go higher for this use case
