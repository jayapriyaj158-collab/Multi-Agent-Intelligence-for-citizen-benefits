from typing import Dict, Any

DOCUMENT_GUIDANCE: Dict[str, Dict[str, Any]] = {
    "Income Certificate": {
        "document_name": "Income Certificate (வருமானச் சான்றிதழ் / आय प्रमाण पत्र)",
        "what_is_it": "An official government certificate issued by revenue authorities certifying the total annual income earned by all family members from all sources.",
        "why_required": "Used by educational institutions, scholarship boards, and welfare departments to verify economic backwardness or EWS/BPL eligibility.",
        "who_issues": "Revenue Department (Tahsildar / Sub-Divisional Magistrate / Revenue Inspector).",
        "where_to_apply": "State Citizen Service Centers (e-Seva centers, CSCs, Meeseva, MeeSeva, e-District portal) or State Single Window Portal.",
        "online_offline": "Both Online (State e-District / e-Seva portal) and Offline (Tahsildar Office / CSC counter).",
        "expected_process": [
            "Step 1: Visit your state e-District / e-Seva portal (e.g., tnesevai.tn.gov.in in Tamil Nadu, edistrict.up.gov.in in UP).",
            "Step 2: Register / Login with your mobile number and Aadhaar OTP.",
            "Step 3: Fill applicant details, family member income breakdown, and upload salary slip / employer certificate / self-declaration.",
            "Step 4: Village Administrative Officer (VAO) and Revenue Inspector (RI) conduct field/record inquiry.",
            "Step 5: Tahsildar digitally signs and issues certificate (digitally verifiable with QR code)."
        ],
        "official_source_url": "https://services.india.gov.in/service/detail/apply-for-income-certificate",
        "required_inputs": [
            "Aadhaar Card of Applicant & Family Head",
            "Ration Card / Smart Family Card copy",
            "Salary Slip / Form 16 / Bank Statement or Self-Declaration affidavit",
            "Passport Size Photograph"
        ],
        "disclaimer": "Validity is typically 1 financial year. Ensure the certificate covers the current evaluation year."
    },
    "Community / Caste Certificate": {
        "document_name": "Community / Caste Certificate (சாதிச் சான்றிதழ் / जाति प्रमाण पत्र)",
        "what_is_it": "Proof of belonging to a recognized social category such as SC, ST, OBC, MBC, or EWS as notified by the Government of India or State Government.",
        "why_required": "Mandatory to claim affirmative action, quota seats, fee waivers, and specialized scholarship programs.",
        "who_issues": "Zonal Deputy Tahsildar / Revenue Divisional Officer (RDO) / Sub-Divisional Magistrate.",
        "where_to_apply": "e-Seva / e-District portal or local Tahsildar / Revenue Department office.",
        "online_offline": "Both Online and Offline (CSCs / e-Seva).",
        "expected_process": [
            "Step 1: Submit application on State e-District portal or at authorized CSC counter.",
            "Step 2: Attach father's/mother's or sibling's community certificate copy as ancestral proof.",
            "Step 3: Revenue official verification against permanent settlement register.",
            "Step 4: Download digitally signed certificate from DigiLocker or e-District portal."
        ],
        "official_source_url": "https://services.india.gov.in/service/detail/application-for-caste-certificate",
        "required_inputs": [
            "Aadhaar Card of applicant",
            "School Transfer Certificate (TC) mentioning caste",
            "Father's / Mother's / Sibling's Community Certificate",
            "Ration Card or Address proof"
        ],
        "disclaimer": "Community certificates are permanent lifetime documents (except OBC Non-Creamy Layer (NCL) which requires annual renewal)."
    },
    "Bonafide / Student Certificate": {
        "document_name": "Bonafide Student Certificate (கல்லூரி சேர்க்கை சான்றிதழ்)",
        "what_is_it": "A formal certificate issued by the Head of the Institution / College Principal / Registrar certifying that the student is currently enrolled in a recognized degree/diploma course.",
        "why_required": "Required to prove active student status for National Scholarship Portal (NSP), bus pass concessions, and hostel subsidies.",
        "who_issues": "College Registrar / Academic Dean / School Principal.",
        "where_to_apply": "College Academic Section / Student Affairs Office.",
        "online_offline": "Usually issued through college student portal or academic office desk.",
        "expected_process": [
            "Step 1: Download the standardized Bonafide format from National Scholarship Portal (NSP) or state scheme portal.",
            "Step 2: Submit to college registrar office with fee receipt and ID card copy.",
            "Step 3: College verifies roll number, course, and AISHE code, affixes seal and signature."
        ],
        "official_source_url": "https://scholarships.gov.in",
        "required_inputs": [
            "College Student ID card",
            "Current semester fee receipt",
            "NSP standardized Bonafide template form"
        ],
        "disclaimer": "Must bear the college's official AISHE (All India Survey on Higher Education) registration code."
    },
    "Nativity / Domicile Certificate": {
        "document_name": "Nativity / Domicile / Residence Certificate (இருப்பிடச் சான்றிதழ்)",
        "what_is_it": "Official certification that the applicant is a continuous resident of a particular state or union territory.",
        "why_required": "Required for state-specific welfare quotas, state scholarships, and home-state reservation benefits.",
        "who_issues": "Tahsildar / Deputy Tahsildar / SDM.",
        "where_to_apply": "State e-District / e-Seva portal or local Tahsildar office.",
        "online_offline": "Both Online and Offline.",
        "expected_process": [
            "Step 1: Apply on State e-District portal.",
            "Step 2: Upload address proof showing 5+ years of residence (or continuous schooling records).",
            "Step 3: Verification by Village Administrative Officer.",
            "Step 4: Digital issuance."
        ],
        "official_source_url": "https://services.india.gov.in/service/detail/apply-for-domicile-certificate",
        "required_inputs": [
            "Aadhaar Card",
            "Ration Card or Voter ID or Electricity Bill",
            "School study certificates from Class 1 to 10 or 12"
        ],
        "disclaimer": "Can be fetched automatically if linked to DigiLocker."
    },
    "Land Record / Patta Chitta": {
        "document_name": "Land Record / Patta Chitta / RoR (பட்டா சிட்டா / खतौनी)",
        "what_is_it": "Record of Rights (RoR) confirming legal ownership or operational possession of agricultural land.",
        "why_required": "Essential for agricultural schemes like PM-KISAN, crop loan waivers, drip irrigation subsidies, and fertilizer assistance.",
        "who_issues": "State Revenue / Land Survey and Settlement Department.",
        "where_to_apply": "State Land Records Portal (e.g. AnyROR, eservices.tn.gov.in, Bhulekh, BanglarBhumi).",
        "online_offline": "100% Online in most states.",
        "expected_process": [
            "Step 1: Visit state Bhulekh / Land Records portal.",
            "Step 2: Select District, Taluk, Village, and enter Survey Number / Sub-division number.",
            "Step 3: View, verify landowner names, and download digitally signed Patta / RoR copy."
        ],
        "official_source_url": "https://eservices.tn.gov.in/eservicesnew/land/chitta.html",
        "required_inputs": [
            "District, Taluk, Village name",
            "Survey Number or Patta Number"
        ],
        "disclaimer": "For PM-KISAN, the landholder name must exactly match the applicant's Aadhaar name."
    },
    "Disability Certificate / UDID Card": {
        "document_name": "Unique Disability ID (UDID) Card / Disability Certificate",
        "what_is_it": "National identity card issued by medical board certifying benchmark disability percentage (40% and above).",
        "why_required": "Required to claim disability pensions, motorized tricycle subsidies, assistive equipment, and educational reservation.",
        "who_issues": "Department of Empowerment of Persons with Disabilities (DEPwD), Ministry of Social Justice & District Medical Board.",
        "where_to_apply": "Unique Disability ID portal (swavlambancard.gov.in) or District Government Hospital Medical Board.",
        "online_offline": "Online application followed by in-person medical board assessment.",
        "expected_process": [
            "Step 1: Register on www.swavlambancard.gov.in.",
            "Step 2: Upload personal details, disability type, and clinical test records.",
            "Step 3: Attend scheduled medical assessment at District Hospital.",
            "Step 4: Receive digital UDID card and physical smart card by post."
        ],
        "official_source_url": "https://www.swavlambancard.gov.in",
        "required_inputs": [
            "Aadhaar Card",
            "Medical test reports / diagnosis papers",
            "Passport size photograph showing disability if visible"
        ],
        "disclaimer": "Benchmark benefits require at least 40% permanent disability certified by a government medical board."
    }
}

def get_missing_document_guidance(doc_name: str) -> Dict[str, Any]:
    """Retrieve detailed guidance for a document or return a structured fallback."""
    for key, val in DOCUMENT_GUIDANCE.items():
        if key.lower() in doc_name.lower() or doc_name.lower() in key.lower():
            return val
    
    # Generic structured fallback
    return {
        "document_name": doc_name,
        "what_is_it": f"Official certification of {doc_name} required for government eligibility verification.",
        "why_required": "Submitted as documentary proof during scrutiny by the sanctioning department.",
        "who_issues": "Concerned State or Central Government Department or Educational Authority.",
        "where_to_apply": "State Single Window e-Seva portal, CSC centers, or District Administrative Office.",
        "online_offline": "Available via State Citizen Portal or in person at departmental office.",
        "expected_process": [
            "Step 1: Check required checklist on state e-District or department portal.",
            "Step 2: Submit application with proof of identity and local address.",
            "Step 3: Department verifies details and issues certified copy."
        ],
        "official_source_url": "https://services.india.gov.in",
        "required_inputs": ["Aadhaar Card", "Proof of Identity", "Application Form"],
        "disclaimer": "Official issuing procedures may vary slightly by state/district. Please verify with local e-Seva / Tahsildar portal."
    }
