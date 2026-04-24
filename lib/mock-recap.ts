import { BuildRecap } from "./types";

export const mockRecap: BuildRecap = {
  sessionTitle: "Building BuildTrace — Hackathon POC",
  summary:
    "Built a full-stack Next.js web app in under 24 hours that turns messy AI-assisted build notes into clean timelines, key decisions, blockers, and publishable content. Used a mock-first development strategy to ensure demo reliability, integrated OpenAI gpt-4o with a multi-layer fallback chain, and shipped a complete golden-path demo with LinkedIn post, README recap, demo script, and builder reflection outputs.",
  timeline: [
    {
      id: "evt-1",
      order: 1,
      type: "decision",
      title: "Chose Next.js App Router over Pages Router",
      description:
        "Evaluated both options and committed to App Router for cleaner API route colocation, better server component support, and alignment with the Next.js roadmap.",
      source: "manual",
    },
    {
      id: "evt-2",
      order: 2,
      type: "prompt",
      title: "Asked GPT-4o for stack recommendation",
      description:
        'Prompted: "Fastest setup for a hackathon Next.js demo with clean UI." GPT-4o confirmed: Next.js + TypeScript + Tailwind + shadcn/ui. Stack locked.',
      source: "GPT-4o",
    },
    {
      id: "evt-3",
      order: 3,
      type: "code_change",
      title: "Scaffolded Next.js app and configured shadcn/ui",
      description:
        "Ran create-next-app with TypeScript, Tailwind, and App Router flags. Initialized shadcn/ui and added Button, Card, Textarea, Tabs, and Badge components.",
      source: "terminal",
    },
    {
      id: "evt-4",
      order: 4,
      type: "blocker",
      title: "shadcn init failed with CSS variable conflict",
      description:
        "Running npx shadcn@latest init threw an error about conflicting CSS variables. The default Next.js globals.css :root block was the cause.",
      source: "terminal",
    },
    {
      id: "evt-5",
      order: 5,
      type: "fix",
      title: "Fixed shadcn init by clearing default Next.js CSS",
      description:
        "Cleared the auto-generated Next.js globals.css content before re-running shadcn init. Resolved the :root CSS variable conflict immediately.",
      source: "terminal",
    },
    {
      id: "evt-6",
      order: 6,
      type: "code_change",
      title: "Defined BuildRecap and TimelineEvent types",
      description:
        "Created lib/types.ts with a strict union type for TimelineEventType and the full BuildRecap shape. Strict typing enables predictable UI rendering.",
      source: "manual",
    },
    {
      id: "evt-7",
      order: 7,
      type: "decision",
      title: "Built full mock recap before writing any UI code",
      description:
        "Wrote the complete static mock recap first — including all publish outputs — so the golden path would work 100% offline. Demo reliability over everything.",
      source: "manual",
    },
    {
      id: "evt-8",
      order: 8,
      type: "code_change",
      title: "Built timeline component with color-coded event badges",
      description:
        "Implemented TimelineView with seven distinct badge colors per event type. Took 45 min to tune the Tailwind classes for clear visual hierarchy.",
      source: "manual",
    },
    {
      id: "evt-9",
      order: 9,
      type: "blocker",
      title: "Clipboard API failing silently in some environments",
      description:
        "navigator.clipboard.writeText() requires a secure context (https or localhost). Copy buttons were silently failing outside that context.",
      source: "browser",
    },
    {
      id: "evt-10",
      order: 10,
      type: "fix",
      title: "Added document.execCommand fallback for clipboard",
      description:
        "Wrapped the Clipboard API in try/catch with a document.execCommand fallback for broader browser compatibility. Copy now works everywhere.",
      source: "manual",
    },
    {
      id: "evt-11",
      order: 11,
      type: "code_change",
      title: "Implemented OpenAI API route with full fallback chain",
      description:
        "Built /api/generate-recap using gpt-4o at temperature 0.4. Added markdown code-block stripping and a three-layer fallback: no key → mock, API error → mock, parse error → mock.",
      source: "manual",
    },
    {
      id: "evt-12",
      order: 12,
      type: "commit",
      title: "feat: complete hackathon POC for BuildTrace",
      description:
        "All must-have features shipped: timeline, insights, publish tabs, copy buttons, mock fallback. npm run build passing clean with no TypeScript errors.",
      source: "git",
    },
    {
      id: "evt-13",
      order: 13,
      type: "outcome",
      title: "Golden path demo-ready and confirmed",
      description:
        "Full flow confirmed without any API key: Load Sample → Generate Recap → Timeline → Insights → Publish → Copy. App never crashes or shows an error screen.",
      source: "manual",
    },
  ],
  decisions: [
    "Used Next.js App Router over Pages Router for cleaner API route colocation and future-aligned patterns.",
    "Built the entire UI against static mock data before writing any API code — ensuring demo reliability regardless of network conditions.",
    "Chose gpt-4o at temperature 0.4 for reliable, structured JSON output over more creative but unpredictable settings.",
    "Added a three-layer fallback chain (no key → mock, API error → mock, parse error → mock) so the app never crashes during a demo.",
    "Kept the app fully stateless — no database, no auth, no persistence — to ship fast and demo clean.",
  ],
  blockers: [
    "shadcn/ui init failed due to a CSS variable conflict with Next.js's default globals.css :root block.",
    "navigator.clipboard.writeText() failed silently in some browser configurations due to secure context requirements.",
    "OpenAI API responses sometimes included markdown code block wrappers (```json...```) that broke JSON.parse().",
  ],
  nextSteps: [
    "Deploy to Vercel with the OpenAI API key set as an environment variable for a live public demo.",
    "Add a Comprehension Debt Score — a visual metric quantifying session complexity based on blocker density and decision count.",
    "Support file upload (.txt, .md) so builders can drop in files rather than copy-pasting notes.",
    "Explore GitHub commit integration to auto-populate build notes from real commit messages.",
    "Gather builder feedback on which publish output format is used most and optimize it first.",
  ],
  builderTakeaways: [
    "Mock-first development is a hackathon superpower — if the demo path works without an API, it works everywhere.",
    "The data model is the most important decision. Getting types right early removes friction throughout the build.",
    "Clipboard API edge cases are invisible until they break your demo. Always write the fallback.",
    "Demo reliability is a first-class product requirement, not an afterthought.",
    "The story of how you built something is as valuable as what you shipped.",
  ],
  publishOutputs: {
    linkedInPost: `Just shipped BuildTrace at the Blackathon hackathon. Here's what I built and why it matters.

The problem: AI-assisted development is fast — but messy. Prompts live in ChatGPT. Errors live in terminals. Decisions live in your head. When the session ends, the story of what you built is usually gone.

I call that comprehension debt.

BuildTrace fixes it. Paste your raw build notes and get back:

→ A clean build timeline with labeled events
→ Key decisions from the session
→ Blockers hit and how they were resolved
→ Next steps and builder takeaways
→ A LinkedIn post (like this one), README recap, demo script, and builder reflection

For Black builders, visibility matters. The work is real — the skill, the learning, the problem-solving. BuildTrace helps make all of it visible and shareable.

Built with: Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · OpenAI API

24 hours. Start to finish. Shipped.

#Blackathon #BuildingWithAI #BlackTech #NextJS #OpenAI`,

    readmeRecap: `# BuildTrace

> A lightweight AI-powered recap tool that turns messy build notes into a clear timeline, useful insights, and publishable proof of work.

## What I Built

A full-stack Next.js web app that accepts raw, unstructured build session notes and returns a structured recap: a labeled timeline, key decisions, blockers resolved, next steps, and builder takeaways — plus four publish-ready output formats.

## Problem Solved

AI-assisted development is fast but messy. Prompts, errors, decisions, and commits end up scattered across different tools. When the session ends, the story of what was built — the why, the how, the learning — is often lost. BuildTrace captures and structures that story.

## Tech Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · shadcn/ui (v4, @base-ui/react)
- OpenAI API (gpt-4o) with mock fallback

## Key Decisions

- App Router over Pages Router for API route colocation
- Mock-first development strategy — full UI worked offline before any API code
- gpt-4o at temperature 0.4 for reliable JSON output
- Three-layer fallback chain so the app never crashes
- Stateless architecture: no database, no auth, no persistence

## How to Run

\`\`\`bash
npm install
npm run dev
# Open http://localhost:3000
# No API key required — mock fallback is always active
\`\`\`

## Status

Hackathon POC · Built in under 24 hours · Blackathon 2025`,

    demoScript: `BuildTrace — 2-Minute Demo Script
Blackathon · Coding with AI Track

---

OPENING (15 seconds)

"AI helps us build faster than ever. But there's a hidden cost no one talks about — the work gets scattered.

Prompts live in chat windows. Errors live in terminals. Decisions live in your head. When the session ends, the story of what you built is usually gone.

Builders call this comprehension debt. BuildTrace fixes it."

---

THE DEMO (75 seconds)

[Open the app at localhost:3000]

"This is BuildTrace. One URL. No login. No setup."

[Click Load Sample Session]

"Load Sample Session fills the input with a realistic AI-assisted build session. This is what a real session looks like — messy, nonlinear, full of real decisions."

[Click Generate Recap]

"One click."

[Results appear — scroll to timeline]

"Here's your build timeline. Labeled events in order: prompts, decisions, code changes, blockers, fixes, commits, and outcomes. Color-coded so you can skim it fast."

[Scroll to insights panel]

"Key decisions made. Blockers resolved. Next steps. And — this is what makes BuildTrace different — builder takeaways. The lessons and reflections that usually stay in your head and get lost."

[Scroll to Publish Your Build]

"Here's the payoff."

[Click LinkedIn Post tab]
"Your LinkedIn post — copy and paste."

[Click README Recap tab]
"Your project README — ready to drop into GitHub."

[Click Demo Script tab]
"Your demo script — for the next time you present this project."

[Click Builder Reflection tab]
"A personal reflection on what you built, what you learned, and what surprised you."

---

THE CLOSE (30 seconds)

"Builders often lose the story behind what they built: decisions, blockers, pivots, and breakthroughs.

BuildTrace helps preserve that process so builders can reflect, improve, and share their work.

For Black builders, visibility is not just promotion. It is proof, momentum, and ownership of the work.

This is BuildTrace."`,

    builderReflection: `Builder Reflection — BuildTrace
Session: Building BuildTrace — Hackathon POC

---

What I set out to do:
Build a lightweight tool that turns messy AI build notes into structured recaps and shareable content. Ship a demo-ready proof-of-concept in under 24 hours.

What actually happened:
The scaffold went fast — but I got stuck on a CSS variable conflict during shadcn/ui setup that burned 30 minutes. Once I cleared the default globals.css and re-ran init, it resolved immediately. That kind of friction is exactly what BuildTrace is designed to capture and document.

The mock-first decision was the best call I made all day. By building the full UI against static data before touching the API, I ensured the golden path worked regardless of network conditions or API availability. Demo reliability became a first-class requirement, not an afterthought — and that changed how I made every other decision.

What surprised me:
The clipboard API. It seems like a small thing, but navigator.clipboard.writeText() silently fails outside of secure contexts. A two-minute fix with document.execCommand(), but it would have broken the most visible feature of the app right in the middle of a demo.

What I'd do differently:
Start with the data model even earlier. Getting clear TypeScript types in place before building any components would have removed several small decision points during the build and made the AI prompt easier to specify.

What I'm most proud of:
Shipping a complete golden path — Load → Generate → Timeline → Insights → Publish → Copy — with zero API key required. The demo works everywhere, every time. That felt like a real product decision, not just a hackathon shortcut.

What I learned:
Build the mock first. Always. In hackathons, demo reliability beats technical completeness every time. And the story of how you built something is as valuable as what you shipped.

---

Generated by BuildTrace · Blackathon 2025`,
  },
};
