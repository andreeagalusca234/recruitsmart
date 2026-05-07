from __future__ import annotations

from datetime import date

import streamlit as st


COMPANIES = [
    {"name": "McKinsey & Company", "tier": "DREAM", "sector": "Management consulting", "fit": 91},
    {"name": "Boston Consulting Group", "tier": "DREAM", "sector": "Management consulting", "fit": 89},
    {"name": "Bain & Company", "tier": "DREAM", "sector": "Management consulting", "fit": 88},
    {"name": "Deloitte", "tier": "TARGET", "sector": "Consulting", "fit": 82},
    {"name": "Accenture Strategy", "tier": "TARGET", "sector": "Strategy and technology consulting", "fit": 77},
    {"name": "EY-Parthenon", "tier": "TARGET", "sector": "Strategy consulting", "fit": 80},
    {"name": "CIL Management Consultants", "tier": "SAFETY", "sector": "Boutique strategy consulting", "fit": 73},
    {"name": "Elixirr", "tier": "SAFETY", "sector": "Boutique consulting", "fit": 70},
]

CONTACTS = [
    {"name": "Aisha Khan", "company": "McKinsey & Company", "role": "Engagement Manager", "warmth": 4},
    {"name": "Thomas Reed", "company": "McKinsey & Company", "role": "Associate Partner", "warmth": 3},
    {"name": "Priya Narayan", "company": "Boston Consulting Group", "role": "Project Leader", "warmth": 5},
    {"name": "James Whitmore", "company": "Boston Consulting Group", "role": "Principal", "warmth": 2},
    {"name": "Sophia Chen", "company": "Bain & Company", "role": "Consultant", "warmth": 3},
    {"name": "Omar Haddad", "company": "Deloitte", "role": "Senior Manager", "warmth": 4},
]

APPLICATIONS = [
    {"company": "McKinsey & Company", "title": "Associate, London", "stage": "Researching", "deadline": "2026-06-14", "fit": 84},
    {"company": "Boston Consulting Group", "title": "Consultant, London", "stage": "Applied", "deadline": "2026-06-01", "fit": 81},
    {"company": "Deloitte", "title": "Strategy Manager, Monitor Deloitte", "stage": "Interview", "deadline": "2026-05-22", "fit": 76},
    {"company": "CIL Management Consultants", "title": "Consultant, Growth Strategy", "stage": "Offer", "deadline": "2026-04-15", "fit": 73},
]

CHECKLIST = [
    {"label": "Send follow-up note to Aisha with revised CV", "company": "McKinsey & Company", "due": "2026-05-08", "done": False},
    {"label": "Finish BCG cover letter proofread", "company": "Boston Consulting Group", "due": "2026-05-06", "done": True},
    {"label": "Prepare two market-entry cases before Deloitte interview", "company": "Deloitte", "due": "2026-05-10", "done": False},
    {"label": "Compare CIL offer with target compensation range", "company": "CIL Management Consultants", "due": "2026-05-12", "done": False},
]

NOTIFICATIONS = [
    {"type": "FOLLOW_UP", "message": "Follow up with Aisha Khan about McKinsey referral timing.", "read": False},
    {"type": "DEADLINE", "message": "Deloitte interview prep checklist is due this weekend.", "read": False},
    {"type": "DAILY_LIST", "message": "Your daily target list is ready with 10 new suggestions.", "read": True},
]


def badge(text: str) -> str:
    colours = {
        "DREAM": "#be123c",
        "TARGET": "#b45309",
        "SAFETY": "#047857",
        "Researching": "#334155",
        "Applied": "#2563eb",
        "Interview": "#b45309",
        "Offer": "#047857",
    }
    colour = colours.get(text, "#475569")
    return f"<span style='color:{colour};font-weight:700;font-size:0.78rem'>{text}</span>"


def fit_score(score: int) -> None:
    st.metric("Fit score", score)
    st.progress(score / 100)


def render_dashboard() -> None:
    st.subheader("Dashboard")
    st.caption("Prioritised recruitment actions across targets, contacts, deadlines, and applications.")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Companies", len(COMPANIES))
    c2.metric("Applications", len(APPLICATIONS))
    c3.metric("Open tasks", sum(not item["done"] for item in CHECKLIST))
    c4.metric("Unread alerts", sum(not item["read"] for item in NOTIFICATIONS))

    st.markdown("### Master checklist")
    for item in CHECKLIST:
        cols = st.columns([0.1, 0.55, 0.2, 0.15])
        cols[0].checkbox("", value=item["done"], key=f"check-{item['label']}")
        cols[1].write(item["label"])
        cols[2].caption(item["company"])
        cols[3].caption(item["due"])


def render_onboarding() -> None:
    st.subheader("Onboarding")
    step = st.radio(
        "Setup step",
        ["Persona", "Goals", "TIER explainer", "CV upload", "Confirmation"],
        horizontal=True,
    )

    if step == "Persona":
        st.selectbox("Career persona", ["Career switcher", "Accelerator", "Geography switcher"])
    elif step == "Goals":
        c1, c2, c3 = st.columns(3)
        c1.text_input("Target role", "Strategy Consultant")
        c2.text_input("Industry", "Consulting")
        c3.text_input("Geography", "London")
    elif step == "TIER explainer":
        for title, text in [
            ("Target", "Pick dream, target, and safety companies."),
            ("Identify", "Find contacts, openings, and referral paths."),
            ("Evaluate", "Score fit, gaps, and application readiness."),
            ("Rank", "Prioritise actions across deadlines and warmth."),
        ]:
            st.info(f"{title}: {text}")
    elif step == "CV upload":
        st.file_uploader("Upload CV placeholder", type=["pdf", "docx", "txt"])
    else:
        st.success("Demo setup complete for a career switcher targeting consulting in London.")


def render_targets() -> None:
    st.subheader("Company targets")
    tier = st.segmented_control("Tier", ["ALL", "DREAM", "TARGET", "SAFETY"], default="ALL")
    visible = COMPANIES if tier == "ALL" else [company for company in COMPANIES if company["tier"] == tier]

    for row in range(0, len(visible), 3):
        cols = st.columns(3)
        for col, company in zip(cols, visible[row : row + 3]):
            with col.container(border=True):
                st.markdown(badge(company["tier"]), unsafe_allow_html=True)
                st.markdown(f"#### {company['name']}")
                st.caption(company["sector"])
                fit_score(company["fit"])
                st.button("Open intelligence card", key=f"target-{company['name']}")


def render_daily() -> None:
    st.subheader("Daily target list")
    index = st.session_state.setdefault("daily_index", 0)
    if index >= len(COMPANIES):
        st.success("Daily list complete.")
        if st.button("Reset daily list"):
            st.session_state["daily_index"] = 0
            st.rerun()
        return

    company = COMPANIES[index]
    with st.container(border=True):
        st.markdown(badge(company["tier"]), unsafe_allow_html=True)
        st.markdown(f"### {company['name']}")
        st.caption(company["sector"])
        fit_score(company["fit"])
        st.write("Mock rationale: strong MBA fit, useful London network path, and relevant strategy exposure.")
        c1, c2, c3 = st.columns(3)
        for label, column in [("Downvote", c1), ("Skip", c2), ("Upvote", c3)]:
            if column.button(label, key=f"{label}-{company['name']}"):
                st.session_state["daily_index"] += 1
                st.rerun()


def render_contacts() -> None:
    st.subheader("Contacts")
    for company in sorted({contact["company"] for contact in CONTACTS}):
        st.markdown(f"### {company}")
        cols = st.columns(3)
        for col, contact in zip(cols, [c for c in CONTACTS if c["company"] == company]):
            with col.container(border=True):
                st.markdown(f"#### {contact['name']}")
                st.caption(contact["role"])
                st.write("Warmth: " + "●" * contact["warmth"] + "○" * (5 - contact["warmth"]))
                st.button("Open contact", key=f"contact-{contact['name']}")


def render_pipeline() -> None:
    st.subheader("Application pipeline")
    for stage in ["Researching", "Applied", "Interview", "Offer"]:
        st.markdown(f"### {stage}")
        cols = st.columns(2)
        apps = [app for app in APPLICATIONS if app["stage"] == stage]
        if not apps:
            st.caption("No applications in this stage.")
        for col, app in zip(cols, apps):
            with col.container(border=True):
                st.markdown(f"#### {app['title']}")
                st.caption(app["company"])
                st.write(f"Deadline: {app['deadline']}")
                fit_score(app["fit"])


def render_notifications() -> None:
    st.subheader("Notification centre")
    for item in NOTIFICATIONS:
        with st.container(border=True):
            status = "Unread" if not item["read"] else "Read"
            st.markdown(f"**{item['type']}** · {status}")
            st.write(item["message"])


def render_settings() -> None:
    st.subheader("Settings")
    st.text_input("Name", "Maya Patel")
    st.text_input("Email", "demo@london.edu")
    st.selectbox("Career persona", ["Career switcher", "Accelerator", "Geography switcher"])
    st.checkbox("Deadline reminders", True)
    st.checkbox("Follow-up prompts", True)
    st.checkbox("Daily target list", True)
    st.checkbox("Weekly digest", True)


def main() -> None:
    st.set_page_config(page_title="RecruitSmart LBS", layout="wide")
    st.title("RecruitSmart LBS")
    st.caption("Streamlit preview of the MVP scaffold. The main implementation remains the Next.js app.")

    page = st.sidebar.radio(
        "Navigate",
        [
            "Dashboard",
            "Onboarding",
            "Targets",
            "Daily",
            "Contacts",
            "Pipeline",
            "Notifications",
            "Settings",
        ],
    )

    renderers = {
        "Dashboard": render_dashboard,
        "Onboarding": render_onboarding,
        "Targets": render_targets,
        "Daily": render_daily,
        "Contacts": render_contacts,
        "Pipeline": render_pipeline,
        "Notifications": render_notifications,
        "Settings": render_settings,
    }
    renderers[page]()


if __name__ == "__main__":
    main()
