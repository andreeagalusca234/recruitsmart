from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any
from uuid import uuid4

from sqlalchemy import Column, JSON
from sqlmodel import Field, SQLModel


def new_id() -> str:
    return uuid4().hex


class CareerPersona(str, Enum):
    CAREER_SWITCHER = "CAREER_SWITCHER"
    ACCELERATOR = "ACCELERATOR"
    GEOGRAPHY_SWITCHER = "GEOGRAPHY_SWITCHER"


class CompanyTier(str, Enum):
    DREAM = "DREAM"
    TARGET = "TARGET"
    SAFETY = "SAFETY"


class CompanySource(str, Enum):
    AI_SUGGESTED = "AI_SUGGESTED"
    MANUAL = "MANUAL"


class VoteStatus(str, Enum):
    UPVOTED = "UPVOTED"
    DOWNVOTED = "DOWNVOTED"
    NONE = "NONE"


class ContactSource(str, Enum):
    MANUAL = "MANUAL"
    LINKEDIN_PDF = "LINKEDIN_PDF"


class JobSourcePlatform(str, Enum):
    LINKEDIN = "LINKEDIN"
    INDEED = "INDEED"
    MYCAREER = "MYCAREER"
    COMPANY_SITE = "COMPANY_SITE"
    OTHER = "OTHER"


class ApplicationStage(str, Enum):
    RESEARCHING = "RESEARCHING"
    APPLIED = "APPLIED"
    INTERVIEW = "INTERVIEW"
    OFFER = "OFFER"


class ChecklistSource(str, Enum):
    AI_GENERATED = "AI_GENERATED"
    CUSTOM = "CUSTOM"


class NotificationType(str, Enum):
    DEADLINE = "DEADLINE"
    FOLLOW_UP = "FOLLOW_UP"
    WARMTH_DECAY = "WARMTH_DECAY"
    DAILY_LIST = "DAILY_LIST"
    WEEKLY_DIGEST = "WEEKLY_DIGEST"
    STAGE_CHANGE = "STAGE_CHANGE"


class FileKind(str, Enum):
    CV = "CV"
    JOB_DESCRIPTION = "JOB_DESCRIPTION"
    CONTACT_IMPORT = "CONTACT_IMPORT"
    OTHER = "OTHER"


class User(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str | None = None
    name: str | None = None
    career_persona: CareerPersona = CareerPersona.CAREER_SWITCHER
    target_role: str | None = None
    target_industry: str | None = None
    target_geography: str | None = None
    cv_uploaded: bool = False
    onboarding_complete: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Company(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    name: str
    description: str | None = None
    sector: str | None = None
    size: str | None = None
    hq_location: str | None = None
    careers_url: str | None = None
    linkedin_url: str | None = None
    tier: CompanyTier = Field(index=True)
    source: CompanySource = CompanySource.MANUAL
    ai_rationale: str | None = None
    vote: VoteStatus = VoteStatus.NONE
    vote_reason: str | None = None
    vote_note: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Contact(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    company_id: str = Field(foreign_key="company.id", index=True)
    name: str
    role: str | None = None
    linkedin_url: str | None = None
    email: str | None = None
    warmth_score: int = Field(default=1, ge=1, le=5)
    source: ContactSource = ContactSource.MANUAL
    notes: str | None = None
    last_interaction_at: datetime | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class MeetingNote(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    contact_id: str = Field(foreign_key="contact.id", index=True)
    date: datetime
    notes: str
    ai_summary: str | None = None
    follow_up_needed: bool = False
    follow_up_done_at: datetime | None = None


class Job(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    company_id: str = Field(foreign_key="company.id", index=True)
    title: str
    url: str | None = None
    jd_text: str | None = None
    source_platform: JobSourcePlatform = JobSourcePlatform.OTHER
    deadline: datetime | None = None
    fit_score: int | None = Field(default=None, ge=0, le=100)
    parsed_skills: dict[str, Any] | None = Field(default=None, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Application(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    job_id: str = Field(foreign_key="job.id", index=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    stage: ApplicationStage = Field(default=ApplicationStage.RESEARCHING, index=True)
    stage_history: list[dict[str, Any]] = Field(default_factory=list, sa_column=Column(JSON))
    offer_details: dict[str, Any] | None = Field(default=None, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ChecklistItem(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    company_id: str = Field(foreign_key="company.id", index=True)
    application_id: str | None = Field(default=None, foreign_key="application.id", index=True)
    label: str
    completed: bool = False
    due_date: datetime | None = None
    sort_order: int = 0
    source: ChecklistSource = ChecklistSource.CUSTOM
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Notification(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    type: NotificationType
    message: str
    read: bool = Field(default=False, index=True)
    company_id: str | None = Field(default=None, foreign_key="company.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class FileAsset(SQLModel, table=True):
    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    company_id: str | None = Field(default=None, foreign_key="company.id", index=True)
    job_id: str | None = Field(default=None, foreign_key="job.id", index=True)
    file_kind: FileKind = Field(index=True)
    original_filename: str
    content_type: str | None = None
    size_bytes: int
    storage_backend: str
    storage_key: str = Field(index=True)
    bucket: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
