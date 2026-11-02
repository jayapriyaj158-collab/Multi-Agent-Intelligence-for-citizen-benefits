import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles, 
  Cpu, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { voiceService } from '../services/voice';
import { ChatResponse, Scheme } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { SchemeCard } from '../components/SchemeCard';
import { AIAuditModal } from '../components/AIAuditModal';

const FORM_FIELD_EXPLANATIONS: Record<string, { label: string; explanation: string; example: string; pitfall: string }> = {
  annual_income: {
    label: "Annual Family Income",
    explanation: "Aggregate gross annual income of all earning household members (parents, applicant, unmarried siblings) in the preceding financial year.",
    example: "₹2,00,000",
    pitfall: "Do not enter just your own student pocket allowance; enter total verified on your official Revenue Income Certificate."
  },
  aishe_code: {
    label: "AISHE Code",
    explanation: "Unique institution code (e.g. C-12345 or U-0123) assigned to recognized colleges & universities by Ministry of Education.",
    example: "C-43921",
    pitfall: "Entering the wrong AISHE code routes your application to an incorrect college verification officer."
  },
  patta_number: {
    label: "Patta / Khata Number",
    explanation: "Official revenue account number designating agricultural land parcel ownership in the state land register.",
    example: "Patta No: 1482",
    pitfall: "Ensure the landowner name associated with this Patta matches your Aadhaar KYC exactly."
  },
  aadhaar_seeded_bank: {
    label: "Aadhaar Seeded Bank Account",
    explanation: "Direct Benefit Transfer (DBT) funds require NPCI Aadhaar Payments Bridge (APB) mapping, not just basic KYC linking.",
    example: "State Bank of India (Aadhaar Seeded)",
    pitfall: "Having Aadhaar linked for bank KYC is different from NPCI DBT seeding. Verify status with your branch or on UMANG."
  }
};

interface Message {
  id: string;
  sender: 'citizen' | 'orchestrator';
  text: string;
  language?: string;
  card_type?: string;
  card_data?: any;
  agents_called?: any[];
  citations?: any[];
  audit_run_id?: number;
  total_time_ms?: number;
  intent?: string;
  suggested_actions?: string[];
}

export const AIAssistantPage: React.FC<{ onOpenVoice: () => void }> = ({ onOpenVoice }) => {
  const [searchParams] = useSearchParams();
  const { language, setLanguage, t, translateCategory, translateSchemeName, translateSchemeBenefits, translateRankingReason, translateDocName } = useLanguage();
  const { profile } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<number | undefined>(undefined);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [selectedFormField, setSelectedFormField] = useState<string | null>(null);

  // Audit modal state
  const [auditModalOpen, setAuditModalOpen] = useState<boolean>(false);
  const [activeAuditMessage, setActiveAuditMessage] = useState<Message | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasHandledParamsRef = useRef(false);

  useEffect(() => {
    // Initial greeting in current language
    const initialText = language === 'ta'
      ? "வணக்கம்! நான் உங்கள் அரசு நலத்திட்ட AI உதவியாளர். உங்களுக்கு பொருத்தமான அரசு உதவிகளையும் கல்வி உதவித்தொகைகளையும் கண்டறிய நான் எவ்வாறு உதவட்டும்?"
      : language === 'hi'
      ? "नमस्ते! मैं आपका सरकारी योजना एवं लाभ एआई सहायक हूँ। आज मैं आपको सरकारी योजनाओं की खोज और आवेदन में कैसे मदद कर सकता हूँ?"
      : "Hello! I am your AI Citizen Benefit Assistant. Tell me what you are looking for in plain language (e.g. 'Scholarship for college student in Tamil Nadu').";

    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [
        {
          id: 'msg-0',
          sender: 'orchestrator',
          text: initialText,
          language,
          suggested_actions: [
            "Naan college student, scholarship irukka? (Tamil)",
            "I need financial help for college education",
            "What benefits are available for farmers?",
            "How to get Income Certificate?",
            "Track my application"
          ]
        }
      ];
    });

    // Check URL params for prompt or scheme application
    if (!hasHandledParamsRef.current) {
      const promptParam = searchParams.get('prompt');
      const schemeParam = searchParams.get('scheme');
      const actionParam = searchParams.get('action');

      if (promptParam) {
        hasHandledParamsRef.current = true;
        handleSendMessage(promptParam);
      } else if (schemeParam && actionParam === 'apply') {
        hasHandledParamsRef.current = true;
        handleSendMessage(`Help me apply for scheme ${schemeParam}`);
      } else if (schemeParam) {
        hasHandledParamsRef.current = true;
        handleSendMessage(`Tell me about scheme ${schemeParam} and my eligibility`);
      }
    }
  }, [language, searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      sender: 'citizen',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res: ChatResponse = await api.sendChatMessage(
        text,
        conversationId,
        language,
        profile ? {
          age: profile.age,
          gender: profile.gender,
          state: profile.state,
          occupation: profile.occupation,
          education: profile.education,
          annual_income: profile.annual_income,
          social_category: profile.social_category
        } : undefined
      );

      setConversationId(res.conversation_id);

      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: Message = {
        id: aiMsgId,
        sender: 'orchestrator',
        text: res.reply,
        language: res.language,
        card_type: res.card_type,
        card_data: res.card_data,
        agents_called: res.agents_called,
        citations: res.citations,
        audit_run_id: res.audit_run_id,
        intent: res.intent,
        suggested_actions: res.suggested_actions || []
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Speak response if user is in Tamil / Hindi
      if (res.language === 'ta' || res.language === 'hi') {
        handlePlayVoice(aiMsgId, res.reply, res.language);
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'orchestrator',
          text: `Error connecting to AI Orchestrator: ${e.message}. Please verify the backend service.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayVoice = (msgId: string, text: string, lang?: string) => {
    if (speakingMsgId === msgId) {
      voiceService.stopSpeaking();
      setSpeakingMsgId(null);
      return;
    }
    setSpeakingMsgId(msgId);
    voiceService.speak(text, lang || language, () => {
      setSpeakingMsgId(null);
    });
  };

  const openAudit = (msg: Message) => {
    setActiveAuditMessage(msg);
    setAuditModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 h-[calc(100vh-5rem)] flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              {t.assistantTitle}
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {language === 'ta' ? 'விதி இயந்திரம் செயல்படுகிறது' : language === 'hi' ? 'नियम इंजन सक्रिय है' : 'Deterministic Rule Engine Active'}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              {language === 'ta' ? 'தமிழ், ஆங்கிலம் மற்றும் இந்தியைப் புரிந்துகொள்கிறது' : language === 'hi' ? 'हिंदी, तमिल और अंग्रेजी समझता है' : 'Understands English, தமிழ் (Tamil), and हिन्दी (Hindi)'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenVoice}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-medium flex items-center gap-1 shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.voiceMode}</span>
          </button>
          <button
            onClick={() => setMessages([])}
            title={t.resetConversation}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'citizen' ? 'items-end' : 'items-start'} space-y-2`}
          >
            {/* Bubble */}
            <div
              className={`relative max-w-2xl rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'citizen'
                  ? 'bg-indigo-600 text-white rounded-br-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-bl-xs'
              }`}
            >
              <p className="whitespace-pre-wrap font-normal">{msg.text}</p>

              {/* AI Controls Footer */}
              {msg.sender === 'orchestrator' && (
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayVoice(msg.id, msg.text, msg.language)}
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      {speakingMsgId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                          <span className="text-rose-500">{t.stopVoice}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{t.speakAloud}</span>
                        </>
                      )}
                    </button>

                    {msg.agents_called && msg.agents_called.length > 0 && (
                      <button
                        onClick={() => openAudit(msg)}
                        className="inline-flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>{t.explainReasoning}</span>
                      </button>
                    )}
                  </div>

                  {msg.citations && msg.citations.length > 0 && (
                    <span className="text-[10px] text-slate-400">
                      {t.groundedInSources}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Hybrid UI Cards Component Render (Requirement #47) */}
            {msg.card_type === 'schemes' && msg.card_data && (
              <div className="w-full max-w-3xl space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {t.discoveredSchemes}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Array.isArray(msg.card_data) ? msg.card_data : msg.card_data.schemes || []).map((sc: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-indigo-600 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                            {translateCategory(sc.category)}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                            {translateSchemeName(sc.scheme_id, sc.scheme_name)}
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {sc.eligibility_status === 'POTENTIALLY ELIGIBLE' ? t.potentiallyEligible : sc.eligibility_status === 'LIKELY ELIGIBLE' ? t.likelyEligible : sc.eligibility_status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {translateSchemeBenefits(sc.scheme_id, sc.benefits)}
                      </p>

                      <div className="text-[11px] text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 p-2 rounded-lg font-medium">
                        ✓ {translateRankingReason(sc.ranking_reason)}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400 text-[11px]">
                          {language === 'ta' ? 'ஆவணங்கள்' : language === 'hi' ? 'दस्तावेज़' : 'Docs'}: {sc.available_documents_count || 1}/{sc.required_documents_count || 4} {t.readyLabel}
                        </span>
                        <a
                          href={sc.official_application_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                        >
                          {t.officialPortal} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Packet Steps Render */}
            {msg.card_type === 'application_packet' && msg.card_data && (
              <div className="w-full max-w-2xl p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                    {language === 'ta' ? 'முன்-விண்ணப்ப வழிகாட்டுதல் தொகுப்பு' : language === 'hi' ? 'आवेदन पूर्व मार्गदर्शन पैकेट' : 'Pre-Application Guidance Packet'}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {language === 'ta' ? 'முறை' : language === 'hi' ? 'प्रकार' : 'Mode'}: {msg.card_data.application_mode || (language === 'ta' ? 'இணையதளம்' : language === 'hi' ? 'ऑनलाइन पोर्टल' : 'Online Portal')}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {translateSchemeName(msg.card_data.scheme_id, msg.card_data.scheme_name)}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {msg.card_data.eligibility_summary}
                  </p>
                </div>

                {/* Items to Keep Ready Checklist */}
                {msg.card_data.info_to_keep_ready && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
                    <span className="font-bold text-amber-900 dark:text-amber-300 block text-[11px] uppercase tracking-wider">
                      {language === 'ta' ? '📋 தொடங்குவதற்கு முன் தயாராக வைத்திருக்க வேண்டியவை:' : language === 'hi' ? '📋 शुरू करने से पहले तैयार रखने योग्य वस्तुएं:' : '📋 Items to Keep Ready Before Starting:'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-amber-950 dark:text-amber-200 text-[11px]">
                      {msg.card_data.info_to_keep_ready.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Numbered Application Steps */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">
                    {language === 'ta' ? 'அதிகாரப்பூர்வ விண்ணப்ப முறை (படிப்படியாக):' : language === 'hi' ? 'चरणबद्ध आधिकारिक आवेदन प्रक्रिया:' : 'Step-by-Step Official Application Flow:'}
                  </span>
                  {msg.card_data.application_steps?.map((s: any, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {s.step}
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100">{s.title}:</strong>{' '}
                        <span className="text-slate-600 dark:text-slate-300">{s.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form Field Explainer Section */}
                <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 text-[11px] flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                      {language === 'ta' ? 'விண்ணப்ப படிவ விதி விளக்கங்கள்:' : language === 'hi' ? 'आवेदन फॉर्म प्रविष्टि विवरण:' : 'Portal Form Field Explainer:'}
                    </span>
                    <span className="text-[10px] text-indigo-500 font-medium">
                      {language === 'ta' ? 'விளக்கத்திற்கு ஒரு சொல்லைத் தேர்ந்தெடுக்கவும்' : language === 'hi' ? 'विवरण देखने के लिए किसी शब्द पर क्लिक करें' : 'Click a term to explain'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(FORM_FIELD_EXPLANATIONS).map(([key, val]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedFormField(selectedFormField === key ? null : key)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                          selectedFormField === key
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-950'
                        }`}
                      >
                        {val.label}
                      </button>
                    ))}
                  </div>

                  {selectedFormField && FORM_FIELD_EXPLANATIONS[selectedFormField] && (
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 space-y-1.5 mt-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-indigo-700 dark:text-indigo-300 text-xs">
                          {FORM_FIELD_EXPLANATIONS[selectedFormField].label}
                        </strong>
                        <span className="text-[10px] font-semibold text-slate-500">
                          e.g. {FORM_FIELD_EXPLANATIONS[selectedFormField].example}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                        {FORM_FIELD_EXPLANATIONS[selectedFormField].explanation}
                      </p>
                      <div className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-1.5 rounded flex items-start gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                        <span><strong>{language === 'ta' ? 'பொதுவான தவறு:' : language === 'hi' ? 'सामान्य गलती:' : 'Common Pitfall:'}</strong> {FORM_FIELD_EXPLANATIONS[selectedFormField].pitfall}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* After Submission Steps */}
                {msg.card_data.after_submission_steps && (
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block text-[11px]">
                      {language === 'ta' ? 'சமர்ப்பித்த பின் சரிபார்ப்புப் பட்டியல்:' : language === 'hi' ? 'जमा करने के बाद की चेकलिस्ट:' : 'Post-Submission Checklist:'}
                    </span>
                    {msg.card_data.after_submission_steps.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={msg.card_data.official_portal}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors text-xs"
                  >
                    <span>{t.applyOnOfficialPortal}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    to="/applications"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
                  >
                    {t.trackManually}
                  </Link>
                </div>
              </div>
            )}

            {/* Document Guidance Card Render */}
            {msg.card_type === 'document_guidance' && msg.card_data && (
              <div className="w-full max-w-2xl p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 text-xs">
                <span className="text-[10px] font-bold uppercase text-emerald-600">
                  {t.howToGetDoc}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {translateDocName(msg.card_data.document_name)}
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>{t.whoIssues}:</strong> {msg.card_data.who_issues}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>{t.whereToApply}:</strong> {msg.card_data.where_to_apply} ({msg.card_data.online_offline})
                </p>
                <div className="space-y-1">
                  <strong className="block text-slate-800 dark:text-slate-200">{t.stepByStepProcedure}</strong>
                  {msg.card_data.expected_process?.map((p: string, i: number) => (
                    <div key={i} className="text-slate-500 pl-2">
                      • {p}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Action Pills */}
            {msg.suggested_actions && msg.suggested_actions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {msg.suggested_actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(act)}
                    className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 text-[11px] font-medium transition-colors"
                  >
                    {act}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-slate-500">
              {language === 'ta' ? 'முகவர்கள் ஒருங்கிணைக்கப்பட்டு விதிகள் மதிப்பீடு செய்யப்படுகின்றன...' : language === 'hi' ? 'एजेंट समन्वय और नियम मूल्यांकन जारी है...' : 'Orchestrating agents & evaluating rules...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 shrink-0"
      >
        <button
          type="button"
          onClick={onOpenVoice}
          title="Voice Input"
          className="p-2 text-slate-500 hover:text-emerald-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.typeMessage}
          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* AI Audit Modal */}
      {activeAuditMessage && (
        <AIAuditModal
          isOpen={auditModalOpen}
          onClose={() => setAuditModalOpen(false)}
          agentsCalled={activeAuditMessage.agents_called || []}
          citations={activeAuditMessage.citations || []}
          intent={activeAuditMessage.intent}
        />
      )}
    </div>
  );
};
