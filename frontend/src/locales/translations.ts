export type LanguageCode = 'en' | 'ta' | 'hi';

export interface UIStrings {
  // Brand & Header
  appName: string;
  appTagline: string;
  govEcosystem: string;
  
  // Navigation
  navHome: string;
  navExplorer: string;
  navAssistant: string;
  navDashboard: string;
  navDocuments: string;
  navApplications: string;
  navBenefitGap: string;
  navAdmin: string;
  navSaved: string;
  navCompare: string;
  navSupport: string;
  navProfile: string;
  loginBtn: string;
  logoutBtn: string;
  registerBtn: string;
  simpleModeBtn: string;
  speakBtn: string;
  searchPlaceholder: string;

  // Language Names
  selectLanguageLabel: string;
  languageEnglish: string;
  languageTamil: string;
  languageHindi: string;

  // Auth (Login & Register)
  loginHeading: string;
  loginSubheading: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  forgotPasswordNotice: string;
  demoCredentialsTitle: string;
  demoCitizenBtn: string;
  demoAdminBtn: string;
  demoCitizenDesc: string;
  noAccountText: string;
  alreadyAccountText: string;
  registerTitle: string;
  registerSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  loginAction: string;
  registerAction: string;
  loginFailed: string;
  registerFailed: string;

  // Dashboard
  vanakkam: string;
  citizen: string;
  profileOverview: string;
  profileCompletion: string;
  completeProfileMsg: string;
  updateProfileBtn: string;
  recommendedSchemesTitle: string;
  recommendedSchemesSubtitle: string;
  exploreAllSchemes: string;
  activeApplicationsTitle: string;
  activeApplicationsSubtitle: string;
  noApplicationsYet: string;
  documentStatusTitle: string;
  documentStatusSubtitle: string;
  manageDocsBtn: string;
  benefitGapBannerTitle: string;
  benefitGapBannerDesc: string;
  viewBenefitGapBtn: string;
  recentNotifications: string;
  noNotifications: string;

  // Scheme Explorer & Cards
  explorerHeading: string;
  explorerSubheading: string;
  filterByCategory: string;
  filterByState: string;
  filterByOccupation: string;
  filterByIncome: string;
  filterByGender: string;
  allCategories: string;
  allStates: string;
  allOccupations: string;
  allGenders: string;
  clearFiltersBtn: string;
  schemesFound: string;
  noSchemesMatch: string;
  noSchemesAdvice: string;
  viewDetails: string;
  helpMeApply: string;
  matchScore: string;
  readiness: string;
  ready: string;
  openYearRound: string;
  verifiedData: string;
  demoData: string;
  whyRanks: string;
  keyBenefit: string;

  // Eligibility Badges
  likelyEligible: string;
  potentiallyEligible: string;
  likelyNotEligible: string;
  insufficientInfo: string;

  // Document Center
  docCenterTitle: string;
  docCenterSubtitle: string;
  uploadCertificate: string;
  selectDocType: string;
  chooseFile: string;
  uploadBtn: string;
  uploading: string;
  uploadSuccess: string;
  myUploadedDocs: string;
  noDocsYet: string;
  assessReadinessFor: string;
  overallReadiness: string;
  requiredDocs: string;
  available: string;
  missing: string;
  howToObtain: string;
  issuingAuthority: string;
  whereToApply: string;
  turnaroundTime: string;
  close: string;

  // Applications
  appTrackingTitle: string;
  appTrackingSubtitle: string;
  addAppBtn: string;
  demoTrackingBanner: string;
  applicationNo: string;
  submittedOn: string;
  currentStatus: string;
  openPortal: string;
  statusSubmitted: string;
  statusVerified: string;
  statusInReview: string;
  statusSanctioned: string;

  // AI Assistant
  assistantHeading: string;
  assistantGreeting: string;
  typeMessage: string;
  send: string;
  speakAloud: string;
  speaking: string;
  explainAIReasoning: string;
  preAppPacketTitle: string;
  itemsToKeepReady: string;
  stepByStepFlow: string;
  portalFieldExplainer: string;
  clickToExplain: string;
  postSubmissionChecklist: string;
  proceedToOfficialPortal: string;
  trackManuallyDashboard: string;

  // Profile
  profileHeading: string;
  profileSubheading: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  occupation: string;
  education: string;
  annualIncome: string;
  socialCategory: string;
  maritalStatus: string;
  residenceType: string;
  disabilityStatus: string;
  saveProfile: string;
  saving: string;
  profileSaved: string;

  // Benefit Gap
  benefitGapHeading: string;
  benefitGapSubheading: string;
  complimentaryCategories: string;
  discoveredBenefits: string;
  whyYouQualify: string;
  applyNow: string;

  // Simple Mode
  simpleListen: string;
  exitSimpleMode: string;
  simpleCategoryEdu: string;
  simpleCategoryAgri: string;
  simpleCategoryHealth: string;
  simpleCategoryHousing: string;
  simpleCategoryJobs: string;
  simpleCategoryPension: string;

  // Footer
  footerAbout: string;
  officialEcosystem: string;
  ecosystemSubtitle: string;
  quickLinks: string;
  disclaimerTitle: string;
  disclaimerText: string;
  copyright: string;
  adminControlCenter: string;
  demoDisclaimer: string;
}

export const TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    appName: "Citizen Benefit Intelligence",
    appTagline: "From Scheme Search to Benefit Access — Multi-Agent AI Platform",
    govEcosystem: "AI-Powered Ecosystem Layer for Indian Welfare",
    navHome: "Home",
    navExplorer: "Scheme Explorer",
    navAssistant: "AI Assistant",
    navDashboard: "My Benefits",
    navDocuments: "Document Center",
    navApplications: "Applications",
    navBenefitGap: "Benefit Gap",
    navAdmin: "Admin Center",
    navSaved: "Saved Schemes",
    navCompare: "Compare Schemes",
    navSupport: "Support & Grievances",
    navProfile: "Profile Settings",
    loginBtn: "Sign In",
    logoutBtn: "Sign Out",
    registerBtn: "Create Account",
    simpleModeBtn: "Simple Mode",
    speakBtn: "Voice Assistant",
    searchPlaceholder: "Ask anything (e.g. 'Scholarship for college student in Tamil Nadu')...",

    selectLanguageLabel: "Language",
    languageEnglish: "English",
    languageTamil: "தமிழ் (Tamil)",
    languageHindi: "हिन्दी (Hindi)",

    loginHeading: "Sign In to Citizen Benefit Intelligence",
    loginSubheading: "Access your personalized government benefits, document intelligence, and status tracking.",
    emailLabel: "Email Address or Mobile Number",
    emailPlaceholder: "citizen@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    forgotPassword: "Forgot password?",
    forgotPasswordNotice: "Password recovery instructions will be sent to your registered email or mobile number.",
    demoCredentialsTitle: "Demo Evaluation Credentials:",
    demoCitizenBtn: "Demo Citizen",
    demoAdminBtn: "Demo Admin",
    demoCitizenDesc: "Student Profile, Tamil Nadu, Family Income ₹2,00,000",
    noAccountText: "Don't have an account?",
    alreadyAccountText: "Already have an account?",
    registerTitle: "Create Citizen Account",
    registerSubtitle: "Set up your verified profile to discover all eligible government entitlements.",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    phoneLabel: "Mobile Number (Optional)",
    phonePlaceholder: "9876543210",
    loginAction: "Sign In to Account",
    registerAction: "Create Citizen Profile",
    loginFailed: "Invalid email or password. Please verify your credentials.",
    registerFailed: "Registration failed. An account with this email may already exist.",

    vanakkam: "Welcome",
    citizen: "Citizen",
    profileOverview: "Profile Overview",
    profileCompletion: "Profile Completion",
    completeProfileMsg: "Complete your profile to unlock more targeted welfare schemes.",
    updateProfileBtn: "Update Profile",
    recommendedSchemesTitle: "Top Recommended Schemes for You",
    recommendedSchemesSubtitle: "Ranked by deterministic rules & profile compatibility",
    exploreAllSchemes: "Explore All Schemes",
    activeApplicationsTitle: "Active Applications",
    activeApplicationsSubtitle: "Real-time demo tracking for submitted benefits",
    noApplicationsYet: "No applications tracked yet. Click on any scheme to start application tracking.",
    documentStatusTitle: "Document Intelligence & Readiness",
    documentStatusSubtitle: "Verified certificates and gap analysis",
    manageDocsBtn: "Open Document Center",
    benefitGapBannerTitle: "Complementary Benefits Discovered!",
    benefitGapBannerDesc: "Based on your socio-economic profile, you qualify for unasked bundled entitlements.",
    viewBenefitGapBtn: "View Benefit Gap",
    recentNotifications: "Recent Notifications",
    noNotifications: "No unread notifications at this time.",

    explorerHeading: "Government Welfare Scheme Explorer",
    explorerSubheading: "Explore verified central and state welfare benefits with explainable eligibility.",
    filterByCategory: "Filter by Category",
    filterByState: "Filter by State",
    filterByOccupation: "Occupation",
    filterByIncome: "Max Annual Income (₹)",
    filterByGender: "Gender",
    allCategories: "All Categories",
    allStates: "All India",
    allOccupations: "All Occupations",
    allGenders: "All",
    clearFiltersBtn: "Clear All Filters",
    schemesFound: "Schemes Found",
    noSchemesMatch: "No schemes match your filter criteria.",
    noSchemesAdvice: "Try adjusting your filters or search keywords.",
    viewDetails: "View Details",
    helpMeApply: "Help Me Apply",
    matchScore: "Profile Match",
    readiness: "Document Readiness",
    ready: "Ready",
    openYearRound: "Open Year-Round",
    verifiedData: "Verified Data",
    demoData: "Demo Data",
    whyRanks: "Why this ranks:",
    keyBenefit: "Key Benefit:",

    likelyEligible: "Likely Eligible",
    potentiallyEligible: "Potentially Eligible",
    likelyNotEligible: "Likely Not Eligible",
    insufficientInfo: "Need Information",

    docCenterTitle: "Document Intelligence Center",
    docCenterSubtitle: "Automated certificate assessment, OCR extraction, and gap resolution",
    uploadCertificate: "Upload & Verify Certificate",
    selectDocType: "Select Document Type",
    chooseFile: "Choose Document File (PDF / JPG / PNG)",
    uploadBtn: "Upload & Run Verification",
    uploading: "Uploading & Analyzing Document...",
    uploadSuccess: "Document successfully verified and added to your profile!",
    myUploadedDocs: "Your Uploaded & Verified Certificates",
    noDocsYet: "No documents uploaded yet. Upload your certificates to auto-verify eligibility.",
    assessReadinessFor: "Assess Document Readiness For Scheme:",
    overallReadiness: "Overall Readiness Score",
    requiredDocs: "Required Documents",
    available: "Available",
    missing: "Missing",
    howToObtain: "How to obtain this certificate",
    issuingAuthority: "Issuing Authority:",
    whereToApply: "Where to Apply:",
    turnaroundTime: "Expected Turnaround Time:",
    close: "Close",

    appTrackingTitle: "Application Tracking Center",
    appTrackingSubtitle: "Track progress and status milestones for your submitted government benefits.",
    addAppBtn: "Add Application to Track",
    demoTrackingBanner: "Manual Demo Tracking Active: Use this dashboard to record and monitor real application milestones.",
    applicationNo: "Application No:",
    submittedOn: "Submitted On:",
    currentStatus: "Current Status:",
    openPortal: "Official Portal",
    statusSubmitted: "Submitted",
    statusVerified: "Institute Verified",
    statusInReview: "Department Scrutiny",
    statusSanctioned: "Sanctioned & DBT Transferred",

    assistantHeading: "AI Citizen Benefit Assistant",
    assistantGreeting: "Hello! I am your AI Citizen Benefit Assistant. How can I help you find and apply for welfare schemes today?",
    typeMessage: "Type your request in English, தமிழ், or हिन्दी...",
    send: "Send",
    speakAloud: "Speak Aloud",
    speaking: "Speaking...",
    explainAIReasoning: "Explain AI Reasoning",
    preAppPacketTitle: "Pre-Application Guidance Packet",
    itemsToKeepReady: "Items to Keep Ready Before Starting:",
    stepByStepFlow: "Step-by-Step Official Application Flow:",
    portalFieldExplainer: "Portal Form Field Explainer:",
    clickToExplain: "Click a term to explain",
    postSubmissionChecklist: "Post-Submission Checklist:",
    proceedToOfficialPortal: "Proceed to Official Government Portal",
    trackManuallyDashboard: "Track Manually on Dashboard",

    profileHeading: "Citizen Profile Intelligence",
    profileSubheading: "One unified profile evaluated deterministically to match verified government benefits.",
    age: "Age",
    gender: "Gender",
    state: "State",
    district: "District",
    occupation: "Occupation",
    education: "Education Qualification",
    annualIncome: "Annual Family Income (₹)",
    socialCategory: "Social Category",
    maritalStatus: "Marital Status",
    residenceType: "Residence Area",
    disabilityStatus: "Person with Disability (PwD)",
    saveProfile: "Save Profile Details",
    saving: "Saving Profile...",
    profileSaved: "Profile successfully updated!",

    benefitGapHeading: "Benefit Gap Analyzer",
    benefitGapSubheading: "Identify bundled complementary benefits you are legally entitled to receive.",
    complimentaryCategories: "Complementary Welfare Categories Matching Your Profile:",
    discoveredBenefits: "Discovered Complementary Benefits",
    whyYouQualify: "Why you qualify:",
    applyNow: "Apply Now",

    simpleListen: "Voice Guidance (Listen)",
    exitSimpleMode: "Exit Simple Mode",
    simpleCategoryEdu: "Education & Scholarships",
    simpleCategoryAgri: "Agriculture & Farmers",
    simpleCategoryHealth: "Health & Hospital Coverage",
    simpleCategoryHousing: "Housing & PM Awas",
    simpleCategoryJobs: "Jobs & MSME Loans",
    simpleCategoryPension: "Senior & Widow Pension",

    footerAbout: "Multi-Agent AI system providing explainable eligibility, document intelligence, and multilingual voice assistance for Indian citizens.",
    officialEcosystem: "Official Indian Ecosystem",
    ecosystemSubtitle: "Designed as an intelligent assistance layer above official portals:",
    quickLinks: "Quick Links",
    disclaimerTitle: "Important Advisory Disclaimer",
    disclaimerText: "Non-Government Entity Notice: This platform acts as an advisory search, rule evaluation, and application navigation assistant. It does not issue official approvals or collect fees.",
    copyright: "© 2026 Citizen Benefit Intelligence. All rights reserved.",
    adminControlCenter: "Admin Control Center",
    demoDisclaimer: "Operates as an intelligence layer above official Indian digital platforms (myScheme, UMANG, DigiLocker)."
  },

  ta: {
    appName: "குடிமக்கள் நலத்திட்ட நுண்ணறிவு தளம்",
    appTagline: "திட்டத் தேடலில் இருந்து நேரடி நலன் பெறுதல் வரை — பல-முகவர் AI தளம்",
    govEcosystem: "இந்திய அரசு நலத்திட்டங்களுக்கான அறிவார்ந்த அடுக்கு",
    navHome: "முகப்பு",
    navExplorer: "திட்டங்கள் உலாவி",
    navAssistant: "AI உதவியாளர்",
    navDashboard: "என் நலத்திட்டங்கள்",
    navDocuments: "ஆவண மையம்",
    navApplications: "விண்ணப்பங்கள்",
    navBenefitGap: "விடுபட்ட பலன்கள்",
    navAdmin: "நிர்வாக மையம்",
    navSaved: "சேமிக்கப்பட்டவை",
    navCompare: "ஒப்பிடுக",
    navSupport: "உதவி மையம்",
    navProfile: "சுயவிவரம்",
    loginBtn: "உள்நுழைக",
    logoutBtn: "வெளியேறுக",
    registerBtn: "புதிய கணக்கு",
    simpleModeBtn: "எளிய முறை",
    speakBtn: "குரல் உதவியாளர்",
    searchPlaceholder: "எதையும் கேளுங்கள் (எ.கா. 'கல்லூரி மாணவர்களுக்கான கல்வி உதவித்தொகை')...",

    selectLanguageLabel: "மொழி",
    languageEnglish: "English",
    languageTamil: "தமிழ் (Tamil)",
    languageHindi: "हिन्दी (Hindi)",

    loginHeading: "குடிமக்கள் நலத்திட்ட தளத்தில் உள்நுழைக",
    loginSubheading: "உங்கள் தகுதிக்கேற்ற அரசு நலத்திட்டங்கள், ஆவண சரிபார்ப்பு மற்றும் விண்ணப்ப நிலையை அணுகவும்.",
    emailLabel: "மின்னஞ்சல் முகவரி அல்லது கைபேசி எண்",
    emailPlaceholder: "citizen@example.com",
    passwordLabel: "கடவுச்சொல்",
    passwordPlaceholder: "••••••••",
    forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    forgotPasswordNotice: "கடவுச்சொல் மீட்பு வழிமுறைகள் உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சல் அல்லது கைபேசிக்கு அனுப்பப்படும்.",
    demoCredentialsTitle: "மாதிரி மதிப்பீட்டு சான்றுகள்:",
    demoCitizenBtn: "மாதிரி குடிமகன்",
    demoAdminBtn: "மாதிரி நிர்வாகி",
    demoCitizenDesc: "மாணவர் சுயவிவரம், தமிழ்நாடு, குடும்ப வருமானம் ₹2,00,000",
    noAccountText: "கணக்கு இல்லையா?",
    alreadyAccountText: "ஏற்கனவே கணக்கு உள்ளதா?",
    registerTitle: "குடிமகன் கணக்கை உருவாக்குக",
    registerSubtitle: "அனைத்து அரசு நலன்களையும் கண்டறிய உங்கள் சரிபார்க்கப்பட்ட சுயவிவரத்தை அமைக்கவும்.",
    fullNameLabel: "முழுப் பெயர்",
    fullNamePlaceholder: "உங்கள் முழுப் பெயரை உள்ளிடவும்",
    phoneLabel: "கைபேசி எண் (விருப்பத்தேர்வு)",
    phonePlaceholder: "9876543210",
    loginAction: "கணக்கில் உள்நுழைக",
    registerAction: "குடிமகன் சுயவிவரத்தை உருவாக்குக",
    loginFailed: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். உங்கள் விவரங்களை சரிபார்க்கவும்.",
    registerFailed: "பதிவு தோல்வியடைந்தது. இந்த மின்னஞ்சலில் ஏற்கனவே கணக்கு இருக்கலாம்.",

    vanakkam: "வணக்கம்",
    citizen: "குடிமகன்",
    profileOverview: "சுயவிவர சுருக்கம்",
    profileCompletion: "சுயவிவர பூர்த்தி நிலை",
    completeProfileMsg: "கூடுதல் பொருத்தமான திட்டங்களை திறக்க உங்கள் சுயவிவரத்தை முழுமையாக்குங்கள்.",
    updateProfileBtn: "சுயவிவரத்தை புதுப்பிக்க",
    recommendedSchemesTitle: "உங்களுக்காக பரிந்துரைக்கப்பட்ட முக்கிய திட்டங்கள்",
    recommendedSchemesSubtitle: "விதிமுறை மற்றும் சுயவிவர பொருத்தத்தின் அடிப்படையில் வரிசைப்படுத்தப்பட்டது",
    exploreAllSchemes: "அனைத்து திட்டங்களையும் காண்க",
    activeApplicationsTitle: "செயலில் உள்ள விண்ணப்பங்கள்",
    activeApplicationsSubtitle: "சமர்ப்பிக்கப்பட்ட திட்டங்களுக்கான நேரடி கண்காணிப்பு",
    noApplicationsYet: "விண்ணப்பங்கள் எதுவும் இன்னும் கண்காணிக்கப்படவில்லை. கண்காணிப்பைத் தொடங்க ஏதேனும் ஒரு திட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    documentStatusTitle: "ஆவண நுண்ணறிவு மற்றும் தயார்நிலை",
    documentStatusSubtitle: "சரிபார்க்கப்பட்ட சான்றிதழ்கள் மற்றும் பகுப்பாய்வு",
    manageDocsBtn: "ஆவண மையத்தைத் திறக்க",
    benefitGapBannerTitle: "கூடுதல் நலத்திட்டங்கள் கண்டறியப்பட்டுள்ளன!",
    benefitGapBannerDesc: "உங்கள் சமூக-பொருளாதார சுயவிவரத்தின் அடிப்படையில் கூடுதல் நலத்திட்டங்களுக்கும் நீங்கள் தகுதி பெறுகிறீர்கள்.",
    viewBenefitGapBtn: "விடுபட்ட பலன்களைக் காண்க",
    recentNotifications: "சமீபத்திய அறிவிப்புகள்",
    noNotifications: "தற்போது புதிய அறிவிப்புகள் எதுவும் இல்லை.",

    explorerHeading: "அரசு நலத்திட்டங்கள் உலாவி",
    explorerSubheading: "சரிபார்க்கப்பட்ட மத்திய மற்றும் மாநில அரசு நலத்திட்டங்களை தகுதி விளக்கத்துடன் கண்டறியுங்கள்.",
    filterByCategory: "வகை வாரியாக வடிகட்டுக",
    filterByState: "மாநில வாரியாக வடிகட்டுக",
    filterByOccupation: "தொழில்",
    filterByIncome: "அதிகபட்ச ஆண்டு வருமானம் (₹)",
    filterByGender: "பாலினம்",
    allCategories: "அனைத்து பிரிவுகளும்",
    allStates: "அனைத்து இந்தியா",
    allOccupations: "அனைத்து தொழில்களும்",
    allGenders: "அனைத்தும்",
    clearFiltersBtn: "அனைத்து வடிகட்டிகளையும் நீக்குக",
    schemesFound: "திட்டங்கள் கண்டறியப்பட்டன",
    noSchemesMatch: "உங்கள் தேடலுக்கு ஏற்ற திட்டங்கள் எதுவும் கிடைக்கவில்லை.",
    noSchemesAdvice: "வடிகட்டிகளை மாற்றி மீண்டும் முயற்சிக்கவும்.",
    viewDetails: "முழு விவரங்கள்",
    helpMeApply: "விண்ணப்பிக்க வழிகாட்டுக",
    matchScore: "சுயவிவரப் பொருத்தம்",
    readiness: "ஆவண தயார்நிலை",
    ready: "தயார்",
    openYearRound: "ஆண்டு முழுவதும் விண்ணப்பிக்கலாம்",
    verifiedData: "சரிபார்க்கப்பட்ட தகவல்",
    demoData: "மாதிரி தகவல்",
    whyRanks: "இது ஏன் பொருந்துகிறது:",
    keyBenefit: "முக்கிய பயன்:",

    likelyEligible: "தகுதி பெற அதிக வாய்ப்புள்ளது",
    potentiallyEligible: "சாத்தியமான தகுதி",
    likelyNotEligible: "தகுதி பெற வாய்ப்பில்லை",
    insufficientInfo: "கூடுதல் தகவல் தேவை",

    docCenterTitle: "ஆவணப் பாதுகாப்பு மற்றும் சரிபார்ப்பு மையம்",
    docCenterSubtitle: "சான்றிதழ் சரிபார்ப்பு, தானியங்கி தரவு பிரித்தெடுத்தல் மற்றும் வழிகாட்டுதல்",
    uploadCertificate: "சான்றிதழைப் பதிவேற்றி சரிபார்க்க",
    selectDocType: "ஆவண வகையைத் தேர்ந்தெடுக்கவும்",
    chooseFile: "ஆவணக் கோப்பைத் தேர்ந்தெடுக்கவும் (PDF / JPG / PNG)",
    uploadBtn: "பதிவேற்றி சரிபார்க்கவும்",
    uploading: "ஆவணம் பதிவேற்றப்பட்டு பகுப்பாய்வு செய்யப்படுகிறது...",
    uploadSuccess: "ஆவணம் வெற்றிகரமாக சரிபார்க்கப்பட்டு சுயவிவரத்தில் சேர்க்கப்பட்டது!",
    myUploadedDocs: "உங்கள் சரிபார்க்கப்பட்ட ஆவணங்கள்",
    noDocsYet: "ஆவணங்கள் எதுவும் இதுவரை பதிவேற்றப்படவில்லை. தகுதியை சரிபார்க்க உங்கள் சான்றிதழ்களைப் பதிவேற்றவும்.",
    assessReadinessFor: "திட்டத்திற்கான ஆவண தயார்நிலையை மதிப்பிடுக:",
    overallReadiness: "ஒட்டுமொத்த தயார்நிலை மதிப்பீடு",
    requiredDocs: "தேவைப்படும் ஆவணங்கள்",
    available: "உள்ளது",
    missing: "இல்லை / தேவை",
    howToObtain: "இந்த சான்றிதழை எவ்வாறு பெறுவது",
    issuingAuthority: "வழங்கும் அதிகாரம்:",
    whereToApply: "எங்கு விண்ணப்பிக்க வேண்டும்:",
    turnaroundTime: "எதிர்பார்க்கப்படும் கால அளவு:",
    close: "மூடுக",

    appTrackingTitle: "விண்ணப்பங்கள் கண்காணிப்பு மையம்",
    appTrackingSubtitle: "சமர்ப்பிக்கப்பட்ட அரசு நலத்திட்டங்களின் முன்னேற்றத்தை எளிதாகக் கண்காணியுங்கள்.",
    addAppBtn: "புதிய விண்ணப்பத்தை இணைக்க",
    demoTrackingBanner: "நேரடி மாதிரி கண்காணிப்பு செயலில் உள்ளது: உங்கள் விண்ணப்ப நிலையை பதிவு செய்து கண்காணிக்க இதைப் பயன்படுத்தவும்.",
    applicationNo: "விண்ணப்ப எண்:",
    submittedOn: "சமர்ப்பிக்கப்பட்ட தேதி:",
    currentStatus: "தற்போதைய நிலை:",
    openPortal: "அதிகாரப்பூர்வ தளம்",
    statusSubmitted: "சமர்ப்பிக்கப்பட்டது",
    statusVerified: "நிறுவனம் சரிபார்த்தது",
    statusInReview: "துறை ஆய்வு",
    statusSanctioned: "ஒப்புதல் அளிக்கப்பட்டு நிதி மாற்றப்பட்டது",

    assistantHeading: "AI குடிமக்கள் நலத்திட்ட உதவியாளர்",
    assistantGreeting: "வணக்கம்! நான் உங்கள் அரசு நலத்திட்ட AI உதவியாளர். உங்களுக்கு பொருத்தமான அரசு உதவிகளையும் கல்வி உதவித்தொகைகளையும் கண்டறிய நான் எவ்வாறு உதவட்டும்?",
    typeMessage: "உங்கள் கேள்வியை தமிழில், ஆங்கிலத்தில் அல்லது இந்தியில் எழுதவும்...",
    send: "அனுப்புக",
    speakAloud: "கேட்க",
    speaking: "ஒலிக்கிறது...",
    explainAIReasoning: "AI காரணங்களை விளக்குக",
    preAppPacketTitle: "விண்ணப்ப முந்தைய வழிகாட்டல் தொகுப்பு",
    itemsToKeepReady: "தொடங்குவதற்கு முன் தயாராக வைத்திருக்க வேண்டியவை:",
    stepByStepFlow: "படி-படியான அதிகாரப்பூர்வ விண்ணப்ப முறை:",
    portalFieldExplainer: "விண்ணப்ப படிவ சொற்கள் விளக்கம்:",
    clickToExplain: "விளக்கத்தைக் காண சொடுக்கவும்",
    postSubmissionChecklist: "சமர்ப்பித்த பின் செய்ய வேண்டியவை:",
    proceedToOfficialPortal: "அதிகாரப்பூர்வ அரசு தளத்திற்கு செல்க",
    trackManuallyDashboard: "கண்காணிப்பு பலகையில் பதிவு செய்க",

    profileHeading: "குடிமகன் சுயவிவர மேலாண்மை",
    profileSubheading: "அரசுத் திட்டங்களுக்கு துல்லியமாக தகுதி பெற பயன்படும் ஒருங்கிணைந்த சுயவிவரம்.",
    age: "வயது",
    gender: "பாலினம்",
    state: "மாநிலம்",
    district: "மாவட்டம்",
    occupation: "தொழில்",
    education: "கல்வித் தகுதி",
    annualIncome: "ஆண்டு குடும்ப வருமானம் (₹)",
    socialCategory: "சமூகப் பிரிவு",
    maritalStatus: "திருமண நிலை",
    residenceType: "வாழிட பகுதி",
    disabilityStatus: "மாற்றுத்திறனாளி (PwD)",
    saveProfile: "சுயவிவரத்தை சேமிக்க",
    saving: "சேமிக்கப்படுகிறது...",
    profileSaved: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",

    benefitGapHeading: "விடுபட்ட பலன்கள் பகுப்பாய்வு",
    benefitGapSubheading: "நீங்கள் தகுதிபெறும் அனைத்து கூடுதல் அரசு நலன்களையும் கண்டறியுங்கள்.",
    complimentaryCategories: "உங்கள் சுயவிவரத்திற்கு பொருந்தும் கூடுதல் நலத்திட்டப் பிரிவுகள்:",
    discoveredBenefits: "கண்டறியப்பட்ட கூடுதல் நலன்கள்",
    whyYouQualify: "நீங்கள் ஏன் தகுதி பெறுகிறீர்கள்:",
    applyNow: "இப்போது விண்ணப்பிக்க",

    simpleListen: "குரல் வழி வழிகாட்டல்",
    exitSimpleMode: "சாதாரண முறைக்கு திரும்புக",
    simpleCategoryEdu: "படிப்பு மற்றும் கல்வி உதவி",
    simpleCategoryAgri: "விவசாயம் மற்றும் உழவர் உதவி",
    simpleCategoryHealth: "மருத்துவம் மற்றும் சிகிச்சை காப்பீடு",
    simpleCategoryHousing: "வீடு மற்றும் குடியிருப்பு உதவி",
    simpleCategoryJobs: "வேலை மற்றும் சிறுதொழில் கடன்",
    simpleCategoryPension: "முதியோர் மற்றும் விதவை ஓய்வூதியம்",

    footerAbout: "இந்தியக் குடிமக்களுக்கு தகுதி விளக்கம், ஆவண நுண்ணறிவு மற்றும் பலமொழி குரல் வழிகாட்டலை வழங்கும் பல-முகவர் AI தளம்.",
    officialEcosystem: "அதிகாரப்பூர்வ இந்திய அரசு தளங்கள்",
    ecosystemSubtitle: "அரசு தளங்களுக்கு மேலான அறிவார்ந்த உதவி அமைப்பாக வடிவமைக்கப்பட்டது:",
    quickLinks: "முக்கிய இணைப்புகள்",
    disclaimerTitle: "முக்கிய அறிவிப்பு மற்றும் வழிகாட்டல்",
    disclaimerText: "அரசு சாரா அமைப்பு அறிவிப்பு: இந்த தளம் ஒரு வழிகாட்டுதல், தகுதி மதிப்பீடு மற்றும் விண்ணப்ப உதவி அமைப்பாக மட்டுமே செயல்படுகிறது. இது அரசு ஒப்புதல்களை வழங்குவதில்லை அல்லது கட்டணம் வசூலிப்பதில்லை.",
    copyright: "© 2026 குடிமக்கள் நலத்திட்ட நுண்ணறிவு தளம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    adminControlCenter: "நிர்வாக கட்டுப்பாட்டு மையம்",
    demoDisclaimer: "அதிகாரப்பூர்வ இந்திய அரசு தளங்களுக்கு (myScheme, UMANG, DigiLocker) மேலான அறிவார்ந்த அடுக்கு."
  },

  hi: {
    appName: "नागरिक कल्याण लाभ आसूचना मंच",
    appTagline: "योजना खोज से वास्तविक लाभ प्राप्ति तक — मल्टी-एजेंट एआई प्लेटफॉर्म",
    govEcosystem: "भारतीय जन-कल्याण के लिए उन्नत एआई सहायता प्रणाली",
    navHome: "होम",
    navExplorer: "योजना अन्वेषक",
    navAssistant: "एआई सहायक",
    navDashboard: "मेरे लाभ",
    navDocuments: "दस्तावेज़ केंद्र",
    navApplications: "आवेदन",
    navBenefitGap: "अतिरिक्त लाभ",
    navAdmin: "प्रशासन केंद्र",
    navSaved: "सहेजी गई योजनाएं",
    navCompare: "तुलना करें",
    navSupport: "सहायता केंद्र",
    navProfile: "प्रोफ़ाइल सेटिंग्स",
    loginBtn: "साइन इन करें",
    logoutBtn: "लॉग आउट करें",
    registerBtn: "नया खाता बनाएं",
    simpleModeBtn: "सरल मोड",
    speakBtn: "आवाज सहायक",
    searchPlaceholder: "कुछ भी पूछें (उदा. 'कॉलेज छात्र के लिए छात्रवृत्ति योजना')...",

    selectLanguageLabel: "भाषा",
    languageEnglish: "English",
    languageTamil: "தமிழ் (Tamil)",
    languageHindi: "हिन्दी (Hindi)",

    loginHeading: "नागरिक लाभ मंच में साइन इन करें",
    loginSubheading: "अपनी व्यक्तिगत सरकारी योजनाओं, दस्तावेज़ सत्यापन और आवेदन स्थिति तक पहुँचें।",
    emailLabel: "ईमेल पता अथवा मोबाइल नंबर",
    emailPlaceholder: "citizen@example.com",
    passwordLabel: "पासवर्ड",
    passwordPlaceholder: "••••••••",
    forgotPassword: "पासवर्ड भूल गए?",
    forgotPasswordNotice: "पासवर्ड रीसेट करने के निर्देश आपके पंजीकृत ईमेल अथवा मोबाइल नंबर पर भेजे जाएंगे।",
    demoCredentialsTitle: "डेमो मूल्यांकन क्रेडेंशियल:",
    demoCitizenBtn: "डेमो नागरिक",
    demoAdminBtn: "डेमो प्रशासक",
    demoCitizenDesc: "छात्र प्रोफ़ाइल, तमिलनाडु, पारिवारिक आय ₹2,00,000",
    noAccountText: "क्या आपका खाता नहीं है?",
    alreadyAccountText: "क्या आपके पास पहले से खाता है?",
    registerTitle: "नागरिक खाता बनाएं",
    registerSubtitle: "सभी सरकारी लाभों को खोजने के लिए अपनी सत्यापित प्रोफ़ाइल सेट करें।",
    fullNameLabel: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    phoneLabel: "मोबाइल नंबर (वैकल्पिक)",
    phonePlaceholder: "9876543210",
    loginAction: "खाते में साइन इन करें",
    registerAction: "नागरिक प्रोफ़ाइल बनाएं",
    loginFailed: "अमान्य ईमेल या पासवर्ड। कृपया अपने विवरण की जाँच करें।",
    registerFailed: "पंजीकरण विफल रहा। इस ईमेल से खाता पहले से मौजूद हो सकता है।",

    vanakkam: "स्वागत है",
    citizen: "नागरिक",
    profileOverview: "प्रोफ़ाइल सारांश",
    profileCompletion: "प्रोफ़ाइल पूर्णता",
    completeProfileMsg: "अधिक प्रासंगिक कल्याणकारी योजनाओं को अनलॉक करने के लिए अपनी प्रोफ़ाइल पूरी करें।",
    updateProfileBtn: "प्रोफ़ाइल अपडेट करें",
    recommendedSchemesTitle: "आपके लिए शीर्ष अनुशंसित योजनाएं",
    recommendedSchemesSubtitle: "नियम और प्रोफ़ाइल संगतता के आधार पर रैंक किया गया",
    exploreAllSchemes: "सभी योजनाएं देखें",
    activeApplicationsTitle: "सक्रिय आवेदन",
    activeApplicationsSubtitle: "जमा किए गए लाभों के लिए रीयल-टाइम ट्रैकिंग",
    noApplicationsYet: "अभी तक कोई आवेदन ट्रैक नहीं किया गया है। ट्रैकिंग शुरू करने के लिए किसी भी योजना का चयन करें।",
    documentStatusTitle: "दस्तावेज़ आसूचना एवं तत्परता",
    documentStatusSubtitle: "सत्यापित प्रमाण पत्र और विश्लेषण",
    manageDocsBtn: "दस्तावेज़ केंद्र खोलें",
    benefitGapBannerTitle: "पूरक कल्याणकारी योजनाओं की खोज हुई!",
    benefitGapBannerDesc: "आपकी सामाजिक-आर्थिक प्रोफ़ाइल के आधार पर आप अतिरिक्त लाभों के भी पात्र हैं।",
    viewBenefitGapBtn: "अतिरिक्त लाभ देखें",
    recentNotifications: "हालिया सूचनाएं",
    noNotifications: "इस समय कोई नई सूचना नहीं है।",

    explorerHeading: "सरकारी कल्याण योजना अन्वेषक",
    explorerSubheading: "सत्यापित केंद्रीय और राज्य कल्याणकारी योजनाओं को पात्रता स्पष्टीकरण के साथ देखें।",
    filterByCategory: "श्रेणी के अनुसार फ़िल्टर करें",
    filterByState: "राज्य के अनुसार फ़िल्टर करें",
    filterByOccupation: "व्यवसाय",
    filterByIncome: "अधिकतम वार्षिक आय (₹)",
    filterByGender: "लिंग",
    allCategories: "सभी श्रेणियां",
    allStates: "संपूर्ण भारत",
    allOccupations: "सभी व्यवसाय",
    allGenders: "सभी",
    clearFiltersBtn: "सभी फ़िल्टर साफ़ करें",
    schemesFound: "योजनाएं मिलीं",
    noSchemesMatch: "आपके मानदंडों से मेल खाने वाली कोई योजना नहीं मिली।",
    noSchemesAdvice: "फ़िल्टर या खोज शब्दों को बदलकर पुनः प्रयास करें।",
    viewDetails: "विवरण देखें",
    helpMeApply: "आवेदन में सहायता करें",
    matchScore: "प्रोफ़ाइल मिलान",
    readiness: "दस्तावेज़ तत्परता",
    ready: "तैयार",
    openYearRound: "वर्ष भर खुला है",
    verifiedData: "सत्यापित डेटा",
    demoData: "डेमो डेटा",
    whyRanks: "यह क्यों रैंक करता है:",
    keyBenefit: "मुख्य लाभ:",

    likelyEligible: "पात्र होने की उच्च संभावना",
    potentiallyEligible: "संभावित रूप से पात्र",
    likelyNotEligible: "पात्र होने की संभावना नहीं",
    insufficientInfo: "अधिक जानकारी आवश्यक",

    docCenterTitle: "दस्तावेज़ सत्यापन एवं तत्परता केंद्र",
    docCenterSubtitle: "स्वचालित प्रमाणपत्र मूल्यांकन, ओसीआर डेटा निष्कर्षण और मार्गदर्शन",
    uploadCertificate: "प्रमाणपत्र अपलोड और सत्यापित करें",
    selectDocType: "दस्तावेज़ का प्रकार चुनें",
    chooseFile: "दस्तावेज़ फ़ाइल चुनें (PDF / JPG / PNG)",
    uploadBtn: "अपलोड करें और सत्यापित करें",
    uploading: "दस्तावेज़ अपलोड और विश्लेषण हो रहा है...",
    uploadSuccess: "दस्तावेज़ सफलतापूर्वक सत्यापित किया गया और आपकी प्रोफ़ाइल में जोड़ा गया!",
    myUploadedDocs: "आपके सत्यापित दस्तावेज़",
    noDocsYet: "अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया है। पात्रता जांचने के लिए प्रमाणपत्र अपलोड करें।",
    assessReadinessFor: "योजना के लिए दस्तावेज़ तत्परता का आकलन करें:",
    overallReadiness: "कुल तत्परता स्कोर",
    requiredDocs: "आवश्यक दस्तावेज़",
    available: "उपलब्ध",
    missing: "लापता / आवश्यक",
    howToObtain: "यह प्रमाणपत्र कैसे प्राप्त करें",
    issuingAuthority: "जारी करने वाला प्राधिकरण:",
    whereToApply: "आवेदन कहाँ करें:",
    turnaroundTime: "अपेक्षित समय-सीमा:",
    close: "बंद करें",

    appTrackingTitle: "आवेदन ट्रैकिंग केंद्र",
    appTrackingSubtitle: "अपने जमा किए गए सरकारी लाभों की प्रगति और स्थिति को ट्रैक करें।",
    addAppBtn: "ट्रैक करने के लिए आवेदन जोड़ें",
    demoTrackingBanner: "मैनुअल ट्रैकिंग सक्रिय है: वास्तविक आवेदन मील के पत्थरों को रिकॉर्ड और मॉनिटर करने के लिए इस डैशबोर्ड का उपयोग करें।",
    applicationNo: "आवेदन संख्या:",
    submittedOn: "जमा करने की तिथि:",
    currentStatus: "वर्तमान स्थिति:",
    openPortal: "आधिकारिक पोर्टल",
    statusSubmitted: "जमा किया गया",
    statusVerified: "संस्थान सत्यापित",
    statusInReview: "विभागीय समीक्षा",
    statusSanctioned: "स्वीकृत एवं डीबीटी हस्तांतरित",

    assistantHeading: "एआई नागरिक कल्याण सहायक",
    assistantGreeting: "नमस्ते! मैं आपका सरकारी योजना एवं लाभ एआई सहायक हूँ। आज मैं आपको सरकारी योजनाओं की खोज और आवेदन में कैसे मदद कर सकता हूँ?",
    typeMessage: "अपना प्रश्न हिन्दी, तमिल अथवा अंग्रेज़ी में लिखें...",
    send: "भेजें",
    speakAloud: "सुनें",
    speaking: "बोल रहा है...",
    explainAIReasoning: "एआई तर्क समझें",
    preAppPacketTitle: "पूर्व-आवेदन मार्गदर्शन पैकेज",
    itemsToKeepReady: "शुरू करने से पहले आवश्यक सामग्री:",
    stepByStepFlow: "चरण-दर-चरण आधिकारिक आवेदन प्रक्रिया:",
    portalFieldExplainer: "पोर्टल फ़ॉर्म फ़ील्ड स्पष्टीकरण:",
    clickToExplain: "विवरण देखने के लिए क्लिक करें",
    postSubmissionChecklist: "जमा करने के बाद की चेकलिस्ट:",
    proceedToOfficialPortal: "आधिकारिक सरकारी पोर्टल पर जाएं",
    trackManuallyDashboard: "डैशबोर्ड पर ट्रैक करें",

    profileHeading: "नागरिक प्रोफ़ाइल आसूचना",
    profileSubheading: "सत्यापित सरकारी लाभों से मेल खाने के लिए मूल्यांकन की जाने वाली एकीकृत प्रोफ़ाइल।",
    age: "आयु",
    gender: "लिंग",
    state: "राज्य",
    district: "ज़िला",
    occupation: "व्यवसाय",
    education: "शैक्षिक योग्यता",
    annualIncome: "वार्षिक पारिवारिक आय (₹)",
    socialCategory: "सामाजिक श्रेणी",
    maritalStatus: "वैवाहिक स्थिति",
    residenceType: "निवास क्षेत्र",
    disabilityStatus: "दिव्यांगजन (PwD)",
    saveProfile: "प्रोफ़ाइल विवरण सहेजें",
    saving: "सहेजा जा रहा है...",
    profileSaved: "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!",

    benefitGapHeading: "अतिरिक्त लाभ विश्लेषक",
    benefitGapSubheading: "उन सभी पूरक लाभों की पहचान करें जिनके आप कानूनी रूप से हकदार हैं।",
    complimentaryCategories: "आपकी प्रोफ़ाइल से मेल खाने वाली पूरक कल्याण श्रेणियां:",
    discoveredBenefits: "खोजे गए पूरक लाभ",
    whyYouQualify: "आप क्यों पात्र हैं:",
    applyNow: "अभी आवेदन करें",

    simpleListen: "आवाज़ मार्गदर्शन (सुनें)",
    exitSimpleMode: "सामान्य मोड पर लौटें",
    simpleCategoryEdu: "शिक्षा और छात्रवृत्ति",
    simpleCategoryAgri: "कृषि और किसान कल्याण",
    simpleCategoryHealth: "स्वास्थ्य और अस्पताल कवरेज",
    simpleCategoryHousing: "आवास और पीएम आवास",
    simpleCategoryJobs: "रोजगार और एमएसएमई ऋण",
    simpleCategoryPension: "वृद्धावस्था और विधवा पेंशन",

    footerAbout: "भारतीय नागरिकों के लिए पात्रता स्पष्टीकरण, दस्तावेज़ सत्यापन और बहुभाषी आवाज़ सहायता प्रदान करने वाला मल्टी-एजेंट एआई मंच।",
    officialEcosystem: "आधिकारिक भारतीय पोर्टल",
    ecosystemSubtitle: "सरकारी पोर्टलों के ऊपर एक बुद्धिमान सहायता प्रणाली के रूप में निर्मित:",
    quickLinks: "त्वरित लिंक",
    disclaimerTitle: "महत्वपूर्ण सलाह एवं अस्वीकरण",
    disclaimerText: "गैर-सरकारी निकाय सूचना: यह मंच केवल परामर्श खोज, पात्रता मूल्यांकन और आवेदन मार्गदर्शन सहायक के रूप में कार्य करता है। यह आधिकारिक स्वीकृति जारी नहीं करता है।",
    copyright: "© 2026 नागरिक कल्याण लाभ आसूचना मंच। सर्वाधिकार सुरक्षित।",
    adminControlCenter: "प्रशासन नियंत्रण केंद्र",
    demoDisclaimer: "आधिकारिक सरकारी पोर्टलों (myScheme, UMANG, DigiLocker) के ऊपर एक बुद्धिमान सहायता प्रणाली।"
  }
};
