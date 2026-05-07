# RecruitSmart LBS

RecruitSmart LBS is a full-stack MVP scaffold for an AI-powered recruitment co-pilot for London Business School MBA students. It uses the TIER framework: Target, Identify, Evaluate, Rank.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local primitives
- Prisma ORM with SQLite for local development
- NextAuth.js credentials provider stub
- Zustand-ready client state dependency

## Getting Started

Install dependencies:

```bash
npm install
```

Generate Prisma client and run the local migration:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

Seed demo data:

```bash
npm run prisma:seed
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`. The root page redirects to `/dashboard`.

## Streamlit Preview

If Node.js is not installed yet, you can open a Python preview in the browser:

```bash
pip install -r requirements-streamlit.txt
streamlit run streamlit_app.py
```

This is a lightweight preview of the product screens. The main implementation is still the Next.js app.

## Demo Data

The seed script creates one LBS MBA demo user, eight consulting-focused companies across Dream, Target, and Safety tiers, contacts, jobs, applications, checklist items, and notifications.

## AI Stubs

Mock AI functions live in `src/lib/ai.ts`. They return deterministic placeholder data for daily targets, JD parsing, action plans, outreach drafts, meeting summaries, LinkedIn PDF parsing, and contact search instructions.

## Notes

This scaffold intentionally does not include real LLM calls, external API integrations, email sending, CV parsing, billing, or an admin panel.
