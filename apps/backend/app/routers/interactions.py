"""Interactions router — create, go-live, respond, results.

Endpoints are implemented in a later step.
"""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(prefix="/interactions", tags=["interactions"])
