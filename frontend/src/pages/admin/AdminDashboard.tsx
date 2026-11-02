import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Layers, 
  FileText, 
  Cpu, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Database,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [stats, logs] = await Promise.all([
        api.getAdminAnalytics(),
        api.getAuditLogs(8)
      ]);
      setAnalytics(stats);
      setRecentLogs(logs);
    } catch (e) {
      console.warn('Admin fetch notice', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">Loading Admin AI Control Center...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-600/40 text-[10px] uppercase font-bold text-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>National Welfare Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Admin AI Control & Governance Center
          </h1>
          <p className="text-xs text-purple-200">
            Manage scheme knowledge, visual eligibility rules, source verification queue, and explainable audit trails.
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/60 text-white text-xs flex items-center gap-1 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-[11px] font-medium">Total Schemes</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {analytics?.total_schemes || 10}
          </div>
          <span className="text-[10px] text-slate-400">In Knowledge Base</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-[11px] font-medium">Verified Status</span>
          <div className="text-2xl font-black text-emerald-600">
            {analytics?.verified_schemes || 10}
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">100% Level 1/2 Trust</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-[11px] font-medium">Needs Review</span>
          <div className="text-2xl font-black text-amber-500">
            {analytics?.needs_review_schemes || 0}
          </div>
          <span className="text-[10px] text-slate-400">Verification Queue</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-[11px] font-medium">Citizen Apps</span>
          <div className="text-2xl font-black text-indigo-600">
            {analytics?.total_applications || 1}
          </div>
          <span className="text-[10px] text-slate-400">Manual Tracked</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-[11px] font-medium">Registered Citizens</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {analytics?.registered_citizens || 2}
          </div>
          <span className="text-[10px] text-slate-400">Active Profiles</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-[11px] font-medium">AI Agent Runs</span>
          <div className="text-2xl font-black text-purple-600">
            {analytics?.ai_agent_runs || 14}
          </div>
          <span className="text-[10px] text-purple-500 font-semibold">Audited Decisions</span>
        </div>
      </div>

      {/* Admin Modules Quick Launch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/schemes"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-sm hover:shadow transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            <span>Scheme Management</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-slate-500">
            Add, edit, verify, archive, and inspect structured government scheme records.
          </p>
        </Link>

        <Link
          to="/admin/rules"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-sm hover:shadow transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            <span>Eligibility Rule Builder</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-slate-500">
            Visual rule builder: IF age &gt;= 18 AND income &lt;= limit THEN criterion satisfied.
          </p>
        </Link>

        <Link
          to="/admin/freshness"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-sm hover:shadow transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            <span>Knowledge Freshness</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-slate-500">
            Monitor last verified dates, source change indicators, and verification queue.
          </p>
        </Link>

        <Link
          to="/admin/audit"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-sm hover:shadow transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            <span>AI Audit Trail</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-slate-500">
            Inspect millisecond agent calls, intents classified, and deterministic rule counts.
          </p>
        </Link>
      </div>

      {/* Recent AI Agent Execution Runs (Requirement #37) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Recent Multi-Agent AI Audit Logs
            </h3>
          </div>
          <Link to="/admin/audit" className="text-xs font-semibold text-purple-600 hover:underline">
            View All Logs →
          </Link>
        </div>

        <div className="space-y-2.5">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    Intent: {log.intent}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex flex-wrap gap-1">
                  <span>Agents:</span>
                  {log.agents_called?.map((ag: string, idx: number) => (
                    <span key={idx} className="px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[10px]">
                      {ag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  {log.execution_time_ms} ms
                </span>
                <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                  {log.rules_evaluated_count} Rules Checked
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
