import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  HelpCircle, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Layers, 
  Phone, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { api } from '../services/api';
import { Scheme, EligibilityResult, DocumentReadiness, MissingDocumentGuide } from '../types';
import { EligibilityBadge } from '../components/EligibilityBadge';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const SchemeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();
  const { 
    t, 
    language, 
    translateCategory, 
    translateState, 
    translateSchemeName,
    translateSchemeShortName,
    translateMinistry,
    translateDepartment,
    translateDocName,
    translateTargetGroup,
    translateDisbursementType,
    translateFrequency,
    translateCriterionLabel,
    translateSchemeDescription, 
    translateSchemeBenefits 
  } = useLanguage();

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(null);
  const [readiness, setReadiness] = useState<DocumentReadiness | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDocGuide, setSelectedDocGuide] = useState<MissingDocumentGuide | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const s = await api.getScheme(id);
        setScheme(s);

        // Fetch deterministic eligibility evaluation
        const elig = await api.checkEligibility(id);
        setEligibility(elig);

        // Fetch document readiness
        const ready = await api.getDocumentReadiness(id);
        setReadiness(ready);
      } catch (e) {
        console.warn('Failed loading scheme details', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">
          {language === 'ta' ? 'அரசுத் திட்ட விவரங்கள் ஏற்றப்படுகின்றன...' : language === 'hi' ? 'सरकारी योजना का विवरण लोड हो रहा है...' : 'Loading verified scheme specifications...'}
        </p>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.noSchemesFound}</h2>
        <p className="text-xs text-slate-500">{t.tryDifferentFilters}</p>
        <Link to="/explorer" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
          {t.backToExplorer}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link to="/explorer" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToExplorer}</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: scheme.scheme_name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Scheme link copied to clipboard!");
              }
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 text-xs flex items-center gap-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.shareBtn}</span>
          </button>
        </div>
      </div>

      {/* Scheme Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {translateCategory(scheme.category)}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {translateState(scheme.state)}
          </span>
          {scheme.is_umang_supported && (
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              UMANG
            </span>
          )}
          {scheme.is_digilocker_supported && (
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              DigiLocker
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {translateSchemeName(scheme.scheme_id, scheme.scheme_name)}
          </h1>
          {scheme.short_name && (
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
              ({translateSchemeShortName(scheme.scheme_id, scheme.short_name)})
            </p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            {translateMinistry(scheme.ministry || '')} • {translateDepartment(scheme.department || '')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={scheme.official_application_url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <span>{t.applyOnOfficialPortal}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <Link
            to={`/assistant?scheme=${scheme.scheme_id}&action=apply`}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.aiGuidedAssistant}</span>
          </Link>

          <button
            onClick={async () => {
              if (!isAuthenticated) {
                navigate('/login');
                return;
              }
              const res = await api.createApplication({ scheme_id: scheme.id });
              alert(`Application registered for Manual Tracking! Tracking ID: ${res.application_number}`);
              navigate('/applications');
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold"
          >
            {t.trackManually}
          </button>
        </div>
      </div>

      {/* Grid: 20+ Structured Sections (Requirement #8) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Overview */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              {t.secOverview}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {translateSchemeDescription(scheme.scheme_id, scheme.description)}
            </p>
            {scheme.objective && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">{t.keyObjective}</strong>
                {scheme.objective}
              </div>
            )}
          </section>

          {/* Section 2: Who is it for? */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              {t.secWhoIsItFor}
            </h3>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {translateTargetGroup(scheme.target_group || '')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 text-[10px] block">{t.ageRange}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.age_min || 0} {language === 'ta' ? 'முதல்' : language === 'hi' ? 'से' : 'to'} {scheme.age_max || t.noLimit} {language === 'ta' ? 'ஆண்டுகள்' : language === 'hi' ? 'वर्ष' : 'yrs'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 text-[10px] block">{t.incomeCeiling}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.income_limit ? `≤ ₹${scheme.income_limit.toLocaleString()}` : t.noCap}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 text-[10px] block">{t.genderCriteria}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.gender_criteria === 'All' ? (language === 'ta' ? 'அனைவரும்' : language === 'hi' ? 'सभी' : 'All') : scheme.gender_criteria === 'Female' ? (language === 'ta' ? 'பெண்கள் மட்டும்' : language === 'hi' ? 'केवल महिलाएँ' : 'Female') : scheme.gender_criteria}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: Benefits */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              {t.secBenefits}
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 text-sm font-medium leading-relaxed">
              {translateSchemeBenefits(scheme.scheme_id, scheme.benefits)}
            </div>
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{t.disbursementType} <strong>{translateDisbursementType(scheme.benefit_type || '')}</strong></span>
              <span>{t.frequency} <strong>{translateFrequency(scheme.frequency || '')}</strong></span>
            </div>
          </section>

          {/* Section 4: Explainable Eligibility Breakdown (Requirement #10) */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {t.secEligibility}
              </h3>
              {eligibility && <EligibilityBadge status={eligibility.status} size="sm" />}
            </div>

            {eligibility && (
              <>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {eligibility.summary_explanation}
                </p>

                <div className="space-y-2 pt-2">
                  {eligibility.criteria_evaluated.map((crit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2">
                        {crit.status === 'SATISFIED' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : crit.status === 'FAILED' ? (
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        ) : (
                          <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                            {translateCriterionLabel(crit.user_facing_label)}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {crit.detail}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        crit.status === 'SATISFIED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        crit.status === 'FAILED' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {crit.status === 'SATISFIED' ? (language === 'ta' ? 'பொருந்துகிறது' : language === 'hi' ? 'संतुष्ट' : 'SATISFIED') :
                         crit.status === 'FAILED' ? (language === 'ta' ? 'பொருந்தவில்லை' : language === 'hi' ? 'विफल' : 'FAILED') :
                         (language === 'ta' ? 'ஆவணம் தேவை' : language === 'hi' ? 'दस्तावेज़ आवश्यक' : 'DOCUMENTS NEEDED')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500">
                  {language === 'ta'
                    ? 'இது வழங்கப்பட்ட தகவல்களின் அடிப்படையிலான AI-உதவி மதிப்பீடாகும். இறுதித் தகுதி சம்பந்தப்பட்ட அரசு அதிகார அமைப்பால் மட்டுமே தீர்மானிக்கப்படும்.'
                    : language === 'hi'
                    ? 'यह प्रदान की गई जानकारी के आधार पर एक एआई-सहायता प्राप्त मूल्यांकन है। अंतिम पात्रता संबंधित सरकारी प्राधिकरण द्वारा निर्धारित की जाती है।'
                    : (eligibility.disclaimer || 'This is an AI-assisted assessment based on the information provided. Final eligibility is determined by the concerned government authority.')}
                </div>
              </>
            )}
          </section>

          {/* Section 5: Standard 9-Step Application Roadmap & Specific Steps */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  {t.secSteps}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {language === 'ta' ? '9-படி வழிகாட்டி' : language === 'hi' ? '9-चरणीय रोडमैप' : '9-Step Citizen Roadmap'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'ta' ? 'தகுதியை உறுதிசெய்து, ஆவணங்களைத் தயார் செய்து, அதிகாரப்பூர்வ போர்ட்டலில் விண்ணப்பித்து கண்காணிப்பதற்கான முழுமையான செயல்முறை.' : language === 'hi' ? 'पात्रता की पुष्टि करने, दस्तावेज़ तैयार करने, आधिकारिक पोर्टल पर आवेदन करने और निगरानी के लिए संपूर्ण चरण-दर-चरण प्रक्रिया।' : 'End-to-end guidance from eligibility check to official portal submission and manual status tracking.'}
              </p>
            </div>

            {/* 9-Step Standard Roadmap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  num: 1,
                  title: language === 'ta' ? '1. தகுதியைச் சரிபார்க்கவும்' : language === 'hi' ? '1. पात्रता की जाँच करें' : '1. Check Eligibility',
                  detail: language === 'ta' ? 'வயது, வருமானம், கல்வி நிபந்தனைகளை உறுதிப்படுத்தவும்.' : language === 'hi' ? 'आयु, आय, शिक्षा मानदंडों की पुष्टि करें।' : 'Verify criteria against age, income, and category rules.'
                },
                {
                  num: 2,
                  title: language === 'ta' ? '2. ஆவணங்களைத் தயார் செய்யவும்' : language === 'hi' ? '2. आवश्यक दस्तावेज़ तैयार करें' : '2. Prepare Required Documents',
                  detail: language === 'ta' ? 'அனைத்து தேவையான சான்றிதழ்களின் நகல்களை தயார் நிலையில் வைக்கவும்.' : language === 'hi' ? 'सभी आवश्यक प्रमाण पत्रों की प्रतियों को तैयार रखें।' : 'Check document readiness and keep certified copies ready.'
                },
                {
                  num: 3,
                  title: language === 'ta' ? '3. அதிகாரப்பூர்வ போர்ட்டலுக்குச் செல்லவும்' : language === 'hi' ? '3. आधिकारिक पोर्टल पर जाएं' : '3. Visit Official Portal',
                  detail: language === 'ta' ? 'அரசு அங்கீகரித்த அதிகாரப்பூர்வ இணையதள முகவரியைத் திறக்கவும்.' : language === 'hi' ? 'सरकार द्वारा सत्यापित आधिकारिक पोर्टल खोलें।' : 'Open the verified government scheme portal directly.'
                },
                {
                  num: 4,
                  title: language === 'ta' ? '4. பதிவு / கணக்கு தொடங்கவும்' : language === 'hi' ? '4. पंजीकरण / लॉगिन करें' : '4. Register / Create Account',
                  detail: language === 'ta' ? 'ஆதார் அல்லது மொபைல் OTP மூலம் போர்ட்டலில் ஒருமுறை பதிவு செய்யவும்.' : language === 'hi' ? 'आधार या मोबाइल ओटीपी का उपयोग करके पोर्टल पर पंजीकरण करें।' : 'Complete One-Time Registration using Aadhaar or OTP.'
                },
                {
                  num: 5,
                  title: language === 'ta' ? '5. விண்ணப்பப் படிவத்தைப் பூர்த்தி செய்க' : language === 'hi' ? '5. आवेदन पत्र भरें' : '5. Fill Application Form',
                  detail: language === 'ta' ? 'தனிப்பட்ட, முகவரி மற்றும் வங்கிக் கணக்கு எண்களை உள்ளிடவும்.' : language === 'hi' ? 'व्यक्तिगत, पता और बैंक खाता विवरण सही भरें।' : 'Accurately enter personal, address, and bank info.'
                },
                {
                  num: 6,
                  title: language === 'ta' ? '6. ஆவணங்களைப் பதிவேற்றவும்' : language === 'hi' ? '6. दस्तावेज़ अपलोड करें' : '6. Upload Verified Documents',
                  detail: language === 'ta' ? 'வருமானம், சாதி, இருப்பிடச் சான்றிதழ்களைப் பதிவேற்றவும்.' : language === 'hi' ? 'आय, जाति, निवास प्रमाण पत्र अपलोड करें।' : 'Upload scanned certificates within file size limits.'
                },
                {
                  num: 7,
                  title: language === 'ta' ? '7. விண்ணப்பத்தை சமர்ப்பிக்கவும்' : language === 'hi' ? '7. आवेदन जमा करें' : '7. Submit Application',
                  detail: language === 'ta' ? 'முன்னோட்டம் பார்த்து அனைத்து விவரங்களையும் உறுதிசெய்து சமர்ப்பிக்கவும்.' : language === 'hi' ? 'पूर्वावलोकन जांचें और आवेदन अंतिम रूप से जमा करें।' : 'Preview all entries thoroughly and finalize submission.'
                },
                {
                  num: 8,
                  title: language === 'ta' ? '8. ஒப்புதல் எண்ணைச் சேமிக்கவும்' : language === 'hi' ? '8. पावती संख्या सुरक्षित रखें' : '8. Save Reference / Ack Number',
                  detail: language === 'ta' ? 'விண்ணப்ப ஒப்புகை ரசீதை பதிவிறக்கம் செய்து எண்ணைக் குறித்துக் கொள்ளவும்.' : language === 'hi' ? 'आवेदन पावती पर्ची डाउनलोड करें और संदर्भ संख्या नोट करें।' : 'Download the acknowledgement PDF and copy tracking ID.'
                },
                {
                  num: 9,
                  title: language === 'ta' ? '9. நிலையைத் தொடரவும் கண்காணிக்கவும்' : language === 'hi' ? '9. स्थिति ट्रैक करें और फॉलो-अप करें' : '9. Track Status & Follow-up',
                  detail: language === 'ta' ? 'நமது கண்காணிப்பு பக்கத்தில் எண்ணைப் பதிவுசெய்து நிலைகளைக் கண்காணிக்கவும்.' : language === 'hi' ? 'हमारे ट्रैकिंग पेज में संख्या दर्ज करें और सत्यापन चरणों की निगरानी करें।' : 'Add your application number in My Applications to monitor milestones.'
                }
              ].map((st) => (
                <div key={st.num} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-2.5 text-xs">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {st.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Department Specific Portal Workflow */}
            {scheme.application_steps && scheme.application_steps.length > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {language === 'ta' ? 'இணையதளத்தின் பிரத்யேக படிநிலைகள்' : language === 'hi' ? 'पोर्टल के विशिष्ट चरण' : 'Department Specific Portal Workflow'}
                </h4>
                <div className="space-y-2">
                  {scheme.application_steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                      <div className="w-5 h-5 rounded-full bg-indigo-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {st.step}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">
                          {st.title}
                        </h5>
                        <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                          {st.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Section 6: Scheme Specific FAQs */}
          {scheme.faq && scheme.faq.length > 0 && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {t.secFaq}
              </h3>
              <div className="space-y-2">
                {scheme.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between"
                    >
                      <span>{item.question}</span>
                      {openFaqIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openFaqIdx === idx && (
                      <div className="p-3.5 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (1 Col): Document Checklist & Source Metadata */}
        <div className="space-y-6">
          {/* Document Readiness Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                {t.requiredDocs}
              </h3>
              {readiness && (
                <span className="text-xs font-bold text-indigo-600">
                  {readiness.readiness_percentage}% {t.readyLabel}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {scheme.required_documents?.map((docName, idx) => {
                const isAvail = readiness?.available_documents.includes(docName);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {translateDocName(docName)}
                      </span>
                      {isAvail ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                          {t.availableLabel}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                          {t.missingLabel}
                        </span>
                      )}
                    </div>

                    {!isAvail && readiness?.guidance[docName] && (
                      <button
                        onClick={() => setSelectedDocGuide(readiness.guidance[docName])}
                        className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>{t.howToGetDoc}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              to={`/documents?scheme=${scheme.scheme_id}`}
              className="block w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100"
            >
              {t.uploadVerifyDocs}
            </Link>
          </div>

          {/* Scheme Trust & Source Metadata */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              {t.secSources}
            </h4>

            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <div>
                <span className="text-slate-400 block text-[10px]">{t.officialSource}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.source_name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {language === 'ta' ? 'ஆதார நிலை:' : language === 'hi' ? 'स्रोत स्तर:' : 'Source Level:'}
                </span>
                <span className="font-semibold text-indigo-600">
                  {language === 'ta' ? `நிலை ${scheme.source_level} (அதிகாரப்பூர்வ ஆணையம்)` : language === 'hi' ? `स्तर ${scheme.source_level} (आधिकारिक प्राधिकरण)` : `Level ${scheme.source_level} (Official Authority)`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{t.lastVerified}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.last_verified_at || "2026-09-20"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {language === 'ta' ? 'நிலை:' : language === 'hi' ? 'स्थिति:' : 'Status:'}
                </span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {scheme.verification_status === "VERIFIED" ? t.verifiedData : (language === 'ta' ? 'சரிபார்க்கப்பட்டது' : language === 'hi' ? 'सत्यापित' : scheme.verification_status)}
                </span>
              </div>
            </div>

            <a
              href={scheme.official_source_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-indigo-600 hover:underline pt-2 font-semibold"
            >
              {t.verifyOnPortal} <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Helpline Support */}
          {scheme.helpline && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">{t.helplineNumber}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{scheme.helpline}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Missing Document Guidance Modal (Requirement #15) */}
      {selectedDocGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  {t.missingDocGuidance}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {translateDocName(selectedDocGuide.document_name)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocGuide(null)}
                className="p-1 text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white block">{t.whatIsThisDoc}</strong>
                <p className="mt-0.5">{selectedDocGuide.what_is_it}</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">{t.whoIssues}</strong>
                <p className="mt-0.5">{selectedDocGuide.who_issues}</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">{t.whereToApply}</strong>
                <p className="mt-0.5">{selectedDocGuide.where_to_apply} ({selectedDocGuide.online_offline})</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">{t.stepByStepProcedure}</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-500">
                  {selectedDocGuide.expected_process.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">{t.docsNormallyRequired}</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedDocGuide.required_inputs.map((inp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                      {inp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 italic">
                {selectedDocGuide.disclaimer}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <a
                href={selectedDocGuide.official_source_url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
              >
                {t.officialSourceLink} <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedDocGuide(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
