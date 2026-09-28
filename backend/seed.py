import datetime
from app.database import engine, SessionLocal, Base
from app.models.user import User, Profile
from app.models.scheme import Scheme, SchemeRule
from app.models.document import Document, DocumentAnalysis
from app.models.application import Application, ApplicationStatusHistory
from app.models.notification import Notification
from app.utils.security import get_password_hash
from app.data.schemes_seed import SCHEMES_SEED_DATA
from app.agents.rag_engine import rag_engine

def seed_database():
    print("Creating all database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Seed Admin User
        admin_user = db.query(User).filter(User.email == "admin@sih2026.gov.in").first()
        if not admin_user:
            print("Seeding Admin User...")
            admin_user = User(
                email="admin@sih2026.gov.in",
                full_name="National Welfare Admin Officer",
                hashed_password=get_password_hash("admin123"),
                role="admin",
                phone="9876543210"
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)

        # 2. Seed Demo Citizen User
        demo_citizen = db.query(User).filter(User.email == "citizen@example.com").first()
        if not demo_citizen:
            print("Seeding Demo Citizen User...")
            demo_citizen = User(
                email="citizen@example.com",
                full_name="Karthik Subramanian",
                hashed_password=get_password_hash("citizen123"),
                role="citizen",
                phone="9840123456"
            )
            db.add(demo_citizen)
            db.commit()
            db.refresh(demo_citizen)

            # Profile for Karthik (College Student, Tamil Nadu, ₹2 Lakh income)
            citizen_profile = Profile(
                user_id=demo_citizen.id,
                age=19,
                gender="Male",
                state="Tamil Nadu",
                district="Chennai",
                occupation="Student",
                education="Undergraduate",
                annual_income=200000.0,
                social_category="OBC",
                disability_status=False,
                marital_status="Single",
                residence_type="Urban",
                family_members_count=4,
                is_bpl=False,
                preferred_language="ta",
                completion_percentage=85
            )
            db.add(citizen_profile)
            db.commit()

            # Seed a sample uploaded document for demo citizen
            sample_doc = Document(
                user_id=demo_citizen.id,
                document_type="Aadhaar Card",
                file_name="aadhaar_card_masked.pdf",
                file_path="./uploaded_documents/aadhaar_card_masked.pdf",
                file_size=142000,
                mime_type="application/pdf",
                verification_status="VERIFIED"
            )
            db.add(sample_doc)
            db.commit()
            db.refresh(sample_doc)

            doc_ana = DocumentAnalysis(
                document_id=sample_doc.id,
                detected_document_type="Aadhaar Card",
                extracted_name="Karthik Subramanian",
                extracted_id_number="XXXX-XXXX-4921",
                extracted_date="2024-01-15",
                extracted_authority="UIDAI",
                confidence_score=0.98,
                validation_issues=["Aadhaar masked format complies with privacy norms."],
                is_consistent="VALID"
            )
            db.add(doc_ana)
            db.commit()

        # 3. Seed Schemes
        existing_schemes_count = db.query(Scheme).count()
        if existing_schemes_count == 0:
            print(f"Seeding {len(SCHEMES_SEED_DATA)} verified and demo government schemes...")
            for s_data in SCHEMES_SEED_DATA:
                rules_data = s_data.get("rules", [])
                scheme_obj = Scheme(
                    scheme_id=s_data["scheme_id"],
                    scheme_name=s_data["scheme_name"],
                    short_name=s_data.get("short_name"),
                    description=s_data["description"],
                    objective=s_data.get("objective"),
                    benefits=s_data["benefits"],
                    benefit_type=s_data.get("benefit_type"),
                    department=s_data.get("department"),
                    ministry=s_data.get("ministry"),
                    government_level=s_data.get("government_level", "Central"),
                    state=s_data.get("state", "All India"),
                    district=s_data.get("district", "All"),
                    category=s_data["category"],
                    sub_category=s_data.get("sub_category"),
                    target_group=s_data.get("target_group"),
                    age_min=s_data.get("age_min"),
                    age_max=s_data.get("age_max"),
                    gender_criteria=s_data.get("gender_criteria", "All"),
                    occupation_criteria=s_data.get("occupation_criteria", []),
                    education_criteria=s_data.get("education_criteria", []),
                    income_limit=s_data.get("income_limit"),
                    income_period=s_data.get("income_period", "Annual"),
                    social_category=s_data.get("social_category", []),
                    residence_requirement=s_data.get("residence_requirement"),
                    employment_requirement=s_data.get("employment_requirement"),
                    family_conditions=s_data.get("family_conditions"),
                    disability_conditions=s_data.get("disability_conditions"),
                    special_conditions=s_data.get("special_conditions"),
                    required_documents=s_data.get("required_documents", []),
                    optional_documents=s_data.get("optional_documents", []),
                    application_steps=s_data.get("application_steps", []),
                    application_mode=s_data.get("application_mode", "Online"),
                    official_application_url=s_data["official_application_url"],
                    official_source_url=s_data["official_source_url"],
                    status_check_url=s_data.get("status_check_url"),
                    deadline=s_data.get("deadline", "Open Year-Round"),
                    renewal_rules=s_data.get("renewal_rules"),
                    frequency=s_data.get("frequency", "Annual"),
                    helpline=s_data.get("helpline"),
                    faq=s_data.get("faq", []),
                    languages_available=s_data.get("languages_available", ["en", "ta", "hi"]),
                    source_name=s_data["source_name"],
                    source_level=s_data.get("source_level", 1),
                    verification_status=s_data.get("verification_status", "VERIFIED"),
                    data_version=s_data.get("data_version", "2026.1"),
                    is_umang_supported=s_data.get("is_umang_supported", False),
                    is_digilocker_supported=s_data.get("is_digilocker_supported", False)
                )
                db.add(scheme_obj)
                db.commit()
                db.refresh(scheme_obj)

                for r in rules_data:
                    rule_obj = SchemeRule(
                        scheme_id=scheme_obj.id,
                        criterion_name=r["criterion_name"],
                        field_name=r["field_name"],
                        operator=r["operator"],
                        expected_value=r["expected_value"],
                        rule_type=r.get("rule_type", "MANDATORY"),
                        weight=r.get("weight", 1.0),
                        failure_reason=r["failure_reason"],
                        user_facing_label=r["user_facing_label"]
                    )
                    db.add(rule_obj)
                db.commit()

            print("Schemes seeded successfully.")
        else:
            print(f"Database already contains {existing_schemes_count} schemes.")

        # Build RAG index
        print("Building RAG TF-IDF Vector Index...")
        all_schemes = db.query(Scheme).all()
        schemes_pool = [
            {
                "scheme_id": s.scheme_id,
                "scheme_name": s.scheme_name,
                "description": s.description,
                "objective": s.objective,
                "benefits": s.benefits,
                "benefit_type": s.benefit_type,
                "category": s.category,
                "state": s.state,
                "income_limit": s.income_limit,
                "target_group": s.target_group,
                "required_documents": s.required_documents or [],
                "source_name": s.source_name,
                "official_source_url": s.official_source_url,
                "source_level": s.source_level,
                "last_verified_at": s.last_verified_at.strftime("%Y-%m-%d") if s.last_verified_at else "2026-09-20"
            }
            for s in all_schemes
        ]
        rag_engine.build_index(schemes_pool)
        print(f"RAG Vector Index built with {len(rag_engine.corpus_chunks)} grounded evidence chunks.")

        print("Database initialization complete!")

    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
