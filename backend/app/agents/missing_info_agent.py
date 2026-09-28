from typing import List, Dict, Any, Optional

class MissingInformationAgent:
    """Agent 6: Missing Information Agent. Identifies key missing fields that block
    eligibility resolution and formulates minimal, polite, non-intrusive questions."""

    QUESTIONS = {
        "state": {
            "en": "Which state do you permanently reside in? (Many schemes are state-specific like Tamil Nadu or Central)",
            "ta": "நீங்கள் எந்த மாநிலத்தில் வசிக்கிறீர்கள்? (தமிழ்நாடு அரசு அல்லது மத்திய அரசு திட்டங்களை துல்லியமாக கண்டறிய இது உதவும்)",
            "hi": "आप स्थायी रूप से किस राज्य में रहते हैं? (राज्य-विशिष्ट योजनाओं की पहचान के लिए)"
        },
        "annual_income": {
            "en": "What is your approximate annual family income? (e.g., ₹1.5 Lakh, ₹2.5 Lakh)",
            "ta": "உங்கள் குடும்பத்தின் தோராயமான ஆண்டு வருமானம் என்ன? (எ.கா. ₹2 லட்சம்)",
            "hi": "आपकी अनुमानित वार्षिक पारिवारिक आय क्या है? (उदा. ₹2 लाख)"
        },
        "education": {
            "en": "What is your current course or education level? (e.g., Undergraduate, Diploma, 12th)",
            "ta": "உங்கள் தற்போதைய கல்வி நிலை அல்லது படிப்பு என்ன? (எ.கா. கல்லூரி பட்டப்படிப்பு / பாலிடெக்னிக்)",
            "hi": "आपकी वर्तमान पढ़ाई या शिक्षा का स्तर क्या है? (उदा. स्नातक, डिप्लोमा, 12वीं)"
        },
        "social_category": {
            "en": "What is your social category? (General, OBC, SC, ST, EWS - helps unlock dedicated scholarships)",
            "ta": "உங்கள் சமூகப் பிரிவு என்ன? (General, OBC, SC, ST, EWS - பிரத்யேக கல்வி உதவித்தொகை திட்டங்களை கண்டறிய)",
            "hi": "आपका सामाजिक वर्ग क्या है? (सामान्य, ओबीसी, एससी, एसटी, ईडब्ल्यूएस)"
        },
        "gender": {
            "en": "Could you mention your gender? (Some flagship schemes like Pudhumai Penn / Pragati are for women)",
            "ta": "உங்கள் பாலினத்தை குறிப்பிட முடியுமா? (புதுமைப் பெண் போன்ற பல முக்கிய திட்டங்கள் மகளிருக்காக ஒதுக்கப்பட்டுள்ளன)",
            "hi": "कृपया अपना लिंग बताएं (कुछ प्रमुख योजनाएं विशेष रूप से महिलाओं के लिए हैं)"
        }
    }

    def get_proactive_question(self, missing_fields: List[str], lang: str = "en") -> Optional[Dict[str, Any]]:
        if not missing_fields:
            return None

        # Prioritize state and annual income first
        priority_order = ["state", "annual_income", "education", "social_category", "gender"]
        selected_field = None
        for p in priority_order:
            if p in missing_fields:
                selected_field = p
                break

        if not selected_field:
            selected_field = missing_fields[0]

        q_dict = self.QUESTIONS.get(selected_field, {
            "en": f"Please provide your {selected_field} to check full eligibility.",
            "ta": f"முழு தகுதியை சரிபார்க்க உங்கள் {selected_field} விவரத்தை தெரிவிக்கவும்.",
            "hi": f"पात्रता की पुष्टि के लिए कृपया अपना {selected_field} बताएं।"
        })

        return {
            "field": selected_field,
            "question": q_dict.get(lang, q_dict["en"]),
            "field_label": selected_field.replace("_", " ").title()
        }

missing_info_agent = MissingInformationAgent()
