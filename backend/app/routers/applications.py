from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db.session import get_session
from app.models import Application

router = APIRouter(prefix="/applications", tags=["applications"])


@router.get("")
def list_applications(session: Session = Depends(get_session)) -> list[Application]:
    return list(session.exec(select(Application).order_by(Application.updated_at.desc())).all())
