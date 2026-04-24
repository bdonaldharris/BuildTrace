# BuildTrace — Project Spec

**Hackathon:** Blackathon
**Track:** Coding with AI
**Developer:** B Donald Harris
**Type:** 24-hour POC

---

## Problem

AI-assisted development is fast — but it leaves a trail of scattered artifacts: prompts, errors, commits, scratch notes, and ad-hoc decisions spread across terminals, chat windows, and text files.

Builders finish a session knowing they built something real, but unable to quickly reconstruct *what they did*, *why they made certain calls*, or *how to communicate the work to others*.

This creates **comprehension debt** — the gap between work that happened and the story of that work.

---

## Audience

**Primary:** Black builders — engineers, developers, founders, students — who build with AI tools and want to document, share, and get credit for the work they're doing.

**Secondary:** Any developer using AI-assisted workflows who wants to extract structure from messy sessions and create portfolio or publication-ready content.

---

## Solution

BuildTrace is a lightweight web app that accepts raw, messy build notes and returns a structured recap:

- A build timeline with labeled events (prompts, decisions, blockers, commits, outcomes)
- Key decisions made during the session
- Blockers and how they were resolved
- Next steps for continuing the work
- Four publishable output formats: LinkedIn post, blog draft, technical article outline, portfolio summary

The app uses AI to analyze the raw notes and generate structured output. If no API key is present, it falls back to a realistic mock response so the demo always works.

---

## Core Value Proposition

> One paste. One click. Your build, told as a story.

Builders don't change how they work — they just drop in what they have. BuildTrace handles the structure, the summary, and the shareable output.

---

## Success Criteria (Hackathon)

- [ ] The app loads and runs locally without errors
- [ ] The sample session loads and generates a complete recap
- [ ] The timeline renders clearly with labeled events
- [ ] At least two publish output tabs are copy-ready
- [ ] The app works without an OpenAI API key (mock fallback)
- [ ] A 2-minute demo can be delivered smoothly
- [ ] The impact story is clearly communicated in the UI

---

## Demo Goal

Judges walk away understanding:
1. What comprehension debt is and why it matters
2. How BuildTrace solves it with a single paste-and-generate flow
3. Who this helps and why it matters for Black builders specifically

---

## Impact Goal

Demonstrate that a focused, well-scoped AI tool can create real visibility for builders who are doing important work that often goes unseen. Even at hackathon scale, the tool should feel useful and real — not toy-like.
