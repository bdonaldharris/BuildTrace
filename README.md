# BuildTrace

**Turn messy build sessions into proof of progress.**

| | |
|---|---|
| **Developer** | B Donald Harris |
| **Hackathon** | Blackathon 2026 |
| **Track** | Coding with AI / AI for Coding |
| **Status** | Hackathon POC — not production |

---

## What It Does

BuildTrace helps builders collect scattered build evidence — AI chats, terminal output, errors, decisions, commits, notes, and reflections — and turn it into a structured recap with a timeline, insight cards, and publish-ready outputs.

Three-tab workflow:

1. **Capture Sources** — add typed source chunks from your build session
2. **Build Recap** — generate a timeline, decisions, blockers, next steps, and builder takeaways
3. **Publish Your Build** — copy four ready-to-share formats

No API key required. The full demo path runs on a built-in mock fallback.

---

## Why It Exists

AI-assisted development moves fast. Prompts, commits, errors, and decisions end up scattered across terminals, chat windows, and scratch files. The work happens — but the story of the work disappears.

BuildTrace closes that gap: from "I just built something" to "here's what I built and why it matters."

---

## Impact

For Black builders, visibility is not just promotion. It is proof, momentum, and ownership.

BuildTrace turns hidden technical work into visible evidence of skill, learning, and execution — usable in portfolios, shared with clients, and legible in hiring pipelines.

*The work is real. Now the story can be too.*

---

## Demo Flow

1. Open the app
2. Click **Load Sample Session** — loads 8 typed source chunks from the BuildTrace build itself
3. Review the captured **Build Sources** (edit or delete any tile)
4. Click **Generate Recap from 8 Sources**
5. Walk through the **Build Recap**: timeline carousel, insight cards, builder takeaways
6. Click **Continue to Publish**
7. Copy the **LinkedIn Post**, **README Recap**, **Demo Script**, or **Builder Reflection**

See [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) for the full 2-minute walkthrough.

---

## Core Features

- **Tabbed workspace** — Capture Sources → Build Recap → Publish Your Build
- **Multi-source chunk capture** — add as many sources as you have
- **Source type labels** — AI Chat, Terminal, Error, Decision, Commit, Note, Demo
- **Sample session loader** — one click, no setup
- **Client-side file upload** — load `.txt` or `.md` files directly in-browser
- **Source edit / delete modal** — click any tile to update or remove it
- **Generate recap** — calls AI or falls back to mock; no API key required
- **Horizontal build timeline carousel** — ordered events with type badges
- **Insight cards** — Key Decisions, Blockers Resolved, Next Steps, Builder Takeaways
- **Publish Your Build outputs** — four copy-ready formats
- **Copy-to-clipboard** — per-output copy button with confirmation state

---

## Publish Outputs

| Output | Description |
|---|---|
| LinkedIn Post | Short-form social post ready to paste |
| README Recap | Project summary for a GitHub repository |
| Demo Script | 2-minute walkthrough for live or recorded demos |
| Builder Reflection | Personal reflection on what you built and learned |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Runtime | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (config in CSS, no tailwind.config.ts) |
| Components | shadcn/ui 4.4.0 with `@base-ui/react` |
| AI | OpenAI API (optional) — mock fallback by default |
| Data | Local / in-memory only |
| Auth | None |
| Database | None |

---

## Project Structure

```
buildtrace/
  app/
    page.tsx                    # Tabbed workspace shell
    layout.tsx                  # Root layout, dark mode, font setup
    globals.css                 # Tailwind v4 config + CSS variables
    icon.png                    # App icon (Next.js file convention)
    favicon.ico                 # Favicon (Next.js file convention)
    api/
      generate-recap/
        route.ts                # Calls OpenAI or returns mock
  components/
    build-input.tsx             # Source chunk capture form + grid + edit modal
    timeline-view.tsx           # Horizontal timeline carousel
    insight-panel.tsx           # Decisions, blockers, next steps, takeaways
    publish-output-tabs.tsx     # LinkedIn, README, demo script, reflection tabs
  lib/
    types.ts                    # BuildRecap, SourceChunk, TimelineEvent types
    sample-chunks.ts            # 8-chunk sample session (the BuildTrace build story)
    mock-recap.ts               # Static mock recap (no API needed)
    generate-recap.ts           # chunksToNotes() + API call wrapper
    prompts.ts                  # System and user prompt templates
  docs/                         # Spec, UX flow, demo script, scope docs
  public/
    logo.png                    # BuildTrace logo
  README.md
```

---

## How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Optional: add your OpenAI key
cp .env.example .env.local
# Edit .env.local and set: OPENAI_API_KEY=your-key-here

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:3000
```

No API key is required for the demo path.

---

## Validation

```bash
npm run lint
npm run build
```

---

## Hackathon Scope / Out of Scope

This is a focused 24-hour POC. The following are intentionally absent:

- Authentication or user accounts
- Database or persistent storage
- GitHub integration
- Browser extension
- VS Code extension
- Live telemetry or analytics
- Multi-user collaboration
- Full HindSite product architecture

See [docs/OUT_OF_SCOPE.md](docs/OUT_OF_SCOPE.md) for the full list.

---

## Relationship to HindSite

BuildTrace is inspired by the broader *hindsight-first development workflow* concept behind the HindSite product idea.

BuildTrace is **not** HindSite. It is a focused hackathon POC validating a smaller slice: can scattered build evidence be transformed into a structured recap, meaningful insights, and a shareable story — with minimal friction and no infrastructure?

Lessons from this build may inform HindSite later.

---

*The work is real. Now the story can be too.*
