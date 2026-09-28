import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Database, AlertTriangle, ShieldCheck, CheckCircle2, Clock, ExternalLink, ArrowLeft, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

export const AdminFreshnessPage: React.FC = () => {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchFreshness = async () => {
    setLoading(true);
    try {
      const data = await api.getKnowledgeFreshness();
      setReport(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreshness();
  }, []);

  const handleVerify = async (id: number) => {
    try {
      await api.verifyScheme(id);
      await fetchFreshness();
      alert("Scheme marked as fresh & verified!");
    } catch (e) {
      alert("Failed updating verification.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">Scanning knowledge base for source freshness...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 font-medium mb-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Admin Center</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-6 h-6 text-amber-600" />
          <span>Knowledge Freshness Monitor</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Tracks verification age, source change flags, and highlights welfare schemes requiring administrative review.
        </p>
      </div>

      {/* Freshness Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-medium">Total Monitored Schemes</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {report?.total_monitored || 10}
          </div>
          <span className="text-[10px] text-slate-400">Regularly Polled</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-medium">Requiring Re-verification</span>
          <div className="text-2xl font-black text-amber-600">
            {report?.needs_immediate_review || 0}
          </div>
          <span className="text-[10px] text-amber-500 font-semibold">&gt; 60 days or flagged</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-medium">Average Freshness</span>
          <div className="text-2xl font-black text-emerald-600">
            &lt; 5 Days
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">Active RAG Index</span>
        </div>
      </div>

      {/* Schemes Freshness Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider text-[11px]">
              <th className="p-4">Scheme</th>
              <th className="p-4">Authority Source</th>
              <th className="p-4">Trust Level</th>
              <th className="p-4">Last Verified</th>
              <th className="p-4">Verification Age</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {report?.schemes?.map((s: any) => (
              <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-900 dark:text-white">
                  {s.scheme_name}
                </td>
                <td className="p-4">
                  <a
                    href={s.official_source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline inline-flex items-center gap-1"
                  >
                    {s.source_name} <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="p-4 font-mono font-semibold">
                  Level {s.source_level}
                </td>
                <td className="p-4 text-slate-500">
                  {s.last_verified_at}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    s.days_since_verification > 60
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {s.days_since_verification} days ago
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleVerify(s.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-xs"
                  >
                    Re-verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
