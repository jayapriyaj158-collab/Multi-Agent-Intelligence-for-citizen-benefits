import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheme_id = Column(Integer, ForeignKey("schemes.id"), nullable=False)
    application_number = Column(String(100), unique=True, index=True, nullable=False)
    tracking_mode = Column(String(50), default="MANUAL_DEMO") # MANUAL_DEMO, INTEGRATED
    current_status = Column(String(50), default="SUBMITTED") 
    # SUBMITTED, DOCUMENTS_VERIFIED, DEPARTMENT_REVIEW, ACTION_REQUIRED, DECISION_APPROVED, DECISION_REJECTED
    submission_date = Column(DateTime, default=datetime.datetime.utcnow)
    official_portal_used = Column(String(500), nullable=True)
    notes = Column(Text, nullable=True)
    reminder_date = Column(DateTime, nullable=True)
    last_status_update = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="applications")
    scheme = relationship("Scheme")
    history = relationship("ApplicationStatusHistory", back_populates="application", cascade="all, delete-orphan")

class ApplicationStatusHistory(Base):
    __tablename__ = "application_status_history"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    status = Column(String(50), nullable=False)
    notes = Column(Text, nullable=True)
    updated_by = Column(String(100), default="Citizen (Manual Entry)")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    application = relationship("Application", back_populates="history")
