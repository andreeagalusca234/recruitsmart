from __future__ import annotations

from datetime import date
from typing import Any

import streamlit as st


def seed_state() -> None:
    if "companies" in st.session_state:
        return

    st.session_state["profile"] = {
        "name": "Maya Patel",
        "email": "demo@london.edu",
        "persona": "Career switcher",
        "target_role": "Strategy Consultant",
        "target_industry": "Consulting",
        "target_geography": "London",
        "cv_uploaded": True,
    }

    st.session_state["companies"] = [
        {
            "id": "mckinsey",
            "name": "McKinsey & Company",
            "tier": "DREAM",
            "sector": "Management consulting",
            "size": "45,000+",
            "location": "New York, major London office",
            "fit": 91,
            "vote": "Upvoted",
            "rationale": "Strong MBA pathway and direct fit for strategy consulting ambitions.",
        },
        {
            "id": "bcg",
            "name": "Boston Consulting Group",
            "tier": "DREAM",
            "sector": "Management consulting",
            "size": "30,000+",
            "location": "Boston, major London office",
            "fit": 89,
            "vote": "None",
            "rationale": "High fit for strategy roles, London MBA hiring, and alumni access.",
        },
        {
            "id": "bain",
            "name": "Bain & Company",
            "tier": "DREAM",
            "sector": "Management consulting",
            "size": "19,000+",
            "location": "Boston, London office",
            "fit": 88,
            "vote": "None",
            "rationale": "Strong LBS brand match with a private equity strategy angle.",
        },
        {
            "id": "deloitte",
            "name": "Deloitte",
            "tier": "TARGET",
            "sector": "Consulting",
            "size": "450,000+",
            "location": "London and global network",
            "fit": 82,
            "vote": "Upvoted",
            "rationale": "Good route into strategy and transformation with broad London hiring.",
        },
        {
            "id": "accenture",
            "name": "Accenture Strategy",
            "tier": "TARGET",
            "sector": "Strategy and technology consulting",
            "size": "700,000+",
            "location": "Dublin, major London office",
            "fit": 77,
            "vote": "None",
            "rationale": "Practical fit for strategy roles with a digital transformation flavour.",
        },
        {
            "id": "eyp",
            "name": "EY-Parthenon",
            "tier": "TARGET",
            "sector": "Strategy consulting",
            "size": "9,000+",
            "location": "Boston and global network",
            "fit": 80,
            "vote": "None",
            "rationale": "Strong strategy brand with MBA-relevant London opportunities.",
        },
        {
            "id": "cil",
            "name": "CIL Management Consultants",
            "tier": "SAFETY",
            "sector": "Boutique strategy consulting",
            "size": "250+",
            "location": "London",
            "fit": 73,
            "vote": "None",
            "rationale": "Boutique safety option with direct London networking paths.",
        },
        {
            "id": "elixirr",
            "name": "Elixirr",
            "tier": "SAFETY",
            "sector": "Boutique consulting",
            "size": "500+",
            "location": "London",
            "fit": 70,
            "vote": "None",
            "rationale": "Good safety option for entrepreneurial consulting experience.",
        },
    ]

    st.session_state["contacts"] = [
        {"id": "aisha", "name": "Aisha Khan", "company_id": "mckinsey", "role": "Engagement Manager", "warmth": 4, "last": "2026-05-01"},
        {"id": "thomas", "name": "Thomas Reed", "company_id": "mckinsey", "role": "Associate Partner", "warmth": 3, "last": "2026-04-23"},
        {"id": "priya", "name": "Priya Narayan", "company_id": "bcg", "role": "Project Leader", "warmth": 5, "last": "2026-05-04"},
        {"id": "james", "name": "James Whitmore", "company_id": "bcg", "role": "Principal", "warmth": 2, "last": "2026-04-10"},
        {"id": "sophia", "name": "Sophia Chen", "company_id": "bain", "role": "Consultant", "warmth": 3, "last": "2026-04-29"},
        {"id": "omar", "name": "Omar Haddad", "company_id": "deloitte", "role": "Senior Manager", "warmth": 4, "last": "2026-05-02"},
    ]

    st.session_state["jobs"] = [
        {"id": "job-mck", "company_id": "mckinsey", "title": "Associate, London", "platform": "Company site", "deadline": "2026-06-14", "fit": 84},
        {"id": "job-bcg", "company_id": "bcg", "title": "Consultant, London", "platform": "LinkedIn", "deadline": "2026-06-01", "fit": 81},
        {"id": "job-del", "company_id": "deloitte", "title": "Strategy Manager, Monitor Deloitte", "platform": "MyCareer", "deadline": "2026-05-22", "fit": 76},
        {"id": "job-cil", "company_id": "cil", "title": "Consultant, Growth Strategy", "platform": "Company site", "deadline": "2026-04-15", "fit": 73},
    ]

    st.session_state["applications"] = [
        {"id": "app-mck", "job_id": "job-mck", "stage": "Researching"},
        {"id": "app-bcg", "job_id": "job-bcg", "stage": "Applied"},
        {"id": "app-del", "job_id": "job-del", "stage": "Interview"},
        {"id": "app-cil", "job_id": "job-cil", "stage": "Offer"},
    ]

    st.session_state["checklist"] = [
        {"label": "Send follow-up note to Aisha with revised CV", "company_id": "mckinsey", "due": "2026-05-08", "done": False},
        {"label": "Finish BCG cover letter proofread", "company_id": "bcg", "due": "2026-05-06", "done": True},
        {"label": "Prepare two market-entry cases before Deloitte interview", "company_id": "deloitte", "due": "2026-05-10", "done": False},
        {"label": "Compare CIL offer with target compensation range", "company_id": "cil", "due": "2026-05-12", "done": False},
    ]

    st.session_state["notifications"] = [
        {"type": "FOLLOW_UP", "message": "Follow up with Aisha Khan about McKinsey referral timing.", "read": False},
        {"type": "DEADLINE", "message": "Deloitte interview prep checklist is due this weekend.", "read": False},
        {"type": "DAILY_LIST", "message": "Your daily target list is ready with 10 new suggestions.", "read": True},
    ]

    st.session_state["meeting_notes"] = {
        "aisha": [
            {
                "date": "2026-05-01",
                "notes": "Discussed London office staffing, personal story, and referral timing.",
                "summary": "Apply early, tighten the career-switcher story, and follow up with a referral-ready CV.",
                "follow_up": True,
            }
        ],
        "priya": [
            {
                "date": "2026-05-04",
                "notes": "Talked through case prep cadence and London office fit.",
                "summary": "Focus on structured creativity, sector curiosity, and collaborative leadership examples.",
                "follow_up": False,
            }
        ],
    }


def company_by_id(company_id: str) -> dict[str, Any]:
    return next(company for company in st.session_state["companies"] if company["id"] == company_id)


def job_by_id(job_id: str) -> dict[str, Any]:
    return next(job for job in st.session_state["jobs"] if job["id"] == job_id)


def tier_badge(tier: str) -> str:
    return f"**{tier}**"


def warmth(score: int) -> str:
    return "●" * score + "○" * (5 - score)


def mock_parse_jd(jd_text: str) -> dict[str, Any]:
    del jd_text
    return {
        "fit": 78,
        "skills": ["case problem solving", "stakeholder management", "market sizing", "Excel modelling"],
        "gaps": ["Add one quantified transformation story", "Strengthen sector-specific examples"],
    }


def render_dashboard() -> None:
    st.header("Dashboard")
    st.caption("Prioritised recruitment actions across targets, contacts, deadlines, and applications.")

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Tracked companies", len(st.session_state["companies"]))
    c2.metric("Applications", len(st.session_state["applications"]))
    c3.metric("Open tasks", sum(not item["done"] for item in st.session_state["checklist"]))
    c4.metric("Unread alerts", sum(not item["read"] for item in st.session_state["notifications"]))

    st.subheader("Master checklist")
    for index, item in enumerate(st.session_state["checklist"]):
        company = company_by_id(item["company_id"])
        cols = st.columns([0.1, 0.55, 0.2, 0.15])
        item["done"] = cols[0].checkbox("Done", value=item["done"], key=f"dashboard-check-{index}", label_visibility="collapsed")
        cols[1].write(item["label"])
        cols[2].caption(company["name"])
        cols[3].caption(item["due"])


def render_onboarding() -> None:
    st.header("Onboarding")
    st.caption("Five-step setup: persona, goals, TIER explainer, CV upload, and confirmation.")

    step = st.radio(
        "Step",
        ["Persona", "Goals", "TIER explainer", "CV upload", "Confirmation"],
        horizontal=True,
        label_visibility="collapsed",
    )

    profile = st.session_state["profile"]
    if step == "Persona":
        profile["persona"] = st.selectbox(
            "Career persona",
            ["Career switcher", "Accelerator", "Geography switcher"],
            index=["Career switcher", "Accelerator", "Geography switcher"].index(profile["persona"]),
        )
    elif step == "Goals":
        c1, c2, c3 = st.columns(3)
        profile["target_role"] = c1.text_input("Target role", profile["target_role"])
        profile["target_industry"] = c2.text_input("Industry", profile["target_industry"])
        profile["target_geography"] = c3.text_input("Geography", profile["target_geography"])
    elif step == "TIER explainer":
        c1, c2, c3, c4 = st.columns(4)
        c1.info("Target\n\nPick dream, target, and safety companies.")
        c2.info("Identify\n\nFind contacts, openings, and referral paths.")
        c3.info("Evaluate\n\nScore fit, gaps, and application readiness.")
        c4.info("Rank\n\nPrioritise actions across deadlines and warmth.")
    elif step == "CV upload":
        st.file_uploader("Upload CV placeholder", type=["pdf", "docx", "txt"])
        st.caption("CV parsing is stubbed for now.")
    else:
        st.success(f"Ready: {profile['persona']} targeting {profile['target_role']} in {profile['target_geography']}.")


def render_company_card(company: dict[str, Any]) -> None:
    with st.container(border=True):
        st.markdown(f"**{company['name']}**")
        st.caption(f"{company['sector']} | {company['size']}")
        st.write(tier_badge(company["tier"]))
        st.progress(company["fit"] / 100, text=f"Fit score {company['fit']}")
        company["vote"] = st.radio(
            "Vote",
            ["Upvoted", "None", "Downvoted"],
            index=["Upvoted", "None", "Downvoted"].index(company["vote"]),
            horizontal=True,
            key=f"vote-{company['id']}",
        )


def render_targets() -> None:
    st.header("Targets")
    tier = st.radio("Tier filter", ["ALL", "DREAM", "TARGET", "SAFETY"], horizontal=True)
    visible = st.session_state["companies"] if tier == "ALL" else [c for c in st.session_state["companies"] if c["tier"] == tier]

    for row in range(0, len(visible), 3):
        cols = st.columns(3)
        for col, company in zip(cols, visible[row : row + 3]):
            with col:
                render_company_card(company)

    st.divider()
    st.subheader("Company intelligence card")
    selected_name = st.selectbox("Select company", [company["name"] for company in st.session_state["companies"]])
    company = next(company for company in st.session_state["companies"] if company["name"] == selected_name)
    company_contacts = [contact for contact in st.session_state["contacts"] if contact["company_id"] == company["id"]]
    company_jobs = [job for job in st.session_state["jobs"] if job["company_id"] == company["id"]]
    company_actions = [item for item in st.session_state["checklist"] if item["company_id"] == company["id"]]

    overview, contacts, jobs, action_plan, notes = st.tabs(["Overview", "Contacts", "Jobs", "Action Plan", "Notes"])
    with overview:
        c1, c2, c3 = st.columns(3)
        c1.metric("Tier", company["tier"])
        c2.metric("Fit score", company["fit"])
        c3.metric("Warm contacts", len(company_contacts))
        st.write(company["rationale"])
        st.caption(f"Location signal: {company['location']}")
    with contacts:
        for contact in company_contacts:
            st.write(f"**{contact['name']}** - {contact['role']} - warmth {warmth(contact['warmth'])}")
        if not company_contacts:
            st.caption("No contacts added yet.")
    with jobs:
        for job in company_jobs:
            st.write(f"**{job['title']}** - {job['platform']} - deadline {job['deadline']} - fit {job['fit']}")
        with st.expander("Add job description"):
            title = st.text_input("Job title", key="job-title")
            url = st.text_input("Job URL", key="job-url")
            platform = st.selectbox("Source platform", ["LinkedIn", "Indeed", "MyCareer", "Company site", "Other"])
            deadline = st.date_input("Deadline", value=date.today())
            jd_text = st.text_area("Job description", height=180)
            if st.button("Parse JD preview"):
                parsed = mock_parse_jd(jd_text)
                st.metric("Mock fit score", parsed["fit"])
                st.write("Skills:", ", ".join(parsed["skills"]))
                st.write("Gaps:", ", ".join(parsed["gaps"]))
            if st.button("Save job"):
                new_id = f"job-{len(st.session_state['jobs']) + 1}"
                st.session_state["jobs"].append(
                    {
                        "id": new_id,
                        "company_id": company["id"],
                        "title": title or "Untitled role",
                        "platform": platform,
                        "deadline": str(deadline),
                        "fit": 78,
                        "url": url,
                    }
                )
                st.success("Job saved.")
    with action_plan:
        if company_actions:
            for item in company_actions:
                st.checkbox(item["label"], value=item["done"], key=f"action-{company['id']}-{item['label']}")
        else:
            st.write("Map two LBS alumni in the London office.")
            st.write("Draft a sector-specific why consulting answer.")
            st.write("Complete one case drill focused on profitability.")
    with notes:
        st.text_area("Company notes", placeholder="Hypotheses, interview prep, outreach ideas...", height=180)


def render_daily() -> None:
    st.header("Daily target list")
    index = st.session_state.setdefault("daily_index", 0)
    companies = st.session_state["companies"]
    if index >= len(companies):
        st.success("Daily list complete.")
        if st.button("Reset daily list"):
            st.session_state["daily_index"] = 0
            st.rerun()
        return

    company = companies[index]
    with st.container(border=True):
        st.write(tier_badge(company["tier"]))
        st.subheader(company["name"])
        st.caption(company["sector"])
        st.progress(company["fit"] / 100, text=f"Fit score {company['fit']}")
        st.write(company["rationale"])
        c1, c2, c3 = st.columns(3)
        for label, column in [("Downvote", c1), ("Skip", c2), ("Upvote", c3)]:
            if column.button(label, key=f"daily-{label}-{company['id']}"):
                st.session_state["daily_index"] += 1
                st.rerun()


def render_contacts() -> None:
    st.header("Contacts")
    for company in st.session_state["companies"]:
        company_contacts = [contact for contact in st.session_state["contacts"] if contact["company_id"] == company["id"]]
        if not company_contacts:
            continue
        st.subheader(company["name"])
        cols = st.columns(3)
        for col, contact in zip(cols, company_contacts):
            with col.container(border=True):
                st.markdown(f"**{contact['name']}**")
                st.caption(contact["role"])
                st.write(f"Warmth: {warmth(contact['warmth'])}")
                st.caption(f"Last interaction: {contact['last']}")

    st.divider()
    st.subheader("Contact detail and meeting notes")
    contact_name = st.selectbox("Select contact", [contact["name"] for contact in st.session_state["contacts"]])
    contact = next(contact for contact in st.session_state["contacts"] if contact["name"] == contact_name)
    company = company_by_id(contact["company_id"])
    st.write(f"**{contact['name']}** - {contact['role']} at {company['name']}")
    st.write(f"Warmth: {warmth(contact['warmth'])}")
    for note in st.session_state["meeting_notes"].get(contact["id"], []):
        with st.container(border=True):
            st.caption(note["date"])
            st.write(note["notes"])
            st.info(note["summary"])
            if note["follow_up"]:
                st.warning("Follow-up needed")

    with st.form("new-note"):
        note_date = st.date_input("Date", value=date.today())
        note_text = st.text_area("Meeting notes")
        follow_up = st.checkbox("Follow-up needed")
        if st.form_submit_button("Save note"):
            st.session_state["meeting_notes"].setdefault(contact["id"], []).append(
                {
                    "date": str(note_date),
                    "notes": note_text,
                    "summary": "Mock summary: capture next step, referral signal, and one tailored follow-up.",
                    "follow_up": follow_up,
                }
            )
            st.success("Meeting note saved.")


def render_pipeline() -> None:
    st.header("Pipeline")
    stages = ["Researching", "Applied", "Interview", "Offer"]
    cols = st.columns(4)
    for stage, col in zip(stages, cols):
        with col:
            st.subheader(stage)
            apps = [app for app in st.session_state["applications"] if app["stage"] == stage]
            if not apps:
                st.caption("No applications.")
            for app in apps:
                job = job_by_id(app["job_id"])
                company = company_by_id(job["company_id"])
                with st.container(border=True):
                    st.write(f"**{job['title']}**")
                    st.caption(company["name"])
                    st.progress(job["fit"] / 100, text=f"Fit {job['fit']}")
                    new_stage = st.selectbox(
                        "Move to",
                        stages,
                        index=stages.index(stage),
                        key=f"stage-{app['id']}",
                    )
                    app["stage"] = new_stage


def render_notifications() -> None:
    st.header("Notifications")
    for index, item in enumerate(st.session_state["notifications"]):
        with st.container(border=True):
            c1, c2 = st.columns([0.8, 0.2])
            c1.write(f"**{item['type']}**")
            item["read"] = c2.checkbox("Read", value=item["read"], key=f"notif-{index}")
            st.write(item["message"])


def render_settings() -> None:
    st.header("Settings")
    profile = st.session_state["profile"]
    profile["name"] = st.text_input("Name", profile["name"])
    profile["email"] = st.text_input("Email", profile["email"])
    profile["persona"] = st.selectbox("Career persona", ["Career switcher", "Accelerator", "Geography switcher"])
    st.checkbox("Deadline reminders", True)
    st.checkbox("Follow-up prompts", True)
    st.checkbox("Daily target list", True)
    st.checkbox("Weekly digest", True)


def main() -> None:
    st.set_page_config(page_title="RecruitSmart LBS", layout="wide")
    seed_state()

    st.sidebar.title("RecruitSmart LBS")
    st.sidebar.caption("Streamlit app for the LBS MBA recruitment pipeline.")
    page = st.sidebar.radio(
        "Navigate",
        ["Dashboard", "Onboarding", "Targets", "Daily", "Contacts", "Pipeline", "Notifications", "Settings"],
    )
    st.sidebar.divider()
    st.sidebar.markdown("**TIER**")
    st.sidebar.caption("Target -> Identify -> Evaluate -> Rank")

    pages = {
        "Dashboard": render_dashboard,
        "Onboarding": render_onboarding,
        "Targets": render_targets,
        "Daily": render_daily,
        "Contacts": render_contacts,
        "Pipeline": render_pipeline,
        "Notifications": render_notifications,
        "Settings": render_settings,
    }
    pages[page]()


if __name__ == "__main__":
    main()
