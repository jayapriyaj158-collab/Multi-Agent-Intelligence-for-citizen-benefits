import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';
import { ApplicationItem } from '../types';
import { api } from '../services/api';

interface ApplicationTimelineProps {
  application: ApplicationItem;
  onStatusUpdated?: (updated: ApplicationItem) => void;
}

const STAGES = [
  { key: 'SUBMITTED', label: 'Submitted', desc: 'Application received online' },
  { key: 'DOCUMENTS_VERIFIED', label: 'Documents Verified', desc: 'Nodal officer checked certificates' },
  { key: 'DEPARTMENT_REVIEW', label: 'Department Review', desc: 'Welfare board scrutiny & sanction' },
  { key: 'DECISION_APPROVED', label: 'Sanctioned / DBT', desc: 'Disbursement released to bank account' }
];

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({ application, onStatusUpdated }) => {
  const [currentStatus, setCurrentStatus] = useState(application.current_status);
  const [isUpdating, setIsUpdating] = useState(false);

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 0;
      case 'DOCUMENTS_VERIFIED': return 1;
      case 'DEPARTMENT_REVIEW': return 2;
      case 'DECISION_APPROVED': return 3;
      case 'DECISION_REJECTED': return 3;
      default: return 0;
    }
  };

  const currentIdx = getStageIndex(currentStatus);

  const handleUpdateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await api.updateApplicationStatus(application.id, newStatus, `Manual tracking status updated to ${newStatus}`);
      setCurrentStatus(res.current_status);
      if (onStatusUpdated) onStatusUpdated(res);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              {application.scheme?.scheme_name || "Government Welfare Scheme"}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Manual Demo Tracking
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Application No: <span className="font-semibold text-slate-700 dark:text-slate-300">{application.application_number}</span>
          </p>
        </div>

        {/* Status Dropdown Simulator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Update Tracking:</span>
          <select
            value={currentStatus}
            onChange={(e) => handleUpdateStatus(e.target.value)}
            disabled={isUpdating}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="SUBMITTED">1. Submitted</option>
            <option value="DOCUMENTS_VERIFIED">2. Documents Verified</option>
            <option value="DEPARTMENT_REVIEW">3. Department Review</option>
            <option value="DECISION_APPROVED">4. Sanctioned / Approved</option>
            <option value="ACTION_REQUIRED">Action Required / Resubmit</option>
          </select>
        </div>
      </div>

      {/* Progress Timeline Tracker */}
      <div className="relative">
        <div className="hidden sm:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIdx;
            const isCurrent = idx === currentIdx;
            return (
              <div key={stage.key} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <div>
                  <span className={`text-xs font-bold block ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:block">
                    {stage.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Status Check & Notes */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-100 dark:border-slate-800">
        <div>
          <span>Last Updated: {new Date(application.last_status_update).toLocaleDateString()}</span>
          {application.notes && <span className="ml-2 italic text-slate-400">"{application.notes}"</span>}
        </div>
        {application.official_portal_used && (
          <a
            href={application.official_portal_used}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
          >
            Check on Official Portal <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
