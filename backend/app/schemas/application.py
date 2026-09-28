from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import datetime

class StatusHistoryOut(BaseModel):
    id: int
    status: str
    notes: Optional[str] = None
    updated_by: str
    timestamp: datetime.datetime

    class Config:
        from_attributes = True

class ApplicationCreate(BaseModel):
    scheme_id: int
    application_number: Optional[str] = None
    tracking_mode: Optional[str] = "MANUAL_DEMO"
    current_status: Optional[str] = "SUBMITTED"
    official_portal_used: Optional[str] = None
    notes: Optional[str] = None
    reminder_date: Optional[datetime.datetime] = None

class ApplicationStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None

class ApplicationOut(BaseModel):
    id: int
    user_id: int
    scheme_id: int
    application_number: str
    tracking_mode: str
    current_status: str
    submission_date: datetime.datetime
    official_portal_used: Optional[str] = None
    notes: Optional[str] = None
    reminder_date: Optional[datetime.datetime] = None
    last_status_update: datetime.datetime
    history: List[StatusHistoryOut] = []

    class Config:
        from_attributes = True

class FormFieldExplainerOut(BaseModel):
    field_name: str
    explanation: str
    example_value: str
    common_pitfalls: str
    caution_note: str = "Please verify with scheme official instructions before final submission."
