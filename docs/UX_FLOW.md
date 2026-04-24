# BuildTrace — UX Flow

This document describes the user journey, page layout, and interaction model for the hackathon POC.

---

## User Journey

### Step 1 — User Arrives
User lands on the page. They immediately see:
- The app name: **BuildTrace**
- A one-liner: *Turn messy AI-assisted build sessions into clean recaps and shareable content*
- A brief 2–3 sentence explanation of the problem (comprehension debt)
- The input panel below the hero

### Step 2 — User Reads Problem Statement
A short callout or hero section explains:
- AI helps us build fast, but the work gets scattered
- Prompts, errors, decisions, and commits live in different places
- This creates comprehension debt — the gap between work done and story told
- BuildTrace closes that gap

### Step 3 — User Loads Sample or Pastes Notes
Two entry points:
1. **Load Sample Session** — one click fills the textarea with a realistic pre-built session
2. **Paste Notes** — user types or pastes their own raw notes into the textarea

The textarea should be large, accepting multi-line freeform text. No required format.

### Step 4 — User Clicks Generate
A prominent **Generate Recap** button triggers the recap flow:
- Button shows loading state ("Generating...")
- App calls `/api/generate-recap` or falls back to mock
- Results appear below without a page reload

### Step 5 — App Shows Recap
The results area appears below the input panel with:
- **Build Summary** — a short paragraph at the top
- **Build Timeline** — scrollable list of labeled events
- **Insight Panel** — three columns or sections: Decisions | Blockers | Next Steps

### Step 6 — User Reviews Results
User scrolls through the timeline and insights. Each timeline event has:
- An event type badge (Prompt / Decision / Code Change / Blocker / Fix / Commit / Outcome)
- A title
- A short description

### Step 7 — User Copies Publishable Output
Below the insights, a **Publish Your Build** section with four tabs:
- LinkedIn Post
- Blog Draft
- Technical Article Outline
- Portfolio Summary

Each tab shows pre-generated content and a **Copy** button. One click copies to clipboard.

---

## Page Layout

```
┌─────────────────────────────────────────────┐
│  HERO / HEADER                              │
│  BuildTrace — one-liner — impact statement  │
├─────────────────────────────────────────────┤
│  INPUT PANEL                                │
│  [ Load Sample Session ]                    │
│  [ Textarea — paste your notes here ]       │
│  [ Generate Recap ] button                  │
├─────────────────────────────────────────────┤
│  RESULTS AREA (appears after generate)      │
│                                             │
│  Build Summary (full width)                 │
│                                             │
│  ┌─────────────────┐  ┌───────────────────┐ │
│  │  TIMELINE       │  │  INSIGHT PANEL    │ │
│  │  (main/left)    │  │  - Decisions      │ │
│  │  event cards    │  │  - Blockers       │ │
│  │  with badges    │  │  - Next Steps     │ │
│  └─────────────────┘  └───────────────────┘ │
│                                             │
├─────────────────────────────────────────────┤
│  PUBLISH YOUR BUILD                         │
│  [ LinkedIn | Blog | Article | Portfolio ]  │
│  Content area + Copy button                 │
└─────────────────────────────────────────────┘
```

---

## States

| State | What the User Sees |
|---|---|
| Initial | Hero + input panel only |
| Loading | Generate button shows "Generating..." spinner |
| Success | Full results area renders below input |
| Error / No Key | Mock fallback silently activates — user sees results |
| Copy clicked | Button briefly shows "Copied!" confirmation |

---

## Notes

- The results area should not replace the input — both should be visible so users can iterate.
- Mobile layout is acceptable but desktop is the demo target.
- Avoid excessive animation — clarity over flash.
- The Generate button should be the most prominent CTA on the page.
