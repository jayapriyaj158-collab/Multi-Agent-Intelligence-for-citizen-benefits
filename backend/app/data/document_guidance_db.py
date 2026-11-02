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
    },
    "Previous Year Marksheet": {
        "document_name": "Previous Year Marksheet / Grade Transcript (முந்தைய ஆண்டு மதிப்பெண் சான்றிதழ்)",
        "what_is_it": "Official statement of marks or grade card issued by the educational institution or university board for the preceding academic year.",
        "why_required": "Used by scholarship authorities to verify academic progress, eligibility percentage, and continuous enrollment.",
        "who_issues": "Controller of Examinations / School Board / College Academic Cell.",
        "where_to_apply": "College Academic Administration Office or DigiLocker National Academic Depository (NAD).",
        "online_offline": "Both Online (DigiLocker / University Student Portal) and Offline (College Examination Cell).",
        "expected_process": [
            "Step 1: Download verified digital marksheet from DigiLocker National Academic Depository (NAD) using your student registration number.",
            "Step 2: Alternatively, request an official certified duplicate from your college registrar/principal office with institutional seal."
        ],
        "official_source_url": "https://nad.digilocker.gov.in",
        "required_inputs": [
            "Student Examination Roll / Registration Number",
            "College Student ID card"
        ],
        "disclaimer": "Must indicate the official institutional seal or DigiLocker digital verification certificate."
    },
    "Bank Passbook": {
        "document_name": "Bank Passbook / Account Statement (வங்கி கணக்கு புத்தகம்)",
        "what_is_it": "Front page of the bank passbook or recent electronic account statement displaying account holder name, account number, and bank IFSC code.",
        "why_required": "Required for Direct Benefit Transfer (DBT) of scholarship, subsidy, or pension credits directly into the citizen's Aadhaar-seeded bank account.",
        "who_issues": "Authorized Public / Private Scheduled Commercial Bank, Regional Rural Bank (RRB), or India Post Payments Bank.",
        "where_to_apply": "Home Bank Branch or through authorized Net Banking / Mobile Banking portal.",
        "online_offline": "Both Online (Net Banking e-Statement) and Offline (Bank branch counter).",
        "expected_process": [
            "Step 1: Visit your home bank branch or log in to net banking.",
            "Step 2: Ensure your account is Aadhaar-seeded on NPCI mapper for DBT credit.",
            "Step 3: Obtain a clear copy of the front passbook page or download e-statement with printed IFSC."
        ],
        "official_source_url": "https://financialservices.gov.in",
        "required_inputs": [
            "Savings Account Number",
            "Aadhaar Card linked to Mobile for OTP"
        ],
        "disclaimer": "Account must be active and mapped to Aadhaar via NPCI for Direct Benefit Transfer (DBT)."
    },
    "Ration Card": {
        "document_name": "Ration Card / Smart Family Card (குடும்ப அட்டை / राशन कार्ड)",
        "what_is_it": "Official family entitlement card issued by state civil supplies authorities certifying family composition and food security classification.",
        "why_required": "Required to verify household members, resident status, and economic category (BPL/AAY/NPHH).",
        "who_issues": "Department of Food, Civil Supplies and Consumer Affairs / Taluk Supply Officer (TSO).",
        "where_to_apply": "State Public Distribution Portal (e.g. tnpds.gov.in) or local e-Seva / CSC center.",
        "online_offline": "Both Online (State PDS Portal) and Offline (Taluk Supply Office / Fair Price Shop).",
        "expected_process": [
            "Step 1: Visit state PDS portal or authorized CSC counter.",
            "Step 2: Submit family head Aadhaar and member details with gas consumer number.",
            "Step 3: Verification by Taluk Supply Inspector and issuance of Smart Family Card."
        ],
        "official_source_url": "https://nfsa.gov.in",
        "required_inputs": [
            "Aadhaar Cards of all family members",
            "Address proof / Electricity bill"
        ],
        "disclaimer": "Ensure all family member names match Aadhaar spelling to avoid DBT validation mismatches."
    },
    "Husband Death Certificate": {
        "document_name": "Husband Death Certificate (கணவரின் இறப்புச் சான்றிதழ் / पति का मृत्यु प्रमाण पत्र)",
        "what_is_it": "Official civil registration certificate confirming the demise of the husband, issued under the Registration of Births and Deaths Act.",
        "why_required": "Mandatory statutory document required to confirm eligibility for National and State Widow Pension schemes.",
        "who_issues": "Registrar of Births & Deaths / Municipal Corporation / Village Administrative Officer (VAO).",
        "where_to_apply": "Civil Registration System (CRS) portal or local municipal / panchayat administration office.",
        "online_offline": "Both Online (crsorgi.gov.in / State Urban Local Body Portal) and Offline (Local Registrar Office).",
        "expected_process": [
            "Step 1: Submit death report within 21 days at the municipal corporation or panchayat office.",
            "Step 2: Attach hospital medical cause of death slip and burial/cremation receipt.",
            "Step 3: Registrar registers record and issues digital certificate."
        ],
        "official_source_url": "https://crsorgi.gov.in",
        "required_inputs": [
            "Hospital Medical Certification of Cause of Death",
            "Aadhaar card of deceased husband and surviving spouse"
        ],
        "disclaimer": "Must bear government registration number and official seal or digital PKI signature."
    },
    "Aadhaar Card": {
        "document_name": "Aadhaar Card (UIDAI) (ஆதார் அட்டை / आधार कार्ड)",
        "what_is_it": "12-digit unique identity number issued by UIDAI based on biometric and demographic data.",
        "why_required": "Statutory identity and address proof required for scheme beneficiary validation and DBT payment processing.",
        "who_issues": "Unique Identification Authority of India (UIDAI).",
        "where_to_apply": "Authorized Aadhaar Seva Kendra, post office, or myAadhaar portal (myaadhaar.uidai.gov.in).",
        "online_offline": "Both Online (myAadhaar download with OTP) and Offline (Aadhaar Seva Kendra).",
        "expected_process": [
            "Step 1: Visit myaadhaar.uidai.gov.in and click 'Download Aadhaar'.",
            "Step 2: Enter 12-digit Aadhaar number and OTP received on linked mobile.",
            "Step 3: Download password-protected masked e-Aadhaar PDF."
        ],
        "official_source_url": "https://myaadhaar.uidai.gov.in",
        "required_inputs": [
            "Aadhaar Number or Enrollment ID (EID)",
            "Registered Mobile Number for OTP"
        ],
        "disclaimer": "Always prefer masked Aadhaar showing only last 4 digits for privacy compliance."
    }
}

def get_missing_document_guidance(doc_name: str) -> Dict[str, Any]:
    """Retrieve detailed guidance for a document or return verified fallback."""
    for key, val in DOCUMENT_GUIDANCE.items():
        if key.lower() in doc_name.lower() or doc_name.lower() in key.lower():
            return val
    
    # Generic structured fallback (Requirement #11)
    return {
        "document_name": doc_name,
        "what_is_it": "Official acquisition information is not available in the current verified data.",
        "why_required": f"Submitted as documentary requirement for verified scheme processing.",
        "who_issues": "Official acquisition information is not available in the current verified data.",
        "where_to_apply": "Official acquisition information is not available in the current verified data.",
        "online_offline": "Official acquisition information is not available in the current verified data.",
        "expected_process": [
            "Official acquisition information is not available in the current verified data."
        ],
        "official_source_url": "https://services.india.gov.in",
        "required_inputs": [],
        "disclaimer": "This score reflects your document preparation progress for this application, not government document verification."
    }
