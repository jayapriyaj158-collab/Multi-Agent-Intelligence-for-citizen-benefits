import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    document_type = Column(String(100), nullable=False, index=True) # Income Certificate, Caste Certificate, etc.
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=True)
    mime_type = Column(String(100), default="application/pdf")
    verification_status = Column(String(50), default="NEEDS_REVIEW") # VERIFIED, NEEDS_REVIEW, PENDING, REJECTED
    notes = Column(Text, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="documents")
    analysis = relationship("DocumentAnalysis", back_populates="document", uselist=False, cascade="all, delete-orphan")

class DocumentAnalysis(Base):
    __tablename__ = "document_analyses"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), unique=True, nullable=False)
    detected_document_type = Column(String(100), nullable=True)
    extracted_name = Column(String(255), nullable=True)
    extracted_id_number = Column(String(100), nullable=True)
    extracted_date = Column(String(50), nullable=True)
    extracted_income = Column(Float, nullable=True)
    extracted_authority = Column(String(255), nullable=True)
    confidence_score = Column(Float, default=0.85) # 0.0 to 1.0
    validation_issues = Column(JSON, default=list) # ["Income period matches current FY", "Name matches profile"]
    ocr_raw_text = Column(Text, nullable=True)
    is_consistent = Column(String(50), default="VALID") # VALID, SUSPICIOUS, INCOMPLETE
    analyzed_at = Column(DateTime, default=datetime.datetime.utcnow)

    document = relationship("Document", back_populates="analysis")
