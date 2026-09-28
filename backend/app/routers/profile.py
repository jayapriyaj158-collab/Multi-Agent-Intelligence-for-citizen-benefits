from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from app.database import get_db
from app.models.user import User, Profile
from app.schemas.profile import ProfileUpdate, ProfileOut, ProfileExtractionRequest
from app.utils.security import require_current_user
from app.agents.profile_agent import ProfileAgent

router = APIRouter(prefix="/profile", tags=["Citizen Profile"])
profile_agent = ProfileAgent()

@router.get("", response_model=ProfileOut)
def get_profile(current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(user_id=current_user.id, completion_percentage=0)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("", response_model=ProfileOut)
def update_profile(
    req: ProfileUpdate,
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(user_id=current_user.id)
        db.add(profile)

    update_dict = req.dict(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(profile, key, value)

    # Re-calculate completion
    prof_dict = {
        "age": profile.age,
        "gender": profile.gender,
        "state": profile.state,
        "occupation": profile.occupation,
        "education": profile.education,
        "annual_income": profile.annual_income,
        "social_category": profile.social_category
    }
    profile.completion_percentage = profile_agent.compute_completion(prof_dict)
    
    db.commit()
    db.refresh(profile)
    return profile

@router.post("/extract")
def extract_profile_from_conversation(req: ProfileExtractionRequest):
    extracted, fields = profile_agent.extract_profile_from_text(req.text, req.existing_profile)
    return {
        "extracted_profile": extracted,
        "newly_identified_fields": fields
    }
