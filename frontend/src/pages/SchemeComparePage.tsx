import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Scale, ArrowLeft, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Scheme } from '../types';

export const SchemeComparePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (!idsParam) {
      setLoading(false);
      return;
    }
    const ids = idsParam.split(',').filter(Boolean);
    const fetchCompare = async () => {
      setLoading(true);
      try {
        const res = await api.compareSchemes(ids);
        setSchemes(res.schemes);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCompare();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">Assembling factual side-by-side scheme comparison matrix...</p>
      </div>
    );
  }

  if (schemes.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <Scale className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Schemes Selected</h2>
        <p className="text-xs text-slate-500">Go to the Scheme Explorer and select 2 to 4 schemes using the scale icon to compare them.</p>
        <Link to="/explorer" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
          Open Scheme Explorer
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/explorer" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Explorer</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-6 h-6 text-indigo-600" />
            <span>Factual Scheme Comparison Matrix</span>
          </h1>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Comparing {schemes.length} Schemes
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
              <th className="p-4 sm:p-5 w-48 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Comparison Factors
              </th>
              {schemes.map((s) => (
                <th key={s.id} className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white min-w-[240px]">
                  <Link to={`/schemes/${s.scheme_id}`} className="hover:text-indigo-600">
                    {s.scheme_name}
                  </Link>
                  <span className="block text-[10px] text-indigo-600 dark:text-indigo-400 font-normal mt-0.5">
                    {s.ministry}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {/* Category & Level */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Category & Level</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  <span className="font-semibold text-slate-900 dark:text-white block">{s.category}</span>
                  <span className="text-slate-500 text-[11px]">{s.government_level} ({s.state})</span>
                </td>
              ))}
            </tr>

            {/* Benefit Details */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Benefits & Payout</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  <span className="font-medium text-emerald-700 dark:text-emerald-300 block">{s.benefits}</span>
                  <span className="text-slate-400 text-[10px] block mt-1">Disbursement: {s.frequency}</span>
                </td>
              ))}
            </tr>

            {/* Income Ceiling */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Income Criteria</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 font-semibold">
                  {s.income_limit ? `≤ ₹${s.income_limit.toLocaleString()} / year` : 'No Income Ceiling'}
                </td>
              ))}
            </tr>

            {/* Age Bounds */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Age Limits</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  {s.age_min || 0} to {s.age_max || 'No upper cap'} years
                </td>
              ))}
            </tr>

            {/* Target Group */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Target Group</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  {s.target_group}
                </td>
              ))}
            </tr>

            {/* Required Documents */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Documents Required</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 space-y-1">
                  {s.required_documents?.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </td>
              ))}
            </tr>

            {/* Application Mode & Official URL */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Application Mode</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 space-y-1.5">
                  <span className="font-semibold block">{s.application_mode}</span>
                  <a
                    href={s.official_application_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    Official Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              ))}
            </tr>

            {/* Deadline */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">Deadline / Window</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 font-medium">
                  {s.deadline || 'Open Year-Round'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
