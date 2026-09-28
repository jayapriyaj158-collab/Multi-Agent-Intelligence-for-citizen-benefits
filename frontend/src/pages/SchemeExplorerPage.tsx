import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Scale, 
  SlidersHorizontal, 
  ShieldCheck, 
  Check, 
  X,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { Scheme } from '../types';
import { SchemeCard } from '../components/SchemeCard';
import { useLanguage } from '../contexts/LanguageContext';

export const SchemeExplorerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [selectedState, setSelectedState] = useState<string>(searchParams.get('state') || 'All India');
  const [selectedOccupation, setSelectedOccupation] = useState<string>(searchParams.get('occupation') || 'All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [maxIncome, setMaxIncome] = useState<number | undefined>(undefined);

  // Compare tray
  const [compareList, setCompareList] = useState<string[]>([]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const data = await api.getSchemes({
        query: query.trim() || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        state: selectedState !== 'All India' ? selectedState : undefined,
        occupation: selectedOccupation !== 'All' ? selectedOccupation : undefined,
        max_income: maxIncome,
        gender: selectedGender !== 'All' ? selectedGender : undefined
      });
      setSchemes(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory, selectedState, selectedOccupation, selectedGender, maxIncome]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSchemes();
  };

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('All');
    setSelectedState('All India');
    setSelectedOccupation('All');
    setSelectedGender('All');
    setMaxIncome(undefined);
    setSearchParams({});
    fetchSchemes();
  };

  const toggleCompare = (schemeId: string) => {
    setCompareList((prev) => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 schemes at a time.");
        return prev;
      }
      return [...prev, schemeId];
    });
  };

  const handleLaunchCompare = () => {
    if (compareList.length < 2) {
      alert("Please select at least 2 schemes to compare.");
      return;
    }
    navigate(`/compare?ids=${compareList.join(',')}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.explorerHeading}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.explorerSubheading}
          </p>
        </div>

        {/* Compare Launch Button */}
        {compareList.length > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs">
            <span className="font-semibold text-indigo-700 dark:text-indigo-300">
              {compareList.length} Selected for Compare
            </span>
            <button
              onClick={handleLaunchCompare}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1 shadow-sm"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Now</span>
            </button>
            <button
              onClick={() => setCompareList([])}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            {t.send}
          </button>
        </form>

        {/* Filter Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          {/* Category */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">{t.filterByCategory}:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
            >
              <option value="All">{t.allCategories}</option>
              <option value="Education">Education & Scholarships</option>
              <option value="Agriculture">Agriculture & Farmers</option>
              <option value="Health">Health & Insurance</option>
              <option value="Housing">Housing</option>
              <option value="Employment">Employment & MSME</option>
              <option value="Social Security">Social Security & Pension</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">{t.filterByState}:</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
            >
              <option value="All India">{t.allStates}</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Kerala">Kerala</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">{t.filterByOccupation}:</label>
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
            >
              <option value="All">{t.allOccupations}</option>
              <option value="Student">Student</option>
              <option value="Farmer">Farmer</option>
              <option value="Unemployed">Unemployed / Job Seeker</option>
              <option value="Self-Employed">Self-Employed / Artisan</option>
              <option value="Daily Wage">Daily Wage / Laborer</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">{t.filterByGender}:</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
            >
              <option value="All">{t.allGenders}</option>
              <option value="Female">Female (Women Welfare)</option>
              <option value="Male">Male</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.clearFiltersBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">
            Retrieving verified government schemes from verified knowledge base...
          </p>
        </div>
      ) : schemes.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t.noSchemesMatch}
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t.noSchemesAdvice}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            {t.clearFiltersBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              isSelectedForCompare={compareList.includes(scheme.scheme_id)}
              onSelectForCompare={toggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
};
