# BuildTrace — Out of Scope

This document exists to protect the hackathon build from scope creep. If something is on this list, do not build it during the hackathon.

Every item here is a real idea. Some of them are good ideas. None of them belong in a 24-hour POC.

---

## Hard No (Do Not Touch)

### Authentication
No login. No sign-up. No session management. No OAuth. The app is open and stateless. This is a feature, not a bug — it removes friction for the demo.

### Database / Persistence
No saving recaps. No user history. No cloud storage. Everything lives in React state during the session. When the user refreshes, it's gone. That is fine.

### GitHub Integration
No GitHub OAuth. No reading commits from a real repo. No webhook listeners. No API tokens for code platforms. BuildTrace accepts pasted or uploaded content only.

### Browser Extension
Not in this hackathon. Not even a prototype. BuildTrace is a web app. The extension concept belongs in a future sprint.

### VS Code Extension
Same as above. Web app only.

### Multi-User / Collaboration
One user, one session, one browser. No shared sessions, no real-time collaboration, no invite links.

### Live Telemetry / Real Integrations
BuildTrace does not connect to ChatGPT, Claude, Cursor, or any live AI tool. It accepts pasted notes only.

### Production Platform Architecture
BuildTrace is a hackathon POC that validates one core flow. Do not attempt to build a broader platform during this event window.

---

## Also Out of Scope

- Rate limiting
- Input sanitization beyond basic hygiene
- Error monitoring (Sentry, etc.)
- Analytics
- Deployment to production (demo from localhost or a simple Vercel deploy is fine)
- Custom domain
- Team accounts
- API key management UI
- Webhooks
- Export to PDF
- Notion integration
- Slack integration
- Email delivery of recaps
- Saved templates
- Replay mode
- Version history

---

## A Note on Scope Creep

BuildTrace may generate ideas worth pursuing later. Write them down in a separate notes file — but do not build them now. The hackathon goal is a clean, demoable POC with a strong story. Stay focused.
