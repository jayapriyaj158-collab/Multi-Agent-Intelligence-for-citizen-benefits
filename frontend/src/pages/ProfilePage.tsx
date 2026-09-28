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

export const ProfilePage: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();

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
            Citizen Profile Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            One comprehensive profile used by the Deterministic Rule Engine to discover all eligible benefits.
          </p>
        </div>

        {/* Profile Completion Bar */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-w-[200px] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Completion:</span>
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
            Smart AI Profile Extractor
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Type or paste about yourself naturally. The Citizen Profile Agent will extract age, state, education, and income automatically:
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={naturalText}
            onChange={(e) => setNaturalText(e.target.value)}
            placeholder="e.g. 'I am a 19-year-old college student from Tamil Nadu and family income is ₹2 lakh'..."
            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAutoExtract}
            disabled={extracting || !naturalText.trim()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shrink-0 shadow-sm"
          >
            {extracting ? "Extracting..." : "Auto-Fill"}
          </button>
        </div>
      </div>

      {/* Structured Profile Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {saveSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Profile successfully updated! Scheme recommendations have been refreshed.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Age */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Age (Years)
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
              Gender
            </label>
            <select
              value={formData.gender || 'Male'}
              onChange={(e) => handleFieldChange('gender', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              State / Union Territory
            </label>
            <select
              value={formData.state || 'Tamil Nadu'}
              onChange={(e) => handleFieldChange('state', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Kerala">Kerala</option>
              <option value="Delhi">Delhi</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Primary Occupation
            </label>
            <select
              value={formData.occupation || 'Student'}
              onChange={(e) => handleFieldChange('occupation', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Student">Student</option>
              <option value="Farmer">Farmer (Agriculturalist)</option>
              <option value="Unemployed">Unemployed / Job Seeker</option>
              <option value="Self-Employed">Self-Employed / Artisan / Micro-business</option>
              <option value="Daily Wage">Daily Wage Laborer</option>
              <option value="Salaried">Salaried Employee</option>
              <option value="Senior Citizen">Senior Citizen / Retired</option>
              <option value="Homemaker">Homemaker</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Highest / Current Education
            </label>
            <select
              value={formData.education || 'Undergraduate'}
              onChange={(e) => handleFieldChange('education', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Undergraduate">Undergraduate (Degree)</option>
              <option value="Post-Graduate">Post-Graduate (Master's / PhD)</option>
              <option value="ITI/Diploma">ITI / Diploma / Polytechnic</option>
              <option value="High School">High School (10th / 12th)</option>
              <option value="School">Middle / Primary School</option>
              <option value="None">No Formal Schooling</option>
            </select>
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Annual Family Income (INR ₹)
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
              Social Category
            </label>
            <select
              value={formData.social_category || 'OBC'}
              onChange={(e) => handleFieldChange('social_category', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="OBC">OBC (Other Backward Classes / BC / MBC)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="General">General</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
              <option value="Minority">Minority</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Marital Status
            </label>
            <select
              value={formData.marital_status || 'Single'}
              onChange={(e) => handleFieldChange('marital_status', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widow">Widow / Destitute</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          {/* Residence Type */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Area of Residence
            </label>
            <select
              value={formData.residence_type || 'Urban'}
              onChange={(e) => handleFieldChange('residence_type', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Urban">Urban (City / Municipality)</option>
              <option value="Rural">Rural (Village / Gram Panchayat)</option>
              <option value="Semi-Urban">Semi-Urban</option>
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
            <span>{saving ? "Saving Changes..." : "Save Citizen Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
