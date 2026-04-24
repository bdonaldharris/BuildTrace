# BuildTrace — Scaffold Instructions

Step-by-step commands to create the app from scratch.

---

## Step 1: Create the Next.js App

```bash
npx create-next-app@latest buildtrace \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

When prompted:
- Use `buildtrace` as the project name (or the current directory)
- Accept all defaults

```bash
cd buildtrace
npm run dev
```

Confirm the app runs at `http://localhost:3000` before continuing.

---

## Step 2: Install shadcn/ui

```bash
npx shadcn@latest init
```

When prompted, choose:
- Style: Default
- Base color: Slate (or your preference)
- CSS variables: Yes

---

## Step 3: Add shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add textarea
npx shadcn@latest add tabs
npx shadcn@latest add badge
```

---

## Step 4: Create the Folder Structure

```bash
mkdir -p components lib docs
```

Create placeholder files:

```bash
touch components/build-input.tsx
touch components/timeline-view.tsx
touch components/insight-panel.tsx
touch components/publish-output-tabs.tsx
touch components/sample-loader.tsx
touch lib/types.ts
touch lib/sample-data.ts
touch lib/mock-recap.ts
touch lib/generate-recap.ts
touch lib/prompts.ts
mkdir -p app/api/generate-recap
touch app/api/generate-recap/route.ts
```

---

## Step 5: Set Up Environment Variables

```bash
cp .env.example .env.local
```

Create `.env.example`:

```
# Optional: add your OpenAI key to enable live AI generation
# The app works without this key using the built-in mock fallback
OPENAI_API_KEY=
```

Add `.env.local` to `.gitignore` (it should already be there in Next.js).

---

## Step 6: Confirm Folder Structure

Your project should look like:

```
buildtrace/
  app/
    page.tsx
    layout.tsx
    globals.css
    api/
      generate-recap/
        route.ts
  components/
    build-input.tsx
    timeline-view.tsx
    insight-panel.tsx
    publish-output-tabs.tsx
    sample-loader.tsx
  lib/
    types.ts
    sample-data.ts
    mock-recap.ts
    generate-recap.ts
    prompts.ts
  docs/
    PROJECT_SPEC.md
    MVP_SCOPE.md
    UX_FLOW.md
    DATA_MODEL.md
    AI_PROMPTING.md
    DEMO_SCRIPT.md
    HACKATHON_CHECKLIST.md
    OUT_OF_SCOPE.md
    SCAFFOLD_INSTRUCTIONS.md
  components/ui/       ← shadcn generated
  .env.example
  .env.local           ← gitignored
  README.md
  package.json
  tailwind.config.ts
  tsconfig.json
```

---

## Step 7: Confirm Dev Server

```bash
npm run dev
```

Open `http://localhost:3000`. The default Next.js page should load without errors.

You're ready to build.

---

## Development Commands

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # run ESLint
```

---

## Optional: Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set `OPENAI_API_KEY` as an environment variable in the Vercel dashboard if you want live AI on the deployed version.

For hackathon demo purposes, localhost is fine.
