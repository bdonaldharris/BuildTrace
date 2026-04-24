import { SourceChunk } from "./types";

export const sampleChunks: SourceChunk[] = [
  {
    id: "chunk-1",
    type: "decision",
    title: "Choosing the stack",
    content: `Hackathon day. Building for the Blackathon — Coding with AI track.
Big idea: what if there was a tool that turned your messy AI session notes into a clean build recap?
Calling it BuildTrace.

Asked GPT-4o: "I'm building a hackathon demo in Next.js. What's the fastest setup for a clean, demo-friendly product?"
Response: Next.js + TypeScript + Tailwind + shadcn/ui. Makes sense.

Decided: App Router over Pages Router.
Pro: cleaner API route colocation and better server component support.
Con: slightly more mental model overhead vs Pages Router.`,
  },
  {
    id: "chunk-2",
    type: "error",
    title: "shadcn init failing on first run",
    content: `9:45am — ran npx shadcn@latest init
FAILED with error about CSS variable conflict.
Spent 30 min debugging. Frustrating.
Root cause: default Next.js :root CSS block clashing with shadcn's variables.
Fix: cleared globals.css default content first, then re-ran init. Fixed.`,
  },
  {
    id: "chunk-3",
    type: "ai_chat",
    title: "Designing the data model with GPT-4o",
    content: `Prompt: "Design a TypeScript data model for a build session recap tool. Needs: timeline events (types: prompt, decision, blocker, code_change, fix, commit, outcome), key decisions, blockers, next steps, and publish-ready content (LinkedIn post, README, demo script, personal reflection)."

Used the output as a starting point. Tightened the types, added strict union types for TimelineEventType. Added BuildRecap, TimelineEvent, SourceChunk types.`,
  },
  {
    id: "chunk-4",
    type: "decision",
    title: "Mock-first development strategy",
    content: `11:00am — decision: build the mock recap BEFORE touching any UI.
This way the golden path works 100% without any API key.
Made the mock tell the story of building BuildTrace itself. Meta, but perfect for the demo.
Rule: if anything breaks in the live AI path, the demo still runs perfectly via mock fallback.`,
  },
  {
    id: "chunk-5",
    type: "terminal",
    title: "Build errors after first npm run build",
    content: `$ npm run build
3 TypeScript errors found:
- generateRecap missing explicit return type annotation
- unused import (Image from next/image) in page.tsx
- null check missing on recap before accessing recap.publishOutputs

Fixed all three.

$ npm run build
✓ Compiled successfully

$ npm run lint
✓ No ESLint warnings or errors`,
  },
  {
    id: "chunk-6",
    type: "error",
    title: "OpenAI returning JSON wrapped in markdown code blocks",
    content: `2:45pm — JSON parsing failures from live API calls.
OpenAI wraps the JSON response in markdown code block markers: \`\`\`json ... \`\`\`
JSON.parse() chokes on the backticks.
Fix: strip with regex before parsing:
  .replace(/^\`\`\`json\\s*/i, "")
  .replace(/^\`\`\`\\s*/i, "")
  .replace(/\`\`\`\\s*$/i, "")
Also wrapped everything in try/catch — parse failures fall back to mock silently.`,
  },
  {
    id: "chunk-7",
    type: "commit",
    title: "Golden path done — shipping the POC",
    content: `1:35pm — GOLDEN PATH CONFIRMED WORKING. Zero API calls needed.
Flow: Load Sample → Generate (mock fallback) → Timeline → Insight Panel → Publish Tabs → Copy.

git commit -m "feat: complete hackathon POC for BuildTrace"
git push origin main

Public repo live. Demo-safe. Build complete.`,
  },
  {
    id: "chunk-8",
    type: "note",
    title: "Builder takeaways from the session",
    content: `Lessons from today:
- Mock-first development is a demo safety net, not just a dev technique
- Strict TypeScript types save debugging time — worth the upfront investment
- Give AI a schema to fill in, not an open-ended question. Precision in = precision out
- The story behind what you built matters as much as what you built
- 24 hours is enough to ship something that feels real and polished

Next: deploy to Vercel, record demo walkthrough, rehearse the 2-minute script.`,
  },
];
