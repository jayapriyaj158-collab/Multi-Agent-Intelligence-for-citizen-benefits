import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Clock, 
  FileCheck2, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Check, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Scheme } from '../types';
import { EligibilityBadge } from './EligibilityBadge';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface SchemeCardProps {
  scheme: Scheme;
  eligibilityStatus?: string;
  matchScore?: number;
  readinessPercentage?: number;
  rankingReason?: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onSelectForCompare?: (schemeId: string) => void;
  isSelectedForCompare?: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  eligibilityStatus = 'POTENTIALLY ELIGIBLE',
  matchScore = 82,
  readinessPercentage = 75,
  rankingReason,
  isSaved = false,
  onToggleSave,
  onSelectForCompare,
  isSelectedForCompare = false
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    t, 
    language,
    translateCategory, 
    translateState, 
    translateSchemeName,
    translateSchemeShortName,
    translateSchemeDescription, 
    translateSchemeBenefits, 
    translateRankingReason 
  } = useLanguage();
  const [savedState, setSavedState] = useState(isSaved);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSaveLoading(true);
    try {
      const res = await api.toggleSaveScheme(scheme.id);
      setSavedState(res.saved);
      if (onToggleSave) onToggleSave();
    } catch (e) {
      console.warn(e);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 flex flex-col justify-between space-y-4">
      {/* Top Meta: Level, Category, and Badges */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {translateCategory(scheme.category)}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {translateState(scheme.state)}
            </span>
            {scheme.is_umang_supported && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                UMANG
              </span>
            )}
            {scheme.is_digilocker_supported && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                DigiLocker
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onSelectForCompare && (
              <button
                onClick={() => onSelectForCompare(scheme.scheme_id)}
                title={language === 'ta' ? "ஒப்பிடுவதற்குத் தேர்ந்தெடுக்கவும்" : language === 'hi' ? "तुलना के लिए चुनें" : "Select for Comparison"}
                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                  isSelectedForCompare
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saveLoading}
              title={savedState ? (language === 'ta' ? "சேமிக்கப்பட்டதிலிருந்து அகற்று" : language === 'hi' ? "सहेजे गए से हटाएं" : "Remove from Saved") : (language === 'ta' ? "திட்டத்தைச் சேமி" : language === 'hi' ? "योजना सहेजें" : "Save Scheme")}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              {savedState ? (
                <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Scheme Title */}
        <Link to={`/schemes/${scheme.scheme_id}`} className="block group-hover:text-indigo-600 transition-colors">
          <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug line-clamp-2">
            {translateSchemeName(scheme.scheme_id, scheme.scheme_name)}
          </h3>
          {scheme.short_name && (
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
              ({translateSchemeShortName(scheme.scheme_id, scheme.short_name)})
            </p>
          )}
        </Link>

        {/* Transparent Ranking Reason if available */}
        {rankingReason && (
          <div className="mt-2 text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{t.whyThisRanks}: {translateRankingReason(rankingReason)}</span>
          </div>
        )}

        {/* Brief Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
          {translateSchemeDescription(scheme.scheme_id, scheme.description)}
        </p>

        {/* Benefits Highlight Box */}
        <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
            {t.keyBenefits}:
          </span>
          <span className="text-slate-900 dark:text-slate-200 font-medium line-clamp-2">
            {translateSchemeBenefits(scheme.scheme_id, scheme.benefits)}
          </span>
        </div>
      </div>

      {/* Intelligence & Readiness Metrics */}
      <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <EligibilityBadge status={eligibilityStatus} size="sm" />

          {/* AI Match Score with Disclaimer Tooltip */}
          <div className="relative group/tooltip flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800 cursor-help">
            <span>{matchScore}% {t.profileMatch}</span>
            <AlertCircle className="w-3 h-3 text-indigo-400" />
            <div className="absolute bottom-full right-0 mb-1 hidden group-hover/tooltip:block w-48 p-2 rounded bg-slate-900 text-white text-[10px] leading-tight shadow-xl z-20">
              {t.matchTooltip}
            </div>
          </div>
        </div>

        {/* Document Readiness Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="flex items-center gap-1 font-medium">
              <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
              {t.docPrepReadiness}:
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {readinessPercentage}% {t.readyLabel}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                readinessPercentage >= 80 ? 'bg-emerald-500' : readinessPercentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${readinessPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Deadline & Verified Date info */}
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {scheme.deadline === 'Ongoing' ? (language === 'ta' ? 'தொடர்ந்து செயல்பாட்டில்' : language === 'hi' ? 'निरंतर चालू' : 'Ongoing') : (scheme.deadline || t.openYearRound)}
          </span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3 h-3" />
            {scheme.verification_status === "VERIFIED" ? t.verifiedData : t.catalogData}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            to={`/schemes/${scheme.scheme_id}`}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 text-center transition-colors"
          >
            {t.viewDetails}
          </Link>
          <Link
            to={`/assistant?scheme=${scheme.scheme_id}&action=apply`}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold text-center transition-colors shadow-sm flex items-center justify-center gap-1"
          >
            <span>{t.helpMeApply}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
