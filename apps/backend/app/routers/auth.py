"""Auth router — POST /auth/register, POST /auth/login.

Endpoints are implemented in a later step.
"""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])
