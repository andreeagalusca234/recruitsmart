from datetime import datetime

from sqlmodel import Session, select

from app.models import (
    Application,
    ApplicationStage,
    CareerPersona,
    ChecklistItem,
    ChecklistSource,
    Company,
    CompanySource,
    CompanyTier,
    Contact,
    ContactSource,
    Job,
    JobSourcePlatform,
    Notification,
    NotificationType,
    User,
    VoteStatus,
)


def seed_demo_data(session: Session) -> None:
    existing = session.exec(select(User).where(User.email == "demo@london.edu")).first()
    if existing:
        return

    user = User(
        email="demo@london.edu",
        name="Maya Patel",
        career_persona=CareerPersona.CAREER_SWITCHER,
        target_role="Strategy Consultant",
        target_industry="Consulting",
        target_geography="London",
        cv_uploaded=True,
        onboarding_complete=True,
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    company_specs = [
        ("McKinsey & Company", CompanyTier.DREAM, "Management consulting", 91, VoteStatus.UPVOTED),
        ("Boston Consulting Group", CompanyTier.DREAM, "Management consulting", 89, VoteStatus.NONE),
        ("Bain & Company", CompanyTier.DREAM, "Management consulting", 88, VoteStatus.NONE),
        ("Deloitte", CompanyTier.TARGET, "Consulting", 82, VoteStatus.UPVOTED),
        ("Accenture Strategy", CompanyTier.TARGET, "Strategy and technology consulting", 77, VoteStatus.NONE),
        ("EY-Parthenon", CompanyTier.TARGET, "Strategy consulting", 80, VoteStatus.NONE),
        ("CIL Management Consultants", CompanyTier.SAFETY, "Boutique strategy consulting", 73, VoteStatus.NONE),
        ("Elixirr", CompanyTier.SAFETY, "Boutique consulting", 70, VoteStatus.NONE),
    ]

    companies: dict[str, Company] = {}
    for name, tier, sector, score, vote in company_specs:
        company = Company(
            user_id=user.id,
            name=name,
            sector=sector,
            size="Seeded",
            hq_location="London signal",
            tier=tier,
            source=CompanySource.AI_SUGGESTED,
            ai_rationale=f"Mock fit score {score}: relevant MBA hiring signal and London strategy pathway.",
            vote=vote,
        )
        session.add(company)
        companies[name] = company
    session.commit()
    for company in companies.values():
        session.refresh(company)

    contacts = [
        ("Aisha Khan", "McKinsey & Company", "Engagement Manager", 4),
        ("Thomas Reed", "McKinsey & Company", "Associate Partner", 3),
        ("Priya Narayan", "Boston Consulting Group", "Project Leader", 5),
        ("James Whitmore", "Boston Consulting Group", "Principal", 2),
        ("Sophia Chen", "Bain & Company", "Consultant", 3),
        ("Omar Haddad", "Deloitte", "Senior Manager", 4),
    ]
    for name, company_name, role, warmth_score in contacts:
        session.add(
            Contact(
                user_id=user.id,
                company_id=companies[company_name].id,
                name=name,
                role=role,
                warmth_score=warmth_score,
                source=ContactSource.MANUAL,
                last_interaction_at=datetime(2026, 5, 1),
            )
        )

    jobs = [
        ("Associate, London", "McKinsey & Company", JobSourcePlatform.COMPANY_SITE, ApplicationStage.RESEARCHING, 84),
        ("Consultant, London", "Boston Consulting Group", JobSourcePlatform.LINKEDIN, ApplicationStage.APPLIED, 81),
        ("Strategy Manager, Monitor Deloitte", "Deloitte", JobSourcePlatform.MYCAREER, ApplicationStage.INTERVIEW, 76),
        ("Consultant, Growth Strategy", "CIL Management Consultants", JobSourcePlatform.COMPANY_SITE, ApplicationStage.OFFER, 73),
    ]
    for title, company_name, platform, stage, score in jobs:
        job = Job(
            user_id=user.id,
            company_id=companies[company_name].id,
            title=title,
            source_platform=platform,
            deadline=datetime(2026, 6, 1),
            fit_score=score,
            parsed_skills={"skills": ["strategy", "case work", "stakeholder management"]},
        )
        session.add(job)
        session.commit()
        session.refresh(job)
        session.add(
            Application(
                user_id=user.id,
                job_id=job.id,
                stage=stage,
                stage_history=[{"stage": stage.value, "date": "2026-05-07"}],
            )
        )

    checklist_items = [
        ("Send follow-up note to Aisha with revised CV", "McKinsey & Company", 1),
        ("Finish BCG cover letter proofread", "Boston Consulting Group", 2),
        ("Prepare two market-entry cases before Deloitte interview", "Deloitte", 3),
        ("Compare CIL offer with target compensation range", "CIL Management Consultants", 4),
    ]
    for label, company_name, order in checklist_items:
        session.add(
            ChecklistItem(
                user_id=user.id,
                company_id=companies[company_name].id,
                label=label,
                sort_order=order,
                source=ChecklistSource.AI_GENERATED,
            )
        )

    session.add(
        Notification(
            user_id=user.id,
            company_id=companies["McKinsey & Company"].id,
            type=NotificationType.FOLLOW_UP,
            message="Follow up with Aisha Khan about McKinsey referral timing.",
        )
    )
    session.add(
        Notification(
            user_id=user.id,
            company_id=companies["Deloitte"].id,
            type=NotificationType.DEADLINE,
            message="Deloitte interview prep checklist is due this weekend.",
        )
    )
    session.commit()
