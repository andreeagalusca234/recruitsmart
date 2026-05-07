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
- File upload/download routes for CVs, JDs, contact imports, and other files
- Local file storage for development
- S3-compatible storage config for AWS S3 or Cloudflare R2
- Postgres-ready via `DATABASE_URL`

## Auth

The MVP backend has simple email/password auth with signed bearer tokens.

Seeded demo credentials:

```text
email: demo@london.edu
password: demo-password
```

Endpoints:

```text
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout
```

Use the returned token in frontend requests:

```text
Authorization: Bearer <access_token>
```

## File Storage

Local development uses:

```text
STORAGE_BACKEND=local
LOCAL_STORAGE_DIR=./storage
```

Upload files through:

```text
POST /api/files/upload
```

Use multipart form data:

- `upload`: file
- `file_kind`: `CV`, `JOB_DESCRIPTION`, `CONTACT_IMPORT`, or `OTHER`
- `user_id`: user id
- `company_id`: optional
- `job_id`: optional

For production S3-compatible storage:

```text
STORAGE_BACKEND=s3
S3_BUCKET=recruitsmart-files
S3_REGION=auto
S3_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
```
