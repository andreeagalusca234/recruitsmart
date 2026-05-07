# Database

RecruitSmart should use Postgres in production. For local backend development, the FastAPI app defaults to SQLite:

```text
DATABASE_URL=sqlite:///./recruitsmart.db
```

For production, set:

```text
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:5432/recruitsmart
```

## Current Database Assets

- `prisma/` keeps the original Prisma schema and migration from the first scaffold.
- The new FastAPI backend uses SQLModel models in `backend/app/models.py`.
- Alembic migrations should be added once the FastAPI schema stabilises.
