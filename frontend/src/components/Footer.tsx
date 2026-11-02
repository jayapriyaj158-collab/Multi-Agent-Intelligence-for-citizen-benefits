import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                CB
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                {t.appName}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.footerMission}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.footerArchitectureActive}</span>
            </div>
          </div>

          {/* Col 2: Digital Ecosystem Layer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footerOfficialEcosystem}
            </h4>
            <p className="text-xs text-slate-500">
              {t.footerEcosystemDesc}
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 inline-flex items-center gap-1">
                  myScheme Portal <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://web.umang.gov.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 inline-flex items-center gap-1">
                  UMANG Unified Services <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://www.digilocker.gov.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 inline-flex items-center gap-1">
                  DigiLocker Digital Docs <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://services.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 inline-flex items-center gap-1">
                  National Govt Services Portal <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Citizen Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/explorer" className="hover:text-indigo-600">{t.navExplorer}</Link></li>
              <li><Link to="/assistant" className="hover:text-indigo-600">{t.navAssistant}</Link></li>
              <li><Link to="/documents" className="hover:text-indigo-600">{t.navDocuments}</Link></li>
              <li><Link to="/benefit-gap" className="hover:text-indigo-600">{t.navBenefitGap}</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-600">{t.navDashboard}</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600">{t.navHome}</Link></li>
            </ul>
          </div>

          {/* Col 4: Real-World Policy Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footerDisclaimerTitle}
            </h4>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
              <span className="font-semibold block mb-1">{t.footerDisclaimerNotice}</span>
              {t.footerDisclaimerText}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">{t.footerLanguages}</span>
            <Link to="/admin" className="text-slate-400 hover:text-purple-600 text-[11px]">{t.footerAdmin}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
