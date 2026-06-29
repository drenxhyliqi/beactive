---
name: backend
description: Building the API in apps/backend — FastAPI structure, async-SQLAlchemy session injection, the full endpoint map, JWT host auth vs anonymous audience endpoints, Pydantic schemas, error codes, and CORS. Use when adding or editing a router/endpoint, wiring auth, defining request/response schemas, or deciding which routes need authentication.
---

Building the API in `apps/backend`. Assumes the **golden rules** in [README](../README.md).

## Conventions

FastAPI, Python 3.12, async SQLAlchemy 2.0, Pydantic v2, JWT auth, Redis for live state.
`snake_case`, full type hints, `from __future__ import annotations` at the top of each module.

## Structure

```
app/
├── main.py      # FastAPI app, CORS, health, router includes
├── config.py    # settings (pydantic-settings)
├── database.py  # async engine, async_session_factory, Base, get_db
├── models/      # SQLAlchemy ORM models
├── schemas/     # Pydantic request/response models
└── routers/     # auth, events, interactions, ws
```

One `APIRouter` per domain file (prefix + tags set). Register new routers in `main.py`. Inject a
session with `db: AsyncSession = Depends(get_db)`.

## Endpoint map

```
POST   /auth/register
POST   /auth/login
GET    /events/                          host's events        (auth)
POST   /events/                          create event         (auth)
GET    /events/join/{code}               join-by-code         (no auth)
PATCH  /events/{id}/activate             toggle active        (auth)
POST   /events/{event_id}/interactions   create interaction   (auth)
POST   /interactions/{id}/go-live        activate live        (auth)
POST   /interactions/{id}/respond        submit response      (no auth)
GET    /interactions/{id}/results        results
WS     /ws/{event_code}                  realtime channel
```

## Auth

Hosts register/login → bcrypt-hashed password (passlib) → JWT (python-jose) signed with
`settings.jwt_secret`/`settings.jwt_algorithm`. Gate host routes with a `get_current_user`
dependency. The audience endpoints above marked `(no auth)` — plus the WS channel — are
unauthenticated, scoped by event code + a client-supplied `session_id`.

## Schemas & errors

- A Pydantic model for every request body and response. Return ORM objects through response schemas
  (`model_config = ConfigDict(from_attributes=True)`). Never expose `hashed_password`.
- Raise `HTTPException` with precise codes: 401 unauthenticated, 403 forbidden, 404 not found,
  409 conflict (duplicate email / code). Keep messages safe — no internals, no secrets.
- CORS origins come from `settings.cors_origins_list` (env `CORS_ORIGINS`); never hardcode.
