---
name: websocket
description: The realtime layer behind polls, quizzes, Q&A, and idea walls — the /ws/{event_code} channel, the host/audience message protocol mirrored from @beactive/types, Redis live state and one-vote dedupe, the typical interaction flow, and reconnect resync. Use when implementing or debugging the WebSocket handler, the realtime client, or live tallies.
---

The live channel behind polls, quizzes, Q&A, and idea walls.

## Channel

`WS /ws/{event_code}` (in `app/routers/ws.py`). One room per event code; host and audience share
it. Keep a per-code connection registry — add on connect, drop on disconnect. For horizontal scale,
fan out across processes via **Redis pub/sub** keyed by event code.

## Protocol

JSON objects keyed by `type`, mirroring the `ClientMessage` / `ServerMessage` unions in
`@beactive/types` — the single source of truth; keep both sides in sync.

```
Host → Server:      { "type": "activate_interaction", "interaction": { ... } }
Server → All:       { "type": "interaction_activated", "interaction": { ... } }

Audience → Server:  { "type": "response_submitted", "interaction_id", "results": { ... } }
Server → All:       { "type": "results_updated", "interaction_id", "results": { ... } }

Host → Server:      { "type": "end_interaction" }
Server → All:       { "type": "interaction_ended" }
```

- Validate every inbound message; reject unknown `type`s. Malformed JSON must never crash the room.
- Broadcasts reach all clients in the room.
- Only the host may `activate_interaction` / `end_interaction`; the audience may only
  `response_submitted`. Enforce it (host via token on connect, audience via `session_id`).

## Live state in Redis

During a live event Redis is the fast path and holds authoritative tallies; Postgres stores the
canonical records. Suggested keys per interaction: `interaction:{id}:results`,
`interaction:{id}:voters` (a set of `session_id`s for one-vote dedupe), quiz
`interaction:{id}:leaderboard` (sorted set).

## Flow (typical poll)

1. Host `POST /interactions/{id}/go-live` (sets `is_live`) → emits `activate_interaction`.
2. Server broadcasts `interaction_activated`; audiences render it.
3. Audience `POST /interactions/{id}/respond` (writes Postgres + updates Redis) → server broadcasts
   `results_updated`.
4. Host emits `end_interaction` → server broadcasts `interaction_ended`.

## Robustness

On connect, resync the joiner: send the active interaction + latest results so a reconnect or
refresh recovers state. Dedupe votes by `session_id` (the Redis voters set) so a refresh can't
double-count.
