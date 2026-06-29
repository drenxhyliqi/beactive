# beactive API

FastAPI backend for beactive. This is currently the structural scaffold: app wiring,
configuration, an async database session skeleton, a health endpoint, and empty router
stubs. Models, schemas, auth, and the WebSocket handler are implemented in a later step.

## Run locally

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

uvicorn app.main:app --reload   # http://localhost:8000
```

Health check: `GET http://localhost:8000/health` → `{"status": "ok"}`
Interactive docs: `http://localhost:8000/docs`
