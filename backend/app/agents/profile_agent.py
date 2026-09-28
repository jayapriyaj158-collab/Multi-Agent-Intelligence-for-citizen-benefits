import re
from typing import Dict, Any, Tuple, Optional

class ProfileAgent:
    """Agent 1: Citizen Profile Agent. Extracts structured citizen demographic
    and socio-economic parameters from multi-lingual conversational input and updates profile context."""

    def extract_profile_from_text(self, text: str, existing: Optional[Dict[str, Any]] = None) -> Tuple[Dict[str, Any], list[str]]:
        profile = existing.copy() if existing else {}
        extracted_fields = []
        lower = text.lower()

        # 1. Age extraction
        # e.g., "19-year-old", "age 21", "20 years old", "vayasu 22", "umar 20"
        age_match = re.search(r"\b(\d{1,2})\s*(?:years?\s*old|yr\s*old|-year-old|vayasu|umar)\b", lower)
        if not age_match:
            age_match = re.search(r"\bage\s*(?:is|:)?\s*(\d{1,2})\b", lower)
        if age_match:
            try:
                age = int(age_match.group(1))
                if 10 <= age <= 100:
                    profile["age"] = age
                    extracted_fields.append("age")
            except ValueError:
                pass

        # 2. Income extraction
        # e.g., "₹2 lakh", "2 lakh", "2,00,000", "200000", "varumaanam 2 lakh", "aamdani 1.5 lakh"
        income_match = re.search(r"(?:₹|rs\.?|inr|income|varumaanam|aamdani)?\s*(\d+(?:\.\d+)?)\s*(?:lakhs?|lac|lpa)\b", lower)
        if income_match:
            try:
                val = float(income_match.group(1))
                profile["annual_income"] = val * 100000.0
                extracted_fields.append("annual_income")
            except ValueError:
                pass
        else:
            raw_match = re.search(r"(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:,\d{3})+|\d{5,7})", text)
            if raw_match:
                try:
                    raw_num = raw_match.group(1).replace(",", "")
                    val = float(raw_num)
                    if 10000 <= val <= 50000000:
                        profile["annual_income"] = val
                        extracted_fields.append("annual_income")
                except ValueError:
                    pass

        # 3. Occupation extraction
        if re.search(r"\b(student|college|kalloori|padikiren|vidyarthi|chhatra|studying|phd|diploma)\b", lower):
            profile["occupation"] = "Student"
            extracted_fields.append("occupation")
        elif re.search(r"\b(farmer|vivasayi|kisan|agriculture|kheti|cultivator)\b", lower):
            profile["occupation"] = "Farmer"
            extracted_fields.append("occupation")
        elif re.search(r"\b(unemployed|jobless|velai illa|berojgar|seeking job|job seeker)\b", lower):
            profile["occupation"] = "Unemployed"
            extracted_fields.append("occupation")
        elif re.search(r"\b(self employed|business|artisan|tailor|carpenter|potter|shopkeeper|dhabha|vendor)\b", lower):
            profile["occupation"] = "Self-Employed"
            extracted_fields.append("occupation")
        elif re.search(r"\b(daily wage|coolie|kooli|laborer|mazdoor)\b", lower):
            profile["occupation"] = "Daily Wage"
            extracted_fields.append("occupation")

        # 4. Education level extraction
        if re.search(r"\b(undergraduate|bachelor|degree|college|b\.?tech|b\.?sc|b\.?com|b\.?a|graduation)\b", lower):
            profile["education"] = "Undergraduate"
            extracted_fields.append("education")
        elif re.search(r"\b(postgraduate|post graduate|master|m\.?tech|m\.?sc|m\.?com|m\.?a|phd)\b", lower):
            profile["education"] = "Post-Graduate"
            extracted_fields.append("education")
        elif re.search(r"\b(diploma|iti|polytechnic)\b", lower):
            profile["education"] = "ITI/Diploma"
            extracted_fields.append("education")
        elif re.search(r"\b(12th|10th|high school|plus two|\+2|matric)\b", lower):
            profile["education"] = "High School"
            extracted_fields.append("education")

        # 5. State extraction
        states_map = {
            "tamil nadu": "Tamil Nadu",
            "tamilnadu": "Tamil Nadu",
            "uttar pradesh": "Uttar Pradesh",
            "karnataka": "Karnataka",
            "kerala": "Kerala",
            "maharashtra": "Maharashtra",
            "delhi": "Delhi",
            "rajasthan": "Rajasthan",
            "telangana": "Telangana",
            "andhra pradesh": "Andhra Pradesh",
            "west bengal": "West Bengal",
            "bihar": "Bihar",
            "madhya pradesh": "Madhya Pradesh",
            "gujarat": "Gujarat",
            "punjab": "Punjab"
        }
        for s_key, s_val in states_map.items():
            if s_key in lower:
                profile["state"] = s_val
                extracted_fields.append("state")
                break

        # 6. Gender & Marital Status
        if re.search(r"\b(female|girl|woman|pen|pengal|mahila|ladki)\b", lower):
            profile["gender"] = "Female"
            extracted_fields.append("gender")
        elif re.search(r"\b(male|boy|man|aan|purush|ladka)\b", lower):
            profile["gender"] = "Male"
            extracted_fields.append("gender")

        if re.search(r"\b(widow|vidhava|vithavai|kaimpen)\b", lower):
            profile["marital_status"] = "Widow"
            profile["gender"] = "Female"
            extracted_fields.append("marital_status")

        # 7. Social Category
        if re.search(r"\b(sc|scheduled caste)\b", lower):
            profile["social_category"] = "SC"
            extracted_fields.append("social_category")
        elif re.search(r"\b(st|scheduled tribe)\b", lower):
            profile["social_category"] = "ST"
            extracted_fields.append("social_category")
        elif re.search(r"\b(obc|bc|mbc|backward class)\b", lower):
            profile["social_category"] = "OBC"
            extracted_fields.append("social_category")
        elif re.search(r"\b(ews|economically weaker)\b", lower):
            profile["social_category"] = "EWS"
            extracted_fields.append("social_category")

        # Calculate completion percentage
        completion = self.compute_completion(profile)
        profile["completion_percentage"] = completion

        return profile, extracted_fields

    def compute_completion(self, profile: Dict[str, Any]) -> int:
        core_fields = ["age", "gender", "state", "occupation", "education", "annual_income", "social_category"]
        filled = sum(1 for f in core_fields if profile.get(f) is not None)
        return int((filled / len(core_fields)) * 100)
