import React from 'react';
import { X, CheckCircle2, Clock, ShieldCheck, ExternalLink, Cpu, Database } from 'lucide-react';
import { AgentTraceItem, CitationItem } from '../types';

interface AIAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentsCalled: AgentTraceItem[];
  citations: CitationItem[];
  totalTimeMs?: number;
  intent?: string;
}

export const AIAuditModal: React.FC<AIAuditModalProps> = ({
  isOpen,
  onClose,
  agentsCalled,
  citations,
  totalTimeMs,
  intent
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                Multi-Agent Reasoning & Audit Trail
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Explainable AI
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Transparent verification trail: User Intent → Agent Coordination → Grounded Sources
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Classified Intent
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
              {intent || "FIND_SCHEME"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Agents Orchestrated
            </span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
              {agentsCalled.length} Specialized Agents
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Total Latency
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {totalTimeMs ? `${totalTimeMs} ms` : "Instant"}
            </span>
          </div>
        </div>

        {/* Agent Execution Flow */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Agent Coordination Sequence:
          </h4>
          <div className="space-y-2">
            {agentsCalled.map((agent, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {agent.agent_name}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                      {agent.summary}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 shrink-0">
                  {agent.duration_ms} ms
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grounded Evidence & Citations */}
        {citations.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              Verified Government Sources Cited:
            </h4>
            <div className="space-y-2">
              {citations.map((cite, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      {cite.source_name}
                      <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                        Trust Level {cite.source_level}
                      </span>
                    </span>
                    <a
                      href={cite.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      Official Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    "{cite.relevance_snippet}"
                  </p>
                  <div className="text-[10px] text-slate-400">
                    Last Verified: {cite.last_verified}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 text-[11px] text-slate-400 text-center">
          Rule-based evaluations are executed deterministically in compliance with AI explainability and ethical guidelines.
        </div>
      </div>
    </div>
  );
};
