import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Lock, Mail, ArrowRight, UserCheck, ShieldCheck, AlertCircle, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemoCitizen, loginAsDemoAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(identifier.trim(), password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || (language === 'ta' ? 'உள்நுழைவு தோல்வியடைந்தது' : language === 'hi' ? 'लॉगिन विफल रहा' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleCitizenQuickLogin = async () => {
    setLoading(true);
    try {
      await loginAsDemoCitizen();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickLogin = async () => {
    setLoading(true);
    try {
      await loginAsDemoAdmin();
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    const msg = language === 'ta'
      ? "கடவுச்சொல் மீட்டெடுப்பு வழிமுறைகள் உங்கள் பதிவுசெய்யப்பட்ட மின்னஞ்சல் அல்லது கைபேசிக்கு அனுப்பப்படும்."
      : language === 'hi'
      ? "पासवर्ड रीसेट निर्देश आपके पंजीकृत ईमेल या मोबाइल नंबर पर भेजे जाएंगे।"
      : "Password reset instructions will be sent to your registered email address or mobile number.";
    alert(msg);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* Language Selector at the top of Login page */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Globe className="w-4 h-4 text-indigo-600" />
          <span>{t.languageLabel}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              language === 'en'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('ta')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              language === 'ta'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            தமிழ்
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              language === 'hi'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
          <Bot className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {language === 'en' ? "Citizen Benefit Intelligence" : t.appName}
        </h1>
        <p className="text-xs text-slate-500">
          {t.loginSubtitle}
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1-Click Fast Logins */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
          {t.quickAccessHeading}
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCitizenQuickLogin}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50/50 text-indigo-950 dark:text-indigo-200 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span>{t.quickCitizenLogin}</span>
          </button>
          <button
            type="button"
            onClick={handleAdminQuickLogin}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>{t.quickAdminLogin}</span>
          </button>
        </div>
      </div>

      {/* Regular Email/Mobile & Password Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            {t.emailOrMobile}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={t.emailOrMobile}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t.password}
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              {t.forgotPassword}
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
        >
          <span>{t.signInToAccount}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="text-center pt-2 text-xs text-slate-500">
          {t.dontHaveAccount}{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-semibold">
            {t.createCitizenProfile}
          </Link>
        </div>
      </form>
    </div>
  );
};
