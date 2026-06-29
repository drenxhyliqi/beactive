---
name: grill-me
description: The done-gate — a checklist to interrogate beactive work before declaring it finished, covering scope discipline, the project conventions (color tokens, lib/api.ts, naming), correctness (type-check/lint/build, async params, auth gating, WS protocol), UX, and honesty. Use right before claiming any task is done, or when reviewing whether a change is truly complete.
---

The single gate before any task is "done". Interrogate the work; if a relevant box can't be
checked, you're not done — fix it, or state plainly what's outstanding and why. Checks the
**golden rules** ([README](../README.md)) plus correctness.

## Scope

- [ ] Built **only** what was asked — and only one page if this was a page step.
- [ ] Used mock data where real API calls weren't requested.
- [ ] Left unrelated files, pages, and config untouched.
- [ ] Anything deferred was said out loud, not silently skipped.

## Conventions

- [ ] No hex outside `globals.css` `:root` — color via tokens only.
- [ ] All frontend network access goes through `apps/frontend/lib/api.ts`.
- [ ] `PascalCase` components, `use*` hooks, `snake_case` Python.
- [ ] Shared types pulled from `@beactive/types`, UI from `@beactive/ui` — not redeclared.
- [ ] Inter body / Plus Jakarta headings, correct type scale.

## Correctness

- [ ] `pnpm type-check` and `pnpm lint` pass.
- [ ] Frontend: `pnpm --filter frontend build` passes. Backend: app imports, `GET /health` → 200.
- [ ] Next 15 async `params` awaited where used.
- [ ] Audience flows need no login; identified by `session_id`. Host-only actions are gated to the host.
- [ ] WS `type`s match the `@beactive/types` protocol on both ends; votes deduped by `session_id`;
      DB columns still match their TS interfaces.

## UX

- [ ] Responsive at mobile and desktop. Accessible: labels, `focus-visible` rings, contrast,
      keyboard usable.
- [ ] Loading / empty / error states considered, even when mocked.

## Honesty

- [ ] A failed build/test was reported with its output — never dressed up as success.
- [ ] Assumptions surfaced. What I said I did matches what I actually did.
