import React, { useState, useEffect } from 'react';
import { Bookmark, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Scheme } from '../types';
import { SchemeCard } from '../components/SchemeCard';
import { useLanguage } from '../contexts/LanguageContext';

export const SavedSchemesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [savedSchemes, setSavedSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const data = await api.getSavedSchemes();
      setSavedSchemes(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'தகவல் பலகைக்கு திரும்புக' : language === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-indigo-600" />
            <span>{language === 'ta' ? 'சேமிக்கப்பட்ட திட்டங்கள்' : language === 'hi' ? 'सहेजी गई योजनाएं' : 'Saved Schemes'} ({savedSchemes.length})</span>
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">
            {language === 'ta' ? 'சேமிக்கப்பட்ட திட்டங்கள் ஏற்றப்படுகின்றன...' : language === 'hi' ? 'सहेजी गई योजनाएं लोड हो रही हैं...' : 'Loading your bookmarked schemes...'}
          </p>
        </div>
      ) : savedSchemes.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
            {language === 'ta' ? 'சேமிக்கப்பட்ட திட்டங்கள் எதுவும் இல்லை' : language === 'hi' ? 'कोई सहेजी गई योजना नहीं है' : 'No Bookmarked Schemes'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'ta' ? 'திட்டங்களை ஆராயும்போது அல்லது AI உதவியாளரிடம் கேட்கும்போது அவற்றை பின்னர் பார்க்க சேமிக்கலாம்.' : language === 'hi' ? 'आप योजनाओं की खोज करते समय या एआई सहायक से पूछते समय बाद में देखने के लिए उन्हें सहेज सकते हैं।' : 'You can bookmark schemes while exploring or asking the AI Assistant to review them later.'}
          </p>
          <Link
            to="/explorer"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            <span>{t.viewAllSchemes}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedSchemes.map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              isSaved={true}
              onToggleSave={fetchSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
};
