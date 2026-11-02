from typing import Dict, Any, List, Optional

class EligibilityEngine:
    """Agent 4 & 5: Deterministic Eligibility Engine & Explainable AI.
    Evaluates profile attributes against structured scheme rules.
    Guarantees deterministic results without LLM hallucinations."""

    def evaluate_eligibility(self, scheme: Dict[str, Any], profile: Dict[str, Any]) -> Dict[str, Any]:
        rules = scheme.get("rules", [])
        criteria_evaluated = []
        mandatory_failed = False
        missing_count = 0
        passed_count = 0
        missing_fields = []

        if not rules:
            # Generate default fallback rules from scheme model bounds
            rules = self._synthesize_rules_from_scheme(scheme)

        for rule in rules:
            field = rule.get("field_name")
            op = rule.get("operator", "eq")
            expected = rule.get("expected_value")
            label = rule.get("user_facing_label", f"Check {field}")
            fail_reason = rule.get("failure_reason", "Condition not met")
            rule_type = rule.get("rule_type", "MANDATORY")

            user_val = profile.get(field)

            if user_val is None or user_val == "":
                status = "MISSING_INFO"
                detail = f"Missing profile information for '{field}'. Please provide this to confirm eligibility."
                missing_count += 1
                missing_fields.append(field)
            else:
                passed = self._evaluate_condition(user_val, op, expected)
                if passed:
                    status = "SATISFIED"
                    detail = f"Satisfied: Your value ({user_val}) matches requirements."
                    passed_count += 1
                else:
                    status = "FAILED"
                    detail = fail_reason
                    if rule_type == "MANDATORY":
                        mandatory_failed = True

            criteria_evaluated.append({
                "criterion_name": rule.get("criterion_name", label),
                "user_facing_label": label,
                "status": status,
                "detail": detail,
                "rule_type": rule_type,
                "field_name": field,
                "user_value": user_val,
                "expected_value": expected
            })

        total_criteria = len(criteria_evaluated)
        
        # Calculate AI profile match score (bounded safely between 20% and 94%, never 100%)
        if total_criteria > 0:
            raw_ratio = passed_count / total_criteria
            if mandatory_failed:
                profile_match_score = max(15, int(raw_ratio * 40))
            else:
                profile_match_score = min(94, max(30, int(raw_ratio * 92)))
        else:
            profile_match_score = 50

        # Determine status deterministically
        if mandatory_failed:
            status = "LIKELY NOT ELIGIBLE"
            status_color = "rose"
            summary_explanation = f"Based on your profile, you do not meet {total_criteria - passed_count - missing_count} mandatory criteria. Note: Official guidelines allow appeals or state relaxations in certain categories."
        elif missing_count > 0 and passed_count == 0:
            status = "INSUFFICIENT INFORMATION"
            status_color = "sky"
            summary_explanation = f"Additional profile information is required to evaluate eligibility ({', '.join(missing_fields)})."
        elif missing_count > 0:
            status = "POTENTIALLY ELIGIBLE"
            status_color = "amber"
            summary_explanation = f"You appear to satisfy {passed_count} of the {total_criteria} criteria based on the information provided. Your {', '.join(missing_fields)} information is still required to confirm qualification."
        else:
            status = "LIKELY ELIGIBLE"
            status_color = "emerald"
            summary_explanation = f"You satisfy all {passed_count} verified criteria for this scheme based on your declared profile. You can proceed with document preparation and portal application."

        return {
            "scheme_id": scheme.get("scheme_id"),
            "scheme_name": scheme.get("scheme_name"),
            "status": status,
            "status_color": status_color,
            "criteria_evaluated": criteria_evaluated,
            "criteria_passed_count": passed_count,
            "criteria_total_count": total_criteria,
            "missing_criteria_fields": list(set(missing_fields)),
            "summary_explanation": summary_explanation,
            "profile_match_score": profile_match_score,
            "disclaimer": "This is an AI-assisted assessment based on the information provided. Final eligibility is determined by the concerned government authority."
        }

    def _evaluate_condition(self, user_val: Any, op: str, expected_val: Any) -> bool:
        try:
            if op == "eq":
                return str(user_val).strip().lower() == str(expected_val).strip().lower()
            elif op == "lte":
                return float(user_val) <= float(expected_val)
            elif op == "gte":
                return float(user_val) >= float(expected_val)
            elif op == "in":
                # comma separated items
                items = [x.strip().lower() for x in str(expected_val).split(",")]
                return str(user_val).strip().lower() in items
            elif op == "contains":
                return str(expected_val).strip().lower() in str(user_val).strip().lower()
        except Exception:
            return False
        return False

    def _synthesize_rules_from_scheme(self, scheme: Dict[str, Any]) -> List[Dict[str, Any]]:
        synth_rules = []
        if scheme.get("age_min"):
            synth_rules.append({
                "criterion_name": "Minimum Age",
                "field_name": "age",
                "operator": "gte",
                "expected_value": str(scheme["age_min"]),
                "rule_type": "MANDATORY",
                "failure_reason": f"Age must be at least {scheme['age_min']} years.",
                "user_facing_label": f"Age must be ≥ {scheme['age_min']} years"
            })
        if scheme.get("income_limit"):
            synth_rules.append({
                "criterion_name": "Income Limit",
                "field_name": "annual_income",
                "operator": "lte",
                "expected_value": str(scheme["income_limit"]),
                "rule_type": "MANDATORY",
                "failure_reason": f"Annual family income must not exceed ₹{int(scheme['income_limit']):,}.",
                "user_facing_label": f"Annual income must be ≤ ₹{int(scheme['income_limit']):,}"
            })
        if scheme.get("state") and scheme.get("state") != "All India":
            synth_rules.append({
                "criterion_name": "State Residency",
                "field_name": "state",
                "operator": "eq",
                "expected_value": scheme["state"],
                "rule_type": "MANDATORY",
                "failure_reason": f"Must reside in {scheme['state']}.",
                "user_facing_label": f"Must be resident of {scheme['state']}"
            })
        if scheme.get("occupation_criteria"):
            synth_rules.append({
                "criterion_name": "Occupation Eligibility",
                "field_name": "occupation",
                "operator": "in",
                "expected_value": ",".join(scheme["occupation_criteria"]),
                "rule_type": "MANDATORY",
                "failure_reason": "Applicant occupation does not match scheme target group.",
                "user_facing_label": f"Occupation in: {', '.join(scheme['occupation_criteria'])}"
            })
        return synth_rules

eligibility_engine = EligibilityEngine()
