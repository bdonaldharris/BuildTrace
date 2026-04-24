# BuildTrace — 24-Hour Hackathon Checklist

Work the list. Ship what matters. Cut everything else.

---

## Hour 0–1: Foundation

- [ ] Scaffold Next.js app with TypeScript, Tailwind, App Router
- [ ] Install and initialize shadcn/ui
- [ ] Add components: Button, Card, Textarea, Tabs, Badge
- [ ] Create folder structure (components/, lib/, docs/)
- [ ] Create `lib/types.ts` with `BuildRecap` and `TimelineEvent`
- [ ] Create `lib/sample-data.ts` with a realistic raw session string
- [ ] Create `lib/mock-recap.ts` with a complete `BuildRecap` object
- [ ] Confirm `npm run dev` starts without errors
- [ ] Commit: "scaffold: initial app setup"

---

## Hour 1–4: UI Shell

- [ ] Build `app/page.tsx` — hero section with problem statement
- [ ] Build `components/build-input.tsx` — textarea + Load Sample + Generate button
- [ ] Wire up Load Sample button to populate textarea with sample data
- [ ] Add loading state to Generate button
- [ ] Build basic layout: hero → input → results placeholder
- [ ] Confirm the page renders and looks reasonable
- [ ] Commit: "ui: core layout and input panel"

---

## Hour 4–8: Timeline and Insight Rendering

- [ ] Build `components/timeline-view.tsx` — renders `TimelineEvent[]` as cards with type badges
- [ ] Build `components/insight-panel.tsx` — renders decisions, blockers, next steps as lists
- [ ] Wire mock recap into page state
- [ ] Confirm timeline and insights render from mock data
- [ ] Style event type badges with distinct colors
- [ ] Commit: "ui: timeline and insight panel"

---

## Hour 8–12: AI / Mock Generation

- [ ] Create `app/api/generate-recap/route.ts`
- [ ] Implement mock fallback path (no API key → return mock)
- [ ] Implement OpenAI API call path (with key → call GPT-4o)
- [ ] Create `lib/generate-recap.ts` — client-side fetch wrapper
- [ ] Create `lib/prompts.ts` — system prompt and user prompt template
- [ ] Wire Generate button to call API → set recap state → render results
- [ ] Test: confirm mock path works with no API key
- [ ] Test (if key available): confirm live path returns valid JSON
- [ ] Commit: "feat: recap generation with mock fallback"

---

## Hour 12–16: Publish Your Build + Polish

- [ ] Build `components/publish-output-tabs.tsx` — four tabs with content and copy buttons
- [ ] Implement copy-to-clipboard for each tab
- [ ] Add "Copied!" confirmation state on copy buttons
- [ ] Polish hero copy — problem statement, impact framing
- [ ] Polish overall layout — spacing, typography, color
- [ ] Test full golden path: load sample → generate → timeline → copy
- [ ] Confirm app works without API key end-to-end
- [ ] Commit: "feat: publish outputs and copy actions"

---

## Hour 16–20: Story and Pitch

- [ ] Finalize README.md — clean, complete, impact-forward
- [ ] Review and finalize DEMO_SCRIPT.md
- [ ] Write submission description (2–3 paragraphs for hackathon form)
- [ ] Record a backup screen recording of the golden path demo
- [ ] Take screenshots for submission if required
- [ ] Commit: "docs: finalize readme and demo materials"

---

## Hour 20–24: Final Checks and Submit

- [ ] Do one full run-through of the demo script
- [ ] Check for any console errors or layout breaks
- [ ] Confirm mobile layout is not embarrassing (doesn't need to be perfect)
- [ ] Confirm copy buttons work in Chrome
- [ ] Double-check submission requirements
- [ ] Submit
- [ ] Rest

---

## If You're Ahead of Schedule

Consider (in order):
1. Comprehension Debt Score visual
2. Markdown export
3. Animated timeline reveal
4. Dark mode

Do NOT start any of these until all must-haves are shipped and confirmed working.

---

## Cut This If You're Behind

In order of lowest to highest impact — cut from the bottom:
1. Technical Article Outline tab (keep LinkedIn, Blog, Portfolio)
2. Portfolio Summary tab content polish
3. Mobile layout optimization
4. Any animation
5. File upload input

Never cut: mock fallback, sample session, timeline, decisions/blockers/next steps, copy buttons.
