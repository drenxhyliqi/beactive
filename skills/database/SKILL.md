---
name: database
description: Data modeling for beactive on PostgreSQL (Supabase) with async SQLAlchemy 2.0 — the engine/session setup, the four core tables, UUID/timestamp/FK conventions, per-interaction-type JSONB shapes, event-code generation, and Alembic migrations. Use when adding or changing a model, designing a JSONB payload, or writing a query.
---

Data modeling for beactive. PostgreSQL via Supabase, async SQLAlchemy 2.0.

## Engine & sessions

`app/database.py` owns `engine`, `async_session_factory`, `Base`, `get_db`. Connection string uses
the async driver (`postgresql+asyncpg://...`, env `DATABASE_URL`). Models inherit from `Base` and
use typed `Mapped[...]` / `mapped_column(...)`.

## Core tables

```
users        id, email (unique), name, hashed_password, created_at
events       id, host_id → users.id, title, description, code (6-char unique),
             is_active, created_at
interactions id, event_id → events.id, type, title, options (JSONB),
             is_live, order_index, created_at
responses    id, interaction_id → interactions.id, session_id, participant_name,
             answer (JSONB), score, created_at
```

These mirror `@beactive/types` (`User`, `Event`, `Interaction`, `ParticipantResponse`,
`InteractionType`). A column-shape change updates the TS type in the same PR.

## Conventions

- Primary keys: UUID — stable, non-guessable, safe to expose.
- `created_at`: timezone-aware `DateTime`, server default `now()`.
- Foreign keys explicit; cascade deletes event → interactions → responses.
- `interaction.type` ∈ `poll | qa | quiz | idea_wall | multiple_choice` (matches `InteractionType`).

## JSONB (`options`, `answer`)

Shape is per interaction type and validated at the **Pydantic** layer, not the DB. Examples:

- poll / multiple_choice `options`: `{ "choices": [{ "id", "label" }] }`
- quiz `options`: choices + `correct_id` + `time_limit_seconds` + `points`
- idea_wall `options`: `{ "prompt" }`
- `answer`: `{ "choice_id" }` | `{ "text" }` | quiz `{ "choice_id", "ms" }`

## Codes, migrations, queries

- Event `code`: 6 uppercase alphanumerics, unique; avoid ambiguous chars (no `0/O`, `1/I`);
  regenerate on collision.
- Schema changes go through Alembic (`revision --autogenerate`, `upgrade head`) — never by hand.
- Use 2.0-style `select(...)` through the `AsyncSession`; scope host queries by `host_id` and
  audience reads by event `code` + interaction membership.
