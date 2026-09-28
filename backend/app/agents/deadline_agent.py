import datetime
from typing import Dict, Any, List, Optional

class DeadlineAgent:
    """Agent 11: Deadline Agent. Monitors verified scheme application windows
    and renewal dates, computing exact days remaining and urgency status."""

    def evaluate_deadline(self, scheme: Dict[str, Any]) -> Dict[str, Any]:
        deadline_str = scheme.get("deadline")
        if not deadline_str or deadline_str == "Open Year-Round":
            return {
                "scheme_id": scheme.get("scheme_id"),
                "is_open_year_round": True,
                "deadline_date": None,
                "days_remaining": None,
                "urgency_badge": "Open Year-Round",
                "urgency_color": "emerald",
                "message": "This scheme accepts applications throughout the year."
            }

        try:
            deadline_date = datetime.datetime.strptime(deadline_str, "%Y-%m-%d").date()
            today = datetime.date.today()
            diff = (deadline_date - today).days

            if diff < 0:
                return {
                    "scheme_id": scheme.get("scheme_id"),
                    "is_open_year_round": False,
                    "deadline_date": deadline_str,
                    "days_remaining": 0,
                    "urgency_badge": "Window Closed",
                    "urgency_color": "zinc",
                    "message": f"Application window closed on {deadline_str}. Check next cycle announcement."
                }
            elif diff <= 15:
                return {
                    "scheme_id": scheme.get("scheme_id"),
                    "is_open_year_round": False,
                    "deadline_date": deadline_str,
                    "days_remaining": diff,
                    "urgency_badge": f"Closing in {diff} days!",
                    "urgency_color": "rose",
                    "message": f"Urgent: Application window closes in {diff} days ({deadline_str})."
                }
            elif diff <= 45:
                return {
                    "scheme_id": scheme.get("scheme_id"),
                    "is_open_year_round": False,
                    "deadline_date": deadline_str,
                    "days_remaining": diff,
                    "urgency_badge": f"{diff} days left",
                    "urgency_color": "amber",
                    "message": f"Application window open for {diff} more days ({deadline_str})."
                }
            else:
                return {
                    "scheme_id": scheme.get("scheme_id"),
                    "is_open_year_round": False,
                    "deadline_date": deadline_str,
                    "days_remaining": diff,
                    "urgency_badge": "Active Window",
                    "urgency_color": "emerald",
                    "message": f"Application window open until {deadline_str}."
                }
        except Exception:
            return {
                "scheme_id": scheme.get("scheme_id"),
                "is_open_year_round": False,
                "deadline_date": deadline_str,
                "days_remaining": None,
                "urgency_badge": deadline_str,
                "urgency_color": "sky",
                "message": f"Verified deadline: {deadline_str}."
            }

deadline_agent = DeadlineAgent()
