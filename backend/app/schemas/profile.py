from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import datetime

class ProfileBase(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    occupation: Optional[str] = None
    education: Optional[str] = None
    annual_income: Optional[float] = None
    social_category: Optional[str] = None
    disability_status: Optional[bool] = False
    disability_percentage: Optional[float] = None
    marital_status: Optional[str] = None
    residence_type: Optional[str] = None
    family_members_count: Optional[int] = 1
    is_bpl: Optional[bool] = False
    preferred_language: Optional[str] = "en"

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileOut(ProfileBase):
    id: int
    user_id: int
    completion_percentage: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class ProfileExtractionRequest(BaseModel):
    text: str
    existing_profile: Optional[Dict[str, Any]] = None
