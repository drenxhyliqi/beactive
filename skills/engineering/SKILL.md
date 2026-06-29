---
name: engineering
description: Cross-cutting workflow for the beactive monorepo — layout, commands, the one-route-at-a-time build order, where new code goes, and commit conventions. Read this first. Use when setting up the repo, running dev/build/lint, deciding which package new code belongs in, or asking what to build next.
---

Cross-cutting practices for the beactive monorepo. Read first. Assumes the **golden rules** in
[README](../README.md).

## Monorepo layout

```
apps/frontend → Next.js 15 frontend
apps/backend  → FastAPI backend
packages/types  → @beactive/types  (shared TS interfaces, no runtime code)
packages/ui     → @beactive/ui     (Button, Card, Badge, cn)
packages/config → @beactive/config (tsconfig.base.json)
```

pnpm workspaces + Turborepo. Node ≥ 20, Python 3.12.

## Commands

```bash
pnpm install                 # install JS workspaces
pnpm --filter frontend dev   # frontend  → http://localhost:3000
pnpm type-check              # tsc --noEmit across packages
pnpm lint                    # lint across packages
pnpm --filter frontend build # prod build — also validates types + every route

# backend (apps/backend, Python 3.12 venv)
uvicorn app.main:app --reload   # http://localhost:8000  (GET /health → {"status":"ok"})
```

## Build order

The product is built one route at a time. Do not skip ahead; each route ships a `<Placeholder />`
until its step arrives.

1. Landing `/`
2. `/auth/register` + `/auth/login`
3. `/dashboard`
4. `/dashboard/events/new` + `/dashboard/events/[id]`
5. `/dashboard/events/[id]/present`
6. `/join` + `/join/[code]`

## Where new code goes

- Shared model shapes → `@beactive/types` (keep it runtime-free). Don't redeclare them in the app.
- Reusable UI primitive → `@beactive/ui`. Page-specific components → `apps/frontend/components`.

## Commits

Conventional Commits, scoped to one logical change. Don't commit unless asked.

## Done

Run [grill-me](../grill-me/SKILL.md) before declaring any task finished. That checklist is the gate.
