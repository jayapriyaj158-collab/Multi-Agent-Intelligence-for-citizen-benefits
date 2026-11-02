"""Comprehensive Automated Integration Test for SIH 2026 Multi-Agent Platform.
Verifies health, auth, schemes, eligibility rules, document intelligence,
and multi-agent natural language chat in English and regional languages.
"""
import sys
import requests
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8001"

def run_tests():
    print("=" * 70)
    print("[*] SIH 2026 MULTI-AGENT CITIZEN BENEFITS PLATFORM - VERIFICATION SUITE")
    print("=" * 70)
    
    passed = 0
    failed = 0

    def assert_test(name, condition, details=""):
        nonlocal passed, failed
        if condition:
            print(f"  [PASS] {name} {details}")
            passed += 1
        else:
            print(f"  [FAIL] {name} - {details}")
            failed += 1

    # 1. Health Endpoint
    print("\n[1] Checking System Health & RAG Index...")
    try:
        r = requests.get(f"{BASE_URL}/api/health", timeout=5)
        data = r.json()
        assert_test("System Health", r.status_code == 200 and data.get("status") == "healthy", f"(RAG chunks: {data.get('rag_chunks_count')})")
    except Exception as e:
        assert_test("System Health", False, str(e))

    # 2. Citizen Authentication
    print("\n[2] Testing Citizen Authentication...")
    citizen_token = None
    try:
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "citizen@example.com", "password": "citizen123"}, timeout=5)
        assert_test("Citizen Login", r.status_code == 200 and "access_token" in r.json())
        citizen_token = r.json().get("access_token")
    except Exception as e:
        assert_test("Citizen Login", False, str(e))

    headers = {"Authorization": f"Bearer {citizen_token}"} if citizen_token else {}

    # 3. Citizen Profile Check
    print("\n[3] Testing Citizen Profile Retrieval...")
    try:
        r = requests.get(f"{BASE_URL}/api/profile", headers=headers, timeout=5)
        prof = r.json()
        assert_test("Profile Retrieval", r.status_code == 200 and prof.get("state") == "Tamil Nadu", f"(State: {prof.get('state')}, Occupation: {prof.get('occupation')})")
    except Exception as e:
        assert_test("Profile Retrieval", False, str(e))

    # 4. Schemes Explorer Pool
    print("\n[4] Testing Verified Schemes Database...")
    try:
        r = requests.get(f"{BASE_URL}/api/schemes", timeout=5)
        schemes = r.json()
        assert_test("Schemes Pool", r.status_code == 200 and len(schemes) >= 10, f"({len(schemes)} schemes indexed)")
    except Exception as e:
        assert_test("Schemes Pool", False, str(e))

    # 5. Scheme Detail & Metadata
    print("\n[5] Testing Single Scheme Details...")
    try:
        r = requests.get(f"{BASE_URL}/api/schemes/SCHEME-NSP-POSTMATRIC-001", timeout=5)
        sc = r.json()
        assert_test("Scheme Detail (NSP)", r.status_code == 200 and "Post-Matric" in sc.get("scheme_name"), f"({sc.get('scheme_name')})")
    except Exception as e:
        assert_test("Scheme Detail (NSP)", False, str(e))

    # 6. Deterministic Rule-Based Eligibility Evaluation
    print("\n[6] Testing Deterministic Rule-Based Eligibility Engine...")
    try:
        r = requests.post(f"{BASE_URL}/api/schemes/SCHEME-NSP-POSTMATRIC-001/eligibility", json={}, headers=headers, timeout=5)
        elig = r.json()
        status = elig.get("status")
        # Should be LIKELY ELIGIBLE or POTENTIALLY ELIGIBLE
        assert_test("Deterministic Eligibility", r.status_code == 200 and status in ["LIKELY ELIGIBLE", "POTENTIALLY ELIGIBLE"], f"(Result: {status}, Score: {elig.get('profile_match_score')}%)")
    except Exception as e:
        assert_test("Deterministic Eligibility", False, str(e))

    # 7. Document Readiness Evaluation
    print("\n[7] Testing Document Readiness & Gap Analysis...")
    try:
        r = requests.get(f"{BASE_URL}/api/documents/readiness/SCHEME-NSP-POSTMATRIC-001", headers=headers, timeout=5)
        ready = r.json()
        pct = ready.get("readiness_percentage")
        assert_test("Document Readiness", r.status_code == 200 and pct is not None, f"({pct}% ready, missing: {ready.get('missing_documents')})")
    except Exception as e:
        assert_test("Document Readiness", False, str(e))

    # 8. Document Issuing Authority & Procurement Guide
    print("\n[8] Testing Document Guidance Knowledge Base...")
    try:
        r = requests.get(f"{BASE_URL}/api/documents/guidance/Income%20Certificate", timeout=5)
        guide = r.json()
        assert_test("Document Guidance (Income Cert)", r.status_code == 200 and "Tahsildar" in guide.get("who_issues", ""), f"(Issuer: {guide.get('who_issues')})")
    except Exception as e:
        assert_test("Document Guidance (Income Cert)", False, str(e))

    # 9. Multi-Agent AI Chat: Student query in Tamil
    print("\n[9] Testing Multi-Agent Orchestration with Tamil Query...")
    try:
        payload = {
            "message": "Naan college student, enakku scholarship irukka?",
            "language": "ta"
        }
        r = requests.post(f"{BASE_URL}/api/ai/chat", json=payload, headers=headers, timeout=10)
        chat_res = r.json()
        agents = [a["agent_name"] for a in chat_res.get("agents_called", [])]
        assert_test("Multi-Agent Tamil Chat", r.status_code == 200 and len(agents) > 0, f"(Agents called: {', '.join(agents)})")
    except Exception as e:
        assert_test("Multi-Agent Tamil Chat", False, str(e))

    # 10. Multi-Agent AI Chat: Application Guidance
    print("\n[10] Testing Multi-Agent Application Guidance Packet...")
    try:
        payload = {
            "message": "Help me apply for scheme SCHEME-NSP-POSTMATRIC-001",
            "language": "en"
        }
        r = requests.post(f"{BASE_URL}/api/ai/chat", json=payload, headers=headers, timeout=10)
        chat_res = r.json()
        card_type = chat_res.get("card_type")
        assert_test("Application Guidance Packet", r.status_code == 200 and card_type == "application_packet", f"(Card Type: {card_type}, Portal: {chat_res.get('card_data', {}).get('official_portal')})")
    except Exception as e:
        assert_test("Application Guidance Packet", False, str(e))

    # 11. Multi-Agent AI Chat: Deadlines Check
    print("\n[11] Testing Multi-Agent Deadline Agent...")
    try:
        payload = {
            "message": "What is the deadline and last date to apply?",
            "language": "en"
        }
        r = requests.post(f"{BASE_URL}/api/ai/chat", json=payload, headers=headers, timeout=10)
        chat_res = r.json()
        card_type = chat_res.get("card_type")
        assert_test("Deadline Agent", r.status_code == 200 and card_type == "deadlines", f"(Card Type: {card_type})")
    except Exception as e:
        assert_test("Deadline Agent", False, str(e))

    # 12. Admin Authentication & AI Audit Runs
    print("\n[12] Testing Admin Access & Explainability Audit Logs...")
    try:
        r_admin = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "admin@sih2026.gov.in", "password": "admin123"}, timeout=5)
        admin_token = r_admin.json().get("access_token")
        admin_headers = {"Authorization": f"Bearer {admin_token}"}
        r_audit = requests.get(f"{BASE_URL}/api/admin/audit-logs", headers=admin_headers, timeout=5)
        audit_runs = r_audit.json()
        assert_test("Admin AI Audit Logs", r_audit.status_code == 200 and len(audit_runs) > 0, f"({len(audit_runs)} audit runs recorded)")
    except Exception as e:
        assert_test("Admin AI Audit Logs", False, str(e))

    print("\n" + "=" * 70)
    print(f"[*] SUMMARY: {passed} PASSED, {failed} FAILED (Total: {passed + failed})")
    print("=" * 70)
    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
