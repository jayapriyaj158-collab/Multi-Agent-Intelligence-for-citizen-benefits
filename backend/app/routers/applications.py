import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
from app.database import get_db
from app.models.user import User
from app.models.application import Application, ApplicationStatusHistory
from app.models.scheme import Scheme
from app.schemas.application import ApplicationCreate, ApplicationOut, ApplicationStatusUpdate, FormFieldExplainerOut
from app.utils.security import require_current_user
from app.agents.application_agent import application_agent

router = APIRouter(prefix="/applications", tags=["Applications & Manual Tracking"])

@router.get("", response_model=List[ApplicationOut])
def get_user_applications(current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    return db.query(Application).filter(Application.user_id == current_user.id).order_by(Application.submission_date.desc()).all()

@router.post("", response_model=ApplicationOut)
def create_application(
    req: ApplicationCreate,
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    scheme = db.query(Scheme).filter(Scheme.id == req.scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    app_num = req.application_number
    if not app_num:
        now = datetime.datetime.utcnow()
        app_num = f"APP-{scheme.short_name[:4].upper() if scheme.short_name else 'SCH'}-{now.year}-{int(now.timestamp()) % 100000:05d}"

    app = Application(
        user_id=current_user.id,
        scheme_id=scheme.id,
        application_number=app_num,
        tracking_mode=req.tracking_mode or "MANUAL_DEMO",
        current_status=req.current_status or "SUBMITTED",
        official_portal_used=req.official_portal_used or scheme.official_application_url,
        notes=req.notes,
        reminder_date=req.reminder_date
    )
    db.add(app)
    db.commit()
    db.refresh(app)

    # Add initial history entry
    hist = ApplicationStatusHistory(
        application_id=app.id,
        status=app.current_status,
        notes="Application registered on citizen dashboard for manual tracking.",
        updated_by="Citizen (Manual Entry)"
    )
    db.add(hist)
    db.commit()
    db.refresh(app)

    return app

@router.get("/{id}", response_model=ApplicationOut)
def get_application(id: int, current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.id == id, Application.user_id == current_user.id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.put("/{id}/status", response_model=ApplicationOut)
def update_application_status(
    id: int,
    req: ApplicationStatusUpdate,
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    app = db.query(Application).filter(Application.id == id, Application.user_id == current_user.id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    app.current_status = req.status
    app.last_status_update = datetime.datetime.utcnow()
    
    hist = ApplicationStatusHistory(
        application_id=app.id,
        status=req.status,
        notes=req.notes or f"Status updated to {req.status}",
        updated_by="Citizen (Manual Tracking)"
    )
    db.add(hist)
    db.commit()
    db.refresh(app)

    return app

@router.get("/field-explainer/{field_key}", response_model=FormFieldExplainerOut)
def explain_field(field_key: str):
    return application_agent.explain_form_field(field_key)
