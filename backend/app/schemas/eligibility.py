from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class CriterionEvaluationResult(BaseModel):
    criterion_name: str
    user_facing_label: str
    status: str # "SATISFIED", "FAILED", "MISSING_INFO"
    detail: str
    rule_type: str # "MANDATORY", "PREFERENTIAL"
    field_name: str
    user_value: Optional[Any] = None
    expected_value: Any

class EligibilityResult(BaseModel):
    scheme_id: str
    scheme_name: str
    status: str # "LIKELY ELIGIBLE", "POTENTIALLY ELIGIBLE", "LIKELY NOT ELIGIBLE", "INSUFFICIENT INFORMATION"
    status_color: str # "emerald", "amber", "rose", "sky"
    criteria_evaluated: List[CriterionEvaluationResult]
    criteria_passed_count: int
    criteria_total_count: int
    missing_criteria_fields: List[str]
    summary_explanation: str
    profile_match_score: int # percentage integer 0-100
    disclaimer: str = "This score is an AI-assisted profile similarity indicator and is not an official government eligibility score. Final eligibility rests with the respective government authority."

class SchemeEligibilityCheckRequest(BaseModel):
    scheme_id: Optional[str] = None
    profile_override: Optional[Dict[str, Any]] = None
