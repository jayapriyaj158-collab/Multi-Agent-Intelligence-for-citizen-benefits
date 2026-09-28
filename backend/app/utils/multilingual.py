import re
from typing import Dict, Any, Tuple

# Multilingual Keyword mappings for Intent & Profile detection
TAMIL_PHRASES = {
    # Education / Scholarship
    r"(மாணவர்|படிப்பு|கல்லூரி|ஸ்காலர்ஷிப்|உதவித்தொகை|கல்வி|fees|college|scholarship)": "Education",
    r"(naan student|kalloori|padikiren|enaku scholarship|enakku scholarship|kalvi)": "Education",
    # Agriculture / Farmer
    r"(விவசாயி|விவசாயம்|பயிர்|விளைச்சல்|டிராக்டர்|கிசான்|farmer|vivasayi|vivasayam|kisan)": "Agriculture",
    r"(en appa vivasayi|vivasaya scheme|pasu|aadu)": "Agriculture",
    # Women & Child / Widow
    r"(விதவை|பெண்கள்|தாய்மை|மகள்|திருமணம்|மகளிர்|widow|pengal|magalir|thirumanam)": "Women & Child",
    # Health
    r"(மருத்துவம்|சிகிச்சை|காப்பீடு|மருத்துவமனை|ஆயுஷ்மான்|health|hospital|maruthuvam|maruthuvamana)": "Health",
    # Housing
    r"(வீடு|வீட்டு வசதி|குடிசை|ஆவாஸ்|veedu|housing|veetu vasathi)": "Housing",
    # Employment / Skill
    r"(வேலை|தொழில்|வேலையின்மை|சுயதொழில்|முத்ரா|velai|velaiyinmai|thozhil|unemployed)": "Employment",
    # Senior Citizen / Pension
    r"(முதியோர்|ஓய்வூதியம்|பென்ஷன்|muthiyor|pension|oyvoothiyam)": "Social Security",
    # Documents
    r"(டாக்குமெண்ட்|சான்றிதழ்|வருமான சான்றிதழ்|சாதி சான்றிதழ்|documents|saandrithazh|varumaana)": "Document",
}

HINDI_PHRASES = {
    r"(छात्र|छात्रवृत्ति|कॉलेज|पढ़ाई|फीस|शिक्षा|student|scholarship|padhai|college|shiksha)": "Education",
    r"(किसान|खेती|फसल|कृषि|सम्मान निधि|kisan|kheti|fasal|krishi)": "Agriculture",
    r"(महिला|विधवा|बेटी|शास्त्रीय|मातृत्व|mahila|vidhwa|beti|ladli)": "Women & Child",
    r"(स्वास्थ्य|इलाज|अस्पताल|आयुष्मान|बीमा|swasthya|ilaj|hospital|ayushman)": "Health",
    r"(आवास|मकान|घर|housing|awas|ghar|makan)": "Housing",
    r"(रोजगार|नौकरी|बेरोजगार|व्यापार|मुद्रा|rojgar|naukri|berojgar|vyapar|mudra)": "Employment",
    r"(पेंशन|वृद्धावस्था|बुजुर्ग|pension|vridha|bujurg)": "Social Security",
    r"(दस्तावेज|प्रमाण पत्र|आय प्रमाण|जाति प्रमाण|documents|pramaan patra)": "Document",
}

def detect_language(text: str) -> str:
    """Detects whether text is predominantly Tamil, Hindi, or English (including transliterated)."""
    # Tamil Unicode block: \u0B80-\u0BFF
    if re.search(r"[\u0B80-\u0BFF]", text):
        return "ta"
    # Devanagari Unicode block: \u0900-\u097F
    if re.search(r"[\u0900-\u097F]", text):
        return "hi"
    
    lower = text.lower()
    # Check transliterated Tamil
    tanglish_words = ["naan", "enakku", "enaku", "venum", "irukka", "irukku", "panradhu", "eppadi", "kalloori", "vivasayi", "sollunga", "puriyadhu", "vidhava"]
    for w in tanglish_words:
        if re.search(rf"\b{w}\b", lower):
            return "ta"
            
    # Check transliterated Hindi
    hinglish_words = ["mujhe", "chahiye", "kya", "mera", "meri", "hai", "kisan", "yojana", "padhai", "naukri", "kaise", "batao", "bataiye"]
    for w in hinglish_words:
        if re.search(rf"\b{w}\b", lower):
            return "hi"

    return "en"

# Response templates for instant multilingual grounding
TRANSLATIONS = {
    "greeting": {
        "en": "Hello! I am your AI Citizen Benefit Assistant. How can I help you discover and access government benefits today?",
        "ta": "வணக்கம்! நான் உங்கள் அரசு நலத்திட்ட AI உதவியாளர். உங்களுக்கு பொருத்தமான அரசு உதவிகளையும் திட்டங்களையும் கண்டறிய நான் எவ்வாறு உதவட்டும்?",
        "hi": "नमस्ते! मैं आपका सरकारी योजना एवं लाभ एआई सहायक हूँ। आज मैं आपको सरकारी योजनाओं की खोज और आवेदन में कैसे मदद कर सकता हूँ?"
    },
    "scholarship_found": {
        "en": "Based on your student profile and stated annual income, we found several relevant scholarship and education schemes. You are likely eligible for Post-Matric & Higher Education Financial Assistance.",
        "ta": "உங்கள் மாணவர் சுயவிவரம் மற்றும் குடும்ப வருமானத்தின் அடிப்படையில், சில முக்கிய கல்வி உதவித்தொகை திட்டங்கள் கண்டறியப்பட்டுள்ளன. நீங்கள் போஸ்ட்-மெட்ரிக் மற்றும் உயர்கல்வி உதவித்தொகைக்கு தகுதியுடையவராகத் தோன்றுகிறீர்கள்.",
        "hi": "आपके छात्र विवरण और पारिवारिक आय के आधार पर, कई प्रमुख छात्रवृत्ति और शिक्षा योजनाएं मिली हैं। आप पोस्ट-मैट्रिक एवं उच्च शिक्षा वित्तीय सहायता के लिए संभावित रूप से पात्र हैं।"
    },
    "missing_info_prompt": {
        "en": "To provide exact eligibility and rank the most suitable schemes, could you please specify your State and Education level?",
        "ta": "துல்லியமான தகுதியை சரிபார்த்து சிறந்த திட்டங்களை வரிசைப்படுத்த, உங்கள் மாநிலம் மற்றும் கல்வி நிலையை (எ.கா. தமிழ்நாடு, கல்லூரி / பட்டப்படிப்பு) தெரிவிக்கவும்.",
        "hi": "सटीक पात्रता जांचने और सर्वोत्तम योजनाओं को क्रमबद्ध करने के लिए, क्या आप अपना राज्य और शिक्षा स्तर (उदा. उत्तर प्रदेश, स्नातक) बता सकते हैं?"
    },
    "farmer_found": {
        "en": "Based on agricultural criteria, schemes such as PM-KISAN, crop insurance, and state farm subsidies are available for eligible farmers.",
        "ta": "விவசாயக் காரணிகளின் அடிப்படையில், பிரதம மந்திரி கிசான் (PM-KISAN), பயிர்க் காப்பீடு மற்றும் மாநில விவசாய மானியத் திட்டங்கள் தகுதியுள்ள விவசாயிகளுக்கு கிடைக்கின்றன.",
        "hi": "कृषि मानदंडों के आधार पर, पीएम-किसान सम्मान निधि, फसल बीमा और राज्य कृषि सब्सिडी योजनाएं पात्र किसानों के लिए उपलब्ध हैं।"
    },
    "disclaimer": {
        "en": "Disclaimer: This evaluation is generated by an explainable AI rule-engine and profile similarity indicators. Final approval rests exclusively with the respective government authority.",
        "ta": "பொறுப்புத் துறப்பு: இந்த மதிப்பீடு விதிமுறை இயந்திரம் மற்றும் AI ஒற்றுமை அடிப்படையிலானது. இறுதி அங்கீகாரம் சம்பந்தப்பட்ட அரசுத் துறைக்கு மட்டுமே உரியது.",
        "hi": "अस्वीकरण: यह मूल्यांकन पारदर्शी नियम-इंजन एवं एआई समानता पर आधारित है। अंतिम स्वीकृति केवल संबंधित सरकारी विभाग द्वारा ही दी जाती है।"
    }
}

def translate_response(key: str, lang: str = "en", fallback: str = "") -> str:
    """Returns a localized template text."""
    if key in TRANSLATIONS and lang in TRANSLATIONS[key]:
        return TRANSLATIONS[key][lang]
    return fallback or TRANSLATIONS.get(key, {}).get("en", "")
