import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Bookmark, 
  AlertCircle,
  FolderOpen,
  Calendar,
  Layers,
  GraduationCap,
  Tractor,
  Home,
  Activity,
  Briefcase
} from 'lucide-react';
import { api } from '../services/api';
import { Scheme, ApplicationItem, DocumentItem, NotificationItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { SchemeCard } from '../components/SchemeCard';
import { useLanguage } from '../contexts/LanguageContext';

export const CitizenDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const { t, language, translateCategory, translateState, translateOccupation, translateSchemeName, translateSchemeBenefits } = useLanguage();
  const navigate = useNavigate();

  const [recommendedSchemes, setRecommendedSchemes] = useState<Scheme[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [benefitGap, setBenefitGap] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [schemesData, appsData, docsData, notifsData, gapData] = await Promise.all([
          api.getSchemes({
            state: profile?.state || 'All India',
            occupation: profile?.occupation || undefined,
            max_income: profile?.annual_income || undefined
          }),
          api.getApplications(),
          api.getDocuments(),
          api.getNotifications(),
          api.getBenefitGaps()
        ]);

        setRecommendedSchemes(schemesData.slice(0, 3));
        setApplications(appsData);
        setDocuments(docsData);
        setNotifications(notifsData);
        setBenefitGap(gapData);
      } catch (e) {
        console.warn('Dashboard fetch notice', e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [profile]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">
          {language === 'ta' ? 'உங்கள் நலத்திட்ட நுண்ணறிவு பலகை தயாராகிறது...' : language === 'hi' ? 'आपका कल्याण डैशबोर्ड तैयार किया जा रहा है...' : 'Assembling your Benefit Intelligence dashboard...'}
        </p>
      </div>
    );
  }

  const completionPct = profile?.completion_percentage || 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-lg">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
            {t.appName}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {t.dashGreeting}, {user?.full_name || t.citizen}!
          </h1>
          <p className="text-xs text-indigo-200">
            {translateOccupation(profile?.occupation)} • {translateState(profile?.state || 'All India')} • {t.income}: {profile?.annual_income ? `₹${profile.annual_income.toLocaleString()}` : t.notSpecified}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/assistant"
            className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:bg-indigo-50 transition-colors"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>{t.askAssistantBtn}</span>
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 border border-indigo-500/40 text-white font-semibold text-xs transition-colors"
          >
            {t.editProfileBtn}
          </Link>
        </div>
      </div>

      {/* Notifications Alert Banner (Requirement #33 & #45) */}
      {notifications.filter(n => !n.is_read).length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{language === 'ta' ? 'புதிய நலத்திட்ட அறிவிப்புகள்' : language === 'hi' ? 'नई कल्याण सूचनाएं' : 'Unread Benefit Alerts'}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-extrabold">
                  {notifications.filter(n => !n.is_read).length}
                </span>
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {notifications.find(n => !n.is_read)?.title}: {notifications.find(n => !n.is_read)?.message}
              </p>
            </div>
          </div>
          {notifications.find(n => !n.is_read)?.action_url && (
            <Link
              to={notifications.find(n => !n.is_read)!.action_url!}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1 shrink-0 self-start sm:self-center transition"
            >
              <span>{language === 'ta' ? 'நடவடிக்கை எடுக்க' : language === 'hi' ? 'कार्रवाई करें' : 'Take Action'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}

      {/* Action Center ("My Next Actions" - Requirement #45) */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            {t.myNextActions}
          </h2>
          <span className="text-xs text-slate-500">
            {t.actionEngine}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Action 1: Documents */}
          <Link
            to="/documents"
            className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 hover:scale-[1.02] transition-transform space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
                🔴 {t.actionRequired}
              </span>
              <FileText className="w-4 h-4 text-rose-600" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white pt-1">
              {t.actionUploadIncome}
            </h4>
            <p className="text-[11px] text-slate-500">
              {t.actionUploadIncomeDesc}
            </p>
          </Link>

          {/* Action 2: Deadline */}
          <Link
            to="/applications"
            className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 hover:scale-[1.02] transition-transform space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                🟡 {t.deadlineWindow}
              </span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white pt-1">
              {t.scholarshipVerification}
            </h4>
            <p className="text-[11px] text-slate-500">
              {t.scholarshipVerificationDesc}
            </p>
          </Link>

          {/* Action 3: Profile Completion */}
          <Link
            to="/profile"
            className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 hover:scale-[1.02] transition-transform space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                🟢 {completionPct}%
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white pt-1">
              {t.profileAlmostReady}
            </h4>
            <p className="text-[11px] text-slate-500">
              {t.profileAlmostReadyDesc}
            </p>
          </Link>

          {/* Action 4: Tracking */}
          <Link
            to="/applications"
            className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 hover:scale-[1.02] transition-transform space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                🔵 {t.inScrutiny}
              </span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white pt-1">
              {t.checkAppStatus}
            </h4>
            <p className="text-[11px] text-slate-500">
              {applications.length > 0 ? `${applications.length} ${t.activeAppsCount}.` : t.checkAppStatusDesc}
            </p>
          </Link>
        </div>
      </section>

      {/* Summary KPI Cards (Requirement #32) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-medium">{t.recommendedForYou}</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {recommendedSchemes.length}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">{t.basedOnProfile}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-medium">{t.docsVerifiedCount}</span>
          <div className="text-2xl font-extrabold text-indigo-600">
            {documents.length} / 5
          </div>
          <span className="text-[10px] text-indigo-500 font-semibold">{t.formatVerified}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-medium">{t.activeAppsCount}</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {applications.length}
          </div>
          <span className="text-[10px] text-slate-500 font-semibold">{t.manualTrackingText}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-medium">{t.upcomingDeadlines}</span>
          <div className="text-2xl font-extrabold text-amber-600">
            2
          </div>
          <span className="text-[10px] text-amber-600 font-semibold">{t.within30Days}</span>
        </div>
      </div>

      {/* Benefit Gap Alert (Requirement #20 & #44A) */}
      {benefitGap?.has_gap && (
        <section className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-700/60 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <h3 className="font-bold text-base">
                {t.benefitGapMissingTitle}
              </h3>
            </div>
            <Link
              to="/benefit-gap"
              className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1"
            >
              <span>{t.exploreComplementary}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-purple-200 leading-relaxed">
            {t.beyondScholarship}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {benefitGap.recommended_schemes.map((s: any, idx: number) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/80 text-xs space-y-1"
              >
                <span className="text-[10px] font-semibold text-purple-300 block">{translateCategory(s.category)}</span>
                <h4 className="font-bold text-white line-clamp-1">{translateSchemeName(s.scheme_id, s.scheme_name)}</h4>
                <p className="text-[11px] text-slate-300">{translateSchemeBenefits(s.scheme_id, s.benefit_type)}</p>
                <div className="pt-1">
                  <Link to={`/schemes/${s.scheme_id}`} className="text-[11px] text-emerald-400 font-semibold hover:underline">
                    {t.viewEligibility} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Schemes Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.topSchemesRecommended}
          </h2>
          <Link to="/explorer" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1">
            <span>{t.viewAllSchemes}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedSchemes.map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              eligibilityStatus="LIKELY ELIGIBLE"
              matchScore={88}
              readinessPercentage={75}
              rankingReason="Matches your education profile and income range"
            />
          ))}
        </div>
      </section>
    </div>
  );
};
