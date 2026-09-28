import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'ta' | 'hi';

interface UIStrings {
  appName: string;
  appTagline: string;
  navHome: string;
  navExplorer: string;
  navAssistant: string;
  navDashboard: string;
  navDocuments: string;
  navApplications: string;
  navBenefitGap: string;
  navAdmin: string;
  loginBtn: string;
  logoutBtn: string;
  simpleModeBtn: string;
  speakBtn: string;
  searchPlaceholder: string;
  checkEligibility: string;
  helpMeApply: string;
  viewDetails: string;
  missingDocs: string;
  likelyEligible: string;
  potentiallyEligible: string;
  likelyNotEligible: string;
  insufficientInfo: string;
  demoDisclaimer: string;
}

const DICTIONARY: Record<LanguageCode, UIStrings> = {
  en: {
    appName: "Citizen Benefit Intelligence",
    appTagline: "From Scheme Search to Benefit Access — Multi-Agent AI Platform",
    navHome: "Home",
    navExplorer: "Scheme Explorer",
    navAssistant: "AI Assistant",
    navDashboard: "My Benefits",
    navDocuments: "Document Center",
    navApplications: "Applications",
    navBenefitGap: "Benefit Gap",
    navAdmin: "Admin Center",
    loginBtn: "Sign In",
    logoutBtn: "Sign Out",
    simpleModeBtn: "Simple Mode (எளிய முறை / सरल मोड)",
    speakBtn: "Voice Assistant",
    searchPlaceholder: "Ask anything (e.g. 'Scholarship for college student in Tamil Nadu')...",
    checkEligibility: "Check Eligibility",
    helpMeApply: "Help Me Apply",
    viewDetails: "View Details",
    missingDocs: "Missing Documents",
    likelyEligible: "Likely Eligible",
    potentiallyEligible: "Potentially Eligible",
    likelyNotEligible: "Likely Not Eligible",
    insufficientInfo: "Need More Info",
    demoDisclaimer: "Built for SIH 2026. Operates as an intelligence layer above official Indian digital platforms (myScheme, UMANG, DigiLocker)."
  },
  ta: {
    appName: "அரசு நலத்திட்ட AI தளம்",
    appTagline: "திட்டத் தேடலில் இருந்து நேரடி பலன்கள் வரை — பல-முகவர் AI தளம்",
    navHome: "முகப்பு",
    navExplorer: "திட்டங்கள் தேடல்",
    navAssistant: "AI உதவியாளர்",
    navDashboard: "என் நலத்திட்டங்கள்",
    navDocuments: "ஆவண மையம்",
    navApplications: "விண்ணப்பங்கள்",
    navBenefitGap: "விடுபட்ட பலன்கள்",
    navAdmin: "நிர்வாக மையம்",
    loginBtn: "உள்நுழைக",
    logoutBtn: "வெளியேறுக",
    simpleModeBtn: "எளிய முறை (Simple Mode)",
    speakBtn: "குரல் வழி பேசுங்கள்",
    searchPlaceholder: "கேளுங்கள் (எ.கா. 'கல்லூரி மாணவர்களுக்கான உதவித்தொகை திட்டம்')...",
    checkEligibility: "தகுதியை சரிபார்க்க",
    helpMeApply: "விண்ணப்பிக்க வழிகாட்டுக",
    viewDetails: "முழு விவரங்கள்",
    missingDocs: "விடுபட்ட ஆவணங்கள்",
    likelyEligible: "தகுதி பெற வாய்ப்புள்ளது",
    potentiallyEligible: "சாத்தியமான தகுதி",
    likelyNotEligible: "தகுதி பெற வாய்ப்பில்லை",
    insufficientInfo: "கூடுதல் தகவல் தேவை",
    demoDisclaimer: "SIH 2026 க்காக உருவாக்கப்பட்டது. அதிகாரப்பூர்வ இந்திய அரசு தளங்களுக்கு (myScheme, UMANG, DigiLocker) மேலான அறிவார்ந்த அடுக்கு."
  },
  hi: {
    appName: "नागरिक लाभ एआई मंच",
    appTagline: "योजना खोज से लाभ प्राप्ति तक — मल्टी-एजेंट एआई प्लेटफॉर्म",
    navHome: "होम",
    navExplorer: "योजना खोज",
    navAssistant: "एआई सहायक",
    navDashboard: "मेरे लाभ",
    navDocuments: "दस्तावेज़ केंद्र",
    navApplications: "आवेदन",
    navBenefitGap: "अतिरिक्त लाभ",
    navAdmin: "प्रशासन केंद्र",
    loginBtn: "साइन इन",
    logoutBtn: "लॉग आउट",
    simpleModeBtn: "सरल मोड (Simple Mode)",
    speakBtn: "बोलकर पूछें",
    searchPlaceholder: "कुछ भी पूछें (उदा. 'कॉलेज छात्र के लिए छात्रवृत्ति योजना')...",
    checkEligibility: "पात्रता जांचें",
    helpMeApply: "आवेदन में मदद करें",
    viewDetails: "विवरण देखें",
    missingDocs: "लापता दस्तावेज़",
    likelyEligible: "संभावित रूप से पात्र",
    potentiallyEligible: "आंशिक रूप से पात्र",
    likelyNotEligible: "पात्र नहीं",
    insufficientInfo: "अधिक जानकारी चाहिए",
    demoDisclaimer: "SIH 2026 के लिए निर्मित। आधिकारिक सरकारी पोर्टलों (myScheme, UMANG, DigiLocker) के ऊपर एक बुद्धिमान सहायता प्रणाली।"
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: UIStrings;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('lang') as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('lang', lang);
    setLanguageState(lang);
  };

  const t = DICTIONARY[language] || DICTIONARY.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
