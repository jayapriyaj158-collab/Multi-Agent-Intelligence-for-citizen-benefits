import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Scale, ArrowLeft, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Scheme } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const SchemeComparePage: React.FC = () => {
  const { 
    t, 
    language, 
    translateCategory, 
    translateState, 
    translateSchemeName,
    translateMinistry,
    translateTargetGroup,
    translateDocName,
    translateSchemeBenefits 
  } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [allAvailableSchemes, setAllAvailableSchemes] = useState<Scheme[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load all available schemes for selector
  useEffect(() => {
    api.getSchemes().then(setAllAvailableSchemes).catch(console.warn);
  }, []);

  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (!idsParam) {
      setLoading(false);
      setSchemes([]);
      return;
    }
    const ids = idsParam.split(',').filter(Boolean);
    setSelectedIds(ids);
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

  const handleApplyPreset = (presetIds: string[]) => {
    setSearchParams({ ids: presetIds.join(',') });
  };

  const handleToggleSelectScheme = (schemeId: string) => {
    let next: string[];
    if (selectedIds.includes(schemeId)) {
      next = selectedIds.filter((id) => id !== schemeId);
    } else {
      if (selectedIds.length >= 4) {
        alert(language === 'ta' ? "ஒரே நேரத்தில் அதிகபட்சம் 4 திட்டங்களை மட்டுமே ஒப்பிட முடியும்." : language === 'hi' ? "आप एक साथ 4 योजनाओं तक की तुलना कर सकते हैं।" : "You can compare up to 4 schemes simultaneously.");
        return;
      }
      next = [...selectedIds, schemeId];
    }
    setSelectedIds(next);
  };

  const handleRunCustomCompare = () => {
    if (selectedIds.length < 2) {
      alert(language === 'ta' ? "ஒப்பிட குறைந்தபட்சம் 2 திட்டங்களைத் தேர்ந்தெடுக்கவும்." : language === 'hi' ? "तुलना करने के लिए कृपया कम से कम 2 योजनाओं का चयन करें।" : "Please select at least 2 schemes to compare.");
      return;
    }
    setSearchParams({ ids: selectedIds.join(',') });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">
          {language === 'ta' ? 'திட்ட ஒப்பீட்டு அட்டவணை ஒருங்கிணைக்கப்படுகிறது...' : language === 'hi' ? 'योजना तुलना तालिका तैयार की जा रही है...' : 'Assembling factual side-by-side scheme comparison matrix...'}
        </p>
      </div>
    );
  }

  if (schemes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center mx-auto text-indigo-600">
            <Scale className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t.compareMatrixTitle}</h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            {t.compareMatrixSubtitle}
          </p>
        </div>

        {/* 1-Click Comparison Presets */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t.quickPresetsHeading}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => handleApplyPreset(['SCHEME-NSP-POSTMATRIC-001', 'SCHEME-CENTRAL-SECTOR-003'])}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-left transition-all shadow-sm group"
            >
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">🎓 {translateCategory('Education')}</span>
              <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 block mt-1">
                Post-Matric Scholarship vs Central Sector Scholarship
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                {language === 'ta' ? 'சாதி அடிப்படையிலான நலத்திட்ட வரம்புகளையும் திறனறி தேர்வு வரம்புகளையும் ஒப்பிடுகிறது.' : language === 'hi' ? 'जाति-आधारित कल्याणकारी मानदंडों और योग्यता-आधारित मानदंडों की तुलना।' : 'Compares caste-based welfare criteria vs merit-based percentile criteria.'}
              </p>
            </button>

            <button
              onClick={() => handleApplyPreset(['SCHEME-TN-PUDHUMAI-002', 'SCHEME-TN-NAAN-009'])}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-left transition-all shadow-sm group"
            >
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">👩‍🎓 {translateState('Tamil Nadu')} {language === 'ta' ? 'மாணவர் நலம்' : language === 'hi' ? 'छात्र कल्याण' : 'Student Welfare'}</span>
              <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 block mt-1">
                Pudhumai Penn Scheme vs Naan Mudhalvan
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                {language === 'ta' ? 'மாதாந்திர பெண் மாணவர் உதவித்தொகை (₹1,000/மாதம்) மற்றும் தொழில் திறன் பயிற்சியை ஒப்பிடுகிறது.' : language === 'hi' ? 'मासिक छात्रा वजीफा (₹1,000/माह) और उद्योग कौशल वाउचर की तुलना।' : 'Compares monthly girl student stipend (₹1,000/mo) vs industry skilling voucher.'}
              </p>
            </button>

            <button
              onClick={() => handleApplyPreset(['SCHEME-PM-KISAN-004', 'SCHEME-PM-VISHWAKARMA-008'])}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-left transition-all shadow-sm group"
            >
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">🌾 {translateCategory('Agriculture')}</span>
              <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 block mt-1">
                PM-KISAN vs PM Vishwakarma
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                {language === 'ta' ? 'நேரடி வருமான ஆதரவு (₹6,000) மற்றும் கைவினைஞர் உதவி உபகரணங்கள் மற்றும் கடனை ஒப்பிடுகிறது.' : language === 'hi' ? 'प्रत्यक्ष आय सहायता (₹6,000) और कारीगर टूलकिट तथा रियायती ऋण की तुलना।' : 'Compares direct income support (₹6,000) vs artisan toolkit & subsidized credit.'}
              </p>
            </button>

            <button
              onClick={() => handleApplyPreset(['SCHEME-AB-PMJAY-005', 'SCHEME-PMAY-U-006'])}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-left transition-all shadow-sm group"
            >
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">🏥 {translateCategory('Health')} & {translateCategory('Housing')}</span>
              <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 block mt-1">
                Ayushman Bharat (AB-PMJAY) vs PMAY Urban 2.0
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                {language === 'ta' ? 'கட்டணமில்லா மருத்துவமனை சிகிச்சை (₹5 லட்சம்) மற்றும் வீட்டு மானிய கடனை ஒப்பிடுகிறது.' : language === 'hi' ? 'कैशलेस अस्पताल कवरेज (₹5 लाख) और आवास क्रेडिट सब्सिडी की तुलना।' : 'Compares cashless hospital coverage (₹5 Lakh) vs housing credit subsidy.'}
              </p>
            </button>
          </div>
        </div>

        {/* Custom Multi-Selector */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.manualSelectHeading}
            </h3>
            <span className="text-xs font-semibold text-indigo-600">
              {selectedIds.length} {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்டது' : language === 'hi' ? 'चयनित' : 'Selected'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {allAvailableSchemes.map((s) => {
              const checked = selectedIds.includes(s.scheme_id);
              return (
                <label
                  key={s.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors text-xs ${
                    checked
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleToggleSelectScheme(s.scheme_id)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="truncate">
                    <span className="block truncate">{translateSchemeName(s.scheme_id, s.scheme_name)}</span>
                    <span className="text-[10px] text-slate-400">{translateCategory(s.category)} • {translateState(s.state)}</span>
                  </div>
                </label>
              );
            })}
          </div>

          <button
            onClick={handleRunCustomCompare}
            disabled={selectedIds.length < 2}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            {t.compareBtnCount} ({selectedIds.length})
          </button>
        </div>
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
            <span>{t.backToExplorer}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-6 h-6 text-indigo-600" />
            <span>{t.compareMatrixTitle}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchParams({})}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.changeSchemesBtn}
          </button>
          <span className="text-xs font-semibold text-slate-500">
            {schemes.length} {t.comparingCount}
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
              <th className="p-4 sm:p-5 w-48 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                {t.compareFactorCol}
              </th>
              {schemes.map((s) => (
                <th key={s.id} className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white min-w-[240px]">
                  <Link to={`/schemes/${s.scheme_id}`} className="hover:text-indigo-600">
                    {translateSchemeName(s.scheme_id, s.scheme_name)}
                  </Link>
                  <span className="block text-[10px] text-indigo-600 dark:text-indigo-400 font-normal mt-0.5">
                    {translateMinistry(s.ministry || '')}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {/* Category & Level */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{t.categoryAndLevel}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  <span className="font-semibold text-slate-900 dark:text-white block">{translateCategory(s.category)}</span>
                  <span className="text-slate-500 text-[11px]">{s.government_level} ({translateState(s.state)})</span>
                </td>
              ))}
            </tr>

            {/* Benefit Details */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{t.benefitsAndPayout}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  <span className="font-medium text-emerald-700 dark:text-emerald-300 block">{translateSchemeBenefits(s.scheme_id, s.benefits)}</span>
                  <span className="text-slate-400 text-[10px] block mt-1">{t.disbursementLabel} {s.frequency}</span>
                </td>
              ))}
            </tr>

            {/* Income Ceiling */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{t.incomeCriteria}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 font-semibold">
                  {s.income_limit ? `≤ ₹${s.income_limit.toLocaleString()} / ${language === 'ta' ? 'ஆண்டு' : language === 'hi' ? 'वर्ष' : 'year'}` : (language === 'ta' ? 'வருமான உச்சவரம்பு இல்லை' : language === 'hi' ? 'कोई आय सीमा नहीं' : 'No Income Ceiling')}
                </td>
              ))}
            </tr>

            {/* Age Bounds */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{t.ageLimits}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  {s.age_min || 0} {language === 'ta' ? 'முதல்' : language === 'hi' ? 'से' : 'to'} {s.age_max || (language === 'ta' ? 'உச்ச வரம்பு இல்லை' : language === 'hi' ? 'कोई ऊपरी सीमा नहीं' : 'No upper cap')} {language === 'ta' ? 'ஆண்டுகள்' : language === 'hi' ? 'वर्ष' : 'years'}
                </td>
              ))}
            </tr>

            {/* Target Group */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{t.targetGroupLabel}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4">
                  {translateTargetGroup(s.target_group || '')}
                </td>
              ))}
            </tr>

            {/* Required Documents */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{t.requiredDocs}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 space-y-1">
                  {s.required_documents?.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{translateDocName(doc)}</span>
                    </div>
                  ))}
                </td>
              ))}
            </tr>

            {/* Application Mode & Official URL */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{language === 'ta' ? 'விண்ணப்ப முறை' : language === 'hi' ? 'आवेदन मोड' : 'Application Mode'}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 space-y-1.5">
                  <span className="font-semibold block">{s.application_mode}</span>
                  <a
                    href={s.official_application_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    {t.officialPortal} <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              ))}
            </tr>

            {/* Deadline */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/30">{language === 'ta' ? 'கடைசி தேதி / காலக்கெடு' : language === 'hi' ? 'अंतिम तिथि / समय सीमा' : 'Deadline / Window'}</td>
              {schemes.map((s) => (
                <td key={s.id} className="p-4 font-medium">
                  {s.deadline || (language === 'ta' ? 'ஆண்டு முழுவதும் திறந்திருக்கும்' : language === 'hi' ? 'वर्ष भर खुला' : 'Open Year-Round')}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
