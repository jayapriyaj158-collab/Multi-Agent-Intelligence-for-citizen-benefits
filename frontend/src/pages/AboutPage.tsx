import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ShieldCheck, ArrowRight, Layers, Cpu, Database, CheckCircle2, Lock } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Autonomous Multi-Agent AI System
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Multi-Agent Intelligence for Citizen Benefits
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
          An AI orchestration and assistance layer built above India's existing digital public infrastructure to empower every citizen to discover, verify, prepare, and apply for government benefits.
        </p>
      </div>

      {/* Differentiation Matrix (Requirement #1) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Architectural Differentiation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Flow */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold uppercase text-slate-500 block">
              Existing Government Portals
            </span>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600">
                1. Citizen must know keywords or official scheme names
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600">
                2. Static scheme brochures and lengthy PDFs
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600">
                3. Citizen left to self-interpret complex eligibility criteria
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600">
                4. Basic application link with no document guidance or follow-up
              </div>
            </div>
          </div>

          {/* Our Platform */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
            <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
              Our Multi-Agent Intelligence System
            </span>
            <div className="space-y-2 text-xs text-indigo-950 dark:text-indigo-200 font-medium">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800">
                ✓ Natural Voice/Text in Regional Languages (Tamil, Hindi, English)
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800">
                ✓ Automated Demographic & Income Extraction (No redundant questions)
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800">
                ✓ Deterministic Rule Engine + Explainable Eligibility Breakdown
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800">
                ✓ Document Intelligence, OCR, Readiness Score & Missing Doc Guides
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Security Architecture (Requirements #26 & #54) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Deterministic AI Policy
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eliminates LLM hallucinations. All eligibility calculations are executed by a strict rule engine; LLMs are utilized only for natural language understanding and multilingual generation.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            4-Tier Source Trust Model
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Prefers Level 1 & 2 Central/State official government gazettes. Every recommendation links directly to official government portal URLs with verified timestamps.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Privacy-First Architecture
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Complies with minimal data collection norms. Never stores unmasked Aadhaar, passwords in plaintext, or bank credentials.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/how-it-works"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs hover:scale-105 transition-all shadow"
        >
          <span>Explore Step-by-Step Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
