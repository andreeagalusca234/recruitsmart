# RecruitSmart LBS

RecruitSmart LBS is being set up as a GitHub-hosted app with a React frontend, FastAPI backend, and database-backed storage.

## Current Repo Layout

```text
recruitsmart/
  frontend/        React frontend home. Lovable code should be imported here.
  backend/         FastAPI backend with API routes, SQLModel models, and seeded demo data.
  database/        Database notes plus the original Prisma schema and migration.
  prototype/       Streamlit prototype for quick browser demos.
  docker-compose.yml
```

## What Is Ready

- GitHub repo: `andreeagalusca234/recruitsmart`
- Clean folder architecture for Lovable import
- FastAPI backend scaffold
- SQLite local storage by default
- Postgres-ready `DATABASE_URL`
- API routes under `/api`
- Streamlit prototype preserved under `prototype/`
- Original Next.js scaffold preserved under `frontend/`

## Run The Streamlit Prototype

```bash
cd prototype
python -m pip install -r requirements-streamlit.txt
python -m streamlit run streamlit_app.py
```

Open:

```text
http://localhost:8501
```

## Run The FastAPI Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Open:

```text
http://localhost:8000/docs
```

## Import Lovable

When Lovable exports the React code:

1. Create a branch:

```bash
git checkout -b lovable-import
```

2. Put the Lovable React app into `frontend/`.
3. Set the frontend API base URL to:

```text
http://localhost:8000/api
```

4. Replace Lovable mock data with calls to the FastAPI endpoints.

## Hosting Direction

For a 2GB RAM server, use:

- React frontend as static files or a lightweight Node build
- FastAPI backend via Uvicorn/Gunicorn
- Nginx or Caddy as reverse proxy
- Managed Postgres if possible; same-server Postgres is possible but tighter

Do not run local AI models on the 2GB server. Use hosted LLM APIs later.
