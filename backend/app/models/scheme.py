import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    scheme_id = Column(String(100), unique=True, index=True, nullable=False) # e.g. SCHEME-NSP-POSTMATRIC
    scheme_name = Column(String(255), nullable=False, index=True)
    short_name = Column(String(100), nullable=True)
    description = Column(Text, nullable=False)
    objective = Column(Text, nullable=True)
    benefits = Column(Text, nullable=False)
    benefit_type = Column(String(100), nullable=True) # Direct Cash Transfer, Subsidy, Loan Interest Subsidy, Health Coverage, In-Kind
    department = Column(String(255), nullable=True)
    ministry = Column(String(255), nullable=True)
    government_level = Column(String(50), default="Central") # Central, State, Union Territory, Local
    state = Column(String(100), default="All India", index=True) # All India or specific state e.g. Tamil Nadu
    district = Column(String(100), default="All")
    category = Column(String(100), nullable=False, index=True) # Education, Agriculture, Health, Housing, Women & Child, etc.
    sub_category = Column(String(100), nullable=True)
    target_group = Column(String(255), nullable=True) # Students, Small Farmers, Women, BPL Households, etc.

    # Eligibility Bounds
    age_min = Column(Integer, nullable=True)
    age_max = Column(Integer, nullable=True)
    gender_criteria = Column(String(50), default="All") # All, Female, Male, Transgender
    occupation_criteria = Column(JSON, default=list) # e.g. ["Student", "Research Scholar"]
    education_criteria = Column(JSON, default=list)  # e.g. ["Undergraduate", "Post-Graduate"]
    income_limit = Column(Float, nullable=True)      # e.g. 250000 (INR)
    income_period = Column(String(50), default="Annual")
    social_category = Column(JSON, default=list)     # ["SC", "ST", "OBC", "General", "Minority"]
    residence_requirement = Column(String(255), nullable=True)
    employment_requirement = Column(String(255), nullable=True)
    family_conditions = Column(Text, nullable=True)
    disability_conditions = Column(Text, nullable=True)
    special_conditions = Column(Text, nullable=True)

    # Documents & Steps
    required_documents = Column(JSON, default=list) # List of doc names e.g. ["Income Certificate", "Bonafide Certificate"]
    optional_documents = Column(JSON, default=list)
    application_steps = Column(JSON, default=list)  # Numbered step objects or strings
    application_mode = Column(String(50), default="Online") # Online, Offline, Both
    
    # Official Ecosystem URLs
    official_application_url = Column(String(500), nullable=False)
    official_source_url = Column(String(500), nullable=False)
    status_check_url = Column(String(500), nullable=True)
    
    # Temporal & Operational
    deadline = Column(String(100), nullable=True) # e.g. "2026-10-31" or "Open Year-Round"
    scheme_start_date = Column(String(50), nullable=True)
    scheme_end_date = Column(String(50), nullable=True)
    renewal_rules = Column(Text, nullable=True)
    frequency = Column(String(50), default="Annual") # One-time, Monthly, Annual, Per Semester
    helpline = Column(String(100), nullable=True)
    faq = Column(JSON, default=list) # [{"question": "...", "answer": "..."}]
    languages_available = Column(JSON, default=lambda: ["en", "ta", "hi"])

    # Source & Trust
    source_name = Column(String(255), nullable=False) # e.g. "Ministry of Electronics and IT / myScheme"
    source_level = Column(Integer, default=1) # 1: Central/State Official, 2: Department Portal, 3: Gov-backed platform, 4: Secondary
    last_verified_at = Column(DateTime, default=datetime.datetime.utcnow)
    verification_status = Column(String(50), default="VERIFIED") # VERIFIED, NEEDS_REVIEW, DEMO, ARCHIVED
    data_version = Column(String(50), default="1.0.0")

    # Ecosystem integration support flags
    is_umang_supported = Column(Boolean, default=False)
    is_digilocker_supported = Column(Boolean, default=False)

    rules = relationship("SchemeRule", back_populates="scheme", cascade="all, delete-orphan")

class SchemeRule(Base):
    __tablename__ = "scheme_rules"

    id = Column(Integer, primary_key=True, index=True)
    scheme_id = Column(Integer, ForeignKey("schemes.id"), nullable=False)
    criterion_name = Column(String(100), nullable=False) # e.g. "Age Limit", "Income Threshold"
    field_name = Column(String(100), nullable=False)     # e.g. "age", "annual_income", "state", "occupation"
    operator = Column(String(20), nullable=False)        # "gte", "lte", "eq", "in", "contains", "custom"
    expected_value = Column(String(255), nullable=False) # e.g. "250000", "Tamil Nadu", "Student"
    rule_type = Column(String(50), default="MANDATORY")  # MANDATORY, PREFERENTIAL
    weight = Column(Float, default=1.0)
    failure_reason = Column(Text, nullable=False)        # User-facing explanation if failed
    user_facing_label = Column(String(255), nullable=False) # e.g. "Annual family income must be <= ₹2,50,000"

    scheme = relationship("Scheme", back_populates="rules")
