import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="citizen")  # citizen, admin
    phone = Column(String(20), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="user", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    saved_schemes = relationship("SavedScheme", back_populates="user", cascade="all, delete-orphan")
    support_tickets = relationship("SupportTicket", back_populates="user", cascade="all, delete-orphan")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(String(50), nullable=True)  # Male, Female, Other
    state = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)
    occupation = Column(String(100), nullable=True)  # Student, Farmer, Unemployed, Self-Employed, Daily Wage, Salaried, Senior Citizen, Homemaker
    education = Column(String(100), nullable=True)   # School, High School, Undergraduate, Post-Graduate, ITI/Diploma, None
    annual_income = Column(Float, nullable=True)     # in INR
    social_category = Column(String(50), nullable=True) # General, OBC, SC, ST, EWS, Minority
    disability_status = Column(Boolean, default=False)
    disability_percentage = Column(Float, nullable=True)
    marital_status = Column(String(50), nullable=True) # Single, Married, Widow, Divorced
    residence_type = Column(String(50), nullable=True) # Rural, Urban, Semi-Urban
    family_members_count = Column(Integer, default=1)
    is_bpl = Column(Boolean, default=False)
    preferred_language = Column(String(10), default="en") # en, ta, hi
    completion_percentage = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="profile")
