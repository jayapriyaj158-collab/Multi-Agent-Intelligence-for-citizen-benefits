from typing import Dict, Any, List, Optional
from app.agents.document_agent import document_agent
from app.agents.eligibility_engine import eligibility_engine

class ApplicationAssistantAgent:
    """Agent 9 & 10: Application Assistant & Form Field Explainer.
    Guides the citizen step-by-step through official portal application navigation,
    explains confusing application form fields, and coordinates manual demo tracking."""

    FORM_FIELD_EXPLANATIONS = {
        "annual_family_income": {
            "field_name": "Annual Family Income / மொத்த குடும்ப ஆண்டு வருமானம்",
            "explanation": "This refers to the aggregate gross annual income of all earning members of your immediate household (parents, applicant, unmarried siblings) earned in the immediate preceding financial year.",
            "example_value": "₹2,00,000",
            "common_pitfalls": "Do not enter just your own personal income if you are a dependent student; enter the total family income verified on your official Revenue Income Certificate.",
            "caution_note": "Please verify with scheme official instructions before final submission."
        },
        "aishe_code": {
            "field_name": "AISHE Code (All India Survey on Higher Education)",
            "explanation": "A unique institution identifier (e.g. C-12345 or U-0123) assigned to recognized colleges and universities by the Ministry of Education.",
            "example_value": "C-43921",
            "common_pitfalls": "Entering the wrong college AISHE code will route your application to an incorrect institution verification officer.",
            "caution_note": "You can find your college AISHE code on scholarships.gov.in or from your college administration."
        },
        "patta_number": {
            "field_name": "Patta / Khata Number (பட்டா எண் / खतौनी संख्या)",
            "explanation": "The official revenue account number designating agricultural land parcel ownership in the state land records register.",
            "example_value": "Patta No: 1482",
            "common_pitfalls": "Ensure the landowner name associated with this Patta matches your Aadhaar KYC exactly.",
            "caution_note": "Verify live land record on state Bhulekh / AnyROR / e-Services portal."
        },
        "aadhaar_seeded_bank": {
            "field_name": "Aadhaar Seeded Bank Account (NPCI Direct Benefit Transfer)",
            "explanation": "Direct Benefit Transfer (DBT) funds are not sent via traditional account number/IFSC, but directly through the NPCI Aadhaar Payments Bridge (APB).",
            "example_value": "State Bank of India (Aadhaar Linked)",
            "common_pitfalls": "Having Aadhaar linked for KYC is different from NPCI DBT seeding. Check DBT status on resident.uidai.gov.in or UMANG.",
            "caution_note": "Request your bank branch to link your account to NPCI mapper for DBT."
        }
    }

    def prepare_application_packet(
        self,
        scheme: Dict[str, Any],
        profile: Dict[str, Any],
        uploaded_doc_types: List[str]
    ) -> Dict[str, Any]:
        """Assembles a comprehensive, structured pre-application guidance packet."""
        eligibility = eligibility_engine.evaluate_eligibility(scheme, profile)
        readiness = document_agent.compute_document_readiness(scheme, uploaded_doc_types)

        return {
            "scheme_id": scheme["scheme_id"],
            "scheme_name": scheme["scheme_name"],
            "government_level": scheme.get("government_level", "Central"),
            "official_portal": scheme["official_application_url"],
            "status_check_url": scheme.get("status_check_url", scheme["official_application_url"]),
            "application_mode": scheme.get("application_mode", "Online"),
            "eligibility_summary": eligibility["summary_explanation"],
            "eligibility_status": eligibility["status"],
            "document_readiness_percentage": readiness["readiness_percentage"],
            "required_documents": scheme.get("required_documents", []),
            "available_documents": readiness["available_documents"],
            "missing_documents": readiness["missing_documents"],
            "missing_guidance": readiness["guidance"],
            "application_steps": scheme.get("application_steps", []),
            "info_to_keep_ready": [
                "Aadhaar Number & Registered Mobile for OTP",
                "Bank Account Passbook (Aadhaar Seeded)",
                "Scanned copies of required certificates (under 200KB PDF/JPG)",
                "Active Mobile Number and Email Address"
            ],
            "after_submission_steps": [
                "Save your Application ID / Acknowledgement PDF immediately.",
                "Submit hardcopy with college/district nodal officer if notified.",
                "Track progress on the official portal or use our manual tracking board."
            ],
            "disclaimer": "Do NOT submit sensitive passwords or OTPs here. We provide navigation guidance to official government portals only."
        }

    def explain_form_field(self, field_key: str) -> Dict[str, Any]:
        for k, v in self.FORM_FIELD_EXPLANATIONS.items():
            if k in field_key.lower() or field_key.lower() in k:
                return v
        return {
            "field_name": field_key,
            "explanation": f"Official form field: {field_key}. Please refer to the specific scheme brochure for definition.",
            "example_value": "N/A",
            "common_pitfalls": "Check spelling and ensure accuracy against official identity proofs.",
            "caution_note": "Please verify with scheme official instructions before final submission."
        }

application_agent = ApplicationAssistantAgent()
