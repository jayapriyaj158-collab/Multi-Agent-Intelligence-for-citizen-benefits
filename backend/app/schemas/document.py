from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import datetime

class DocumentAnalysisOut(BaseModel):
    id: int
    detected_document_type: Optional[str] = None
    extracted_name: Optional[str] = None
    extracted_id_number: Optional[str] = None
    extracted_date: Optional[str] = None
    extracted_income: Optional[float] = None
    extracted_authority: Optional[str] = None
    confidence_score: float
    validation_issues: List[str] = []
    is_consistent: str # VALID, NEEDS_REVIEW, INCOMPLETE
    ocr_raw_text: Optional[str] = None

    class Config:
        from_attributes = True

class DocumentOut(BaseModel):
    id: int
    document_type: str
    file_name: str
    file_size: Optional[int] = None
    mime_type: str
    verification_status: str
    uploaded_at: datetime.datetime
    analysis: Optional[DocumentAnalysisOut] = None

    class Config:
        from_attributes = True

class MissingDocumentGuidanceOut(BaseModel):
    document_name: str
    what_is_it: str
    why_required: str
    who_issues: str
    where_to_apply: str
    online_offline: str # "Online (State e-Seva/EDistrict)", "Offline (Tahsildar/Collectorate)", "Both"
    expected_process: List[str]
    official_source_url: str
    required_inputs: List[str]
    disclaimer: str = "Official issuing procedures may vary slightly by state/district. Please verify with local e-Seva / Tahsildar portal."

class DocumentReadinessOut(BaseModel):
    scheme_id: str
    scheme_name: str
    total_required: int
    total_available: int
    readiness_percentage: int # e.g. 80
    available_documents: List[str]
    missing_documents: List[str]
    guidance: Dict[str, MissingDocumentGuidanceOut]
    disclaimer: str = "This score reflects your document preparation progress for this application, not government document verification."
