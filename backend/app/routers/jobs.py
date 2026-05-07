from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db.session import get_session
from app.models import Job
from app.schemas import JobCreate

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("")
def list_jobs(session: Session = Depends(get_session)) -> list[Job]:
    return list(session.exec(select(Job).order_by(Job.created_at.desc())).all())


@router.post("")
def create_job(payload: JobCreate, session: Session = Depends(get_session)) -> Job:
    job = Job(**payload.model_dump(), fit_score=78, parsed_skills={"skills": ["strategy", "analysis"]})
    session.add(job)
    session.commit()
    session.refresh(job)
    return job
