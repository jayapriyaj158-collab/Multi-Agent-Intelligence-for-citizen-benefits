from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
import os
import shutil
from app.database import get_db
from app.models.user import User
from app.models.document import Document, DocumentAnalysis
from app.models.scheme import Scheme
from app.schemas.document import DocumentOut, DocumentReadinessOut, MissingDocumentGuidanceOut
from app.utils.security import require_current_user, get_current_user
from app.agents.document_agent import document_agent
from app.data.document_guidance_db import get_missing_document_guidance
from app.routers.schemes import _scheme_to_dict

router = APIRouter(prefix="/documents", tags=["Document Intelligence"])

UPLOAD_DIR = "./uploaded_documents"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("", response_model=List[DocumentOut])
def get_user_documents(current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    return db.query(Document).filter(Document.user_id == current_user.id).all()

@router.post("/upload", response_model=DocumentOut)
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = Form(...),
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    # Save file locally
    safe_filename = f"user_{current_user.id}_{int(os.times().elapsed)}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, safe_filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = os.path.getsize(file_path)

    # Execute Document Intelligence Agent (OCR & consistency analysis)
    income_hint = current_user.profile.annual_income if current_user.profile else None
    analysis_res = document_agent.analyze_document_content(
        file_name=file.filename,
        doc_type_declared=document_type,
        user_name=current_user.full_name,
        user_income=income_hint
    )

    doc = Document(
        user_id=current_user.id,
        document_type=analysis_res["detected_document_type"] or document_type,
        file_name=file.filename,
        file_path=file_path,
        file_size=file_size,
        mime_type=file.content_type or "application/pdf",
        verification_status="VERIFIED" if analysis_res["is_consistent"] == "VALID" else "NEEDS_REVIEW"
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    doc_analysis = DocumentAnalysis(
        document_id=doc.id,
        detected_document_type=analysis_res["detected_document_type"],
        extracted_name=analysis_res["extracted_name"],
        extracted_id_number=analysis_res["extracted_id_number"],
        extracted_date=analysis_res["extracted_date"],
        extracted_income=analysis_res["extracted_income"],
        extracted_authority=analysis_res["extracted_authority"],
        confidence_score=analysis_res["confidence_score"],
        validation_issues=analysis_res["validation_issues"],
        is_consistent=analysis_res["is_consistent"],
        ocr_raw_text=analysis_res["ocr_raw_text"]
    )
    db.add(doc_analysis)
    db.commit()
    db.refresh(doc)

    return doc

@router.get("/readiness/{scheme_id_or_code}", response_model=DocumentReadinessOut)
def check_readiness_for_scheme(
    scheme_id_or_code: str,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    scheme = None
    if scheme_id_or_code.isdigit():
        scheme = db.query(Scheme).filter(Scheme.id == int(scheme_id_or_code)).first()
    if not scheme:
        scheme = db.query(Scheme).filter(Scheme.scheme_id == scheme_id_or_code).first()

    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    user_docs = []
    if current_user:
        docs = db.query(Document).filter(Document.user_id == current_user.id).all()
        user_docs = [d.document_type for d in docs]

    scheme_dict = _scheme_to_dict(scheme)
    return document_agent.compute_document_readiness(scheme_dict, user_docs)

@router.get("/guidance/{doc_name}", response_model=MissingDocumentGuidanceOut)
def get_document_help(doc_name: str):
    return get_missing_document_guidance(doc_name)
