"""WebSocket router — /ws/{event_code} real-time channel.

The bidirectional handler (activate/results/end message broadcasting) is
implemented in a later step.
"""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(tags=["websocket"])
