from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db.session import get_session
from app.models import Contact

router = APIRouter(prefix="/contacts", tags=["contacts"])


@router.get("")
def list_contacts(session: Session = Depends(get_session)) -> list[Contact]:
    return list(session.exec(select(Contact).order_by(Contact.company_id, Contact.name)).all())
