import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Archive, 
  ExternalLink, 
  ArrowLeft, 
  Clock, 
  Layers,
  Check,
  AlertTriangle
} from 'lucide-react';
import { api } from '../../services/api';
import { Scheme } from '../../types';

export const AdminSchemesPage: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminSchemes(filterStatus === 'All' ? undefined : filterStatus);
      setSchemes(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [filterStatus]);

  const handleVerify = async (id: number) => {
    try {
      await api.verifyScheme(id);
      await fetchSchemes();
      alert("Scheme marked as VERIFIED and last verified timestamp updated.");
    } catch (e) {
      alert("Verification update failed.");
    }
  };

  const handleArchive = async (id: number) => {
    if (!confirm("Are you sure you want to archive this scheme?")) return;
    try {
      await api.archiveScheme(id);
      await fetchSchemes();
    } catch (e) {
      alert("Archive failed.");
    }
  };

  const filtered = schemes.filter(s => 
    searchQuery === '' || 
    s.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 font-medium mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Center</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Scheme Knowledge Base Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Inspect verified records, trigger administrative verification, or archive outdated welfare schemes.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme name or category..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-slate-500">Verification Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="VERIFIED">Verified</option>
            <option value="NEEDS_REVIEW">Needs Review</option>
            <option value="DEMO">Demo Data</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">Loading scheme records...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="p-4">Scheme Name & Ministry</th>
                <th className="p-4">Category & Level</th>
                <th className="p-4">Status</th>
                <th className="p-4">Trust Level</th>
                <th className="p-4">Last Verified</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4">
                    <Link to={`/schemes/${s.scheme_id}`} className="font-bold text-slate-900 dark:text-white hover:text-indigo-600">
                      {s.scheme_name}
                    </Link>
                    <span className="block text-[11px] text-slate-400 mt-0.5">{s.ministry}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold block">{s.category}</span>
                    <span className="text-[11px] text-slate-400">{s.government_level} ({s.state})</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.verification_status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      s.verification_status === 'NEEDS_REVIEW' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {s.verification_status}
                    </span>
                  </td>
                  <td className="p-4 font-mono">
                    Level {s.source_level}
                  </td>
                  <td className="p-4 text-slate-500">
                    {s.last_verified_at ? s.last_verified_at.split('T')[0] : '2026-09-20'}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {s.verification_status !== 'VERIFIED' && (
                      <button
                        onClick={() => handleVerify(s.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                      >
                        Verify
                      </button>
                    )}
                    <a
                      href={s.official_source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-[11px] inline-flex items-center gap-1"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                    {s.verification_status !== 'ARCHIVED' && (
                      <button
                        onClick={() => handleArchive(s.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-[11px] font-medium"
                      >
                        Archive
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
