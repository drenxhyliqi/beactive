# beactive Skills

Focused playbooks for working on beactive — one skill per area, each a `SKILL.md` in its own
subfolder. This README is the router: it points to each skill and holds the **golden rules**
(their single source of truth). Skills go deeper per area but never contradict the root
[`CLAUDE.md`](../CLAUDE.md).

## Index

| Skill | Reach for it when |
| --- | --- |
| [engineering](./engineering/SKILL.md) | Monorepo, commands, build order, commits — read first. |
| [frontend](./frontend/SKILL.md) | Next.js 15 pages/components, color tokens, fonts, data access. |
| [backend](./backend/SKILL.md) | FastAPI routers, auth, schemas, the endpoint map. |
| [database](./database/SKILL.md) | Async SQLAlchemy models, the core tables, JSONB, migrations. |
| [websocket](./websocket/SKILL.md) | The `/ws/{event_code}` channel, message protocol, Redis state. |
| [grill-me](./grill-me/SKILL.md) | The done-gate: interrogate work before declaring it finished. |
| [review](./review/SKILL.md) | Two-axis (Standards + Spec) review of a diff since a fixed point. |

## Invoking a skill

Each skill is a `SKILL.md` carrying `name` / `description` frontmatter. Reach for one by its
`name` (e.g. `review`, `frontend`) when its description matches the task, or open the file
directly. Start from [engineering](./engineering/SKILL.md) and consult the area skill for whatever
you're touching; run [grill-me](./grill-me/SKILL.md) before calling any task done.

## Golden rules

The non-negotiables. Every skill assumes them; none restates them.

1. **One page per session.** Build only the page you were asked for, and only one. Mock data
   first — no real API calls until explicitly asked.
2. **Tokens only.** Color appears as a Tailwind token or CSS variable. The sole place hex literals
   live is `globals.css` `:root`.
3. **One door to the backend.** All frontend network access goes through `apps/frontend/lib/api.ts`.
4. **Anonymous audience.** The `/join` path never requires login; a participant is identified only
   by a `session_id` in `localStorage`.
5. **Conventional Commits.** `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

When you find a better pattern or a sharp edge, update the relevant skill in the same PR
(`docs:` commit) so the knowledge compounds.
