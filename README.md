# RecruitSmart LBS

RecruitSmart LBS is a Streamlit app for London Business School MBA students managing their recruitment pipeline with the TIER framework: Target, Identify, Evaluate, Rank.

The app is stored on GitHub and runs in the browser through Streamlit.

## Run Locally

From the project folder:

```bash
cd D:\am01-code-sep2025\recruitsmart
python -m pip install -r requirements-streamlit.txt
python -m streamlit run streamlit_app.py
```

Open the browser URL Streamlit prints, usually:

```text
http://localhost:8501
```

## Deploy On Streamlit Cloud

1. Go to [share.streamlit.io](https://share.streamlit.io).
2. Sign in with GitHub.
3. Choose this repo: `andreeagalusca234/recruitsmart`.
4. Set the main file path to:

```text
streamlit_app.py
```

5. Deploy.

## What Is Included

- Streamlit sidebar navigation
- Onboarding wizard shell
- Dashboard checklist
- Target company list with tiers and vote status
- Company intelligence tabs
- Daily target list workflow
- Contact tracker and meeting notes
- Job description capture with mocked parsing output
- Pipeline board
- Notification centre
- Settings page

## Data And AI

The app currently uses in-memory demo data and mocked AI outputs. It does not call external APIs or real LLMs yet.

## Optional Next.js Scaffold

The repo also contains the earlier Next.js/Prisma scaffold under `src/` and `prisma/`. That code is kept for reference, but the primary runnable app is now:

```text
streamlit_app.py
```
