# Multi-Agent Intelligence for Citizen Benefits
### Autonomous Multi-Agent AI Platform for Indian Welfare Access

> **"From Scheme Search to Benefit Access"**  
> *One Profile. Multiple Benefits. Explainable AI. Guided Access.*  
> **Core Journey:** ASK → UNDERSTAND → DISCOVER → VERIFY → EXPLAIN → PREPARE → APPLY → TRACK → FOLLOW-UP

---

## 1. Project Overview & Innovation

Existing Indian government portals (such as **myScheme**, **UMANG**, **DigiLocker**, and State **e-District** platforms) provide scheme catalogs, services, and document repositories. However, citizens still face significant friction:
- Citizens must know bureaucratic scheme names or technical keywords.
- Monolithic LLM chatbots hallucinate eligibility, false approvals, and non-existent deadlines.
- Citizens discover only one scheme and miss out on complementary benefits (the *Benefit Gap*).
- Complex application fields and missing certificates (e.g., Income or Community Certificates) cause dropouts before submission.

### Our Solution
**Citizen Benefit Intelligence** is an intelligent assistance and multi-agent orchestration layer built directly above the existing Indian digital public infrastructure. It combines:
1. **Multi-Agent AI Architecture** (12 specialized agents coordinated by a Central Orchestrator)
2. **Deterministic Rule Engine** (Zero hallucination; rules evaluated mathematically against verified bounds)
3. **Explainable AI Breakdown** (Criterion-by-criterion explanation table + Profile Match score with safe disclaimer)
4. **Document Intelligence & Readiness Score** (Simulated & real OCR extraction, name/income consistency checks, readiness percentages e.g. *80% Ready*)
5. **Missing Document Procurement Guidance** (Step-by-step guides on who issues missing documents, e-Seva / Tahsildar procedures, online/offline routes)
6. **Application Preparation & Form Field Explainer** (Explains confusing terms like *Annual Family Income*, *AISHE Code*, *Patta Number*)
7. **Manual Demo Tracking & Timeline** (Submitted → Verified → Review → Sanctioned milestones)
8. **Voice-First & Multilingual Access** (Web Speech Recognition & Synthesis in English, Tamil தமிழ், and Hindi हिन्दी)
9. **Low-Literacy Simple Mode** (Large visual icons, high contrast, audio-guided navigation)
10. **Knowledge Freshness Monitor & 4-Tier Source Trust Model** (Administrative review queue for sources older than 60 days)
11. **Benefit Gap Analyzer** (Proactively unlocks bundled entitlements across education, agriculture, health, and social security)
12. **Human Escalation & Support Tickets** (Bridge to welfare officers and CPGRAMS link)

---

## 2. Multi-Agent Architecture

```
                                  [ Citizen ]
                               (Voice / Text UI)
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │   Central Orchestrator    │
                        │          Agent            │
                        └─────────────┬─────────────┘
                                      │
    ┌────────────────┬────────────────┼────────────────┬────────────────┐
    ▼                ▼                ▼                ▼                ▼
[Agent 1]        [Agent 2]        [Agent 3]        [Agent 4]        [Agent 5]
 Citizen          Intent           Scheme        Deterministic     Explainable
 Profile        Classifier       Discovery        Rule Engine      Eligibility
  Agent            Agent           Agent            (Math)            Agent
    │                │                │                │                │
    ├────────────────┴────────────────┴────────────────┴────────────────┤
    │
    ▼
┌────────────────┬────────────────┬────────────────┬────────────────┐
│   [Agent 6]    │   [Agent 7]    │   [Agent 8]    │   [Agent 9]    │
│  Missing Info  │    Document    │  Missing Doc   │  Application   │
│   Inquiry      │  Intelligence  │   Guidance     │   Assistant    │
└────────────────┴────────────────┴────────────────┴────────────────┘
    │                │                │                │
    ▼                ▼                ▼                ▼
┌────────────────┬────────────────┬────────────────┬────────────────┐
│   [Agent 10]   │   [Agent 11]   │   [Agent 12]   │   [RAG Engine] │
│ Manual Status  │    Deadline    │  Benefit Gap   │ Grounded TF-IDF│
│    Tracker     │   Urgency      │    Analyzer    │ Vector Citations│
└────────────────┴────────────────┴────────────────┴────────────────┘
                                      │
                                      ▼
             [ Verified Indian Digital Ecosystem & Knowledge Base ]
           (myScheme • UMANG • DigiLocker • National Portal • NSP)
```

### Specialized Agents:
1. **Citizen Profile Agent**: Extracts structured demographic entities (age, occupation, education, state, income, social category) from conversational sentences (English, Tamil, Hindi, Tanglish, Hinglish) and calculates profile completion percentage without redundant questions.
2. **Intent Agent**: Classifies 11+ citizen intents (`FIND_SCHEME`, `CHECK_ELIGIBILITY`, `DOCUMENT_REQUIREMENTS`, `APPLICATION_GUIDANCE`, `APPLICATION_STATUS`, `DEADLINE`, `BENEFIT_COMPARISON`, `DOCUMENT_HELP`, `GRIEVANCE`, `VOICE_NAVIGATION`).
3. **Scheme Discovery Agent**: Hybrid search matching semantic query vector similarity with demographic and geographic SQL filters. Transparently provides a *"Why this ranks"* reason.
4. **Deterministic Eligibility Engine**: Strict rule evaluator evaluating numerical and categorical bounds (`age`, `annual_income`, `state`, `occupation`, `social_category`). Never allows LLM hallucinations. Outputs:
   - `LIKELY ELIGIBLE`
   - `POTENTIALLY ELIGIBLE`
   - `LIKELY NOT ELIGIBLE`
   - `INSUFFICIENT INFORMATION`
5. **Explainable AI Agent**: Produces criterion-by-criterion evaluation tables and calculates AI Profile Match similarity percentages with mandatory non-governmental disclaimers.
6. **Missing Information Agent**: Proactively asks only the single most critical missing attribute (e.g. State or Income) needed to confirm eligibility.
7. **Document Intelligence Agent**: Performs OCR extraction, cross-validates applicant name and income against profile, flags inconsistencies, and calculates readiness scores (e.g., *80% Ready*).
8. **Missing Document Guide Agent**: Provides structured step-by-step guides on where and how to obtain required certificates (who issues, where to apply, online/offline, requirements).
9. **Application Assistant & Form Field Explainer**: Prepares pre-application checklists and clarifies confusing government form inputs.
10. **Application Status Agent**: Coordinates manual demo tracking and historical timeline milestones.
11. **Deadline Agent**: Calculates remaining days to official submission windows and triggers urgency warnings.
12. **Benefit Gap Analyzer**: Evaluates full profile to uncover unapplied complementary entitlements.

---

## 3. Technology Stack

- **Backend**:
  - Python 3.13, FastAPI (Async REST APIs)
  - Pydantic v2 (Strict request/response validation)
  - SQLAlchemy 2.0 (ORM with SQLite out-of-the-box and PostgreSQL readiness)
  - Scikit-learn & NumPy (TF-IDF Vector Embeddings & Cosine Similarity for Grounded RAG)
  - Standard Library PBKDF2-HMAC-SHA256 password hashing & PyJWT tokens
- **Frontend**:
  - React 18, TypeScript, Vite
  - Tailwind CSS with custom Glassmorphism & dark/light theme
  - Lucide React (Accessible iconography)
  - React Router v6
  - Web Speech API (Native Speech Recognition & Speech Synthesis for Tamil `ta-IN`, Hindi `hi-IN`, English `en-IN`)
- **Deployment**:
  - Zero paid API key dependencies (Runs 100% locally in Demo Mode)

---

## 4. Running the Platform Locally

### Prerequisites
- Python 3.10+ (Tested on Python 3.13)
- Node.js 18+ (Tested on Node.js 24)

### Step 1: Start Backend
```powershell
# Open terminal in project root:
cd backend

# (Optional: activate virtualenv if desired)
# Run database seed and startup:
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```
*Backend will automatically seed the database with verified Indian welfare schemes, admin user, and demo citizen profile.*
- API Docs: `http://127.0.0.1:8001/api/docs`
- Health check: `http://127.0.0.1:8001/api/health`

### Step 2: Start Frontend
```powershell
# In a new terminal:
cd frontend
npm run dev
```
- Frontend will launch at `http://localhost:5174/` (or `http://localhost:5173/`)
- Vite automatically proxies `/api` and `/static` to the backend.

---

## 5. 1-Click Demo Evaluation Credentials

| Role | Email | Password | Pre-configured Profile |
| :--- | :--- | :--- | :--- |
| **Demo Citizen** | `citizen@example.com` | `citizen123` | Karthik Subramanian, 19, Student, Undergraduate, Tamil Nadu, Family Income ₹2,00,000, OBC |
| **Demo Admin** | `admin@citizenbenefits.gov.in` | `admin123` | National Welfare Admin Officer (Access to Rule Editor, Freshness Monitor, Audit Logs) |

*(You can also click the quick **"Demo Citizen"** or **"Demo Admin"** buttons directly on the Navbar or Login page).*

---

## 6. Live System Evaluation Scenarios

### Benchmark Scenario 1: Tamil College Student (Requirement #55)
1. Navigate to **AI Assistant** or tap the **Microphone** button.
2. Speak or enter:
   > *"Naan college student. En family income around 2 lakh. Enakku government scholarship irukka?"*
3. The system automatically detects Tamil language, identifies Student occupation, extracts ₹2 Lakh income, and responds in Tamil:
   > *“உங்கள் தகவலின் அடிப்படையில் சில கல்வி மற்றும் மாணவர் நலத் திட்டங்கள் பொருந்தக்கூடும்...”*
4. Providing State as **Tamil Nadu** unlocks:
   - **Post-Matric Scholarship Scheme for SC/ST/OBC Students**
   - **Pudhumai Penn Scheme** (if female)
   - **Central Sector Scholarship (PM-USP)**
   - **Naan Mudhalvan Skill & Higher Education Scheme**
5. Evaluates each rule deterministically, checks document readiness, shows missing document guidance for Income Certificate, provides official application links, and enables manual demo tracking.

### Benchmark Scenario 2: Farmer Support (Hindi / English)
1. Speak or enter:
   > *"Main kisan hu, meri fasal bima aur kisan yojana ke bare me batayein."*
2. System detects Hindi, extracts Farmer occupation, and retrieves **PM-KISAN** and **PMFBY Crop Insurance**.
3. Explains Land Record (Patta Chitta) requirements, e-KYC steps, and official portal navigation.

### Benchmark Scenario 3: Voice Navigation (Requirement #30)
1. Press the Microphone button.
2. Say:
   - *"Open my applications"* ➔ Instantly navigates to Applications tracking board.
   - *"Show scholarship schemes"* ➔ Opens Scheme Explorer filtered for Education.
   - *"Enakku missing documents enna?"* ➔ Opens Document Center.

### Benchmark Scenario 4: Low-Literacy Simple Mode (Requirement #29)
1. Click **Simple Mode** on the navbar.
2. Renders high-accessibility interface with giant touch buttons, visual icons (🎓, 🌾, 💰, 🏠, 🏥, 💼, 👵), and a button that audibly reads instructions in Tamil or Hindi.

---

## 7. Compliance & AI Ethics Guidelines
- **Zero Hallucination Guarantee**: Rule evaluation is handled exclusively by Python mathematical operators (`lte`, `gte`, `eq`, `in`); LLMs do not generate or guess eligibility thresholds.
- **Truth in Advertising**: Explicit banners clearly denote **Manual Demo Tracking** and **AI-assisted Profile Match Score** with non-governmental disclaimers.
- **Privacy First**: No raw Aadhaar or banking OTPs are requested or saved.
