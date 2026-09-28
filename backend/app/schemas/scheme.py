from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import datetime

class SchemeRuleBase(BaseModel):
    criterion_name: str
    field_name: str
    operator: str
    expected_value: str
    rule_type: Optional[str] = "MANDATORY"
    weight: Optional[float] = 1.0
    failure_reason: str
    user_facing_label: str

class SchemeRuleCreate(SchemeRuleBase):
    scheme_id: int

class SchemeRuleOut(SchemeRuleBase):
    id: int
    scheme_id: int

    class Config:
        from_attributes = True

class SchemeBase(BaseModel):
    scheme_id: str
    scheme_name: str
    short_name: Optional[str] = None
    description: str
    objective: Optional[str] = None
    benefits: str
    benefit_type: Optional[str] = "Direct Cash Transfer"
    department: Optional[str] = None
    ministry: Optional[str] = None
    government_level: Optional[str] = "Central"
    state: Optional[str] = "All India"
    district: Optional[str] = "All"
    category: str
    sub_category: Optional[str] = None
    target_group: Optional[str] = None
    
    age_min: Optional[int] = None
    age_max: Optional[int] = None
    gender_criteria: Optional[str] = "All"
    occupation_criteria: Optional[List[str]] = []
    education_criteria: Optional[List[str]] = []
    income_limit: Optional[float] = None
    income_period: Optional[str] = "Annual"
    social_category: Optional[List[str]] = []
    residence_requirement: Optional[str] = None
    employment_requirement: Optional[str] = None
    family_conditions: Optional[str] = None
    disability_conditions: Optional[str] = None
    special_conditions: Optional[str] = None

    required_documents: Optional[List[str]] = []
    optional_documents: Optional[List[str]] = []
    application_steps: Optional[List[Dict[str, Any]]] = []
    application_mode: Optional[str] = "Online"

    official_application_url: str
    official_source_url: str
    status_check_url: Optional[str] = None

    deadline: Optional[str] = "Open Year-Round"
    scheme_start_date: Optional[str] = None
    scheme_end_date: Optional[str] = None
    renewal_rules: Optional[str] = None
    frequency: Optional[str] = "Annual"
    helpline: Optional[str] = None
    faq: Optional[List[Dict[str, str]]] = []
    languages_available: Optional[List[str]] = ["en", "ta", "hi"]

    source_name: str
    source_level: Optional[int] = 1
    verification_status: Optional[str] = "VERIFIED"
    data_version: Optional[str] = "1.0.0"
    is_umang_supported: Optional[bool] = False
    is_digilocker_supported: Optional[bool] = False

class SchemeCreate(SchemeBase):
    rules: Optional[List[SchemeRuleBase]] = []

class SchemeOut(SchemeBase):
    id: int
    last_verified_at: datetime.datetime

    class Config:
        from_attributes = True

class SchemeDetailOut(SchemeOut):
    rules: List[SchemeRuleOut] = []

    class Config:
        from_attributes = True

class SchemeFilterParams(BaseModel):
    query: Optional[str] = None
    category: Optional[str] = None
    state: Optional[str] = None
    occupation: Optional[str] = None
    education: Optional[str] = None
    max_income: Optional[float] = None
    gender: Optional[str] = None
    verification_status: Optional[str] = None
