import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                CB
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                {t.appName}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.footerAbout}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.quickLinks}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/explorer" className="hover:text-indigo-600">{t.navExplorer}</Link></li>
              <li><Link to="/assistant" className="hover:text-indigo-600">{t.navAssistant}</Link></li>
              <li><Link to="/documents" className="hover:text-indigo-600">{t.navDocuments}</Link></li>
              <li><Link to="/benefit-gap" className="hover:text-indigo-600">{t.navBenefitGap}</Link></li>
              <li><Link to="/support" className="hover:text-indigo-600">{t.navSupport}</Link></li>
            </ul>
          </div>

          {/* Col 3: Advisory Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.disclaimerTitle}
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.disclaimerText}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Languages: English • தமிழ் • हिन्दी</span>
            <Link to="/admin" className="text-slate-400 hover:text-purple-600 text-[11px]">{t.adminControlCenter}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
