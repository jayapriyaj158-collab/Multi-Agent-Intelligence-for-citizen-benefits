import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # nullable for guest explorations
    title = Column(String(255), default="New Benefit Consultation")
    language = Column(String(10), default="en") # en, ta, hi
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    messages = relationship("AIMessage", back_populates="conversation", cascade="all, delete-orphan")

class AIMessage(Base):
    __tablename__ = "ai_messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("ai_conversations.id"), nullable=False)
    sender = Column(String(50), nullable=False) # 'citizen' or 'orchestrator' or 'agent'
    content = Column(Text, nullable=False)
    message_type = Column(String(50), default="text") # 'text', 'hybrid_cards', 'question_prompt'
    agent_metadata = Column(JSON, default=dict) # agent breakdown, citations, confidence
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship("AIConversation", back_populates="messages")

class AIAgentRun(Base):
    __tablename__ = "ai_agent_runs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    intent = Column(String(100), nullable=False)
    agents_called = Column(JSON, default=list) # ["ProfileAgent", "DiscoveryAgent", "EligibilityEngine"]
    rules_evaluated_count = Column(Integer, default=0)
    execution_time_ms = Column(Float, default=0.0)
    audit_summary = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    action = Column(String(100), nullable=False) # e.g. "SCHEME_VERIFIED", "APPLICATION_STATUS_UPDATED", "ELIGIBILITY_EVALUATION"
    resource_type = Column(String(100), nullable=False) # Scheme, Application, Profile
    details = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
