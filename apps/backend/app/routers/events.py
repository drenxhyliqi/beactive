"""Events router — list/create events, public join-by-code, activate.

Endpoints are implemented in a later step.
"""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(prefix="/events", tags=["events"])
