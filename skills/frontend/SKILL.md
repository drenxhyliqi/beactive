---
name: frontend
description: Building UI in apps/frontend — Next.js 15 App Router conventions, the color-token system, fonts, shared @beactive/ui primitives, data access through lib/api.ts, async params, and the anonymous-audience session_id pattern. Use when creating or editing a page/component, styling with the palette, or wiring the audience /join flow.
---

Building UI in `apps/frontend`. Assumes the **golden rules** in [README](../README.md).

## Conventions

- Next.js 15 **App Router**, React 19, TypeScript strict, Tailwind CSS **v3**.
- Components `PascalCase`; hooks `use*`. Path alias `@/*` → `apps/frontend/*`.
- Server Components by default; add `'use client'` only for state, effects, refs, browser APIs, or
  event handlers.

## Color tokens

The palette lives once in `globals.css` `:root`; `tailwind.config.ts` maps each variable to a
token. Reach for these tokens — never raw hex:

- `bg-primary`, `bg-primary-hover`, `bg-primary-light`, `bg-primary-soft`
- `bg-secondary`, `bg-accent`, `bg-highlight`, `bg-surface`, `bg-background`
- `text-text`, `text-text-secondary`, `border-border`
- status: `success`, `warning`, `danger`, `info` (as `bg-*`/`text-*`)

Opacity helpers are fine (`bg-success/10`).

## Typography

Inter via `font-sans` (default on `body`); Plus Jakarta Sans via `font-heading` (auto-applied to
`h1–h6`). Use the Tailwind type scale.

## Shared UI

```tsx
import { Button, Card, Badge, cn } from '@beactive/ui';
```

- `Button`: variants `primary | secondary | outline | ghost | danger`; sizes `sm | md | lg`.
- `Badge`: variants `default | success | warning | danger | info`.
- `cn(...)` composes conditional classes. Base CSS classes (`.btn-primary`, `.card`, `.input`)
  exist for quick markup, but prefer the React primitives for anything interactive.

## Icons

Use **`lucide-react`** for every icon — no emoji, no ad-hoc SVG. Size with Tailwind
(`className="h-4 w-4"`, `h-5 w-5`); color inherits via `currentColor`, so set it with text tokens
(`text-primary`, `text-text-secondary`). Dark/light toggle uses `Sun`/`Moon`.

## Data access

All backend calls go through `apps/frontend/lib/api.ts` (`apiRequest<T>`, base URL from
`NEXT_PUBLIC_API_URL`). Until a step wires the backend, render **mock data** defined locally in the
page — no API calls.

## Pages

- One `app/.../page.tsx` per route, each exporting `metadata` with a `title`.
- Next 15 params are async: `({ params }: { params: Promise<{ id: string }> })` →
  `const { id } = await params;`.

## Audience pages (`/join`, `/join/[code]`)

The audience is **anonymous**: identify a participant by a `session_id` in `localStorage`
(generate once with `crypto.randomUUID()`, reuse). The 6-char code is uppercase; display it in
pairs ("X4 K9 P2") but store/transmit the raw six ("X4K9P2").
