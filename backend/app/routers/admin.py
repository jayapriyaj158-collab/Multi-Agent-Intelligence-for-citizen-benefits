from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import datetime
from app.database import get_db
from app.models.user import User
from app.models.scheme import Scheme, SchemeRule
from app.models.application import Application
from app.models.ai_audit import AIAgentRun, AuditLog
from app.utils.security import require_admin_user, require_current_user
from app.schemas.scheme import SchemeCreate, SchemeOut
from app.routers.schemes import _scheme_to_dict

router = APIRouter(prefix="/admin", tags=["Admin AI Control Center"])

@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    schemes_count = db.query(Scheme).count()
    verified_count = db.query(Scheme).filter(Scheme.verification_status == "VERIFIED").count()
    needs_review_count = db.query(Scheme).filter(Scheme.verification_status == "NEEDS_REVIEW").count()
    apps_count = db.query(Application).count()
    users_count = db.query(User).count()
    runs_count = db.query(AIAgentRun).count()

    return {
        "total_schemes": schemes_count,
        "verified_schemes": verified_count,
        "needs_review_schemes": needs_review_count,
        "total_applications": apps_count,
        "registered_citizens": users_count,
        "ai_agent_runs": runs_count
    }

@router.get("/schemes")
def get_admin_schemes(status: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Scheme)
    if status:
        q = q.filter(Scheme.verification_status == status)
    schemes = q.all()
    return [_scheme_to_dict(s) for s in schemes]

@router.post("/schemes/{id}/verify")
def verify_scheme(id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    scheme.verification_status = "VERIFIED"
    scheme.last_verified_at = datetime.datetime.utcnow()
    db.commit()

    return {"success": True, "message": f"Scheme '{scheme.scheme_name}' marked as VERIFIED."}

@router.post("/schemes/{id}/archive")
def archive_scheme(id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    scheme.verification_status = "ARCHIVED"
    db.commit()
    return {"success": True, "message": f"Scheme '{scheme.scheme_name}' archived."}

@router.get("/freshness")
def get_freshness_monitor(db: Session = Depends(get_db)):
    """Requirement #25: Knowledge Freshness Monitor."""
    schemes = db.query(Scheme).all()
    now = datetime.datetime.utcnow()
    items = []

    for s in schemes:
        days_since = (now - (s.last_verified_at or now)).days
        needs_review = s.verification_status == "NEEDS_REVIEW" or days_since > 60

        items.append({
            "id": s.id,
            "scheme_id": s.scheme_id,
            "scheme_name": s.scheme_name,
            "category": s.category,
            "source_name": s.source_name,
            "source_level": s.source_level,
            "last_verified_at": s.last_verified_at.strftime("%Y-%m-%d") if s.last_verified_at else "2026-09-20",
            "days_since_verification": days_since,
            "verification_status": s.verification_status,
            "needs_review": needs_review,
            "official_source_url": s.official_source_url
        })

    return {
        "total_monitored": len(items),
        "needs_immediate_review": sum(1 for i in items if i["needs_review"]),
        "schemes": items
    }

@router.get("/audit-logs")
def get_admin_audit_logs(limit: int = 50, db: Session = Depends(get_db)):
    runs = db.query(AIAgentRun).order_by(AIAgentRun.timestamp.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "user_id": r.user_id,
            "intent": r.intent,
            "agents_called": r.agents_called,
            "rules_evaluated_count": r.rules_evaluated_count,
            "execution_time_ms": r.execution_time_ms,
            "audit_summary": r.audit_summary,
            "timestamp": r.timestamp.isoformat()
        }
        for r in runs
    ]

@router.post("/schemes/rule")
def add_scheme_rule(
    scheme_id: int,
    criterion_name: str,
    field_name: str,
    operator: str,
    expected_value: str,
    failure_reason: str,
    user_facing_label: str,
    db: Session = Depends(get_db)
):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    rule = SchemeRule(
        scheme_id=scheme_id,
        criterion_name=criterion_name,
        field_name=field_name,
        operator=operator,
        expected_value=expected_value,
        failure_reason=failure_reason,
        user_facing_label=user_facing_label
    )
    db.add(rule)
    db.commit()
    db.refresh(rule)

    return {"success": True, "rule_id": rule.id, "message": "Rule successfully attached to scheme."}
