"""FastAPI application entrypoint.

Wires CORS, a health check, and the (currently empty) router stubs. Business logic
lands in a later step.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, events, interactions, ws

app = FastAPI(title="beactive API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
async def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth.router)
app.include_router(events.router)
app.include_router(interactions.router)
app.include_router(ws.router)
