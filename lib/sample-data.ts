export const sampleData = `Hackathon day. Building for the Blackathon — Coding with AI track.
Big idea: what if there was a tool that turned your messy AI session notes into a clean build recap?
Calling it BuildTrace.

9:12am — started. First thing: figure out the stack.
Asked GPT-4o: "I'm building a hackathon demo in Next.js. What's the fastest setup with good UI components for a clean, demo-friendly product?"
Response: Next.js + TypeScript + Tailwind + shadcn/ui. Makes sense. Going with it.

9:30am — ran create-next-app. Went with App Router.
Pro: cleaner API route colocation and better server component support.
Con: slightly more mental model overhead vs Pages Router.
Decided: App Router is the future. Let's do it.

9:45am — ran npx shadcn@latest init
FAILED with some error about CSS variable conflict.
Spent 30 min debugging this. Frustrating.
Turned out the issue was the default Next.js :root CSS block clashing with shadcn's variables.
Cleared the default globals.css content first, then re-ran init. Fixed.

10:20am — shadcn working. Added: button, card, textarea, tabs, badge
Components look clean out of the box.

10:40am — designed the data model.
Types: BuildRecap, TimelineEvent, TimelineEventType (union: prompt | decision | code_change | blocker | fix | commit | outcome)
Strict union type on event types = cleaner rendering logic + no runtime surprises.

11:00am — decision: build the mock recap BEFORE touching the UI.
This way the golden path works 100% without any API key.
Made the mock tell the story of building BuildTrace itself. Meta, but great for the demo.

11:35am — built the timeline component. First attempt looked terrible.
Badge colors were all blending together. No visual hierarchy.
Spent 45 min tuning Tailwind color classes. Got 7 distinct colors per event type. Looks clean now.

12:15pm — insight panel done: decisions, blockers, next steps sections.
Dot indicators per section, color-coded. Simple but polished.

12:50pm — publish tabs built. Four tabs: LinkedIn, Blog, Article Outline, Portfolio Summary.
Added a Copy button on each tab.

1:00pm — copy button silently failing in Firefox and some non-localhost environments.
navigator.clipboard.writeText() needs a secure context (https or localhost).
Since the demo runs on localhost this should work, but added document.execCommand fallback anyway just to be safe.

1:35pm — GOLDEN PATH WORKING. Zero API calls.
Load Sample → Generate (mock) → Timeline → Insight Panel → Publish Tabs → Copy.
This is the demo-safe path. Ship it.

2:00pm — starting the AI route. app/api/generate-recap/route.ts
Using gpt-4o. Temperature 0.4 — enough creativity for good prose, tight enough for reliable JSON structure.

2:45pm — JSON parsing failures.
OpenAI is wrapping the JSON response in markdown code block markers: \`\`\`json ... \`\`\`
JSON.parse() chokes on it. Fix: strip the wrapper with a regex before parsing.
Also wrapped everything in try/catch so any parse failure falls back to the mock.

3:10pm — npm run build
3 TypeScript errors:
- generateRecap function missing explicit return type annotation
- unused import (Image from next/image) left in page.tsx
- null check needed on recap before accessing recap.publishOutputs
Fixed all three.

3:45pm — npm run lint. Clean.

4:00pm — full demo run. Everything works. App looks polished.
git commit -m "feat: complete hackathon POC for BuildTrace"

Next up: deploy to Vercel, record a backup screen recording, rehearse the 2-minute script.
`;
