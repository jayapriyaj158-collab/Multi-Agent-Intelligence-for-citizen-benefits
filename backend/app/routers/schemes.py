from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
from app.database import get_db
from app.models.user import User
from app.models.scheme import Scheme, SchemeRule
from app.models.notification import SavedScheme
from app.schemas.scheme import SchemeOut, SchemeDetailOut, SchemeFilterParams
from app.schemas.eligibility import EligibilityResult, SchemeEligibilityCheckRequest
from app.utils.security import get_current_user, require_current_user
from app.agents.eligibility_engine import eligibility_engine
from app.agents.discovery_agent import discovery_agent
from app.data.schemes_seed import SCHEMES_SEED_DATA

router = APIRouter(prefix="/schemes", tags=["Schemes"])

def _scheme_to_dict(s: Scheme) -> Dict[str, Any]:
    return {
        "id": s.id,
        "scheme_id": s.scheme_id,
        "scheme_name": s.scheme_name,
        "short_name": s.short_name,
        "description": s.description,
        "objective": s.objective,
        "benefits": s.benefits,
        "benefit_type": s.benefit_type,
        "department": s.department,
        "ministry": s.ministry,
        "government_level": s.government_level,
        "state": s.state,
        "district": s.district,
        "category": s.category,
        "sub_category": s.sub_category,
        "target_group": s.target_group,
        "age_min": s.age_min,
        "age_max": s.age_max,
        "gender_criteria": s.gender_criteria,
        "occupation_criteria": s.occupation_criteria or [],
        "education_criteria": s.education_criteria or [],
        "income_limit": s.income_limit,
        "income_period": s.income_period,
        "social_category": s.social_category or [],
        "required_documents": s.required_documents or [],
        "optional_documents": s.optional_documents or [],
        "application_steps": s.application_steps or [],
        "application_mode": s.application_mode,
        "official_application_url": s.official_application_url,
        "official_source_url": s.official_source_url,
        "status_check_url": s.status_check_url,
        "deadline": s.deadline,
        "renewal_rules": s.renewal_rules,
        "frequency": s.frequency,
        "helpline": s.helpline,
        "faq": s.faq or [],
        "source_name": s.source_name,
        "source_level": s.source_level,
        "verification_status": s.verification_status,
        "is_umang_supported": s.is_umang_supported,
        "is_digilocker_supported": s.is_digilocker_supported,
        "last_verified_at": s.last_verified_at.isoformat() if s.last_verified_at else "2026-09-20",
        "rules": [
            {
                "id": r.id,
                "criterion_name": r.criterion_name,
                "field_name": r.field_name,
                "operator": r.operator,
                "expected_value": r.expected_value,
                "rule_type": r.rule_type,
                "weight": r.weight,
                "failure_reason": r.failure_reason,
                "user_facing_label": r.user_facing_label
            }
            for r in s.rules
        ]
    }

@router.get("", response_model=List[SchemeOut])
def list_schemes(
    query: Optional[str] = None,
    category: Optional[str] = None,
    state: Optional[str] = None,
    occupation: Optional[str] = None,
    max_income: Optional[float] = None,
    gender: Optional[str] = None,
    db: Session = Depends(get_db)
):
    q = db.query(Scheme).filter(Scheme.verification_status != "ARCHIVED")

    if category and category != "All":
        q = q.filter(Scheme.category == category)
    if state and state != "All India":
        q = q.filter((Scheme.state == state) | (Scheme.state == "All India"))
    if gender and gender != "All":
        q = q.filter((Scheme.gender_criteria == "All") | (Scheme.gender_criteria == gender))

    schemes = q.all()

    # Filter with search term if provided
    if query:
        lower_q = query.lower()
        schemes = [
            s for s in schemes
            if lower_q in s.scheme_name.lower()
            or lower_q in s.description.lower()
            or lower_q in s.category.lower()
            or (s.short_name and lower_q in s.short_name.lower())
        ]

    # Max income filter
    if max_income is not None:
        schemes = [
            s for s in schemes
            if s.income_limit is None or s.income_limit >= max_income
        ]

    return schemes

@router.get("/{id_or_code}")
def get_scheme(id_or_code: str, db: Session = Depends(get_db)):
    scheme = None
    if id_or_code.isdigit():
        scheme = db.query(Scheme).filter(Scheme.id == int(id_or_code)).first()
    if not scheme:
        scheme = db.query(Scheme).filter(Scheme.scheme_id == id_or_code).first()

    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    return _scheme_to_dict(scheme)

@router.post("/{id_or_code}/eligibility", response_model=EligibilityResult)
def check_scheme_eligibility(
    id_or_code: str,
    req: Optional[SchemeEligibilityCheckRequest] = None,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    scheme = None
    if id_or_code.isdigit():
        scheme = db.query(Scheme).filter(Scheme.id == int(id_or_code)).first()
    if not scheme:
        scheme = db.query(Scheme).filter(Scheme.scheme_id == id_or_code).first()

    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    # Combine profile from DB and request override
    profile_data = {}
    if current_user and current_user.profile:
        p = current_user.profile
        profile_data = {
            "age": p.age,
            "gender": p.gender,
            "state": p.state,
            "occupation": p.occupation,
            "education": p.education,
            "annual_income": p.annual_income,
            "social_category": p.social_category,
            "marital_status": p.marital_status,
            "residence_type": p.residence_type
        }

    if req and req.profile_override:
        profile_data.update(req.profile_override)

    scheme_dict = _scheme_to_dict(scheme)
    return eligibility_engine.evaluate_eligibility(scheme_dict, profile_data)

@router.post("/compare")
def compare_schemes(scheme_ids: List[str], db: Session = Depends(get_db)):
    if len(scheme_ids) < 2 or len(scheme_ids) > 4:
        raise HTTPException(status_code=400, detail="Please select between 2 and 4 schemes to compare.")

    schemes = []
    for s_id in scheme_ids:
        s = db.query(Scheme).filter((Scheme.scheme_id == s_id) | (Scheme.id == int(s_id) if s_id.isdigit() else False)).first()
        if s:
            schemes.append(_scheme_to_dict(s))

    return {
        "comparison_count": len(schemes),
        "schemes": schemes
    }

@router.post("/{id}/save")
def toggle_save_scheme(id: int, current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    existing = db.query(SavedScheme).filter(
        SavedScheme.user_id == current_user.id,
        SavedScheme.scheme_id == id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"saved": False, "message": "Scheme removed from saved list"}
    else:
        new_save = SavedScheme(user_id=current_user.id, scheme_id=id)
        db.add(new_save)
        db.commit()
        return {"saved": True, "message": "Scheme saved to your profile"}

@router.get("/saved/all")
def get_saved_schemes(current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    saved = db.query(SavedScheme).filter(SavedScheme.user_id == current_user.id).all()
    results = []
    for s in saved:
        if s.scheme:
            results.append(_scheme_to_dict(s.scheme))
    return results
