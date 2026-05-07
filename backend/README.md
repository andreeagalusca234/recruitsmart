# RecruitSmart Backend

FastAPI backend scaffold for RecruitSmart LBS.

## Run Locally

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

## Current Scope

- Demo SQLite storage by default
- SQLModel database models
- Seeded demo data on startup
- API routes for companies, contacts, jobs, applications, checklist, notifications, and AI stubs
- Postgres-ready via `DATABASE_URL`
