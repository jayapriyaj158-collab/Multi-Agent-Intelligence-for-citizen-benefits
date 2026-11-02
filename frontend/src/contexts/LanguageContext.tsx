import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'ta' | 'hi';

export interface UIStrings {
  // App & Navigation
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
  languageLabel: string;
  appSubtitle: string;

  // Login Page
  loginTitle: string;
  loginSubtitle: string;
  emailOrMobile: string;
  password: string;
  forgotPassword: string;
  signInToAccount: string;
  createCitizenProfile: string;
  dontHaveAccount: string;
  quickCitizenLogin: string;
  quickAdminLogin: string;
  quickAccessHeading: string;

  // Register Page
  registerTitle: string;
  registerSubtitle: string;
  fullNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  completeRegistrationBtn: string;
  alreadyRegistered: string;
  signInHere: string;

  // Compare Page
  compareMatrixTitle: string;
  compareMatrixSubtitle: string;
  quickPresetsHeading: string;
  manualSelectHeading: string;
  compareBtnCount: string;
  changeSchemesBtn: string;
  comparingCount: string;
  compareFactorCol: string;
  categoryAndLevel: string;
  benefitsAndPayout: string;
  incomeCriteria: string;
  ageLimits: string;
  targetGroupLabel: string;
  disbursementLabel: string;

  // Document Center
  docCenterTitle: string;
  docCenterSubtitle: string;
  digilockerReady: string;
  uploadSectionTitle: string;
  docCertType: string;
  selectFileHint: string;
  chooseFile: string;
  selectedFileLabel: string;
  noFileChosen: string;
  uploadAndAnalyze: string;
  analyzingDoc: string;
  docPrepReadiness: string;
  evalCompleteness: string;
  availableLabel: string;
  missingLabel: string;
  needsReviewLabel: string;
  readyLabel: string;
  viewBtn: string;
  viewMissingReq: string;
  howToGetDoc: string;
  docDisclaimer: string;
  missingNotice: string;
  verifiedDocsHeading: string;
  noDocsUploaded: string;
  uploadCertHint: string;
  whyRequired: string;
  whoIssues: string;
  whereToApply: string;
  onlineOfflineMode: string;
  docsNormallyRequired: string;
  officialSourceLink: string;
  closeBtn: string;
  docAnalysisNotice: string;

  // Applications
  appsTitle: string;
  appsSubtitle: string;
  addAppBtn: string;
  manualTrackingActive: string;
  noAppsTracked: string;

  // Dashboard
  dashGreeting: string;
  dashSubtitle: string;
  recommendedForYou: string;
  docsVerifiedCount: string;
  activeAppsCount: string;
  upcomingDeadlines: string;
  benefitGapUnlocked: string;
  myNextActions: string;
  actionRequired: string;
  deadlineWindow: string;
  profileAlmostReady: string;
  actionUploadIncome: string;
  actionUploadIncomeDesc: string;
  scholarshipVerification: string;
  scholarshipVerificationDesc: string;
  profileAlmostReadyDesc: string;
  actionEngine: string;
  inScrutiny: string;
  checkAppStatus: string;
  checkAppStatusDesc: string;
  askAssistantBtn: string;
  editProfileBtn: string;
  basedOnProfile: string;
  formatVerified: string;
  manualTrackingText: string;
  within30Days: string;
  income: string;
  notSpecified: string;
  allIndia: string;
  citizen: string;
  benefitGapMissingTitle: string;
  exploreComplementary: string;
  beyondScholarship: string;
  viewEligibility: string;
  topSchemesRecommended: string;
  viewAllSchemes: string;
  profileMatch: string;
  matchTooltip: string;
  whyThisRanks: string;
  rankingReasonDefault: string;

  // Scheme Explorer & Buttons
  explorerTitle: string;
  explorerSubtitle: string;
  compareSchemes: string;
  categoryLabel: string;
  stateLabel: string;
  occupationLabel: string;
  genderLabel: string;
  allCategories: string;
  allStates: string;
  allOccupations: string;
  allGenders: string;
  searchBtn: string;
  filterBtn: string;
  resetFilters: string;
  clearFilters: string;
  foundSchemes: string;
  noSchemesFound: string;
  tryDifferentFilters: string;
  searchPlaceholder: string;
  checkEligibility: string;
  checkDocuments: string;
  helpMeApply: string;
  viewDetails: string;
  applyBtn: string;
  saveBtn: string;
  savedBtn: string;
  exploreBtn: string;
  missingDocs: string;
  likelyEligible: string;
  potentiallyEligible: string;
  likelyNotEligible: string;
  needsReview: string;
  eligibleLabel: string;
  notEligibleLabel: string;
  insufficientInfo: string;
  officialPortal: string;
  keyBenefits: string;
  eligibilityCriteria: string;
  requiredDocs: string;
  deadlineLabel: string;
  openYearRound: string;
  catalogData: string;
  verifiedData: string;
  myBenefits: string;

  // Scheme Detail
  schemeDetails: string;
  backToExplorer: string;
  shareBtn: string;
  applyOnOfficialPortal: string;
  aiGuidedAssistant: string;
  trackManually: string;
  secOverview: string;
  secWhoIsItFor: string;
  secBenefits: string;
  secEligibility: string;
  secDocuments: string;
  secSteps: string;
  secFaq: string;
  secSources: string;
  keyObjective: string;
  ageRange: string;
  incomeCeiling: string;
  genderCriteria: string;
  noCap: string;
  noLimit: string;
  disbursementType: string;
  frequency: string;
  helplineNumber: string;
  appMode: string;
  uploadVerifyDocs: string;
  officialSource: string;
  lastVerified: string;
  verifyOnPortal: string;
  missingDocGuidance: string;
  whatIsThisDoc: string;
  stepByStepProcedure: string;

  // AI Assistant
  assistantTitle: string;
  typeMessage: string;
  sendBtn: string;
  explainReasoning: string;
  speakAloud: string;
  stopVoice: string;
  voiceMode: string;
  resetConversation: string;
  discoveredSchemes: string;
  groundedInSources: string;

  // Benefit Gap
  benefitGapTitle: string;
  benefitGapDesc: string;
  matchingWelfareCategories: string;

  // Profile
  profileTitle: string;
  profileSubtitle: string;
  saveProfile: string;
  savingProfile: string;
  profileSavedSuccess: string;
  educationLabel: string;
  incomeLabel: string;
  socialCategoryLabel: string;
  ageLabel: string;
  districtLabel: string;
  maritalStatusLabel: string;
  residenceLabel: string;
  disabilityLabel: string;

  // Footer
  footerMission: string;
  footerArchitectureActive: string;
  footerOfficialEcosystem: string;
  footerEcosystemDesc: string;
  footerQuickLinks: string;
  footerDisclaimerTitle: string;
  footerDisclaimerNotice: string;
  footerDisclaimerText: string;
  footerCopyright: string;
  footerLanguages: string;
  footerAdmin: string;
}

export const DICTIONARY: Record<LanguageCode, UIStrings> = {
  en: {
    // App & Nav
    appName: "Citizen Benefit Intelligence",
    appTagline: "From Scheme Search to Benefit Access — Multi-Agent AI Platform",
    navHome: "Home",
    navExplorer: "Scheme Explorer",
    navAssistant: "Assistant",
    navDashboard: "My Benefits",
    navDocuments: "Document Center",
    navApplications: "Applications",
    navBenefitGap: "Benefit Gap",
    navAdmin: "Admin Center",
    loginBtn: "Sign In",
    logoutBtn: "Sign Out",
    simpleModeBtn: "Simple Mode",
    speakBtn: "Voice Assistant",
    languageLabel: "Language:",
    appSubtitle: "AI-Powered Ecosystem Layer for Indian Welfare",

    // Login
    loginTitle: "Citizen Benefit Intelligence",
    loginSubtitle: "Sign in to access your personalized welfare recommendations, document intelligence, and application tracking.",
    emailOrMobile: "Email Address or Mobile Number",
    password: "Password",
    forgotPassword: "Forgot Password?",
    signInToAccount: "Sign In to Account",
    createCitizenProfile: "Create Citizen Profile",
    dontHaveAccount: "Don't have an account?",
    quickCitizenLogin: "Citizen Login",
    quickAdminLogin: "Admin Login",
    quickAccessHeading: "Instant One-Click Login:",

    // Register
    registerTitle: "Create Citizen Account",
    registerSubtitle: "Set up your profile to receive personalized government scheme recommendations.",
    fullNameLabel: "Full Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number (Optional)",
    completeRegistrationBtn: "Complete Registration",
    alreadyRegistered: "Already registered?",
    signInHere: "Sign In here",

    // Compare
    compareMatrixTitle: "Scheme Comparison Matrix",
    compareMatrixSubtitle: "Compare 2 to 4 government schemes side-by-side to understand differences in eligibility, income limits, disbursements, and required certificates.",
    quickPresetsHeading: "Quick Comparison Presets:",
    manualSelectHeading: "Or Select Schemes Manually (Choose 2 to 4):",
    compareBtnCount: "Compare Selected Schemes",
    changeSchemesBtn: "Change Schemes",
    comparingCount: "Comparing Schemes",
    compareFactorCol: "Comparison Factors",
    categoryAndLevel: "Category & Level",
    benefitsAndPayout: "Benefits & Payout",
    incomeCriteria: "Income Criteria",
    ageLimits: "Age Limits",
    targetGroupLabel: "Target Group",
    disbursementLabel: "Disbursement:",

    // Document Center
    docCenterTitle: "Document Intelligence Center",
    docCenterSubtitle: "Automated OCR classification, consistency validation, and missing certificate acquisition guidance.",
    digilockerReady: "DigiLocker Integration Ready",
    uploadSectionTitle: "Upload Document for Intelligence OCR Analysis",
    docCertType: "Document Certificate Type",
    selectFileHint: "Select PDF, JPEG, or PNG certificate from your local machine:",
    chooseFile: "Choose File",
    selectedFileLabel: "Selected File:",
    noFileChosen: "No file chosen",
    uploadAndAnalyze: "Upload & Analyze Document",
    analyzingDoc: "Analyzing Document...",
    docPrepReadiness: "Document Preparation Readiness",
    evalCompleteness: "Evaluate your document completeness against the selected verified scheme:",
    availableLabel: "Available",
    missingLabel: "Missing",
    needsReviewLabel: "Needs Review",
    readyLabel: "READY",
    viewBtn: "View",
    viewMissingReq: "View Missing Requirement",
    howToGetDoc: "How to Get This Document",
    docDisclaimer: "This score reflects your document preparation progress for this application, not government document verification.",
    missingNotice: "Official acquisition information is not available in the current verified data.",
    verifiedDocsHeading: "Your Prepared Documents",
    noDocsUploaded: "No documents uploaded yet",
    uploadCertHint: "Upload your certificates above to compute document readiness scores.",
    whyRequired: "Why Required",
    whoIssues: "Issuing Authority",
    whereToApply: "Where the citizen can apply",
    onlineOfflineMode: "Online / Offline Mode",
    docsNormallyRequired: "Information / documents normally required",
    officialSourceLink: "Official Source",
    closeBtn: "Close",
    docAnalysisNotice: "Document preparation analysis only. Not an official government verification.",

    // Applications
    appsTitle: "My Applications",
    appsSubtitle: "Manual tracking & status timeline for your submitted government benefits.",
    addAppBtn: "Add Application to Track",
    manualTrackingActive: "Manual Tracking Active:",
    noAppsTracked: "No Applications Currently Tracked",

    // Dashboard
    dashGreeting: "Welcome",
    dashSubtitle: "Citizen Benefit Intelligence Dashboard",
    recommendedForYou: "Recommended for You",
    docsVerifiedCount: "Documents Prepared",
    activeAppsCount: "Active Applications",
    upcomingDeadlines: "Upcoming Deadlines",
    benefitGapUnlocked: "Complementary Benefits Unlocked",
    myNextActions: "My Next Actions (Priority To-Dos)",
    actionRequired: "ACTION REQUIRED",
    deadlineWindow: "DEADLINE WINDOW",
    profileAlmostReady: "PROFILE COMPLETION",
    actionUploadIncome: "Income Certificate Verification",
    actionUploadIncomeDesc: "Required for post-matric scholarship and income-tested benefits.",
    scholarshipVerification: "Scholarship Review Pending",
    scholarshipVerificationDesc: "NSP portal verification round concludes soon.",
    profileAlmostReadyDesc: "Complete your profile to unlock accurate matching across Central & State schemes.",
    actionEngine: "Deterministic Action Engine",
    inScrutiny: "IN SCRUTINY",
    checkAppStatus: "Check Application Status",
    checkAppStatusDesc: "Track manual submissions with timeline.",
    askAssistantBtn: "Ask AI Assistant",
    editProfileBtn: "Edit Profile",
    basedOnProfile: "Based on citizen profile",
    formatVerified: "Format verified",
    manualTrackingText: "Manual Tracking",
    within30Days: "Within next 30 days",
    income: "Income",
    notSpecified: "Not Specified",
    allIndia: "All India",
    citizen: "Citizen",
    benefitGapMissingTitle: "Benefits You May Be Missing",
    exploreComplementary: "Explore All Complementary Entitlements",
    beyondScholarship: "Beyond your primary scholarship, you may qualify for:",
    viewEligibility: "View Eligibility",
    topSchemesRecommended: "Top Schemes Recommended For You",
    viewAllSchemes: "View All Schemes",
    profileMatch: "Profile Match",
    matchTooltip: "AI-assisted profile similarity indicator, not an official government eligibility score.",
    whyThisRanks: "Why this ranks:",
    rankingReasonDefault: "Matches your education profile and income range",

    // Scheme Explorer
    explorerTitle: "Scheme Explorer",
    explorerSubtitle: "Browse verified Central and State welfare entitlements with transparent eligibility criteria.",
    compareSchemes: "Compare Selected",
    categoryLabel: "Category:",
    stateLabel: "State / UT:",
    occupationLabel: "Occupation:",
    genderLabel: "Gender:",
    allCategories: "All Categories",
    allStates: "All India / Central",
    allOccupations: "All Occupations",
    allGenders: "All Genders",
    searchBtn: "Search",
    filterBtn: "Filter",
    resetFilters: "Reset",
    clearFilters: "Clear Filters",
    foundSchemes: "verified government schemes found",
    noSchemesFound: "No Schemes Match Your Filters",
    tryDifferentFilters: "Try selecting 'All Categories' or clearing search keywords.",
    searchPlaceholder: "Search by keywords, benefits, or purpose (e.g. 'Scholarship for college', 'Crop insurance')...",
    checkEligibility: "Check Eligibility",
    checkDocuments: "Check Documents",
    helpMeApply: "Help Me Apply",
    viewDetails: "View Details",
    applyBtn: "Apply",
    saveBtn: "Save",
    savedBtn: "Saved",
    exploreBtn: "Explore",
    missingDocs: "Missing Documents",
    likelyEligible: "Likely Eligible",
    potentiallyEligible: "Potentially Eligible",
    likelyNotEligible: "Likely Not Eligible",
    needsReview: "Needs Review",
    eligibleLabel: "Eligible",
    notEligibleLabel: "Not Eligible",
    insufficientInfo: "Need More Info",
    officialPortal: "Apply on Official Portal",
    keyBenefits: "Key Benefits",
    eligibilityCriteria: "Eligibility Criteria",
    requiredDocs: "Required Documents",
    deadlineLabel: "Deadline:",
    openYearRound: "Open Year-Round",
    catalogData: "Catalog Data",
    verifiedData: "Verified Data",
    myBenefits: "My Benefits",

    // Scheme Detail
    schemeDetails: "Scheme Details",
    backToExplorer: "Back to Explorer",
    shareBtn: "Share",
    applyOnOfficialPortal: "Apply on Official Portal",
    aiGuidedAssistant: "AI Guided Application Assistant",
    trackManually: "Track Manually",
    secOverview: "1. Scheme Overview",
    secWhoIsItFor: "2. Who is it for? (Target Beneficiaries)",
    secBenefits: "3. Benefits & Entitlements",
    secEligibility: "4. Explainable Eligibility Evaluation",
    secDocuments: "5. Required Documents",
    secSteps: "6. Step-by-Step Official Application Flow",
    secFaq: "7. Scheme Specific FAQs",
    secSources: "8. Official Sources & Verified Metadata",
    keyObjective: "Key Objective:",
    ageRange: "Age Range:",
    incomeCeiling: "Income Ceiling:",
    genderCriteria: "Gender:",
    noCap: "No Cap",
    noLimit: "No Limit",
    disbursementType: "Type:",
    frequency: "Disbursement:",
    helplineNumber: "Helpline:",
    appMode: "Application Mode:",
    uploadVerifyDocs: "Upload & Verify Documents",
    officialSource: "Official Source:",
    lastVerified: "Last Verified:",
    verifyOnPortal: "Verify on Department Portal",
    missingDocGuidance: "Missing Document Acquisition Guidance",
    whatIsThisDoc: "What is this document?",
    stepByStepProcedure: "Step-by-step procedure:",

    // AI Assistant
    assistantTitle: "AI Assistant",
    typeMessage: "Ask your question in English, தமிழ், or हिन्दी...",
    sendBtn: "Send",
    explainReasoning: "Explain AI Reasoning",
    speakAloud: "Listen Aloud",
    stopVoice: "Stop Voice",
    voiceMode: "Voice Mode",
    resetConversation: "Reset Conversation",
    discoveredSchemes: "Discovered Verified Schemes:",
    groundedInSources: "Grounded in official verified sources",

    // Benefit Gap
    benefitGapTitle: "Benefits You May Be Missing",
    benefitGapDesc: "Citizens qualifying for one scheme often qualify for multiple complementary entitlements.",
    matchingWelfareCategories: "Matching Complementary Welfare Categories:",

    // Profile
    profileTitle: "Citizen Profile",
    profileSubtitle: "Comprehensive profile used by the deterministic rule engine to discover all eligible benefits.",
    saveProfile: "Save Profile",
    savingProfile: "Saving...",
    profileSavedSuccess: "Profile saved successfully!",
    educationLabel: "Education Level",
    incomeLabel: "Annual Family Income",
    socialCategoryLabel: "Social Category",
    ageLabel: "Age",
    districtLabel: "District",
    maritalStatusLabel: "Marital Status",
    residenceLabel: "Residence Area",
    disabilityLabel: "Disability Status",

    // Footer
    footerMission: "Multi-agent welfare intelligence system providing explainable eligibility, document intelligence, and multilingual voice assistance for Indian citizens.",
    footerArchitectureActive: "Production Architecture Active",
    footerOfficialEcosystem: "Official Indian Digital Ecosystem",
    footerEcosystemDesc: "Architected as an intelligent assistance layer over official government portals:",
    footerQuickLinks: "Quick Links",
    footerDisclaimerTitle: "Important Disclaimer",
    footerDisclaimerNotice: "Non-Governmental Advisory Layer:",
    footerDisclaimerText: "This system functions as an advisory discovery, rule evaluation, and application navigation assistant. It does not issue official sanctions, charge fees, or replace official departmental scrutiny.",
    footerCopyright: "© 2026 Citizen Benefit Intelligence. Multi-Agent AI Platform.",
    footerLanguages: "Languages: English • தமிழ் • हिन्दी",
    footerAdmin: "Admin Control Center"
  },

  ta: {
    // App & Nav
    appName: "குடிமக்கள் நல நுண்ணறிவு",
    appTagline: "திட்ட தேடல் முதல் நலன் பெறுதல் வரை — பல-முகவர் AI தளம்",
    navHome: "முகப்பு",
    navExplorer: "திட்டங்களை ஆராயுங்கள்",
    navAssistant: "உதவியாளர்",
    navDashboard: "எனது நலத்திட்டங்கள்",
    navDocuments: "ஆவண மையம்",
    navApplications: "விண்ணப்பங்கள்",
    navBenefitGap: "நல இடைவெளி",
    navAdmin: "நிர்வாக மையம்",
    loginBtn: "உள்நுழைக",
    logoutBtn: "வெளியேறுக",
    simpleModeBtn: "எளிய பயன்முறை",
    speakBtn: "குரல் உதவியாளர்",
    languageLabel: "மொழி:",
    appSubtitle: "இந்திய நலத்திட்டங்களுக்கான AI இயங்கும் தளம்",

    // Login
    loginTitle: "குடிமக்கள் நல நுண்ணறிவு",
    loginSubtitle: "உங்கள் தனிப்பயனாக்கப்பட்ட நலத்திட்ட பரிந்துரைகள், ஆவண நுண்ணறிவு மற்றும் விண்ணப்ப கண்காணிப்பை அணுக உள்நுழையவும்.",
    emailOrMobile: "மின்னஞ்சல் முகவரி அல்லது கைபேசி எண்",
    password: "கடவுச்சொல்",
    forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    signInToAccount: "கணக்கில் உள்நுழைக",
    createCitizenProfile: "குடிமக்கள் சுயவிவரத்தை உருவாக்கவும்",
    dontHaveAccount: "கணக்கு இல்லையா?",
    quickCitizenLogin: "குடிமக்கள் உள்நுழைவு",
    quickAdminLogin: "நிர்வாகி உள்நுழைவு",
    quickAccessHeading: "உடனடி உள்நுழைவு:",

    // Register
    registerTitle: "குடிமக்கள் கணக்கை உருவாக்கவும்",
    registerSubtitle: "அரசுத் திட்டப் பரிந்துரைகளைப் பெற உங்கள் சுயவிவரத்தை அமைக்கவும்.",
    fullNameLabel: "முழு பெயர்",
    emailLabel: "மின்னஞ்சல் முகவரி",
    phoneLabel: "கைபேசி எண் (விருப்பத்தேர்வு)",
    completeRegistrationBtn: "பதிவை முடிக்கவும்",
    alreadyRegistered: "ஏற்கனவே பதிவு செய்துள்ளீர்களா?",
    signInHere: "இங்கே உள்நுழையவும்",

    // Compare
    compareMatrixTitle: "திட்டங்கள் ஒப்பீட்டு அட்டவணை",
    compareMatrixSubtitle: "தகுதி, வருமான வரம்புகள், நிதி உதவி மற்றும் தேவையான சான்றிதழ்களின் வேறுபாடுகளைப் புரிந்து கொள்ள 2 முதல் 4 அரசு திட்டங்களை ஒப்பிடுங்கள்.",
    quickPresetsHeading: "விரைவு ஒப்பீட்டுத் தேர்வுகள்:",
    manualSelectHeading: "அல்லது திட்டங்களை நேரடியாகத் தேர்ந்தெடுக்கவும் (2 முதல் 4):",
    compareBtnCount: "தேர்ந்தெடுக்கப்பட்ட திட்டங்களை ஒப்பிடுக",
    changeSchemesBtn: "திட்டங்களை மாற்றவும்",
    comparingCount: "திட்டங்கள் ஒப்பிடப்படுகின்றன",
    compareFactorCol: "ஒப்பீட்டுக் காரணிகள்",
    categoryAndLevel: "பிரிவு மற்றும் நிலை",
    benefitsAndPayout: "நன்மைகள் மற்றும் நிதி உதவி",
    incomeCriteria: "வருமான வரம்பு",
    ageLimits: "வயது வரம்புகள்",
    targetGroupLabel: "இலக்கு பயனாளிகள்",
    disbursementLabel: "நிதி வழங்கல்:",

    // Document Center
    docCenterTitle: "ஆவண நுண்ணறிவு மையம்",
    docCenterSubtitle: "தானியங்கி OCR வகைப்பாடு, நிலைத்தன்மை சரிபார்ப்பு மற்றும் விடுபட்ட சான்றிதழ் பெறுவதற்கான வழிகாட்டுதல்.",
    digilockerReady: "டிஜிலாக்கர் இணைப்பு தயார்",
    uploadSectionTitle: "ஆவணப் பகுப்பாய்விற்காக பதிவேற்றவும்",
    docCertType: "சான்றிதழ் வகை",
    selectFileHint: "உங்கள் கணினியிலிருந்து PDF, JPEG அல்லது PNG சான்றிதழைத் தேர்ந்தெடுக்கவும்:",
    chooseFile: "கோப்பைத் தேர்ந்தெடு",
    selectedFileLabel: "தேர்ந்தெடுக்கப்பட்ட கோப்பு:",
    noFileChosen: "கோப்பு எதுவும் தேர்ந்தெடுக்கப்படவில்லை",
    uploadAndAnalyze: "ஆவணத்தைப் பதிவேற்றி ஆய்வு செய்க",
    analyzingDoc: "ஆவணம் ஆய்வு செய்யப்படுகிறது...",
    docPrepReadiness: "ஆவணத் தயாரிப்பு தயார்நிலை",
    evalCompleteness: "தேர்ந்தெடுக்கப்பட்ட சரிபார்க்கப்பட்ட திட்டத்துடன் உங்கள் ஆவண முழுமையை மதிப்பிடுங்கள்:",
    availableLabel: "உள்ளது",
    missingLabel: "விடுபட்டவை",
    needsReviewLabel: "மதிப்பாய்வு தேவை",
    readyLabel: "தயார்",
    viewBtn: "காண்க",
    viewMissingReq: "விடுபட்ட தேவைகளைக் காண்க",
    howToGetDoc: "இந்த ஆவணத்தை எவ்வாறு பெறுவது",
    docDisclaimer: "இந்த தயார்நிலை மதிப்பெண் ஆவண முன்னேற்றத்தை மட்டுமே குறிக்கிறது, அதிகாரப்பூர்வ அரசு சரிபார்ப்பு அல்ல.",
    missingNotice: "தற்போதைய சரிபார்க்கப்பட்ட தரவில் அதிகாரப்பூர்வ கையகப்படுத்தல் தகவல் கிடைக்கவில்லை.",
    verifiedDocsHeading: "உங்கள் ஆவணங்கள்",
    noDocsUploaded: "ஆவணங்கள் இன்னும் பதிவேற்றப்படவில்லை",
    uploadCertHint: "தயார்நிலை மதிப்பெண்களைக் கணக்கிட மேலே உள்ள படிவத்தில் சான்றிதழ்களைப் பதிவேற்றவும்.",
    whyRequired: "ஏன் தேவைப்படுகிறது",
    whoIssues: "வழங்கும் அதிகாரி",
    whereToApply: "எங்கு விண்ணப்பிக்க வேண்டும்",
    onlineOfflineMode: "இணையவழி / நேரடி முறை",
    docsNormallyRequired: "வழக்கமாகத் தேவைப்படும் ஆவணங்கள்",
    officialSourceLink: "அதிகாரப்பூர்வ ஆதாரம்",
    closeBtn: "மூடுக",
    docAnalysisNotice: "ஆவணத் தயாரிப்பு பகுப்பாய்வு மட்டுமே. உத்தியோகபூர்வ அரசு சரிபார்ப்பு அல்ல.",

    // Applications
    appsTitle: "எனது விண்ணப்பங்கள்",
    appsSubtitle: "நீங்கள் சமர்ப்பித்த அரசு நலத்திட்டங்களுக்கான கண்காணிப்பு பலகை.",
    addAppBtn: "விண்ணப்பத்தைச் சேர்க்க",
    manualTrackingActive: "கண்காணிப்பு செயலில் உள்ளது:",
    noAppsTracked: "தற்போது கண்காணிக்கப்படும் விண்ணப்பங்கள் எதுவும் இல்லை",

    // Dashboard
    dashGreeting: "வரவேற்கிறோம்",
    dashSubtitle: "குடிமக்கள் நல நுண்ணறிவு பலகை",
    recommendedForYou: "உங்களுக்காக பரிந்துரைக்கப்படுபவை",
    docsVerifiedCount: "தயாரான ஆவணங்கள்",
    activeAppsCount: "செயலில் உள்ள விண்ணப்பங்கள்",
    upcomingDeadlines: "வரவிருக்கும் கடைசி தேதிகள்",
    benefitGapUnlocked: "கூடுதல் நலத்திட்டங்கள் திறக்கப்பட்டுள்ளன",
    myNextActions: "எனது அடுத்த நடவடிக்கைகள்",
    actionRequired: "நடவடிக்கை தேவை",
    deadlineWindow: "காலக்கெடு சாளரம்",
    profileAlmostReady: "சுயவிவர நிறைவு",
    actionUploadIncome: "வருமானச் சான்றிதழ் சரிபார்ப்பு",
    actionUploadIncomeDesc: "போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகைக்கு வருமானச் சான்றிதழ் அவசியம்.",
    scholarshipVerification: "கல்வி உதவித்தொகை சரிபார்ப்பு",
    scholarshipVerificationDesc: "NSP போர்டல் சரிபார்ப்பு விரைவில் நிறைவடைகிறது.",
    profileAlmostReadyDesc: "மத்திய மற்றும் மாநில திட்டங்களுடன் துல்லியமான பொருத்தத்தைப் பெற சுயவிவரத்தை முழுமைப்படுத்துங்கள்.",
    actionEngine: "நடவடிக்கை இயந்திரம்",
    inScrutiny: "ஆய்வில் உள்ளது",
    checkAppStatus: "விண்ணப்ப நிலையைச் சரிபார்க்கவும்",
    checkAppStatusDesc: "காலவரிசையுடன் கூடிய விண்ணப்பக் கண்காணிப்பு.",
    askAssistantBtn: "AI உதவியாளரிடம் கேளுங்கள்",
    editProfileBtn: "சுயவிவரத்தைத் திருத்தவும்",
    basedOnProfile: "குடிமக்கள் சுயவிவரத்தின்படி",
    formatVerified: "வடிவம் சரிபார்க்கப்பட்டது",
    manualTrackingText: "நேரடி கண்காணிப்பு",
    within30Days: "அடுத்த 30 நாட்களுக்குள்",
    income: "வருமானம்",
    notSpecified: "குறிப்பிடப்படவில்லை",
    allIndia: "அகில இந்தியா",
    citizen: "குடிமகன்",
    benefitGapMissingTitle: "நீங்கள் தவறவிடக்கூடிய நலன்கள்",
    exploreComplementary: "அனைத்து கூடுதல் உரிமைகளையும் காண்க",
    beyondScholarship: "உங்கள் முதன்மை திட்டத்தைத் தவிர, நீங்கள் பெறக்கூடியவை:",
    viewEligibility: "தகுதியைக் காண்க",
    topSchemesRecommended: "உங்களுக்கான சிறந்த திட்டங்கள்",
    viewAllSchemes: "அனைத்து திட்டங்களையும் காண்க",
    profileMatch: "சுயவிவரப் பொருத்தம்",
    matchTooltip: "சுயவிவர ஒற்றுமை காட்டி, உத்தியோகபூர்வ அரசு தகுதி முடிவு அல்ல.",
    whyThisRanks: "காரணம்:",
    rankingReasonDefault: "உங்கள் கல்வி சுயவிவரம் மற்றும் வருமான வரம்பிற்கு பொருந்துகிறது",

    // Scheme Explorer
    explorerTitle: "திட்டங்களை ஆராயுங்கள்",
    explorerSubtitle: "வெளிப்படையான தகுதி விதிகளுடன் சரிபார்க்கப்பட்ட மத்திய மற்றும் மாநில நலத்திட்டங்களை ஆராயுங்கள்.",
    compareSchemes: "ஒப்பிடுக",
    categoryLabel: "பிரிவு:",
    stateLabel: "மாநிலம் / யூனியன் பிரதேசம்:",
    occupationLabel: "தொழில்:",
    genderLabel: "பாலினம்:",
    allCategories: "அனைத்து பிரிவுகள்",
    allStates: "அகில இந்தியா / மத்திய அரசு",
    allOccupations: "அனைத்து தொழில்கள்",
    allGenders: "அனைத்து பாலினங்கள்",
    searchBtn: "தேடு",
    filterBtn: "வடிகட்டவும்",
    resetFilters: "மீட்டமை",
    clearFilters: "வடிகட்டிகளை அழிக்கவும்",
    foundSchemes: "சரிபார்க்கப்பட்ட அரசு திட்டங்கள் கண்டறியப்பட்டன",
    noSchemesFound: "உங்கள் வடிகட்டிகளுக்கு பொருத்தமான திட்டங்கள் எதுவும் இல்லை",
    tryDifferentFilters: "'அனைத்து பிரிவுகள்' என்பதைத் தேர்ந்தெடுத்து அல்லது தேடல் சொற்களை மாற்றி முயற்சிக்கவும்.",
    searchPlaceholder: "கேளுங்கள் (எ.கா. 'கல்லூரி மாணவர்களுக்கான உதவித்தொகை திட்டம்')...",
    checkEligibility: "தகுதியைச் சரிபார்க்கவும்",
    checkDocuments: "ஆவணங்களைச் சரிபார்க்கவும்",
    helpMeApply: "விண்ணப்பிக்க உதவவும்",
    viewDetails: "விவரங்களைக் காண்க",
    applyBtn: "விண்ணப்பிக்கவும்",
    saveBtn: "சேமி",
    savedBtn: "சேமிக்கப்பட்டது",
    exploreBtn: "ஆராயுங்கள்",
    missingDocs: "விடுபட்ட ஆவணங்கள்",
    likelyEligible: "தகுதி பெற வாய்ப்புள்ளது",
    potentiallyEligible: "சாத்தியமான தகுதி",
    likelyNotEligible: "தகுதி பெற வாய்ப்பில்லை",
    needsReview: "மதிப்பாய்வு தேவை",
    eligibleLabel: "தகுதியுடையவர்",
    notEligibleLabel: "தகுதியற்றவர்",
    insufficientInfo: "கூடுதல் தகவல் தேவை",
    officialPortal: "அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்க",
    keyBenefits: "முக்கிய நன்மைகள்",
    eligibilityCriteria: "தகுதி வரம்புகள்",
    requiredDocs: "தேவையான ஆவணங்கள்",
    deadlineLabel: "கடைசி தேதி:",
    openYearRound: "ஆண்டு முழுவதும் விண்ணப்பிக்கலாம்",
    catalogData: "கட்டமைப்புத் தரவு",
    verifiedData: "சரிபார்க்கப்பட்ட தரவு",
    myBenefits: "எனது நலத்திட்டங்கள்",

    // Scheme Detail
    schemeDetails: "திட்டத்தின் முழு விவரங்கள்",
    backToExplorer: "திட்டங்கள் பட்டியலுக்குத் திரும்புக",
    shareBtn: "பகிர்",
    applyOnOfficialPortal: "அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்கவும்",
    aiGuidedAssistant: "AI வழிகாட்டுதல் உதவியாளர்",
    trackManually: "கண்காணிக்கவும்",
    secOverview: "1. திட்டத்தின் கண்ணோட்டம்",
    secWhoIsItFor: "2. இது யாருக்கானது? (பயனாளிகள்)",
    secBenefits: "3. நன்மைகள் மற்றும் சலுகைகள்",
    secEligibility: "4. தகுதி மதிப்பீடு விவரங்கள்",
    secDocuments: "5. தேவையான ஆவணங்கள்",
    secSteps: "6. அதிகாரப்பூர்வ விண்ணப்ப முறை",
    secFaq: "7. அடிக்கடி கேட்கப்படும் கேள்விகள்",
    secSources: "8. அதிகாரப்பூர்வ அரசு ஆதாரங்கள்",
    keyObjective: "முக்கிய நோக்கம்:",
    ageRange: "வயது வரம்பு:",
    incomeCeiling: "வருமான உச்சவரம்பு:",
    genderCriteria: "பாலினம்:",
    noCap: "வரம்பு இல்லை",
    noLimit: "வரம்பு இல்லை",
    disbursementType: "வகை:",
    frequency: "வழங்கும் முறை:",
    helplineNumber: "உதவி எண்:",
    appMode: "விண்ணப்ப முறை:",
    uploadVerifyDocs: "ஆவணங்களைப் பதிவேற்றி சரிபார்க்கவும்",
    officialSource: "அதிகாரப்பூர்வ ஆதாரம்:",
    lastVerified: "கடைசியாக சரிபார்க்கப்பட்டது:",
    verifyOnPortal: "அரசு தளத்தில் சரிபார்க்கவும்",
    missingDocGuidance: "விடுபட்ட ஆவண வழிகாட்டுதல்",
    whatIsThisDoc: "இந்த ஆவணம் என்றால் என்ன?",
    stepByStepProcedure: "விண்ணப்பிக்கும் நடைமுறை:",

    // AI Assistant
    assistantTitle: "AI உதவியாளர்",
    typeMessage: "உங்கள் கேள்வியை தமிழ், ஆங்கிலம் அல்லது இந்தியில் கேளுங்கள்...",
    sendBtn: "அனுப்புக",
    explainReasoning: "AI பகுப்பாய்வை விளக்குக",
    speakAloud: "குரலில் கேட்க",
    stopVoice: "குரலை நிறுத்து",
    voiceMode: "குரல் முறை",
    resetConversation: "உரையாடலை மீட்டமைக்க",
    discoveredSchemes: "கண்டறியப்பட்ட திட்டங்கள்:",
    groundedInSources: "அரசு ஆதாரங்களின் அடிப்படையில்",

    // Benefit Gap
    benefitGapTitle: "நீங்கள் தவறவிடக்கூடிய நலன்கள்",
    benefitGapDesc: "ஒரு திட்டத்திற்கு தகுதி பெறும் குடிமக்கள் பெரும்பாலும் பல கூடுதல் அரசு உரிமைகளுக்கும் தகுதி பெறுகிறார்கள்.",
    matchingWelfareCategories: "உங்களுக்குப் பொருந்தக்கூடிய கூடுதல் நலப் பிரிவுகள்:",

    // Profile
    profileTitle: "குடிமக்கள் சுயவிவரம்",
    profileSubtitle: "தகுதியான அனைத்து நலன்களையும் கண்டறிய விதி இயந்திரத்தால் பயன்படுத்தப்படும் விரிவான சுயவிவரம்.",
    saveProfile: "சுயவிவரத்தைச் சேமிக்க",
    savingProfile: "சேமிக்கப்படுகிறது...",
    profileSavedSuccess: "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!",
    educationLabel: "கல்வி நிலை",
    incomeLabel: "குடும்ப ஆண்டு வருமானம்",
    socialCategoryLabel: "சமூகப் பிரிவு",
    ageLabel: "வயது",
    districtLabel: "மாவட்டம்",
    maritalStatusLabel: "திருமண நிலை",
    residenceLabel: "வசிப்பிடம்",
    disabilityLabel: "மாற்றுத்திறனாளி நிலை",

    // Footer
    footerMission: "இந்திய குடிமக்களுக்கான வெளிப்படையான தகுதி, ஆவண நுண்ணறிவு மற்றும் பலமொழி குரல் உதவியை வழங்கும் பல-முகவர் AI அமைப்பு.",
    footerArchitectureActive: "உற்பத்தி கட்டமைப்பு செயலில் உள்ளது",
    footerOfficialEcosystem: "அதிகாரப்பூர்வ இந்திய டிஜிட்டல் தளம்",
    footerEcosystemDesc: "அதிகாரப்பூர்வ அரசு இணையதளங்களின் மேல் ஒரு நுண்ணறிவு உதவி அடுக்காக வடிவமைக்கப்பட்டுள்ளது:",
    footerQuickLinks: "விரைவு இணைப்புகள்",
    footerDisclaimerTitle: "முக்கிய மறுப்புரை",
    footerDisclaimerNotice: "அரசு சாரா ஆலோசனை தளம்:",
    footerDisclaimerText: "இந்த அமைப்பு வழிகாட்டுதல் மற்றும் விண்ணப்ப உதவி அமைப்பாக மட்டுமே செயல்படுகிறது. இது உத்தியோகபூர்வ அனுமதியை வழங்காது, கட்டணம் வசூலிக்காது.",
    footerCopyright: "© 2026 குடிமக்கள் நல நுண்ணறிவு. பல-முகவர் AI தளம்.",
    footerLanguages: "மொழிகள்: English • தமிழ் • हिन्दी",
    footerAdmin: "நிர்வாகக் கட்டுப்பாட்டு மையம்"
  },

  hi: {
    // App & Nav
    appName: "नागरिक कल्याण आसूचना",
    appTagline: "योजना खोज से लाभ प्राप्ति तक — मल्टी-एजेंट एआई प्लेटफॉर्म",
    navHome: "होम",
    navExplorer: "योजनाएँ देखें",
    navAssistant: "सहायक",
    navDashboard: "मेरे लाभ",
    navDocuments: "दस्तावेज़ केंद्र",
    navApplications: "आवेदन",
    navBenefitGap: "लाभ अंतर",
    navAdmin: "प्रशासन केंद्र",
    loginBtn: "साइन इन",
    logoutBtn: "साइन आउट",
    simpleModeBtn: "सरल मोड",
    speakBtn: "आवाज़ सहायक",
    languageLabel: "भाषा:",
    appSubtitle: "भारतीय कल्याण के लिए एआई-संचालित मंच",

    // Login
    loginTitle: "नागरिक कल्याण आसूचना",
    loginSubtitle: "अपनी व्यक्तिगत कल्याणकारी सिफारिशों, दस्तावेज़ आसूचना और आवेदन ट्रैकिंग तक पहुँचने के लिए साइन इन करें।",
    emailOrMobile: "ईमेल पता या मोबाइल नंबर",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड भूल गए?",
    signInToAccount: "खाते में साइन इन करें",
    createCitizenProfile: "नागरिक प्रोफ़ाइल बनाएं",
    dontHaveAccount: "खाता नहीं है?",
    quickCitizenLogin: "नागरिक लॉगिन",
    quickAdminLogin: "एडमिन लॉगिन",
    quickAccessHeading: "त्वरित एक-क्लिक लॉगिन:",

    // Register
    registerTitle: "नागरिक खाता बनाएं",
    registerSubtitle: "व्यक्तिगत सरकारी योजना अनुशंसाएं प्राप्त करने के लिए अपनी प्रोफ़ाइल सेट करें।",
    fullNameLabel: "पूरा नाम",
    emailLabel: "ईमेल पता",
    phoneLabel: "फ़ोन नंबर (वैकल्पिक)",
    completeRegistrationBtn: "पंजीकरण पूरा करें",
    alreadyRegistered: "पहले से पंजीकृत हैं?",
    signInHere: "यहाँ साइन इन करें",

    // Compare
    compareMatrixTitle: "योजना तुलना तालिका",
    compareMatrixSubtitle: "पात्रता, आय सीमा, संवितरण और आवश्यक प्रमाणपत्रों में अंतर समझने के लिए 2 से 4 सरकारी योजनाओं की तुलना करें।",
    quickPresetsHeading: "त्वरित तुलना विकल्प:",
    manualSelectHeading: "या मैन्युअल रूप से योजनाएं चुनें (2 से 4 चुनें):",
    compareBtnCount: "चयनित योजनाओं की तुलना करें",
    changeSchemesBtn: "योजनाएं बदलें",
    comparingCount: "योजनाओं की तुलना की जा रही है",
    compareFactorCol: "तुलना कारक",
    categoryAndLevel: "श्रेणी और स्तर",
    benefitsAndPayout: "लाभ और भुगतान",
    incomeCriteria: "आय मानदंड",
    ageLimits: "आयु सीमा",
    targetGroupLabel: "लक्षित समूह",
    disbursementLabel: "संवितरण:",

    // Document Center
    docCenterTitle: "दस्तावेज़ आसूचना केंद्र",
    docCenterSubtitle: "स्वचालित ओसीआर वर्गीकरण, स्थिरता सत्यापन और लापता प्रमाणपत्र मार्गदर्शन।",
    digilockerReady: "डिजीलॉकर एकीकरण तैयार",
    uploadSectionTitle: "आसूचना विश्लेषण के लिए दस्तावेज़ अपलोड करें",
    docCertType: "दस्तावेज़ प्रमाणपत्र प्रकार",
    selectFileHint: "अपने डिवाइस से पीडीएफ, जेपीईजी या पीएनजी प्रमाणपत्र चुनें:",
    chooseFile: "फ़ाइल चुनें",
    selectedFileLabel: "चयनित फ़ाइल:",
    noFileChosen: "कोई फ़ाइल नहीं चुनी गई",
    uploadAndAnalyze: "दस्तावेज़ अपलोड और विश्लेषण करें",
    analyzingDoc: "दस्तावेज़ का विश्लेषण जारी है...",
    docPrepReadiness: "दस्तावेज़ तैयारी स्थिति",
    evalCompleteness: "चयनित सत्यापित योजना के विरुद्ध अपनी दस्तावेज़ पूर्णता का मूल्यांकन करें:",
    availableLabel: "उपलब्ध",
    missingLabel: "अनुपलब्ध",
    needsReviewLabel: "समीक्षा आवश्यक",
    readyLabel: "तैयार",
    viewBtn: "देखें",
    viewMissingReq: "अनुपलब्ध आवश्यकता देखें",
    howToGetDoc: "यह दस्तावेज़ कैसे प्राप्त करें",
    docDisclaimer: "यह स्कोर केवल दस्तावेज़ तैयारी की प्रगति को दर्शाता है, सरकारी सत्यापन को नहीं।",
    missingNotice: "वर्तमान सत्यापित डेटा में आधिकारिक अधिग्रहण जानकारी उपलब्ध नहीं है।",
    verifiedDocsHeading: "आपके तैयार दस्तावेज़",
    noDocsUploaded: "अभी तक कोई दस्तावेज़ अपलोड नहीं हुआ",
    uploadCertHint: "तैयारी स्कोर की गणना करने के लिए ऊपर अपने प्रमाणपत्र अपलोड करें।",
    whyRequired: "क्यों आवश्यक है",
    whoIssues: "जारीकर्ता प्राधिकरण",
    whereToApply: "कहाँ आवेदन करें",
    onlineOfflineMode: "ऑनलाइन / ऑफलाइन मोड",
    docsNormallyRequired: "सामान्य रूप से आवश्यक दस्तावेज़",
    officialSourceLink: "आधिकारिक स्रोत",
    closeBtn: "बंद करें",
    docAnalysisNotice: "केवल दस्तावेज़ तैयारी विश्लेषण। आधिकारिक सरकारी सत्यापन नहीं।",

    // Applications
    appsTitle: "मेरे आवेदन",
    appsSubtitle: "आपके द्वारा जमा किए गए सरकारी लाभों की ट्रैकिंग स्थिति और समयरेखा।",
    addAppBtn: "ट्रैक करने के लिए आवेदन जोड़ें",
    manualTrackingActive: "मैन्युअल ट्रैकिंग सक्रिय:",
    noAppsTracked: "वर्तमान में कोई आवेदन ट्रैक नहीं किया जा रहा",

    // Dashboard
    dashGreeting: "स्वागत है",
    dashSubtitle: "नागरिक कल्याण आसूचना डैशबोर्ड",
    recommendedForYou: "आपके लिए अनुशंसित",
    docsVerifiedCount: "तैयार दस्तावेज़",
    activeAppsCount: "सक्रिय आवेदन",
    upcomingDeadlines: "आगामी अंतिम तिथियां",
    benefitGapUnlocked: "पूरक लाभ अनलॉक हुए",
    myNextActions: "मेरी अगली प्राथमिकताएं",
    actionRequired: "कार्रवाई आवश्यक",
    deadlineWindow: "अंतिम तिथि खिड़की",
    profileAlmostReady: "प्रोफ़ाइल पूर्णता",
    actionUploadIncome: "आय प्रमाण पत्र सत्यापन",
    actionUploadIncomeDesc: "पोस्ट-मैट्रिक छात्रवृत्ति और आय-आधारित लाभों के लिए आवश्यक।",
    scholarshipVerification: "छात्रवृत्ति समीक्षा लंबित",
    scholarshipVerificationDesc: "एनएसपी पोर्टल सत्यापन दौर शीघ्र समाप्त होगा।",
    profileAlmostReadyDesc: "केंद्रीय और राज्य योजनाओं में सटीक मिलान अनलॉक करने के लिए प्रोफ़ाइल पूरा करें।",
    actionEngine: "कार्रवाई इंजन",
    inScrutiny: "जांच में",
    checkAppStatus: "आवेदन स्थिति जांचें",
    checkAppStatusDesc: "समयरेखा के साथ मैन्युअल प्रविष्टियों को ट्रैक करें।",
    askAssistantBtn: "एआई सहायक से पूछें",
    editProfileBtn: "प्रोफ़ाइल संपादित करें",
    basedOnProfile: "नागरिक प्रोफ़ाइल के आधार पर",
    formatVerified: "प्रारूप सत्यापित",
    manualTrackingText: "मैन्युअल ट्रैकिंग",
    within30Days: "अगले 30 दिनों के भीतर",
    income: "आय",
    notSpecified: "निर्दिष्ट नहीं",
    allIndia: "अखिल भारतीय",
    citizen: "नागरिक",
    benefitGapMissingTitle: "लाभ जो आप खो रहे होंगे",
    exploreComplementary: "सभी पूरक लाभ देखें",
    beyondScholarship: "आपकी प्राथमिक छात्रवृत्ति के अलावा, आप इनके लिए भी पात्र हो सकते हैं:",
    viewEligibility: "पात्रता देखें",
    topSchemesRecommended: "आपके लिए शीर्ष अनुशंसित योजनाएं",
    viewAllSchemes: "सभी योजनाएं देखें",
    profileMatch: "प्रोफ़ाइल मिलान",
    matchTooltip: "एआई प्रोफ़ाइल समानता संकेतक, आधिकारिक सरकारी पात्रता परिणाम नहीं।",
    whyThisRanks: "कारण:",
    rankingReasonDefault: "आपकी शिक्षा प्रोफ़ाइल और आय सीमा से मेल खाता है",

    // Scheme Explorer
    explorerTitle: "योजनाएँ देखें",
    explorerSubtitle: "पारदर्शी पात्रता मानदंडों के साथ सत्यापित केंद्रीय और राज्य कल्याण योजनाओं को देखें।",
    compareSchemes: "तुलना करें",
    categoryLabel: "श्रेणी:",
    stateLabel: "राज्य / केंद्र शासित प्रदेश:",
    occupationLabel: "व्यवसाय:",
    genderLabel: "लिंग:",
    allCategories: "सभी श्रेणियां",
    allStates: "अखिल भारतीय / केंद्र",
    allOccupations: "सभी व्यवसाय",
    allGenders: "सभी लिंग",
    searchBtn: "खोजें",
    filterBtn: "फ़िल्टर करें",
    resetFilters: "रीसेट करें",
    clearFilters: "फ़िल्टर हटाएं",
    foundSchemes: "सत्यापित सरकारी योजनाएं मिलीं",
    noSchemesFound: "कोई योजना आपके फ़िल्टर से मेल नहीं खाती",
    tryDifferentFilters: "'सभी श्रेणियां' चुनकर देखें या खोज शब्द बदलें।",
    searchPlaceholder: "कीवर्ड, लाभ या उद्देश्य से खोजें (जैसे 'कॉलेज छात्रवृत्ति', 'फसल बीमा')...",
    checkEligibility: "पात्रता जांचें",
    checkDocuments: "दस्तावेज़ जांचें",
    helpMeApply: "आवेदन में सहायता करें",
    viewDetails: "विवरण देखें",
    applyBtn: "आवेदन करें",
    saveBtn: "सहेजें",
    savedBtn: "सहेजा गया",
    exploreBtn: "खोजें",
    missingDocs: "अनुपलब्ध दस्तावेज़",
    likelyEligible: "पात्र होने की संभावना",
    potentiallyEligible: "संभावित रूप से पात्र",
    likelyNotEligible: "पात्र नहीं होने की संभावना",
    needsReview: "समीक्षा आवश्यक",
    eligibleLabel: "पात्र",
    notEligibleLabel: "अपात्र",
    insufficientInfo: "अधिक जानकारी चाहिए",
    officialPortal: "आधिकारिक पोर्टल पर आवेदन करें",
    keyBenefits: "प्रमुख लाभ",
    eligibilityCriteria: "पात्रता मानदंड",
    requiredDocs: "आवश्यक दस्तावेज़",
    deadlineLabel: "अंतिम तिथि:",
    openYearRound: "वर्ष भर खुला",
    catalogData: "कैटलॉग डेटा",
    verifiedData: "सत्यापित डेटा",
    myBenefits: "मेरे लाभ",

    // Scheme Detail
    schemeDetails: "योजना का पूरा विवरण",
    backToExplorer: "योजना अन्वेषक पर वापस जाएं",
    shareBtn: "साझा करें",
    applyOnOfficialPortal: "आधिकारिक पोर्टल पर आवेदन करें",
    aiGuidedAssistant: "एआई निर्देशित आवेदन सहायक",
    trackManually: "मैन्युअल रूप से ट्रैक करें",
    secOverview: "1. योजना का अवलोकन",
    secWhoIsItFor: "2. यह किसके लिए है? (लक्षित लाभार्थी)",
    secBenefits: "3. लाभ एवं अधिकार",
    secEligibility: "4. स्पष्ट पात्रता मूल्यांकन",
    secDocuments: "5. आवश्यक दस्तावेज़",
    secSteps: "6. चरण-दर-चरण आवेदन प्रक्रिया",
    secFaq: "7. अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    secSources: "8. आधिकारिक स्रोत एवं सहायता",
    keyObjective: "मुख्य उद्देश्य:",
    ageRange: "आयु सीमा:",
    incomeCeiling: "आय सीमा:",
    genderCriteria: "लिंग:",
    noCap: "कोई सीमा नहीं",
    noLimit: "कोई सीमा नहीं",
    disbursementType: "प्रकार:",
    frequency: "संवितरण:",
    helplineNumber: "हेल्पलाइन:",
    appMode: "आवेदन मोड:",
    uploadVerifyDocs: "दस्तावेज़ अपलोड और सत्यापित करें",
    officialSource: "आधिकारिक स्रोत:",
    lastVerified: "अंतिम सत्यापन:",
    verifyOnPortal: "विभाग पोर्टल पर सत्यापित करें",
    missingDocGuidance: "अनुपलब्ध दस्तावेज़ मार्गदर्शन",
    whatIsThisDoc: "यह दस्तावेज़ क्या है?",
    stepByStepProcedure: "चरण-दर-चरण प्रक्रिया:",

    // AI Assistant
    assistantTitle: "एआई सहायक",
    typeMessage: "अपना प्रश्न हिंदी, तमिल या अंग्रेजी में पूछें...",
    sendBtn: "भेजें",
    explainReasoning: "एआई तर्क समझें",
    speakAloud: "आवाज में सुनें",
    stopVoice: "आवाज रोकें",
    voiceMode: "आवाज मोड",
    resetConversation: "बातचीत रीसेट करें",
    discoveredSchemes: "पहचानी गई सत्यापित योजनाएं:",
    groundedInSources: "सत्यापित स्रोतों पर आधारित",

    // Benefit Gap
    benefitGapTitle: "लाभ जो आप खो रहे होंगे",
    benefitGapDesc: "एक योजना के लिए पात्र नागरिक अक्सर कई पूरक अधिकारों के लिए भी पात्र होते हैं।",
    matchingWelfareCategories: "आपकी प्रोफ़ाइल से मेल खाने वाली पूरक कल्याण श्रेणियां:",

    // Profile
    profileTitle: "नागरिक प्रोफ़ाइल",
    profileSubtitle: "सभी पात्र लाभों की खोज के लिए नियम इंजन द्वारा उपयोग की जाने वाली व्यापक प्रोफ़ाइल।",
    saveProfile: "प्रोफ़ाइल सहेजें",
    savingProfile: "सहेजा जा रहा है...",
    profileSavedSuccess: "प्रोफ़ाइल सफलतापूर्वक सहेजी गई!",
    educationLabel: "शिक्षा का स्तर",
    incomeLabel: "वार्षिक पारिवारिक आय",
    socialCategoryLabel: "सामाजिक श्रेणी",
    ageLabel: "आयु",
    districtLabel: "जिला",
    maritalStatusLabel: "वैवाहिक स्थिति",
    residenceLabel: "निवास क्षेत्र",
    disabilityLabel: "दिव्यांगता स्थिति",

    // Footer
    footerMission: "भारतीय नागरिकों के लिए स्पष्ट पात्रता, दस्तावेज़ बुद्धिमत्ता और बहुभाषी आवाज सहायता प्रदान करने वाली मल्टी-एजेंट एआई प्रणाली।",
    footerArchitectureActive: "उत्पादन वास्तुकला सक्रिय है",
    footerOfficialEcosystem: "आधिकारिक भारतीय डिजिटल तंत्र",
    footerEcosystemDesc: "आधिकारिक सरकारी पोर्टलों के ऊपर एक बुद्धिमान सहायता परत के रूप में डिज़ाइन किया गया:",
    footerQuickLinks: "त्वरित लिंक",
    footerDisclaimerTitle: "महत्वपूर्ण अस्वीकरण",
    footerDisclaimerNotice: "गैर-सरकारी सूचना:",
    footerDisclaimerText: "यह प्रणाली केवल सलाहकार खोज, नियम मूल्यांकन और आवेदन नेविगेशन सहायक के रूप में कार्य करती है। यह आधिकारिक स्वीकृति जारी नहीं करती, शुल्क नहीं लेती और आधिकारिक जांच की जगह नहीं लेती।",
    footerCopyright: "© 2026 नागरिक कल्याण आसूचना। मल्टी-एजेंट एआई प्लेटफॉर्म।",
    footerLanguages: "भाषाएं: English • தமிழ் • हिन्दी",
    footerAdmin: "प्रशासन नियंत्रण केंद्र"
  }
};

// Domain mappings
const CATEGORY_MAP: Record<string, Record<LanguageCode, string>> = {
  "Education": { en: "Education", ta: "கல்வி", hi: "शिक्षा" },
  "Agriculture": { en: "Agriculture", ta: "விவசாயம்", hi: "कृषि" },
  "Health": { en: "Health", ta: "சுகாதாரம்", hi: "स्वास्थ्य" },
  "Housing": { en: "Housing", ta: "வீட்டு வசதி", hi: "आवास" },
  "Employment": { en: "Employment", ta: "வேலைவாய்ப்பு", hi: "रोजगार" },
  "Skill Development": { en: "Skill Development", ta: "திறன் மேம்பாடு", hi: "कौशल विकास" },
  "Women & Child Welfare": { en: "Women & Child Welfare", ta: "பெண்கள் மற்றும் குழந்தைகள் நலம்", hi: "महिला एवं बाल कल्याण" },
  "Social Security": { en: "Social Security", ta: "சமூக பாதுகாப்பு", hi: "सामाजिक सुरक्षा" },
  "Financial Assistance": { en: "Financial Assistance", ta: "நிதி உதவி", hi: "वित्तीय सहायता" },
  "Disability Support": { en: "Disability Support", ta: "மாற்றுத்திறனாளிகள் ஆதரவு", hi: "दिव्यांग सहायता" },
  "Student Welfare": { en: "Student Welfare", ta: "மாணவர் நலம்", hi: "छात्र कल्याण" },
  "Other": { en: "Other", ta: "மற்றவை", hi: "अन्य" }
};

const STATE_MAP: Record<string, Record<LanguageCode, string>> = {
  "All India": { en: "All India", ta: "அகில இந்தியா", hi: "अखिल भारतीय" },
  "Tamil Nadu": { en: "Tamil Nadu", ta: "தமிழ்நாடு", hi: "तमिलनाडु" },
  "Uttar Pradesh": { en: "Uttar Pradesh", ta: "உத்தரப் பிரதேசம்", hi: "उत्तर प्रदेश" },
  "Karnataka": { en: "Karnataka", ta: "கர்நாடகா", hi: "कर्नाटक" },
  "Maharashtra": { en: "Maharashtra", ta: "மகாராஷ்டிரா", hi: "महाराष्ट्र" },
  "Kerala": { en: "Kerala", ta: "கேரளா", hi: "केरल" }
};

const OCCUPATION_MAP: Record<string, Record<LanguageCode, string>> = {
  "Student": { en: "Student", ta: "மாணவர்", hi: "छात्र" },
  "Farmer": { en: "Farmer", ta: "விவசாயி", hi: "किसान" },
  "Unemployed": { en: "Unemployed", ta: "வேலையற்றவர்", hi: "बेरोजगार" },
  "Self-Employed": { en: "Self-Employed / Artisan", ta: "சுயதொழில் / கைவினைஞர்", hi: "स्वरोजगार / कारीगर" },
  "Daily Wage": { en: "Daily Wage", ta: "தினக்கூலி", hi: "दिहाड़ी मजदूर" },
  "Citizen": { en: "Citizen", ta: "குடிமகன்", hi: "नागरिक" }
};

const STATUS_MAP: Record<string, Record<LanguageCode, string>> = {
  "LIKELY ELIGIBLE": { en: "Likely Eligible", ta: "தகுதி பெற வாய்ப்புள்ளது", hi: "पात्र होने की संभावना" },
  "POTENTIALLY ELIGIBLE": { en: "Potentially Eligible", ta: "சாத்தியமான தகுதி", hi: "संभावित रूप से पात्र" },
  "LIKELY NOT ELIGIBLE": { en: "Likely Not Eligible", ta: "தகுதி பெற வாய்ப்பில்லை", hi: "पात्र नहीं होने की संभावना" },
  "NEEDS REVIEW": { en: "Needs Review", ta: "மதிப்பாய்வு தேவை", hi: "समीक्षा आवश्यक" },
  "ELIGIBLE": { en: "Eligible", ta: "தகுதியுடையவர்", hi: "पात्र" },
  "NOT ELIGIBLE": { en: "Not Eligible", ta: "தகுதியற்றவர்", hi: "अपात्र" },
  "NEED INFO": { en: "Need More Info", ta: "கூடுதல் தகவல் தேவை", hi: "अधिक जानकारी चाहिए" },
  "INSUFFICIENT_INFO": { en: "Need More Info", ta: "கூடுதல் தகவல் தேவை", hi: "अधिक जानकारी चाहिए" },
  "SATISFIED": { en: "SATISFIED", ta: "பூர்த்தி செய்யப்பட்டது", hi: "संतुष्ट" },
  "FAILED": { en: "FAILED", ta: "தகுதியடையவில்லை", hi: "विफल" }
};

// All 10 Government Schemes Names
const SCHEME_NAME_MAP: Record<string, Record<LanguageCode, string>> = {
  "SCHEME-NSP-POSTMATRIC-001": {
    en: "Post-Matric Scholarship Scheme for SC/ST/OBC Students",
    ta: "எஸ்சி/எஸ்டி/ஓபிசி மாணவர்களுக்கான போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை திட்டம்",
    hi: "एससी/एसटी/ओबीसी छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति योजना"
  },
  "SCHEME-TN-PUDHUMAI-PENN-002": {
    en: "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn)",
    ta: "மூவலூர் ராமாமிர்தம் அம்மையார் உயர்கல்வி உறுதித் திட்டம் (புதுமைப் பெண்)",
    hi: "मूवलूर रामामिरथम अम्मैयार उच्च शिक्षा आश्वासन योजना (पुधुमई पेन)"
  },
  "SCHEME-CSS-COLLEGE-SCHOLARSHIP-003": {
    en: "Central Sector Scheme of Scholarship for College and University Students (PM-USP)",
    ta: "கல்லூரி மற்றும் பல்கலைக்கழக மாணவர்களுக்கான மத்திய துறை கல்வி உதவித்தொகை திட்டம் (PM-USP)",
    hi: "कॉलेज और विश्वविद्यालय के छात्रों के लिए केंद्रीय क्षेत्र छात्रवृत्ति योजना (PM-USP)"
  },
  "SCHEME-AGRI-PMKISAN-004": {
    en: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    ta: "பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN)",
    hi: "प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)"
  },
  "SCHEME-HEALTH-PMJAY-005": {
    en: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    ta: "ஆயுஷ்மான் பாரத் - பிரதான் மந்திரி ஜன் ஆரோக்கிய யோஜனா (AB-PMJAY)",
    hi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (एबी-पीएमजेएवाई)"
  },
  "SCHEME-HOUSING-PMAY-U-006": {
    en: "Pradhan Mantri Awas Yojana - Urban 2.0 (PMAY-U)",
    ta: "பிரதான் மந்திரி ஆவாஸ் யோஜனா - நகர்ப்புறம் 2.0 (PMAY-U)",
    hi: "प्रधानमंत्री आवास योजना - शहरी 2.0 (पीएमएवाई-यू)"
  },
  "SCHEME-WOMEN-IGNWPS-007": {
    en: "Indira Gandhi National Widow Pension Scheme (IGNWPS / NSAP)",
    ta: "இந்திரா காந்தி தேசிய விதவை ஓய்வூதியத் திட்டம் (IGNWPS / NSAP)",
    hi: "इंदिरा गांधी राष्ट्रीय विधवा पेंशन योजना (आईजीएनडब्ल्यूपीएस / एनएसएपी)"
  },
  "SCHEME-MSME-VISHWAKARMA-008": {
    en: "PM Vishwakarma Scheme",
    ta: "பிரதமர் விஸ்வகர்மா திட்டம்",
    hi: "पीएम विश्वकर्मा योजना"
  },
  "SCHEME-TN-NAAN-MUDHALVAN-009": {
    en: "Tamil Nadu Naan Mudhalvan Skill & Higher Education Scheme",
    ta: "தமிழ்நாடு நான் முதல்வன் திறன் மற்றும் உயர்கல்வி திட்டம்",
    hi: "तमिलनाडु नान मुधलवन कौशल और उच्च शिक्षा योजना"
  },
  "SCHEME-MSME-MUDRA-010": {
    en: "Pradhan Mantri Mudra Yojana (PMMY)",
    ta: "பிரதான் மந்திரி முத்ரா யோஜனா (PMMY)",
    hi: "प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)"
  }
};

const SCHEME_SHORTNAME_MAP: Record<string, Record<LanguageCode, string>> = {
  "SCHEME-NSP-POSTMATRIC-001": { en: "Post-Matric Scholarship", ta: "போஸ்ட்-மெட்ரிக் உதவித்தொகை", hi: "पोस्ट-मैट्रिक छात्रवृत्ति" },
  "SCHEME-TN-PUDHUMAI-PENN-002": { en: "Pudhumai Penn Scheme", ta: "புதுமைப் பெண் திட்டம்", hi: "पुधुमई पेन योजना" },
  "SCHEME-CSS-COLLEGE-SCHOLARSHIP-003": { en: "Central Sector Scholarship (PM-USP)", ta: "மத்திய துறை உதவித்தொகை (PM-USP)", hi: "केंद्रीय क्षेत्र छात्रवृत्ति (PM-USP)" },
  "SCHEME-AGRI-PMKISAN-004": { en: "PM-KISAN", ta: "பிஎம்-கிசான்", hi: "पीएम-किसान" },
  "SCHEME-HEALTH-PMJAY-005": { en: "Ayushman Bharat (PM-JAY)", ta: "ஆயுஷ்மான் பாரத் (PM-JAY)", hi: "आयुष्मान भारत (पीएम-जय)" },
  "SCHEME-HOUSING-PMAY-U-006": { en: "PMAY Urban 2.0", ta: "பிரதமர் ஆவாஸ் நகர்ப்புறம் 2.0", hi: "पीएमएवाई शहरी 2.0" },
  "SCHEME-WOMEN-IGNWPS-007": { en: "National Widow Pension", ta: "தேசிய விதவை ஓய்வூதியம்", hi: "राष्ट्रीय विधवा पेंशन" },
  "SCHEME-MSME-VISHWAKARMA-008": { en: "PM Vishwakarma", ta: "பிஎம் விஸ்வகர்மா", hi: "पीएम विश्वकर्मा" },
  "SCHEME-TN-NAAN-MUDHALVAN-009": { en: "Naan Mudhalvan", ta: "நான் முதல்வன்", hi: "नान मुधलवन" },
  "SCHEME-MSME-MUDRA-010": { en: "Mudra Loan", ta: "முத்ரா கடன்", hi: "मुद्रा ऋण" }
};

const SCHEME_DESC_MAP: Record<string, Record<LanguageCode, string>> = {
  "SCHEME-NSP-POSTMATRIC-001": {
    en: "Centrally sponsored scholarship scheme providing financial assistance to students belonging to Scheduled Castes, Scheduled Tribes, and Other Backward Classes at post-matriculation or post-secondary stage to enable them to complete their education.",
    ta: "பட்டியலின, பழங்குடியின மற்றும் இதர பிற்படுத்தப்பட்ட வகுப்பு மாணவர்கள் தங்கள் உயர் கல்வியை தடையின்றி முடிக்க நிதி உதவி வழங்கும் மத்திய அரசின் கல்வி உதவித்தொகை திட்டம்.",
    hi: "अनुसूचित जाति, अनुसूचित जनजाति और अन्य पिछड़ा वर्ग के छात्रों को मैट्रिक के बाद उच्च शिक्षा पूरी करने के लिए वित्तीय सहायता प्रदान करने वाली केंद्र प्रायोजित छात्रवृत्ति योजना।"
  },
  "SCHEME-TN-PUDHUMAI-PENN-002": {
    en: "Tamil Nadu State Government flagship initiative to encourage female students from government schools to pursue higher education by granting financial assistance of ₹1,000 per month.",
    ta: "அரசுப் பள்ளிகளில் 6 முதல் 12-ம் வகுப்பு வரை பயின்ற மாணவிகள் உயர்கல்வி கற்பதை ஊக்குவிக்க மாதம் ₹1,000 வங்கி கணக்கில் நேரடியாக வழங்கும் தமிழ்நாடு அரசின் புதுமைப் பெண் திட்டம்.",
    hi: "सरकारी स्कूलों से कक्षा 6 से 12 तक पढ़ने वाली छात्राओं को उच्च शिक्षा के दौरान सीधे बैंक खाते में ₹1,000 प्रतिमाह प्रदान करने की तमिलनाडु सरकार की प्रमुख पहल।"
  },
  "SCHEME-CSS-COLLEGE-SCHOLARSHIP-003": {
    en: "Department of Higher Education scheme to provide financial assistance to meritorious students from low-income families to meet day-to-day expenses while pursuing higher studies.",
    ta: "குறைந்த வருமானக் குடும்பங்களைச் சேர்ந்த திறமையான மாணவர்கள் உயர்கல்வி பயிலும் போது அவர்களின் அன்றாட செலவுகளைச் சமாளிக்க நிதியுதவி வழங்கும் உயர்கல்வித் துறை திட்டம்.",
    hi: "उच्च अध्ययन के दौरान दिन-प्रतिदिन के खर्चों को पूरा करने के लिए कम आय वाले परिवारों के मेधावी छात्रों को वित्तीय सहायता प्रदान करने की उच्च शिक्षा विभाग की योजना।"
  },
  "SCHEME-AGRI-PMKISAN-004": {
    en: "Central sector income support scheme to supplement financial needs of all landholding farmer families across India in procuring various agricultural inputs.",
    ta: "விவசாய இடுபொருட்களை வாங்குவதற்காக நாடு முழுவதும் உள்ள அனைத்து நில உரிமையாளர் விவசாய குடும்பங்களுக்கும் மூன்று தவணைகளில் ஆண்டுக்கு ₹6,000 நேரடி வருமான உதவி வழங்கும் மத்திய அரசு திட்டம்.",
    hi: "देशभर के सभी भूमिधारक किसान परिवारों के बैंक खातों में ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, तीन समान किस्तों में ₹2,000 प्रत्येक।"
  },
  "SCHEME-HEALTH-PMJAY-005": {
    en: "World's largest government-funded health assurance scheme providing health cover of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    ta: "தகுதியுள்ள ஏழை குடும்பங்களுக்கு இரண்டாம் மற்றும் மூன்றாம் நிலை மருத்துவமனை சிகிச்சைகளுக்கு ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவ காப்பீடு வழங்கும் உலகின் மிகப்பெரிய திட்டம்.",
    hi: "प्रति परिवार प्रति वर्ष ₹5 लाख तक कैशलेस द्वितीयक और तृतीयक अस्पताल में भर्ती कवर प्रदान करने वाली दुनिया की सबसे बड़ी सरकारी स्वास्थ्य आश्वासन योजना।"
  },
  "SCHEME-HOUSING-PMAY-U-006": {
    en: "Comprehensive urban housing mission to provide pucca houses with basic amenities to all eligible urban poor, Economically Weaker Section (EWS), and Low Income Group (LIG) families.",
    ta: "தகுதியுள்ள நகர்ப்புற ஏழைகள், பொருளாதாரத்தில் நலிவடைந்த பிரிவினர் (EWS) மற்றும் குறைந்த வருமானப் பிரிவினர் (LIG) குடும்பங்களுக்கு அடிப்படை வசதிகளுடன் கூடிய கான்கிரீட் நிரந்தர வீடு வழங்கும் திட்டம்.",
    hi: "सभी पात्र शहरी गरीबों, आर्थिक रूप से कमजोर वर्ग (ईडब्ल्यूएस) और निम्न आय वर्ग (एलआईजी) परिवारों को बुनियादी सुविधाओं के साथ पक्के मकान उपलब्ध कराने का व्यापक शहरी आवास मिशन।"
  },
  "SCHEME-WOMEN-IGNWPS-007": {
    en: "Component of the National Social Assistance Programme (NSAP) providing non-contributory monthly pensions to destitute widows living below the poverty line.",
    ta: "வறுமைக் கோட்டிற்கு கீழ் வாழும் ஆதரவற்ற விதவைகளுக்கு அடிப்படை சமூகப் பாதுகாப்பிற்காக மாதாந்திர ஓய்வூதியம் வழங்கும் தேசிய சமூக உதவித் திட்டம்.",
    hi: "गरीबी रेखा से नीचे रहने वाली निराश्रित विधवाओं को बुनियादी सामाजिक सुरक्षा और सम्मान सुनिश्चित करने के लिए गैर-अंशदायी मासिक पेंशन योजना।"
  },
  "SCHEME-MSME-VISHWAKARMA-008": {
    en: "Central sector scheme to provide end-to-end holistic support to traditional artisans and craftspeople engaged in 18 identified trades including carpenters, blacksmiths, potters, cobblers, weavers, and tailors.",
    ta: "தச்சர், கொல்லர், குயவர், செருப்பு தைப்பவர், தையல்காரர் உள்ளிட்ட 18 பாரம்பரிய கைவினைஞர்களுக்கு அடையாள அட்டை, பயிற்சி, உபகரண மானியம் மற்றும் சலுகை கடன் வழங்கும் மத்திய அரசு திட்டம்.",
    hi: "बढ़ई, लोहार, कुम्हार, मोची, बुनकर और दर्जी सहित 18 चिन्हित व्यवसायों में लगे पारंपरिक कारीगरों और शिल्पकारों को टूलकिट व रियायती ऋण सहायता प्रदान करने की केंद्रीय योजना।"
  },
  "SCHEME-TN-NAAN-MUDHALVAN-009": {
    en: "Massive youth empowerment and skill development initiative of Tamil Nadu Government equipping college students with cutting-edge engineering, computing, management, and technical skills alongside stipend-supported industrial internships.",
    ta: "கல்லூரி மாணவர்களுக்கு அதிநவீன பொறியியல், கணினி, மேலாண்மை மற்றும் தொழில்நுட்பத் திறன் பயிற்சி வழங்கி வேலைவாய்ப்பை உறுதி செய்யும் தமிழ்நாடு அரசின் திறன் மேம்பாட்டுத் திட்டம்.",
    hi: "तमिलनाडु सरकार की व्यापक युवा सशक्तिकरण और कौशल विकास पहल जो कॉलेज के छात्रों को अत्याधुनिक इंजीनियरिंग और तकनीकी कौशल प्रदान करती है।"
  },
  "SCHEME-MSME-MUDRA-010": {
    en: "Flagship scheme to provide formal institutional credit up to ₹10 lakh (recently expanded to ₹20 lakh under Tarun Plus) to micro and small non-corporate enterprises.",
    ta: "சிறு வணிகர்கள், கடைக்காரர்கள் மற்றும் குறு தொழில் நிறுவனங்களுக்கு பிணையமில்லாமல் ₹10 லட்சம் வரை முறையான வங்கி கடன் வழங்கும் முதன்மைத் திட்டம்.",
    hi: "सूक्ष्म और लघु गैर-कॉर्पोरेट उद्यमों को ₹10 लाख तक (तरुण प्लस के तहत ₹20 लाख तक) संपार्श्विक-मुक्त औपचारिक संस्थागत ऋण प्रदान करने की प्रमुख योजना।"
  }
};

const SCHEME_BENEFITS_MAP: Record<string, Record<LanguageCode, string>> = {
  "SCHEME-NSP-POSTMATRIC-001": {
    en: "Full tuition fee waiver or reimbursement, plus monthly maintenance allowance up to ₹1,200 per month for hostellers and ₹550 per month for day scholars.",
    ta: "முழு கல்விக் கட்டண விலக்கு அல்லது திருப்பிச் செலுத்துதல், விடுதி மாணவர்களுக்கு மாதம் ₹1,200 மற்றும் நாள் மாணவர்களுக்கு மாதம் ₹550 பராமரிப்பு உதவித்தொகை.",
    hi: "पूर्ण शिक्षण शुल्क प्रतिपूर्ति, छात्रावास छात्रों के लिए ₹1,200/माह और डे-स्कॉलर छात्रों के लिए ₹550/माह तक रखरखाव भत्ता।"
  },
  "SCHEME-TN-PUDHUMAI-PENN-002": {
    en: "₹1,000 monthly cash assistance deposited directly into student's bank account every month until graduation.",
    ta: "பட்டப்படிப்பு, பட்டயம் அல்லது ஐடிஐ படிப்பு முடியும் வரை மாணவியின் வங்கிக் கணக்கில் ஒவ்வொரு மாதமும் நேரடியாக ₹1,000 நிதி உதவி.",
    hi: "स्नातक डिग्री/डिप्लोमा पूरा होने तक छात्रा के बैंक खाते में सीधे ₹1,000 प्रति माह नकद सहायता।"
  },
  "SCHEME-CSS-COLLEGE-SCHOLARSHIP-003": {
    en: "₹12,000 per annum at Graduation level for first three years and ₹20,000 per annum at Post-Graduation level.",
    ta: "இளங்கலை பட்டப்படிப்பின் முதல் 3 ஆண்டுகளுக்கு ஆண்டுக்கு ₹12,000 மற்றும் முதுகலை பட்டப்படிப்புக்கு ஆண்டுக்கு ₹20,000 உதவித்தொகை.",
    hi: "स्नातक स्तर पर पहले 3 वर्षों के लिए ₹12,000 प्रति वर्ष और स्नातकोत्तर स्तर पर ₹20,000 प्रति वर्ष।"
  },
  "SCHEME-AGRI-PMKISAN-004": {
    en: "₹6,000 per year paid in three equal four-monthly installments of ₹2,000 directly into bank accounts.",
    ta: "பயனாளிகளின் வங்கிக் கணக்கில் நேரடியாக 4 மாதங்களுக்கு ஒருமுறை ₹2,000 வீதம் மூன்று சம தவணைகளில் ஆண்டுக்கு ₹6,000 வழங்கப்படுகிறது.",
    hi: "प्रत्यक्ष लाभ अंतरण के माध्यम से तीन 4-मासिक किस्तों में ₹2,000 प्रति किस्त, कुल ₹6,000 प्रति वर्ष।"
  },
  "SCHEME-HEALTH-PMJAY-005": {
    en: "Cashless healthcare services up to ₹5,00,000 per family per year across 28,000+ empaneled hospitals across India.",
    ta: "இந்தியா முழுவதும் உள்ள 28,000+ அங்கீகரிக்கப்பட்ட அரசு மற்றும் தனியார் மருத்துவமனைகளில் குடும்பத்திற்கு ஆண்டுக்கு ₹5,00,000 வரை கட்டணமில்லா சிகிச்சை.",
    hi: "28,000+ सूचीबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹5,00,000 तक कैशलेस स्वास्थ्य कवर।"
  },
  "SCHEME-HOUSING-PMAY-U-006": {
    en: "Interest subsidy up to ₹1.80 lakh on home loans, or Central Assistance of ₹1.50 lakh per unit for individual house construction.",
    ta: "வீட்டுக் கடன்களுக்கு ₹1.80 லட்சம் வரை வட்டி மானியம் அல்லது தனிநபர் வீடு கட்டுவதற்கு ஒரு வீட்டிற்கு ₹1.50 லட்சம் நேரடி உதவி.",
    hi: "गृह ऋण पर ₹1.80 लाख तक की ब्याज सब्सिडी, या व्यक्तिगत घर निर्माण के लिए प्रति इकाई ₹1.50 लाख की केंद्रीय सहायता।"
  },
  "SCHEME-WOMEN-IGNWPS-007": {
    en: "Monthly pension of ₹1,000 to ₹1,500 per month deposited directly into bank account via DBT.",
    ta: "மாதந்தோறும் ₹1,000 முதல் ₹1,500 வரை உதவித்தொகை வங்கி கணக்கில் நேரடியாக செலுத்தப்படுகிறது.",
    hi: "प्रत्यक्ष लाभ अंतरण (DBT) के माध्यम से बैंक खाते में सीधे ₹1,000 से ₹1,500 प्रति माह की मासिक पेंशन।"
  },
  "SCHEME-MSME-VISHWAKARMA-008": {
    en: "Certificate & ID card, skill training with ₹500/day stipend, ₹15,000 toolkit voucher, and collateral-free loan up to ₹3 lakh at 5% interest.",
    ta: "விஸ்வகர்மா அடையாள அட்டை, நாளொன்றுக்கு ₹500 உதவித்தொகையுடன் திறன் பயிற்சி, ₹15,000 உபகரண மானியம் மற்றும் 5% சலுகை வட்டியில் ₹3 லட்சம் வரை பிணையமில்லா கடன்.",
    hi: "विश्वकर्मा प्रमाणपत्र व आईडी, ₹500/दिन वजीफे के साथ प्रशिक्षण, ₹15,000 टूलकिट और 5% रियायती ब्याज पर ₹3 लाख तक का संपार्श्विक-मुक्त ऋण।"
  },
  "SCHEME-TN-NAAN-MUDHALVAN-009": {
    en: "Free industry-recognized certifications (AWS, Microsoft, Cisco), mentor support, campus placement drives, and competitive exam stipends.",
    ta: "இலவச தொழில்முறை சான்றிதழ்கள் (AWS, Microsoft, Cisco), வளாக வேலைவாய்ப்பு முகாம்கள் மற்றும் போட்டித் தேர்வு தயாரிப்பு உதவித்தொகை.",
    hi: "निःशुल्क उद्योग-मान्यता प्राप्त प्रमाणपत्र (AWS, Microsoft, Cisco), मेंटर सहायता, कैंपस प्लेसमेंट और प्रतियोगी परीक्षा तैयारी वजीफा।"
  },
  "SCHEME-MSME-MUDRA-010": {
    en: "Collateral-free micro loans: Shishu (up to ₹50K), Kishore (₹50K to ₹5L), and Tarun (₹5L to ₹10L/₹20L).",
    ta: "மூன்று பிரிவுகளில் பிணையமில்லா கடன்: சிசு (₹50,000 வரை), கிஷோர் (₹50,000 முதல் ₹5 லட்சம் வரை), மற்றும் தருண் (₹5 லட்சம் முதல் ₹10L/₹20L வரை).",
    hi: "तीन श्रेणियों में संपार्श्विक-मुक्त ऋण: शिशु (₹50 हजार तक), किशोर (₹50 हजार से ₹5 लाख), और तरुण (₹5 लाख से ₹10L/₹20L)।"
  }
};

const DOC_NAME_MAP: Record<string, Record<LanguageCode, string>> = {
  "Income Certificate": { en: "Income Certificate", ta: "வருமானச் சான்றிதழ்", hi: "आय प्रमाण पत्र" },
  "Community / Caste Certificate": { en: "Community / Caste Certificate", ta: "சாதிச் சான்றிதழ்", hi: "जाति प्रमाण पत्र" },
  "Bonafide / Student Certificate": { en: "Bonafide / Student Certificate", ta: "கல்வி பயிலும் சான்றிதழ் (போனஃபைட்)", hi: "वास्तविक छात्र प्रमाण पत्र (बोनाफाइड)" },
  "Aadhaar Card": { en: "Aadhaar Card", ta: "ஆதார் அட்டை", hi: "आधार कार्ड" },
  "Aadhaar Card of all family members": { en: "Aadhaar Card of all family members", ta: "குடும்ப உறுப்பினர்கள் அனைவரின் ஆதார் அட்டை", hi: "परिवार के सभी सदस्यों का आधार कार्ड" },
  "Previous Year Marksheet": { en: "Previous Year Marksheet", ta: "முந்தைய ஆண்டு மதிப்பெண் பட்டியல்", hi: "पिछले वर्ष की मार्कशीट" },
  "Bank Passbook (Aadhaar Seeded)": { en: "Bank Passbook (Aadhaar Seeded)", ta: "வங்கி கணக்குப் புத்தகம் (ஆதார் இணைக்கப்பட்டது)", hi: "बैंक पासबुक (आधार से जुड़ी)" },
  "Bank Passbook": { en: "Bank Passbook", ta: "வங்கி கணக்குப் புத்தகம்", hi: "बैंक पासबुक" },
  "Bank Passbook (Single Account)": { en: "Bank Passbook (Single Account)", ta: "வங்கி கணக்குப் புத்தகம் (தனி நபர் கணக்கு)", hi: "बैंक पासबुक (एकल खाता)" },
  "School Transfer Certificate (Class 6-12 Govt School Proof)": { en: "School Transfer Certificate (Class 6-12 Govt School Proof)", ta: "பள்ளி மாற்றுச் சான்றிதழ் (6-12 அரசு பள்ளி சான்று)", hi: "स्कूल स्थानांतरण प्रमाण पत्र (6-12 सरकारी स्कूल प्रमाण)" },
  "Nativity / Domicile Certificate": { en: "Nativity / Domicile Certificate", ta: "இருப்பிடச் சான்றிதழ்", hi: "मूल निवास प्रमाण पत्र" },
  "Class 12 Board Marksheet": { en: "Class 12 Board Marksheet", ta: "12-ம் வகுப்பு பொதுத்தேர்வு மதிப்பெண் பட்டியல்", hi: "कक्षा 12वीं बोर्ड मार्कशीट" },
  "Land Record / Patta Chitta": { en: "Land Record / Patta Chitta", ta: "நில ஆவணம் / பட்டா சிட்டா", hi: "भूमि रिकॉर्ड / खतौनी / पट्टा" },
  "Ration Card / Family Card": { en: "Ration Card / Family Card", ta: "குடும்ப அட்டை / ரேஷன் கார்டு", hi: "राशन कार्ड / परिवार कार्ड" },
  "Husband Death Certificate": { en: "Husband Death Certificate", ta: "கணவரின் இறப்புச் சான்றிதழ்", hi: "पति का मृत्यु प्रमाण पत्र" },
  "Business Address Proof / Shop License": { en: "Business Address Proof / Shop License", ta: "வணிக முகவரி சான்று / கடை உரிமம்", hi: "व्यावसायिक पता प्रमाण / दुकान लाइसेंस" },
  "Quotations for machinery / stock to be purchased": { en: "Quotations for machinery / stock to be purchased", ta: "இயந்திரம் / இருப்பு வாங்குவதற்கான விலைப்பட்டியல்", hi: "मशीनरी / स्टॉक खरीद हेतु कोटेशन" }
};

const MINISTRY_DEPT_MAP: Record<string, Record<LanguageCode, string>> = {
  "Ministry of Social Justice and Empowerment": { en: "Ministry of Social Justice and Empowerment", ta: "சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம்", hi: "सामाजिक न्याय और अधिकारिता मंत्रालय" },
  "Department of Social Justice and Empowerment": { en: "Department of Social Justice and Empowerment", ta: "சமூக நீதி மற்றும் அதிகாரமளித்தல் துறை", hi: "सामाजिक न्याय और अधिकारिता विभाग" },
  "Social Welfare and Women Empowerment Department": { en: "Social Welfare and Women Empowerment Department", ta: "சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை", hi: "समाज कल्याण और महिला अधिकारिता विभाग" },
  "Government of Tamil Nadu": { en: "Government of Tamil Nadu", ta: "தமிழ்நாடு அரசு", hi: "तमिलनाडु सरकार" },
  "Department of Higher Education": { en: "Department of Higher Education", ta: "உயர் கல்வித் துறை", hi: "उच्च शिक्षा विभाग" },
  "Ministry of Education": { en: "Ministry of Education", ta: "கல்வி அமைச்சகம்", hi: "शिक्षा मंत्रालय" },
  "Department of Agriculture and Farmers Welfare": { en: "Department of Agriculture and Farmers Welfare", ta: "வேளாண்மை மற்றும் உழவர் நலத்துறை", hi: "कृषि एवं किसान कल्याण विभाग" },
  "Ministry of Agriculture and Farmers Welfare": { en: "Ministry of Agriculture and Farmers Welfare", ta: "வேளாண்மை மற்றும் உழவர் நல அமைச்சகம்", hi: "कृषि एवं किसान कल्याण मंत्रालय" },
  "National Health Authority (NHA)": { en: "National Health Authority (NHA)", ta: "தேசிய சுகாதார ஆணையம் (NHA)", hi: "राष्ट्रीय स्वास्थ्य प्राधिकरण (एनएचए)" },
  "Ministry of Health and Family Welfare": { en: "Ministry of Health and Family Welfare", ta: "சுகாதாரம் மற்றும் குடும்ப நல அமைச்சகம்", hi: "स्वास्थ्य और परिवार कल्याण मंत्रालय" },
  "Ministry of Housing and Urban Affairs": { en: "Ministry of Housing and Urban Affairs", ta: "வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம்", hi: "आवास और शहरी मामलों के मंत्रालय" },
  "Department of Rural Development": { en: "Department of Rural Development", ta: "ஊரக வளர்ச்சித் துறை", hi: "ग्रामीण विकास विभाग" },
  "Ministry of Rural Development": { en: "Ministry of Rural Development", ta: "ஊரக வளர்ச்சி அமைச்சகம்", hi: "ग्रामीण विकास मंत्रालय" },
  "Ministry of Micro, Small and Medium Enterprises": { en: "Ministry of Micro, Small and Medium Enterprises", ta: "குறு, சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம்", hi: "सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय" },
  "Ministry of MSME": { en: "Ministry of MSME", ta: "குறு, சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம் (MSME)", hi: "एमएसएमई मंत्रालय" },
  "Tamil Nadu Skill Development Corporation (TNSDC)": { en: "Tamil Nadu Skill Development Corporation (TNSDC)", ta: "தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம் (TNSDC)", hi: "तमिलनाडु कौशल विकास निगम (टीएनएसडीसी)" },
  "Department of Financial Services": { en: "Department of Financial Services", ta: "நிதிச் சேவைகள் துறை", hi: "वित्तीय सेवा विभाग" },
  "Ministry of Finance": { en: "Ministry of Finance", ta: "நிதி அமைச்சகம்", hi: "वित्त मंत्रालय" }
};

const TARGET_GROUP_MAP: Record<string, Record<LanguageCode, string>> = {
  "College / University SC, ST, OBC Students": { en: "College / University SC, ST, OBC Students", ta: "கல்லூரி / பல்கலைக்கழக எஸ்சி, எஸ்டி, ஓபிசி மாணவர்கள்", hi: "कॉलेज / विश्वविद्यालय के एससी, एसटी, ओबीसी छात्र" },
  "Female college students from TN Government schools": { en: "Female college students from TN Government schools", ta: "தமிழக அரசுப் பள்ளிகளில் படித்த கல்லூரி மாணவிகள்", hi: "तमिलनाडु के सरकारी स्कूलों की कॉलेज छात्राएं" },
  "Meritorious College Students (All Communities)": { en: "Meritorious College Students (All Communities)", ta: "திறமையான கல்லூரி மாணவர்கள் (அனைத்து பிரிவினர்)", hi: "मेधावी कॉलेज छात्र (सभी समुदाय)" },
  "All landholding farmer families": { en: "All landholding farmer families", ta: "நிலமுள்ள அனைத்து விவசாயக் குடும்பங்கள்", hi: "सभी भूमिधारक किसान परिवार" },
  "Deprived rural & identified occupational urban households (SECC database)": { en: "Deprived rural & identified occupational urban households (SECC database)", ta: "ஏழை கிராமப்புற மற்றும் நகர்ப்புற குடும்பங்கள் (SECC)", hi: "वंचित ग्रामीण और शहरी परिवार (एसईसीसी)" },
  "Urban EWS / LIG / Middle Income households without a pucca house": { en: "Urban EWS / LIG / Middle Income households without a pucca house", ta: "கான்கிரீட் வீடு இல்லாத நகர்ப்புற குறைந்த வருமானக் குடும்பங்கள்", hi: "पक्के घर के बिना शहरी गरीब और निम्न आय वाले परिवार" },
  "Widows aged 40-79 years living Below Poverty Line (BPL)": { en: "Widows aged 40-79 years living Below Poverty Line (BPL)", ta: "வறுமைக் கோட்டிற்கு கீழ் உள்ள 40-79 வயதுடைய விதவைகள்", hi: "गरीबी रेखा से नीचे रहने वाली 40-79 वर्ष की विधवाएं" },
  "Traditional artisans and craftspeople in 18 specified trades": { en: "Traditional artisans and craftspeople in 18 specified trades", ta: "18 குறிப்பிட்ட தொழில்களில் உள்ள பாரம்பரிய கைவினைஞர்கள்", hi: "18 निर्दिष्ट व्यवसायों में पारंपरिक शिल्पकार और कारीगर" },
  "College & Polytechnic youth in Tamil Nadu": { en: "College & Polytechnic youth in Tamil Nadu", ta: "தமிழ்நாட்டு கல்லூரி மற்றும் பாலிடெக்னிக் இளைஞர்கள்", hi: "तमिलनाडु के कॉलेज और पॉलिटेक्निक युवा" },
  "Small business owners, shopkeepers, micro-manufacturers, vendors": { en: "Small business owners, shopkeepers, micro-manufacturers, vendors", ta: "சிறு வணிகர்கள், கடைக்காரர்கள் மற்றும் குறு உற்பத்தியாளர்கள்", hi: "छोटे व्यवसाय के मालिक, दुकानदार और सूक्ष्म निर्माता" }
};

const FREQUENCY_MAP: Record<string, Record<LanguageCode, string>> = {
  "Annual": { en: "Annual", ta: "ஆண்டுதோறும்", hi: "वार्षिक" },
  "Monthly": { en: "Monthly", ta: "மாதந்தோறும்", hi: "मासिक" },
  "Every 4 Months (Thrice a Year)": { en: "Every 4 Months (Thrice a Year)", ta: "4 மாதங்களுக்கு ஒருமுறை (ஆண்டுக்கு மூன்று முறை)", hi: "हर 4 महीने में (साल में तीन बार)" },
  "Annual Cover Renewal": { en: "Annual Cover Renewal", ta: "ஆண்டு காப்பீட்டு புதுப்பித்தல்", hi: "वार्षिक कवर नवीनीकरण" },
  "One-Time Capital Subsidy": { en: "One-Time Capital Subsidy", ta: "ஒரு முறை மூலதன மானியம்", hi: "एकमुश्त पूंजीगत सब्सिडी" },
  "Two Tranche Loans & One-time Grant": { en: "Two Tranche Loans & One-time Grant", ta: "இரண்டு தவணை கடன்கள் மற்றும் ஒருமுறை மானியம்", hi: "दो किस्तों में ऋण और एकमुश्त अनुदान" },
  "Per Academic Semester": { en: "Per Academic Semester", ta: "கல்விப் பருவத்திற்கு ஒருமுறை", hi: "प्रति शैक्षणिक सेमेस्टर" },
  "Term Loan / Overdraft": { en: "Term Loan / Overdraft", ta: "தவணை கடன் / மிகைப்பற்று", hi: "मियादी ऋण / ओवरड्राफ्ट" }
};

const DISBURSEMENT_TYPE_MAP: Record<string, Record<LanguageCode, string>> = {
  "Direct Cash Transfer & Fee Reimbursement": { en: "Direct Cash Transfer & Fee Reimbursement", ta: "நேரடி பணப்பரிமாற்றம் & கட்டண திருப்பிச் செலுத்துதல்", hi: "प्रत्यक्ष नकद अंतरण और शुल्क प्रतिपूर्ति" },
  "Direct Cash Transfer (Monthly)": { en: "Direct Cash Transfer (Monthly)", ta: "நேரடி பணப்பரிமாற்றம் (மாதாந்திரம்)", hi: "प्रत्यक्ष नकद अंतरण (मासिक)" },
  "Direct Cash Transfer (Annual)": { en: "Direct Cash Transfer (Annual)", ta: "நேரடி பணப்பரிமாற்றம் (ஆண்டுதோறும்)", hi: "प्रत्यक्ष नकद अंतरण (वार्षिक)" },
  "Direct Cash Transfer": { en: "Direct Cash Transfer", ta: "நேரடி பணப்பரிமாற்றம்", hi: "प्रत्यक्ष नकद अंतरण" },
  "Health Insurance / Hospital Cashless Cover": { en: "Health Insurance / Hospital Cashless Cover", ta: "மருத்துவக் காப்பீடு / கட்டணமில்லா சிகிச்சை", hi: "स्वास्थ्य बीमा / कैशलेस अस्पताल कवर" },
  "Financial Subsidy & Home Loan Interest Subvention": { en: "Financial Subsidy & Home Loan Interest Subvention", ta: "நிதி மானியம் & வீட்டுக் கடன் வட்டிச் சலுகை", hi: "वित्तीय सब्सिडी और गृह ऋण ब्याज छूट" },
  "Monthly Social Security Pension": { en: "Monthly Social Security Pension", ta: "மாதாந்திர சமூகப் பாதுகாப்பு ஓய்வூதியம்", hi: "मासिक सामाजिक सुरक्षा पेंशन" },
  "Collateral-Free Loan, Skill Training, Toolkit Grant": { en: "Collateral-Free Loan, Skill Training, Toolkit Grant", ta: "பிணையமில்லா கடன், திறன் பயிற்சி, உபகரண மானியம்", hi: "संपार्श्विक-मुक्त ऋण, कौशल प्रशिक्षण, टूलकिट अनुदान" },
  "Skill Development, Certification & Exam Stipend": { en: "Skill Development, Certification & Exam Stipend", ta: "திறன் மேம்பாடு, சான்றிதழ் & தேர்வு உதவித்தொகை", hi: "कौशल विकास, प्रमाणन और परीक्षा वजीफा" },
  "Collateral-Free Concessional Business Loan": { en: "Collateral-Free Concessional Business Loan", ta: "பிணையமில்லா சலுகை வணிகக் கடன்", hi: "संपार्श्विक-मुक्त रियायती व्यावसायिक ऋण" }
};

const CRITERIA_LABEL_MAP: Record<string, Record<LanguageCode, string>> = {
  "Must be currently studying as a Student": { en: "Must be currently studying as a Student", ta: "மாணவராகப் படித்துக்கொண்டிருக்க வேண்டும்", hi: "वर्तमान में छात्र के रूप में अध्ययनरत होना चाहिए" },
  "Annual family income must be ≤ ₹2,50,000": { en: "Annual family income must be ≤ ₹2,50,000", ta: "குடும்ப ஆண்டு வருமானம் ≤ ₹2,50,000 ஆக இருக்க வேண்டும்", hi: "वार्षिक पारिवारिक आय ≤ ₹2,50,000 होनी चाहिए" },
  "Social category must be SC, ST, or OBC": { en: "Social category must be SC, ST, or OBC", ta: "சமூகப் பிரிவு எஸ்சி, எஸ்டி அல்லது ஓபிசி ஆக இருக்க வேண்டும்", hi: "सामाजिक श्रेणी एससी, एसटी या ओबीसी होनी चाहिए" },
  "Age must be between 16 and 35 years": { en: "Age must be between 16 and 35 years", ta: "வயது 16 முதல் 35 வரை இருக்க வேண்டும்", hi: "आयु 16 से 35 वर्ष के बीच होनी चाहिए" },
  "Must be female": { en: "Must be female", ta: "பெண்ணாக இருக்க வேண்டும்", hi: "महिला होना अनिवार्य है" },
  "Must be a resident of Tamil Nadu": { en: "Must be a resident of Tamil Nadu", ta: "தமிழ்நாட்டில் வசிப்பவராக இருக்க வேண்டும்", hi: "तमिलनाडु का निवासी होना चाहिए" },
  "Annual family income must be ≤ ₹4,50,000": { en: "Annual family income must be ≤ ₹4,50,000", ta: "குடும்ப ஆண்டு வருமானம் ≤ ₹4,50,000 ஆக இருக்க வேண்டும்", hi: "वार्षिक पारिवारिक आय ≤ ₹4,50,000 होनी चाहिए" },
  "Must be an active Farmer": { en: "Must be an active Farmer", ta: "விவசாயியாக இருக்க வேண்டும்", hi: "सक्रिय किसान होना चाहिए" },
  "Age must be at least 18 years": { en: "Age must be at least 18 years", ta: "குறைந்தபட்சம் 18 வயது நிரம்பியிருக்க வேண்டும்", hi: "आयु कम से कम 18 वर्ष होनी चाहिए" },
  "Must reside in an Urban area": { en: "Must reside in an Urban area", ta: "நகர்ப்புற பகுதியில் வசிப்பவராக இருக்க வேண்டும்", hi: "शहरी क्षेत्र का निवासी होना चाहिए" },
  "Annual family income must be ≤ ₹6,00,000": { en: "Annual family income must be ≤ ₹6,00,000", ta: "குடும்ப ஆண்டு வருமானம் ≤ ₹6,00,000 ஆக இருக்க வேண்டும்", hi: "वार्षिक पारिवारिक आय ≤ ₹6,00,000 होनी चाहिए" },
  "Marital status must be Widow": { en: "Marital status must be Widow", ta: "திருமண நிலை விதவையாக இருக்க வேண்டும்", hi: "वैवाहिक स्थिति विधवा होनी चाहिए" },
  "Age must be ≥ 40 years": { en: "Age must be ≥ 40 years", ta: "வயது ≥ 40 ஆக இருக்க வேண்டும்", hi: "आयु ≥ 40 वर्ष होनी चाहिए" },
  "Annual income must be ≤ ₹1,00,000 (BPL)": { en: "Annual income must be ≤ ₹1,00,000 (BPL)", ta: "ஆண்டு வருமானம் ≤ ₹1,00,000 (வறுமைக் கோட்டிற்கு கீழ்) இருக்க வேண்டும்", hi: "वार्षिक आय ≤ ₹1,00,000 (बीपीएल) होनी चाहिए" },
  "Must reside or study in Tamil Nadu": { en: "Must reside or study in Tamil Nadu", ta: "தமிழ்நாட்டில் வசிப்பவராக அல்லது படிப்பவராக இருக்க வேண்டும்", hi: "तमिलनाडु में निवास या अध्ययन होना चाहिए" },
  "Must be a Student or Unemployed youth": { en: "Must be a Student or Unemployed youth", ta: "மாணவர் அல்லது வேலையற்ற இளைஞராக இருக்க வேண்டும்", hi: "छात्र या बेरोजगार युवा होना चाहिए" }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: UIStrings;
  translateCategory: (category: string) => string;
  translateState: (state: string) => string;
  translateOccupation: (occupation?: string) => string;
  translateStatus: (status: string) => string;
  translateSchemeName: (schemeId: string, defaultName: string) => string;
  translateSchemeShortName: (schemeId: string, defaultShortName?: string) => string;
  translateSchemeDescription: (schemeId: string, defaultDesc: string) => string;
  translateSchemeBenefits: (schemeId: string, defaultBenefits: string) => string;
  translateDocName: (docName: string) => string;
  translateMinistry: (ministry: string) => string;
  translateDepartment: (department: string) => string;
  translateTargetGroup: (targetGroup: string) => string;
  translateFrequency: (freq: string) => string;
  translateDisbursementType: (bType: string) => string;
  translateCriterionLabel: (label: string) => string;
  translateRankingReason: (reason?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('selectedLanguage') || localStorage.getItem('lang');
    if (saved === 'ta' || saved === 'hi' || saved === 'en') {
      return saved as LanguageCode;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('selectedLanguage', lang);
    localStorage.setItem('lang', lang);
  };

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
    localStorage.setItem('lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const translateCategory = (cat: string): string => {
    if (!cat) return '';
    return CATEGORY_MAP[cat]?.[language] || cat;
  };

  const translateState = (st: string): string => {
    if (!st) return '';
    return STATE_MAP[st]?.[language] || st;
  };

  const translateOccupation = (occ?: string): string => {
    if (!occ) return OCCUPATION_MAP["Citizen"]?.[language] || "Citizen";
    return OCCUPATION_MAP[occ]?.[language] || occ;
  };

  const translateStatus = (stat: string): string => {
    if (!stat) return '';
    return STATUS_MAP[stat.toUpperCase()]?.[language] || STATUS_MAP[stat]?.[language] || stat;
  };

  const resolveSchemeKey = (schemeId: string, defaultName?: string): string | null => {
    if (!schemeId && !defaultName) return null;
    const lowerId = (schemeId || '').toLowerCase();
    const lowerName = (defaultName || '').toLowerCase();

    if (lowerId.includes('postmatric') || lowerName.includes('post-matric')) return 'SCHEME-NSP-POSTMATRIC-001';
    if (lowerId.includes('pudhumai') || lowerName.includes('pudhumai') || lowerName.includes('moovalur')) return 'SCHEME-TN-PUDHUMAI-PENN-002';
    if (lowerId.includes('college-scholarship') || lowerId.includes('pm-usp') || lowerName.includes('pm-usp') || lowerName.includes('central sector')) return 'SCHEME-CSS-COLLEGE-SCHOLARSHIP-003';
    if (lowerId.includes('pmkisan') || lowerName.includes('kisan samman')) return 'SCHEME-AGRI-PMKISAN-004';
    if (lowerId.includes('pmjay') || lowerName.includes('ayushman bharat')) return 'SCHEME-HEALTH-PMJAY-005';
    if (lowerId.includes('pmay') || lowerName.includes('awas yojana')) return 'SCHEME-HOUSING-PMAY-U-006';
    if (lowerId.includes('ignwps') || lowerName.includes('widow pension')) return 'SCHEME-WOMEN-IGNWPS-007';
    if (lowerId.includes('vishwakarma') || lowerName.includes('vishwakarma')) return 'SCHEME-MSME-VISHWAKARMA-008';
    if (lowerId.includes('mudhalvan') || lowerName.includes('mudhalvan')) return 'SCHEME-TN-NAAN-MUDHALVAN-009';
    if (lowerId.includes('mudra') || lowerName.includes('mudra yojana')) return 'SCHEME-MSME-MUDRA-010';

    return schemeId;
  };

  const translateSchemeName = (schemeId: string, defaultName: string): string => {
    if (language === 'en') return defaultName;
    const key = resolveSchemeKey(schemeId, defaultName);
    if (key && SCHEME_NAME_MAP[key]?.[language]) {
      return SCHEME_NAME_MAP[key][language];
    }
    return defaultName;
  };

  const translateSchemeShortName = (schemeId: string, defaultShortName?: string): string => {
    if (!defaultShortName) return '';
    if (language === 'en') return defaultShortName;
    const key = resolveSchemeKey(schemeId, defaultShortName);
    if (key && SCHEME_SHORTNAME_MAP[key]?.[language]) {
      return SCHEME_SHORTNAME_MAP[key][language];
    }
    return defaultShortName;
  };

  const translateSchemeDescription = (schemeId: string, defaultDesc: string): string => {
    if (language === 'en') return defaultDesc;
    const key = resolveSchemeKey(schemeId, defaultDesc);
    if (key && SCHEME_DESC_MAP[key]?.[language]) {
      return SCHEME_DESC_MAP[key][language];
    }
    return defaultDesc;
  };

  const translateSchemeBenefits = (schemeId: string, defaultBenefits: string): string => {
    if (language === 'en') return defaultBenefits;
    const key = resolveSchemeKey(schemeId, defaultBenefits);
    if (key && SCHEME_BENEFITS_MAP[key]?.[language]) {
      return SCHEME_BENEFITS_MAP[key][language];
    }
    return defaultBenefits;
  };

  const translateDocName = (docName: string): string => {
    if (!docName) return '';
    if (language === 'en') return docName;
    return DOC_NAME_MAP[docName]?.[language] || docName;
  };

  const translateMinistry = (min: string): string => {
    if (!min) return '';
    if (language === 'en') return min;
    return MINISTRY_DEPT_MAP[min]?.[language] || min;
  };

  const translateDepartment = (dept: string): string => {
    if (!dept) return '';
    if (language === 'en') return dept;
    return MINISTRY_DEPT_MAP[dept]?.[language] || dept;
  };

  const translateTargetGroup = (tg: string): string => {
    if (!tg) return '';
    if (language === 'en') return tg;
    return TARGET_GROUP_MAP[tg]?.[language] || tg;
  };

  const translateFrequency = (freq: string): string => {
    if (!freq) return '';
    if (language === 'en') return freq;
    return FREQUENCY_MAP[freq]?.[language] || freq;
  };

  const translateDisbursementType = (bType: string): string => {
    if (!bType) return '';
    if (language === 'en') return bType;
    return DISBURSEMENT_TYPE_MAP[bType]?.[language] || bType;
  };

  const translateCriterionLabel = (label: string): string => {
    if (!label) return '';
    if (language === 'en') return label;
    return CRITERIA_LABEL_MAP[label]?.[language] || label;
  };

  const translateRankingReason = (reason?: string): string => {
    if (!reason) return '';
    if (reason.toLowerCase().includes('matches your education') || reason.toLowerCase().includes('income range')) {
      return DICTIONARY[language].rankingReasonDefault;
    }
    return reason;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: DICTIONARY[language] || DICTIONARY.en,
    translateCategory,
    translateState,
    translateOccupation,
    translateStatus,
    translateSchemeName,
    translateSchemeShortName,
    translateSchemeDescription,
    translateSchemeBenefits,
    translateDocName,
    translateMinistry,
    translateDepartment,
    translateTargetGroup,
    translateFrequency,
    translateDisbursementType,
    translateCriterionLabel,
    translateRankingReason
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
