import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Mic, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  Globe, 
  Accessibility,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';
import { useSimpleMode } from '../contexts/SimpleModeContext';
import { NotificationPopover } from './NotificationPopover';

interface NavbarProps {
  onOpenVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVoice }) => {
  const { user, isAuthenticated, isAdmin, logout, loginAsDemoCitizen, loginAsDemoAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { isSimpleMode, toggleSimpleMode } = useSimpleMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      {/* Top Tiranga Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  {language === 'en' ? (
                    <>Citizen Benefit <span className="text-indigo-600 dark:text-indigo-400">Intelligence</span></>
                  ) : (
                    <span>{t.appName}</span>
                  )}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  {t.appSubtitle}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              to="/explorer" 
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {t.navExplorer}
            </Link>
            <Link 
              to="/assistant" 
              className="px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              {t.navAssistant}
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {t.navDashboard}
                </Link>
                <Link 
                  to="/documents" 
                  className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {t.navDocuments}
                </Link>
                <Link 
                  to="/applications" 
                  className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {t.navApplications}
                </Link>
                <Link 
                  to="/benefit-gap" 
                  className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {t.navBenefitGap}
                </Link>
              </>
            )}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="px-3 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                {t.navAdmin}
              </Link>
            )}
          </nav>

          {/* Action Tools: Voice, Language, Simple Mode & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Voice Assistant Trigger */}
            <button
              onClick={onOpenVoice}
              title="Voice Assistant (Tamil / Hindi / English)"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">{t.speakBtn}</span>
            </button>

            {/* Simple Mode Toggle */}
            <button
              onClick={toggleSimpleMode}
              title={isSimpleMode ? "Exit Simple Mode" : "Turn on Simple Mode"}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-medium ${
                isSimpleMode 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md animate-pulse-subtle' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Accessibility className="w-4 h-4" />
              <span className="hidden lg:inline">{t.simpleModeBtn}</span>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 mr-1 text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            {/* User Account / 1-Click Login */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <NotificationPopover />
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <UserIcon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline max-w-[100px] truncate">{user?.full_name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  title={t.logoutBtn}
                  className="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={loginAsDemoCitizen}
                  title="Citizen Login"
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors shadow-sm"
                >
                  {t.quickCitizenLogin}
                </button>
                <button
                  onClick={loginAsDemoAdmin}
                  title="Admin Login"
                  className="hidden sm:block px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium transition-colors"
                >
                  {t.quickAdminLogin}
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <Link
              to="/explorer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100"
            >
              {t.navExplorer}
            </Link>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-50"
            >
              {t.navAssistant}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100"
                >
                  {t.navDashboard}
                </Link>
                <Link
                  to="/documents"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100"
                >
                  {t.navDocuments}
                </Link>
                <Link
                  to="/applications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100"
                >
                  {t.navApplications}
                </Link>
                <Link
                  to="/benefit-gap"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100"
                >
                  {t.navBenefitGap}
                </Link>
              </>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-purple-700 rounded-md hover:bg-purple-50"
              >
                {t.navAdmin}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
