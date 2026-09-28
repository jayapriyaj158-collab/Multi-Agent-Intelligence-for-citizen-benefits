import re
from typing import Dict, Any

class IntentAgent:
    """Agent 2: Intent Agent. Analyzes natural language (English, Tamil, Hindi, Tanglish, Hinglish)
    to classify citizen objective and determine downstream agent orchestration."""

    INTENTS = {
        "VOICE_NAVIGATION": [
            r"open (?:my )?(?:applications|documents|profile|dashboard|schemes|settings)",
            r"(?:show|view) (?:my )?(?:applications|documents|scholarship|schemes)",
            r"enakku missing documents enna",
            r"open document center",
            r"application status check",
        ],
        "APPLICATION_STATUS": [
            r"(?:status|track|check|tracking|status eppadi|status kaise check|kahan tak pahuncha|application status)",
            r"(?:check my application|track application|application no)"
        ],
        "DOCUMENT_HELP": [
            r"(?:how to get|how to obtain|eppadi vaanguradhu|kaise banwaye|where to apply for doc)",
            r"(?:caste certificate venuma|income certificate eppadi|how to get income certificate)"
        ],
        "DOCUMENT_REQUIREMENTS": [
            r"(?:what documents|enna documents|document venum|kaunse documents|dastavej|pramaan patra chahiye|documents needed)",
            r"(?:indha scheme-ku enna documents|documents required)"
        ],
        "APPLICATION_GUIDANCE": [
            r"(?:how to apply|where do i apply|eppadi apply panradhu|apply kaise kare|apply procedure|online apply)",
            r"(?:help me apply|application process|steps to apply)"
        ],
        "DEADLINE": [
            r"(?:deadline|last date|kadaisi naal|aakhri tareekh|due date|expiry|application window)"
        ],
        "BENEFIT_COMPARISON": [
            r"(?:compare|difference between|vs|oppeedu|tulna|which scheme is better)"
        ],
        "BENEFIT_GAP": [
            r"(?:other benefits|missing benefits|what else|innum enna irukku|aur kya mil sakta|benefit gap)"
        ],
        "CHECK_ELIGIBILITY": [
            r"(?:eligible|eligibility|thagu|thakuthi|patra|patrata|qualify|am i eligible|widow pension-ku eligible-aa)"
        ],
        "GRIEVANCE": [
            r"(?:complaint|grievance|problem|issue|not received|fraud|escalate|human help|pukaar)"
        ],
        "FIND_SCHEME": [
            r"(?:scheme|scholarship|yojana|help|financial help|support|subsidy|pension|benefit|venum|chahiye|irukka)",
            r"(?:naan student|enakku scholarship venum|kisan yojana|education help|housing scheme)"
        ]
    }

    def detect_intent(self, text: str) -> Dict[str, Any]:
        lower = text.lower()

        # Check in prioritized order
        for intent, patterns in self.INTENTS.items():
            for pat in patterns:
                if re.search(pat, lower):
                    confidence = 0.92
                    # Check specific subcategory or action
                    action_target = None
                    if intent == "VOICE_NAVIGATION":
                        if "application" in lower:
                            action_target = "/applications"
                        elif "document" in lower:
                            action_target = "/documents"
                        elif "scholarship" in lower or "scheme" in lower:
                            action_target = "/explorer"
                        elif "profile" in lower:
                            action_target = "/profile"
                    return {
                        "intent": intent,
                        "confidence": confidence,
                        "matched_pattern": pat,
                        "action_target": action_target
                    }

        # Default fallback intent
        return {
            "intent": "FIND_SCHEME",
            "confidence": 0.70,
            "matched_pattern": "default_fallback",
            "action_target": None
        }
