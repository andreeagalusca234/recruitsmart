# Frontend

This folder currently contains the original Next.js scaffold.

When Lovable code is ready, import it here. If Lovable exports a Vite React app, it can replace this folder's contents while keeping the same high-level contract:

```text
frontend/
  package.json
  src/
  ...
```

The frontend should call the FastAPI backend at:

```text
http://localhost:8000/api
```

## Current Next.js Scaffold

If you want to run the existing scaffold:

```bash
cd frontend
npm install
npm run dev
```
