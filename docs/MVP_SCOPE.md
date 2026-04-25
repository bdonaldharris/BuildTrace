# BuildTrace — MVP Scope

This document defines exactly what gets built during the 24-hour hackathon. When in doubt, cut.

---

## Must-Have (Ship This)

These features are required for a complete, demoable product.

### App Shell
- [ ] Landing/hero with problem statement and impact framing
- [ ] Clean header with project name and one-liner

### Input
- [ ] Textarea for pasting raw build notes
- [ ] **Load Sample Session** button (one click, no API needed)
- [ ] **Generate Recap** button

### Recap Output
- [ ] Build summary (short paragraph)
- [ ] Build timeline with labeled event types
- [ ] Decisions panel
- [ ] Blockers panel
- [ ] Next steps panel

### Publish Your Build
- [ ] Tabs: LinkedIn Post | Blog Draft | Technical Article Outline | Portfolio Summary
- [ ] Copy button for each tab
- [ ] Content pre-populated from recap generation

### Reliability
- [ ] Mock fallback if AI call fails or API key is missing
- [ ] App should never break or show an error screen during demo
- [ ] Sample session works 100% offline

---

## Nice-to-Have (If Time Allows)

Only attempt these after all must-haves are working and polished.

- [ ] File upload (drag-drop a .txt or .md file)
- [ ] Comprehension Debt Score (visual metric based on density of blockers and decisions)
- [ ] Dark mode polish
- [ ] Export recap as Markdown file
- [ ] Animated timeline reveal
- [ ] Character count / word count on publish outputs

---

## Out of Scope (Do Not Build)

See [OUT_OF_SCOPE.md](OUT_OF_SCOPE.md) for the full list.

Short version:
- No auth
- No database
- No GitHub/API integrations
- No browser extension
- No VS Code extension
- No multi-user features
- No production platform architecture beyond the hackathon POC
