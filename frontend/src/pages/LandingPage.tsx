import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Mic, 
  CheckCircle2, 
  FileCheck2, 
  Layers, 
  TrendingUp, 
  GraduationCap, 
  Tractor, 
  Home, 
  HeartHandshake, 
  Briefcase, 
  Activity, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LandingPage: React.FC<{ onOpenVoice: () => void }> = ({ onOpenVoice }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleQuickCategory = (cat: string) => {
    navigate(`/explorer?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-emerald-500/15 blur-3xl -z-10 rounded-full"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Autonomous Multi-Agent AI + RAG + Explainable Eligibility</span>
          </div>

          {/* Main Title & USP */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            From Scheme Search to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Direct Benefit Access
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            One Profile. Multiple Benefits. Explainable AI. Guided Access.
            An intelligent assistance layer coordinating discovery, deterministic eligibility verification, document intelligence, and multilingual voice access.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/assistant"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onOpenVoice}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>Voice Assistant (Tamil / Hindi / English)</span>
            </button>

            <Link
              to="/explorer"
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Explore Verified Schemes
            </Link>
          </div>

          {/* Digital Ecosystem Clarification Banner (Requirement #1) */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Intelligent assistance layer connecting citizens with official platforms: 
              <strong className="text-slate-700 dark:text-slate-300 ml-1">myScheme</strong>, 
              <strong className="text-slate-700 dark:text-slate-300 ml-1">UMANG</strong>, 
              <strong className="text-slate-700 dark:text-slate-300 ml-1">DigiLocker</strong> & State Portals.
            </span>
          </div>
        </div>
      </section>

      {/* "What Can I Do?" Category Launchpad (Requirement #46) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            What would you like help with today?
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Select a life category to instantly launch multi-agent eligibility analysis and verified schemes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: "Education", label: "Education & Scholarships", icon: GraduationCap, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60" },
            { id: "Agriculture", label: "Agriculture & Farmers", icon: Tractor, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60" },
            { id: "Health", label: "Health & Ayushman", icon: Activity, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/60" },
            { id: "Housing", label: "Housing & PMAY", icon: Home, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/60" },
            { id: "Employment", label: "Jobs, MSME & Loans", icon: Briefcase, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60" },
            { id: "Social Security", label: "Pensions & Widows", icon: HeartHandshake, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/60" },
          ].map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleQuickCategory(cat.id)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all text-left flex flex-col justify-between h-32 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                    {cat.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Core Citizen Journey Architecture (Requirement #1 & #58) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            End-To-End Autonomous Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            ASK → UNDERSTAND → DISCOVER → VERIFY → EXPLAIN → PREPARE → APPLY → TRACK → FOLLOW-UP
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Multi-Agent AI & RAG
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No need to know official scheme names. Understands Tamil, Hindi, and English (e.g. <em>"Enakku college fees-ku scholarship venum"</em>) and coordinates specialized agents.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Deterministic Rule Engine
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Never lets LLM hallucinate eligibility. Rule-based evaluation checks age, income, and state bounds, explaining exactly why you qualify without false promises.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Document Intelligence & Readiness
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculates readiness scores (e.g., <em>80% Ready</em>). If missing a certificate, explains who issues it, where to apply (e-Seva), and the exact steps.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Scenario Highlight (Requirement #55 & #56) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/80 pb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                Live Interactive Scenario
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                Citizen Interaction Benchmark Scenario
              </h3>
            </div>
            <button
              onClick={() => navigate('/assistant?prompt=Naan college student. En family income around 2 lakh. Enakku government scholarship irukka?')}
              className="px-4 py-2 rounded-xl bg-white text-indigo-900 text-xs font-bold hover:bg-indigo-50 transition-colors shadow-sm self-start sm:self-center"
            >
              Run This Test in AI Assistant
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-indigo-900/40 border border-indigo-800/60">
              <span className="text-indigo-400 font-semibold block mb-1">Citizen Asks (Tamil / Tanglish):</span>
              <p className="text-sm font-medium">“Naan college student. En family income around 2 lakh. Enakku government scholarship irukka?”</p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-900/60 border border-indigo-700/60 space-y-2">
              <span className="text-emerald-400 font-semibold block">System Multi-Agent Workflow:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                <div>✓ Profile Extraction: Student, Income = ₹2 Lakh</div>
                <div>✓ Intent: Education Financial Assistance</div>
                <div>✓ Missing Info Agent: Requests State & Course level</div>
                <div>✓ Eligibility Engine: Evaluates Post-Matric & Pudhumai Penn</div>
                <div>✓ Document Readiness: Flags Income & Bonafide Certs</div>
                <div>✓ Multilingual Synthesis: Natural Tamil Speech Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
