from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db.session import get_session
from app.models import Notification

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("")
def list_notifications(session: Session = Depends(get_session)) -> list[Notification]:
    return list(session.exec(select(Notification).order_by(Notification.created_at.desc())).all())
