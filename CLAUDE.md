# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**beactive** is a live event interaction platform (similar to Slido). Hosts create events
containing interactions — polls, Q&A, quizzes, idea walls, and multiple-choice questions —
and control them live during the event. Audiences join anonymously by scanning a QR code or
typing a 6-character code at `beactive.co/join`; no login is required for them.

Two user roles:

- **HOST** (authenticated): registers/logs in, creates events, builds interactions before the
  event, controls them live from a "remote control" presenter panel, and sees live results.
- **AUDIENCE** (anonymous): scans a QR code or types the 6-character code. No login — only a
  `session_id` stored in `localStorage` identifies the participant.

## Tech Stack

- **Frontend** — Next.js 15 (App Router), TypeScript, Tailwind CSS **v3**.
- **Backend** — FastAPI (Python 3.12), SQLAlchemy async, WebSockets.
- **Database** — PostgreSQL via Supabase.
- **Cache** — Redis (live state for polls/quizzes).
- **Monorepo** — Turborepo with **pnpm** workspaces.

## Folder Structure

```
beactive/
├── apps/
│   ├── frontend/     → Next.js 15 frontend
│   └── backend/      → FastAPI backend
└── packages/
    ├── types/        → Shared TypeScript types (@beactive/types)
    ├── ui/           → Shared React components (@beactive/ui): Button, Card, Badge
    └── config/       → Shared tsconfig.base.json (@beactive/config)
```

Within `apps/frontend`: `app/` (routes), `components/` (shared client components), `lib/` (clients
and utilities — including `lib/api.ts`). Within `apps/backend`: `app/` with `models/`, `schemas/`,
`routers/`, plus `main.py`, `config.py`, `database.py`.

## Color Palette

Defined once as CSS variables in `apps/frontend/app/globals.css` `:root` and mapped to Tailwind
tokens in `apps/frontend/tailwind.config.ts`. **Never hardcode hex values anywhere else** — always
use the CSS variable or its Tailwind token.

```css
:root {
  --primary: #6D28D9;
  --primary-hover: #5B21B6;
  --primary-light: #8B5CF6;
  --primary-soft: #EDE9FE;
  --secondary: #4F46E5;
  --accent: #7C3AED;
  --highlight: #06B6D4;
  --background: #FAFAFC;
  --surface: #FFFFFF;
  --text: #18181B;
  --text-secondary: #71717A;
  --border: #E4E4E7;
  --success: #16A34A;
  --warning: #F59E0B;
  --danger: #DC2626;
  --info: #2563EB;
}
```

Fonts: **Inter** (body) + **Plus Jakarta Sans** (headings), loaded via `next/font` and exposed
as `--font-inter` / `--font-jakarta`. Visual style: clean, minimal, friendly (Linear / Loom).

## Coding Conventions

- **TypeScript strict mode** everywhere; no implicit `any`.
- **Never hardcode colors.** Use CSS variables (`var(--primary)`) or Tailwind tokens
  (`bg-primary`, `text-text-secondary`, `border-border`). The only place hex literals appear
  is the `:root` block in `globals.css`.
- **Components** are named in `PascalCase` (e.g., `EventCard.tsx`).
- **Hooks** are prefixed with `use-` / `use` (e.g., `useEventChannel`).
- **All frontend API calls go through `apps/frontend/lib/api.ts`.** No `fetch`/axios calls scattered
  in components.
- **Shared types** live in `@beactive/types`; shared UI primitives in `@beactive/ui`. Import
  across the monorepo rather than duplicating.
- **Python** uses `snake_case`, async SQLAlchemy, and Pydantic schemas for I/O.

## Page Building Rules

This project is built **incrementally, one page per session**:

- **Never build more than one page per session.**
- **Use mock data first.** Pages render with mock/placeholder data until wired up.
- **Never add real API calls until explicitly asked.** Until a route's step arrives, its page
  renders only a placeholder (`<Placeholder title="..." />`).

Planned build order (do not skip ahead):

1. Landing page (`/`)
2. `/auth/register` + `/auth/login`
3. `/dashboard` (event list)
4. `/dashboard/events/new` + `/dashboard/events/[id]`
5. `/dashboard/events/[id]/present` (live control panel)
6. `/join` + `/join/[code]` (audience experience)

## Git Conventions

Use **Conventional Commits**:

- `feat:` — a new feature
- `fix:` — a bug fix
- `chore:` — tooling, deps, config, scaffolding
- `docs:` — documentation only
- `refactor:` — code change that neither fixes a bug nor adds a feature
