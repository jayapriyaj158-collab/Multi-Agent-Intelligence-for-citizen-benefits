from typing import List, Dict, Any, Optional
from app.agents.rag_engine import rag_engine

class DiscoveryAgent:
    """Agent 3: Scheme Discovery Agent. Searches the verified scheme knowledge base
    using natural language queries and structured citizen profile filters."""

    def discover_schemes(
        self,
        query: str,
        profile: Optional[Dict[str, Any]] = None,
        schemes_pool: Optional[List[Dict[str, Any]]] = None,
        top_k: int = 5
    ) -> List[Dict[str, Any]]:
        if not schemes_pool:
            return []

        scored_schemes = []
        user_state = profile.get("state") if profile else None
        user_occ = profile.get("occupation") if profile else None
        user_edu = profile.get("education") if profile else None
        user_income = profile.get("annual_income") if profile else None
        user_gender = profile.get("gender") if profile else None

        # Get RAG evidence snippets
        rag_hits = {hit["scheme_id"]: hit for hit in rag_engine.retrieve(query, top_k=10)}

        for scheme in schemes_pool:
            score = 0.0
            ranking_reasons = []

            # 1. Semantic / Query match
            if scheme["scheme_id"] in rag_hits:
                sim = rag_hits[scheme["scheme_id"]]["similarity_score"]
                score += sim * 40.0
                ranking_reasons.append("Matches your stated request topics")

            # Keyword heuristic boost
            lower_q = query.lower()
            if scheme["category"].lower() in lower_q or lower_q in scheme["scheme_name"].lower():
                score += 25.0
                ranking_reasons.append(f"Direct match with {scheme['category']} category")

            # 2. State suitability
            scheme_state = scheme.get("state", "All India")
            if scheme_state == "All India":
                score += 15.0
            elif user_state and (scheme_state.lower() == user_state.lower()):
                score += 30.0
                ranking_reasons.append(f"Specifically tailored for residents of {user_state}")
            elif user_state and scheme_state.lower() != user_state.lower():
                # State mismatch
                score -= 40.0

            # 3. Occupation match
            occ_criteria = scheme.get("occupation_criteria", [])
            if user_occ:
                if not occ_criteria or user_occ in occ_criteria:
                    score += 20.0
                    ranking_reasons.append(f"Matches your occupation profile as {user_occ}")
                else:
                    score -= 20.0

            # 4. Income suitability
            inc_limit = scheme.get("income_limit")
            if user_income is not None and inc_limit is not None:
                if user_income <= inc_limit:
                    score += 15.0
                    ranking_reasons.append("Income falls well within eligible criteria")
                else:
                    score -= 30.0

            # 5. Gender suitability
            g_crit = scheme.get("gender_criteria", "All")
            if user_gender and g_crit != "All":
                if user_gender.lower() == g_crit.lower():
                    score += 15.0
                    ranking_reasons.append(f"Targeted welfare priority for {user_gender} beneficiaries")
                else:
                    score -= 50.0

            # Ensure unique, concise explanation
            if not ranking_reasons:
                ranking_reasons.append("Matches general public welfare eligibility")

            scored_schemes.append({
                "scheme": scheme,
                "discovery_score": max(5, int(score)),
                "ranking_reason": " • ".join(ranking_reasons[:2]),
                "rag_snippet": rag_hits.get(scheme["scheme_id"], {}).get("text", "")
            })

        # Sort by highest discovery score
        scored_schemes.sort(key=lambda x: x["discovery_score"], reverse=True)
        return scored_schemes[:top_k]

discovery_agent = DiscoveryAgent()
