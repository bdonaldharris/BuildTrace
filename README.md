# BuildTrace

**Developer:** B Donald Harris
**Hackathon:** Blackathon — Coding with AI Track
**Status:** Hackathon POC (not production)

---

## What It Does

BuildTrace turns messy AI-assisted coding sessions into clean build recaps. It helps builders reconstruct what happened during a build, identify key decisions, capture blockers, document next steps, and create publishable content from the work they already completed.

You paste your raw notes — prompts, errors, commits, decisions, random thoughts — and BuildTrace generates:

- A clean **build timeline**
- **Key decisions** made during the session
- **Blockers and challenges** encountered
- **Next steps** to continue the work
- **Publishable outputs**: LinkedIn post, blog draft, technical article outline, portfolio summary

---

## Why It Exists

AI-assisted development is fast — but it's also messy. Prompts, commits, errors, and decisions end up scattered across terminals, chats, and scratch files. That messiness creates *comprehension debt*: the work happened, but the story of the work is lost.

BuildTrace closes that gap. It gives builders a fast, structured way to go from "I just built something" to "here's what I built and why it matters."

---

## Impact

BuildTrace helps Black builders turn hidden technical work into visible proof of skill, learning, innovation, and ownership. By transforming scattered build notes into shareable stories, it supports:

- Portfolio growth
- Knowledge sharing
- Community learning
- Builder visibility — in hiring pipelines, with clients, and in the broader tech ecosystem

The work is real. Now the story can be too.

---

## Hackathon Context

This is a 24-hour hackathon proof-of-concept built for the Blackathon, submitted under the **Coding with AI** track. The scope is intentionally small. The goal is a clean, demoable app with a strong story — not a production-ready platform.

---

## Relationship to HindSite

BuildTrace is inspired by the broader *hindsight-first development workflow* concept that underpins the HindSite product idea.

- BuildTrace is **not** the production HindSite repo.
- It is a focused POC to validate the core value proposition.
- Lessons learned, terminology, UX patterns, and data models from this build may inform HindSite later.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| AI | OpenAI API (optional) or local mock fallback |
| Data | Local sample data only |
| Auth | None |
| Database | None |

---

## Project Structure

```
buildtrace/
  app/
    page.tsx              # Main page — hero + input + results
    layout.tsx
    globals.css
    api/
      generate-recap/
        route.ts          # Calls OpenAI or returns mock
  components/
    build-input.tsx       # Notes textarea + load sample button
    timeline-view.tsx     # Renders build timeline
    insight-panel.tsx     # Decisions, blockers, next steps
    publish-output-tabs.tsx  # LinkedIn, blog, article, portfolio tabs
    sample-loader.tsx     # Loads bundled sample session
  lib/
    types.ts              # BuildRecap and TimelineEvent types
    sample-data.ts        # Bundled sample build session
    mock-recap.ts         # Static mock output (no API needed)
    generate-recap.ts     # Client-side call to /api/generate-recap
    prompts.ts            # System and user prompt templates
  docs/                   # All spec and planning docs
  README.md
```

---

## Core Features

- **Sample session loader** — one click loads a realistic AI-assisted build session
- **Notes input** — paste raw build notes manually
- **Generate recap** — calls AI or falls back to mock
- **Build timeline** — ordered events: prompts, decisions, code changes, blockers, commits
- **Insight panel** — decisions made, blockers hit, next steps
- **Publish Your Build** — four copy-ready output formats
- **Copy buttons** — one-click copy for each output

---

## How to Run Locally

```bash
# 1. Clone and install
git clone <repo>
cd buildtrace
npm install

# 2. Optional: add OpenAI key
cp .env.example .env.local
# Add: OPENAI_API_KEY=your-key-here

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

The app runs fully without an API key using the built-in mock fallback.

---

## How to Demo

1. Open the app
2. Click **Load Sample Session**
3. Click **Generate Recap**
4. Walk through the timeline, decisions, blockers, and next steps
5. Click the **Publish Your Build** tabs
6. Copy a LinkedIn post or blog draft and show it

See [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) for the full 2-minute script.

---

## What Is Intentionally Out of Scope

- Authentication
- Database or persistent storage
- GitHub OAuth or real integrations
- Browser extension
- VS Code extension
- Multi-user collaboration
- Full HindSite product architecture

See [docs/OUT_OF_SCOPE.md](docs/OUT_OF_SCOPE.md) for the full list.
