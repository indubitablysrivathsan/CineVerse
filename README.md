# CineVerse – Intelligent Arthouse Film Companion

Monorepo containing:

- `backend/` – Node.js + Express API (currently exposes `/health`)
- `frontend/` – React + Vite SPA (currently shows CineVerse landing)
- `nlp-service/` – Python FastAPI microservice (currently exposes `/health`)

## Running locally

### Backend

```bash
cd backend
npm install
npm run dev