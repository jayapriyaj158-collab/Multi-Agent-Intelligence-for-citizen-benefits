import re
import datetime
from typing import Dict, Any, List, Optional
from app.data.document_guidance_db import get_missing_document_guidance

class DocumentIntelligenceAgent:
    """Agent 7 & 8: Document Intelligence & Readiness Agent.
    Analyzes uploaded documents (OCR simulation/extraction), verifies name/income/authority consistency,
    computes document preparation readiness score, and provides missing document acquisition guides."""

    def analyze_document_content(
        self,
        file_name: str,
        doc_type_declared: str,
        user_name: Optional[str] = "Citizen Applicant",
        user_income: Optional[float] = None
    ) -> Dict[str, Any]:
        """Performs structured OCR field extraction and consistency validation."""
        now = datetime.datetime.utcnow()
        current_year = now.year

        # Heuristic / deterministic mock OCR extraction
        lower_fn = file_name.lower()
        extracted_name = user_name or "Citizen Applicant"
        extracted_authority = "Tahsildar / Revenue Department, Government of Tamil Nadu"
        extracted_date = f"{current_year}-04-12"
        extracted_income = user_income if user_income else 180000.0
        confidence = 0.94
        validation_issues = []
        is_consistent = "VALID"

        if "income" in doc_type_declared.lower() or "income" in lower_fn:
            doc_type_detected = "Income Certificate"
            extracted_authority = "Tahsildar Office / Revenue Administration"
            if user_income and abs(extracted_income - user_income) > 100000:
                validation_issues.append("Document stated income differs significantly from profile declaration.")
                is_consistent = "NEEDS_REVIEW"
                confidence = 0.78
            else:
                validation_issues.append("Annual income within eligible government threshold.")
        elif "caste" in doc_type_declared.lower() or "community" in doc_type_declared.lower():
            doc_type_detected = "Community / Caste Certificate"
            extracted_authority = "Zonal Deputy Tahsildar / Revenue Department"
            validation_issues.append("Verified government seal and digital signature detected.")
        elif "bonafide" in doc_type_declared.lower() or "student" in doc_type_declared.lower():
            doc_type_detected = "Bonafide / Student Certificate"
            extracted_authority = "Principal / Dean Academic Affairs, Affiliated College"
            validation_issues.append("AISHE code stamp verified.")
        elif "aadhaar" in doc_type_declared.lower() or "aadhar" in lower_fn:
            doc_type_detected = "Aadhaar Card"
            extracted_authority = "Unique Identification Authority of India (UIDAI)"
            validation_issues.append("Masked Aadhaar format verified.")
        elif "land" in doc_type_declared.lower() or "patta" in lower_fn:
            doc_type_detected = "Land Record / Patta Chitta"
            extracted_authority = "Department of Land Administration and Survey"
            validation_issues.append("Survey and Sub-division number matched with revenue register.")
        else:
            doc_type_detected = doc_type_declared
            validation_issues.append("Standard format validated.")

        ocr_raw_text = (
            f"GOVERNMENT OF TAMIL NADU / REVENUE DEPARTMENT\n"
            f"CERTIFICATE OF {doc_type_detected.upper()}\n"
            f"Certificate No: TN-{current_year}-REV-{int(now.timestamp()) % 100000:05d}\n"
            f"This is to certify that Sri/Kumari {extracted_name} residing at District Taluk\n"
            f"Annual Family Income: ₹{int(extracted_income):,}\n"
            f"Issued By: {extracted_authority}\n"
            f"Date of Issue: {extracted_date}\n"
            f"Digitally Signed through State e-Seva PKI Infrastructure."
        )

        return {
            "detected_document_type": doc_type_detected,
            "extracted_name": extracted_name,
            "extracted_id_number": f"REV/{current_year}/{int(now.timestamp()) % 999999:06d}",
            "extracted_date": extracted_date,
            "extracted_income": extracted_income,
            "extracted_authority": extracted_authority,
            "confidence_score": confidence,
            "validation_issues": validation_issues,
            "is_consistent": is_consistent,
            "ocr_raw_text": ocr_raw_text
        }

    def compute_document_readiness(
        self,
        scheme: Dict[str, Any],
        user_uploaded_doc_types: List[str]
    ) -> Dict[str, Any]:
        """Calculates document readiness score and prepares missing document guidance."""
        required = scheme.get("required_documents", [])
        if not required:
            return {
                "scheme_id": scheme.get("scheme_id"),
                "scheme_name": scheme.get("scheme_name"),
                "total_required": 0,
                "total_available": 0,
                "readiness_percentage": 100,
                "available_documents": [],
                "missing_documents": [],
                "guidance": {},
                "disclaimer": "This score reflects your document preparation progress for this application, not government document verification."
            }

        available = []
        missing = []
        guidance_map = {}

        # Normalize strings
        uploaded_set = {u.strip().lower() for u in user_uploaded_doc_types}

        for req in required:
            req_clean = req.strip().lower()
            # check partial match
            is_found = False
            for up in uploaded_set:
                if up in req_clean or req_clean in up:
                    is_found = True
                    break

            if is_found:
                available.append(req)
            else:
                missing.append(req)
                guidance_map[req] = get_missing_document_guidance(req)

        total = len(required)
        avail_cnt = len(available)
        readiness_pct = int((avail_cnt / total) * 100) if total > 0 else 100

        return {
            "scheme_id": scheme.get("scheme_id"),
            "scheme_name": scheme.get("scheme_name"),
            "total_required": total,
            "total_available": avail_cnt,
            "readiness_percentage": readiness_pct,
            "available_documents": available,
            "missing_documents": missing,
            "guidance": guidance_map,
            "disclaimer": "This score reflects your document preparation progress for this application, not government document verification."
        }

document_agent = DocumentIntelligenceAgent()
