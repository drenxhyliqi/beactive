# beactive

A live event interaction platform (similar to Slido). Hosts create events with polls, Q&A,
quizzes, idea walls, and multiple-choice interactions and control them live. Audiences join
anonymously by scanning a QR code or typing a 6-character code — no login required.

## Monorepo

```
beactive/
├── apps/
│   ├── frontend/     → Next.js 15 frontend (TypeScript, Tailwind v3)
│   └── backend/      → FastAPI backend (Python 3.12, async SQLAlchemy, WebSockets)
└── packages/
    ├── types/        → Shared TypeScript types (@beactive/types)
    ├── ui/           → Shared React components (@beactive/ui)
    └── config/       → Shared tsconfig.base.json (@beactive/config)
```

## Getting started

Requirements: Node ≥ 20, pnpm 10, Python 3.12.

```bash
pnpm install           # install JS workspaces

# Frontend
pnpm --filter frontend dev  # http://localhost:3000

# Backend (from apps/backend)
python -m venv .venv && source .venv/Scripts/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload                            # http://localhost:8000
```

## Scripts (root)

- `pnpm dev` — run all dev servers via Turborepo
- `pnpm build` — build all workspaces
- `pnpm lint` — lint all workspaces
- `pnpm type-check` — type-check all workspaces

## Deploying the frontend to Vercel

The landing site (`apps/frontend`) is a standard Next.js 15 app and deploys to Vercel from this
monorepo. Import the Git repository in Vercel, then set:

- **Root Directory:** `apps/frontend` (this is the key setting — Vercel then auto-detects Next.js,
  the pnpm workspace, and Turborepo; install/build/output commands can be left on their defaults).
- **Environment variables** (Project → Settings → Environment Variables): see
  [`apps/frontend/.env.example`](./apps/frontend/.env.example). All are optional for the landing
  site today — `NEXT_PUBLIC_SITE_URL` defaults to the deployment URL, and the backend isn't wired
  up yet.

Vercel installs from the workspace root automatically (it detects `pnpm-workspace.yaml`). To verify
a production build locally before deploying:

```bash
pnpm --filter frontend build
```

See [CLAUDE.md](./CLAUDE.md) for project conventions and the incremental build plan.
