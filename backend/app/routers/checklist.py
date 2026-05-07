from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db.session import get_session
from app.models import ChecklistItem

router = APIRouter(prefix="/checklist", tags=["checklist"])


@router.get("")
def list_checklist(session: Session = Depends(get_session)) -> list[ChecklistItem]:
    return list(session.exec(select(ChecklistItem).order_by(ChecklistItem.completed, ChecklistItem.sort_order)).all())
