from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.db.session import get_session
from app.models import Company

router = APIRouter(prefix="/companies", tags=["companies"])


@router.get("")
def list_companies(session: Session = Depends(get_session)) -> list[Company]:
    return list(session.exec(select(Company).order_by(Company.tier, Company.name)).all())


@router.get("/{company_id}")
def get_company(company_id: str, session: Session = Depends(get_session)) -> Company:
    company = session.get(Company, company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company
