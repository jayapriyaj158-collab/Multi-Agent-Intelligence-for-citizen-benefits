import React from 'react';
import { Bot, UserCheck, Search, ShieldCheck, FileCheck, HelpCircle, Navigation, Clock, Sparkles } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const agents = [
    { num: "01", name: "Citizen Profile Agent", icon: UserCheck, desc: "Extracts age, occupation, education, state, income, and social category from conversation. Identifies missing fields without redundant questions." },
    { num: "02", name: "Intent Understanding Agent", icon: Bot, desc: "Classifies 11+ citizen intents (Find Scheme, Check Eligibility, Missing Document Help, Application Guidance, Tracking, etc.)." },
    { num: "03", name: "Scheme Discovery Agent", icon: Search, desc: "Combines TF-IDF semantic vector similarity with structured database filtering (State, Occupation, Income, Education)." },
    { num: "04", name: "Deterministic Eligibility Engine", icon: ShieldCheck, desc: "Evaluates exact numerical and demographic rules without LLM hallucination. Outputs Likely Eligible, Potentially Eligible, etc." },
    { num: "05", name: "Explainable AI Agent", icon: Sparkles, desc: "Explains criterion-by-criterion why the citizen qualifies or what is missing. Provides AI Profile Match score with safe disclaimer." },
    { num: "06", name: "Document Intelligence Agent", icon: FileCheck, desc: "Performs OCR field extraction, validates name/income consistency, and computes preparation readiness score (e.g. 80% Ready)." },
    { num: "07", name: "Missing Document Guide Agent", icon: HelpCircle, desc: "Explains who issues missing certificates (e.g., Tahsildar / e-Seva), where to apply, online/offline procedures, and requirements." },
    { num: "08", name: "Application Assistant Agent", icon: Navigation, desc: "Provides step-by-step guidance for official government portal application, explains confusing form fields, and sets up tracking." },
    { num: "09", name: "Deadline & Reminder Agent", icon: Clock, desc: "Monitors verified scheme application windows, counts days remaining, and triggers deadline notifications." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          How Multi-Agent Intelligence Works
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Instead of a monolithic chatbot, our system coordinates 12 specialized agents to deliver verifiable, transparent, and actionable citizen benefit guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((ag) => {
          const IconComp = ag.icon;
          return (
            <div
              key={ag.num}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {ag.num}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {ag.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {ag.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
