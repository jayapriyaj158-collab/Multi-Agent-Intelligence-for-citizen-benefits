import React, { useState, useEffect } from 'react';
import { 
  User, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  HeartHandshake, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';
import { Profile } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const ProfilePage: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { t, language, translateCategory, translateState, translateOccupation } = useLanguage();

  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [naturalText, setNaturalText] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [extracting, setExtracting] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age,
        gender: profile.gender || 'Male',
        state: profile.state || 'Tamil Nadu',
        district: profile.district || 'Chennai',
        occupation: profile.occupation || 'Student',
        education: profile.education || 'Undergraduate',
        annual_income: profile.annual_income || 200000,
        social_category: profile.social_category || 'OBC',
        marital_status: profile.marital_status || 'Single',
        residence_type: profile.residence_type || 'Urban',
        disability_status: profile.disability_status || false
      });
    }
  }, [profile]);

  const handleFieldChange = (field: keyof Profile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      await api.updateProfile(formData);
      await refreshProfile();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAutoExtract = async () => {
    if (!naturalText.trim()) return;
    setExtracting(true);
    try {
      const res = await fetch('/api/profile/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: naturalText, existing_profile: formData })
      });
      const data = await res.json();
      if (data.extracted_profile) {
        setFormData(data.extracted_profile);
        alert(`Extracted fields: ${data.newly_identified_fields.join(', ')}`);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setExtracting(false);
    }
  };

  const completion = profile?.completion_percentage || 75;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.profileTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.profileSubtitle}
          </p>
        </div>

        {/* Profile Completion Bar */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-w-[200px] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {language === 'ta' ? 'முழுமை நிலை:' : language === 'hi' ? 'पूर्णता स्थिति:' : 'Completion:'}
            </span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{completion}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI Conversational Extraction Tool (Requirement #5) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {language === 'ta' ? 'AI சுயவிவர பிரித்தெடுத்தல்' : language === 'hi' ? 'एआई प्रोफ़ाइल निष्कर्षण' : 'Smart AI Profile Extractor'}
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {language === 'ta' ? 'உங்களைப் பற்றி சாதாரணமாக தட்டச்சு செய்யவும். AI உங்கள் வயது, மாநிலம், படிப்பு மற்றும் வருமானத்தை தானாக கண்டறியும்:' : language === 'hi' ? 'अपने बारे में सामान्य रूप से लिखें। एआई आपकी आयु, राज्य, शिक्षा और आय को स्वतः पहचान लेगा:' : 'Type or paste about yourself naturally. The Citizen Profile Agent will extract age, state, education, and income automatically:'}
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={naturalText}
            onChange={(e) => setNaturalText(e.target.value)}
            placeholder={language === 'ta' ? "எ.கா. 'நான் தமிழ்நாட்டைச் சேர்ந்த 19 வயது கல்லூரி மாணவர், குடும்ப வருமானம் ₹2 லட்சம்'..." : language === 'hi' ? "उदा. 'मैं तमिलनाडु का 19 वर्षीय कॉलेज छात्र हूँ और पारिवारिक आय ₹2 लाख है'..." : "e.g. 'I am a 19-year-old college student from Tamil Nadu and family income is ₹2 lakh'..."}
            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAutoExtract}
            disabled={extracting || !naturalText.trim()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shrink-0 shadow-sm"
          >
            {extracting ? (language === 'ta' ? 'பிரித்தெடுக்கிறது...' : language === 'hi' ? 'निकाला जा रहा है...' : 'Extracting...') : (language === 'ta' ? 'தானியங்கு நிரப்பல்' : language === 'hi' ? 'स्वतः भरें' : 'Auto-Fill')}
          </button>
        </div>
      </div>

      {/* Structured Profile Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {saveSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t.profileSavedSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Age */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.ageLabel}
            </label>
            <input
              type="number"
              min={10}
              max={100}
              value={formData.age || ''}
              onChange={(e) => handleFieldChange('age', parseInt(e.target.value) || undefined)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.genderLabel}
            </label>
            <select
              value={formData.gender || 'Male'}
              onChange={(e) => handleFieldChange('gender', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Male">{language === 'ta' ? 'ஆண்' : language === 'hi' ? 'पुरुष' : 'Male'}</option>
              <option value="Female">{language === 'ta' ? 'பெண்' : language === 'hi' ? 'महिला' : 'Female'}</option>
              <option value="Other">{language === 'ta' ? 'மற்றவை' : language === 'hi' ? 'अन्य' : 'Other'}</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.stateLabel}
            </label>
            <select
              value={formData.state || 'Tamil Nadu'}
              onChange={(e) => handleFieldChange('state', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Tamil Nadu">{translateState("Tamil Nadu")}</option>
              <option value="Uttar Pradesh">{translateState("Uttar Pradesh")}</option>
              <option value="Karnataka">{translateState("Karnataka")}</option>
              <option value="Maharashtra">{translateState("Maharashtra")}</option>
              <option value="Kerala">{translateState("Kerala")}</option>
              <option value="Delhi">{translateState("Delhi")}</option>
              <option value="Rajasthan">{translateState("Rajasthan")}</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.occupationLabel}
            </label>
            <select
              value={formData.occupation || 'Student'}
              onChange={(e) => handleFieldChange('occupation', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Student">{translateOccupation("Student")}</option>
              <option value="Farmer">{translateOccupation("Farmer")}</option>
              <option value="Unemployed">{translateOccupation("Unemployed")}</option>
              <option value="Self-Employed">{translateOccupation("Self-Employed")}</option>
              <option value="Daily Wage">{translateOccupation("Daily Wage")}</option>
              <option value="Salaried">{language === 'ta' ? 'மாத ஊதியப் பணியாளர்' : language === 'hi' ? 'वेतनभोगी कर्मचारी' : 'Salaried Employee'}</option>
              <option value="Senior Citizen">{language === 'ta' ? 'மூத்த குடிமக்கள் / ஓய்வு பெற்றவர்' : language === 'hi' ? 'वरिष्ठ नागरिक / सेवानिवृत्त' : 'Senior Citizen / Retired'}</option>
              <option value="Homemaker">{language === 'ta' ? 'இல்லத்தரசி' : language === 'hi' ? 'गृहिणी' : 'Homemaker'}</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.educationLabel}
            </label>
            <select
              value={formData.education || 'Undergraduate'}
              onChange={(e) => handleFieldChange('education', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Undergraduate">{language === 'ta' ? 'இளங்கலை பட்டப்படிப்பு (Degree)' : language === 'hi' ? 'स्नातक (डिग्री)' : 'Undergraduate (Degree)'}</option>
              <option value="Post-Graduate">{language === 'ta' ? 'முதுகலை பட்டப்படிப்பு (Master\'s / PhD)' : language === 'hi' ? 'स्नातकोत्तर (मास्टर्स / पीएचडी)' : 'Post-Graduate (Master\'s / PhD)'}</option>
              <option value="ITI/Diploma">{language === 'ta' ? 'டிப்ளமோ / பாலிடெக்னிக் / ஐடிஐ' : language === 'hi' ? 'आईटीआई / डिप्लोमा' : 'ITI / Diploma / Polytechnic'}</option>
              <option value="High School">{language === 'ta' ? 'மேல்நிலைப் பள்ளி (10வது / 12வது)' : language === 'hi' ? 'हाई स्कूल (10वीं / 12वीं)' : 'High School (10th / 12th)'}</option>
              <option value="School">{language === 'ta' ? 'தொடக்க / நடுநிலைப் பள்ளி' : language === 'hi' ? 'माध्यमिक / प्राथमिक स्कूल' : 'Middle / Primary School'}</option>
              <option value="None">{language === 'ta' ? 'முறையான பள்ளிப்படிப்பு இல்லை' : language === 'hi' ? 'कोई औपचारिक स्कूली शिक्षा नहीं' : 'No Formal Schooling'}</option>
            </select>
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.incomeLabel} (₹)
            </label>
            <input
              type="number"
              step={10000}
              value={formData.annual_income || ''}
              onChange={(e) => handleFieldChange('annual_income', parseFloat(e.target.value) || undefined)}
              placeholder="e.g. 200000"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Social Category */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.socialCategoryLabel}
            </label>
            <select
              value={formData.social_category || 'OBC'}
              onChange={(e) => handleFieldChange('social_category', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="OBC">OBC / BC / MBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="General">General</option>
              <option value="EWS">EWS</option>
              <option value="Minority">Minority</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.maritalStatusLabel}
            </label>
            <select
              value={formData.marital_status || 'Single'}
              onChange={(e) => handleFieldChange('marital_status', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Single">{language === 'ta' ? 'திருமணமாகாதவர்' : language === 'hi' ? 'अविवाहित' : 'Single'}</option>
              <option value="Married">{language === 'ta' ? 'திருமணமானவர்' : language === 'hi' ? 'विवाहित' : 'Married'}</option>
              <option value="Widow">{language === 'ta' ? 'விதவை / கணவரால் கைவிடப்பட்டவர்' : language === 'hi' ? 'विधवा / निराश्रित' : 'Widow / Destitute'}</option>
              <option value="Divorced">{language === 'ta' ? 'விவாகரத்து பெற்றவர்' : language === 'hi' ? 'तलाकशुदा' : 'Divorced'}</option>
            </select>
          </div>

          {/* Residence Type */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t.residenceLabel}
            </label>
            <select
              value={formData.residence_type || 'Urban'}
              onChange={(e) => handleFieldChange('residence_type', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Urban">{language === 'ta' ? 'நகர்ப்புறம் (மாநகராட்சி / நகராட்சி)' : language === 'hi' ? 'शहरी (नगर निगम / पालिका)' : 'Urban (City / Municipality)'}</option>
              <option value="Rural">{language === 'ta' ? 'கிராமப்புறம் (கிராம ஊராட்சி)' : language === 'hi' ? 'ग्रामीण (गांव / ग्राम पंचायत)' : 'Rural (Village / Gram Panchayat)'}</option>
              <option value="Semi-Urban">{language === 'ta' ? 'அரை நகர்ப்புறம்' : language === 'hi' ? 'अर्ध-शहरी' : 'Semi-Urban'}</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? t.savingProfile : t.saveProfile}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
