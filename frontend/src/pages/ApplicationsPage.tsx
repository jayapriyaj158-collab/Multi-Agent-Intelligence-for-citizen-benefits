import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  ExternalLink, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { api } from '../services/api';
import { ApplicationItem, Scheme } from '../types';
import { ApplicationTimeline } from '../components/ApplicationTimeline';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const ApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Application Form State
  const [newSchemeId, setNewSchemeId] = useState<number>(0);
  const [newAppNum, setNewAppNum] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const [apps, scs] = await Promise.all([
        api.getApplications(),
        api.getSchemes()
      ]);
      setApplications(apps);
      setSchemes(scs);
      if (scs.length > 0) setNewSchemeId(scs[0].id);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchemeId) return;

    setCreating(true);
    try {
      await api.createApplication({
        scheme_id: newSchemeId,
        application_number: newAppNum.trim() || undefined,
        tracking_mode: 'MANUAL_DEMO',
        notes: newNotes.trim() || undefined
      });
      await fetchApplications();
      setShowAddModal(false);
      setNewAppNum('');
      setNewNotes('');
    } catch (e) {
      alert("Failed creating application tracking entry");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.appTrackingTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.appTrackingSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addAppBtn}</span>
        </button>
      </div>

      {/* Manual Demo Mode Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block font-semibold">Manual Demo Tracking Mode Active:</strong>
          {t.demoTrackingBanner}
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">Loading application tracking records...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
            {t.noApplicationsYet}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once you apply on an official government portal (e.g. scholarships.gov.in, pmkisan.gov.in), click 'Add Application to Track' to monitor it here.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            {t.addAppBtn}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <ApplicationTimeline
              key={app.id}
              application={app}
              onStatusUpdated={fetchApplications}
            />
          ))}
        </div>
      )}

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Add Application for Tracking
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Select Scheme
                </label>
                <select
                  value={newSchemeId}
                  onChange={(e) => setNewSchemeId(parseInt(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                >
                  {schemes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.scheme_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Application / Acknowledgement ID (Optional)
                </label>
                <input
                  type="text"
                  value={newAppNum}
                  onChange={(e) => setNewAppNum(e.target.value)}
                  placeholder="e.g. NSP-2026-TN-98124 (Auto-generated if left blank)"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Notes / Follow-Up Reminder (Optional)
                </label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Submitted at e-Seva center on 15 Sep. Physical copy given to college nodal officer."
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm"
                >
                  {creating ? "Adding..." : "Start Tracking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
