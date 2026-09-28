import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(50), default="BENEFIT_ALERT")
    # DEADLINE, MISSING_DOC, APPLICATION_UPDATE, BENEFIT_ALERT, KNOWLEDGE_CHANGE
    is_read = Column(Boolean, default=False)
    action_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="notifications")

class SupportTicket(Base):
    __tablename__ = "support_tickets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    ticket_number = Column(String(50), unique=True, index=True, nullable=False)
    issue_type = Column(String(100), nullable=False) # e.g. "Missing Document Help", "Eligibility Clarification", "Grievance"
    scheme_id = Column(Integer, ForeignKey("schemes.id"), nullable=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=True)
    description = Column(Text, nullable=False)
    status = Column(String(50), default="OPEN") # OPEN, ASSIGNED, IN_PROGRESS, RESOLVED
    admin_response = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="support_tickets")
    scheme = relationship("Scheme")
    application = relationship("Application")

class SavedScheme(Base):
    __tablename__ = "saved_schemes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheme_id = Column(Integer, ForeignKey("schemes.id"), nullable=False)
    saved_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="saved_schemes")
    scheme = relationship("Scheme")
