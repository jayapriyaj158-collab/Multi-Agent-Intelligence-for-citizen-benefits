import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Compass, 
  GraduationCap, 
  ExternalLink 
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const BenefitGapPage: React.FC = () => {
  const { profile } = useAuth();
  const [gapData, setGapData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGap = async () => {
      setLoading(true);
      try {
        const data = await api.getBenefitGaps();
        setGapData(data);
      } catch (e) {
        console.warn('Benefit gap fetch notice', e);
      } finally {
        setLoading(false);
      }
    };
    fetchGap();
  }, [profile]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">Analyzing complete profile for unexploited benefit gaps...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-500/40 text-xs text-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span>AI Innovation: Autonomous Benefit Gap Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Benefit Gap Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
          Most citizens apply for one scheme and miss out on complementary benefits. Our AI re-evaluates your complete socio-economic profile to identify bundled entitlements you qualify for.
        </p>
      </div>

      {/* Unlocked Entitlements Bundle */}
      {gapData?.unlocked_categories && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Complimentary Welfare Categories Matching Your Profile:
          </h2>
          <div className="flex flex-wrap gap-2">
            {gapData.unlocked_categories.map((cat: string, idx: number) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Complementary Schemes */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Discovered Complementary Benefits ({gapData?.recommended_schemes?.length || 0})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gapData?.recommended_schemes?.map((s: any, idx: number) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">
                    {s.category}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {s.eligibility_status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {s.scheme_name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {s.benefit_type}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200 block text-[11px]">Why Recommended:</strong>
                  {s.why_recommended}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  {s.match_score}% Profile Similarity
                </span>
                <Link
                  to={`/schemes/${s.scheme_id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1 shadow-sm"
                >
                  <span>Explore Benefit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
