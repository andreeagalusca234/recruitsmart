from datetime import datetime
from typing import Any

from pydantic import BaseModel

from app.models import ApplicationStage, CompanyTier, FileKind, JobSourcePlatform, VoteStatus


class CompanyRead(BaseModel):
    id: str
    name: str
    description: str | None = None
    sector: str | None = None
    size: str | None = None
    hq_location: str | None = None
    tier: CompanyTier
    vote: VoteStatus
    ai_rationale: str | None = None


class ContactRead(BaseModel):
    id: str
    company_id: str
    name: str
    role: str | None = None
    warmth_score: int
    last_interaction_at: datetime | None = None


class JobCreate(BaseModel):
    user_id: str
    company_id: str
    title: str
    url: str | None = None
    jd_text: str | None = None
    source_platform: JobSourcePlatform = JobSourcePlatform.OTHER
    deadline: datetime | None = None


class JobRead(BaseModel):
    id: str
    company_id: str
    title: str
    source_platform: JobSourcePlatform
    deadline: datetime | None = None
    fit_score: int | None = None


class ApplicationRead(BaseModel):
    id: str
    job_id: str
    stage: ApplicationStage
    stage_history: list[dict[str, Any]]


class ChecklistRead(BaseModel):
    id: str
    company_id: str
    application_id: str | None = None
    label: str
    completed: bool
    due_date: datetime | None = None
    sort_order: int


class NotificationRead(BaseModel):
    id: str
    type: str
    message: str
    read: bool
    company_id: str | None = None
    created_at: datetime


class FileAssetRead(BaseModel):
    id: str
    user_id: str
    company_id: str | None = None
    job_id: str | None = None
    file_kind: FileKind
    original_filename: str
    content_type: str | None = None
    size_bytes: int
    storage_backend: str
    storage_key: str
    bucket: str | None = None
    created_at: datetime


class ParseJobRequest(BaseModel):
    jd_text: str


class ParseJobResponse(BaseModel):
    fit_score: int
    extracted_skills: list[str]
    gaps: list[str]
