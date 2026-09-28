from typing import Dict, Any, List, Optional
from app.agents.eligibility_engine import eligibility_engine

class BenefitGapAnalyzerAgent:
    """Agent 12: Benefit Gap Analyzer. Analyzes a citizen's profile beyond their initial inquiry
    to surface high-relevance complementary public benefits they might not be aware of."""

    def analyze_benefit_gaps(
        self,
        profile: Dict[str, Any],
        known_scheme_ids: List[str],
        all_schemes: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        unlocked_categories = []
        complementary_schemes = []

        occupation = profile.get("occupation")
        state = profile.get("state")
        gender = profile.get("gender")
        annual_income = profile.get("annual_income")
        marital_status = profile.get("marital_status")

        # Category bundle logic
        if occupation == "Student":
            unlocked_categories.extend(["Skill Development", "Higher Education Concession", "Technical Certifications"])
        elif occupation == "Farmer":
            unlocked_categories.extend(["Crop Insurance", "Fertilizer Subsidy", "Solar Pump Irrigation"])
        elif marital_status == "Widow":
            unlocked_categories.extend(["Destitute Support", "Healthcare Assurance", "Housing Support"])
        elif occupation in ["Self-Employed", "Daily Wage", "Unemployed"]:
            unlocked_categories.extend(["Artisan Toolkit Grant", "Collateral-Free Credit", "Skill Training"])

        # Health insurance is universal for low-income families
        if annual_income and annual_income <= 300000:
            unlocked_categories.append("Health Assurance (Ayushman Bharat)")

        # Evaluate eligibility on candidate schemes not already in known_scheme_ids
        for scheme in all_schemes:
            if scheme["scheme_id"] in known_scheme_ids:
                continue

            eval_res = eligibility_engine.evaluate_eligibility(scheme, profile)
            if eval_res["status"] in ["LIKELY ELIGIBLE", "POTENTIALLY ELIGIBLE"]:
                complementary_schemes.append({
                    "scheme_id": scheme["scheme_id"],
                    "scheme_name": scheme["scheme_name"],
                    "category": scheme["category"],
                    "benefit_type": scheme.get("benefit_type", "Public Welfare"),
                    "eligibility_status": eval_res["status"],
                    "match_score": eval_res["profile_match_score"],
                    "why_recommended": f"Recommended complementary benefit matching your {occupation or 'demographic'} profile."
                })

        return {
            "has_gap": len(complementary_schemes) > 0,
            "profile_context": {
                "occupation": occupation,
                "state": state,
                "income": annual_income
            },
            "unlocked_categories": list(set(unlocked_categories)),
            "recommended_schemes": complementary_schemes[:4],
            "gap_prompt": "Would you like me to check other benefits you may be missing? Based on your profile, additional entitlements may be available."
        }

benefit_gap_agent = BenefitGapAnalyzerAgent()
