import React, { useState, useEffect } from 'react';
import { HelpCircle, Send, CheckCircle2, Clock, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const SupportPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [issueType, setIssueType] = useState('Missing Document Clarification');
  const [description, setDescription] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await api.getSupportTickets();
      setTickets(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    setSuccessMsg('');
    try {
      const res = await api.createSupportTicket({
        issue_type: issueType,
        description: description.trim()
      });
      setSuccessMsg(`Ticket created! Ticket Number: ${res.ticket_number}`);
      setDescription('');
      await fetchTickets();
    } catch (e: any) {
      alert(e.message || "Failed creating ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Human Help & Grievance Escalation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          When AI guidance requires welfare officer review, submit an escalation ticket.
        </p>
      </div>

      {/* Official Grievance Portal notice (Requirement #34) */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <strong className="text-slate-800 dark:text-slate-200">Official Government Grievance Escalation:</strong>
        </div>
        <p className="leading-relaxed">
          For formal legal grievances, non-receipt of central welfare funds, or officer complaints, citizens should use the government portal <strong>CPGRAMS (Centralized Public Grievance Redress and Monitoring System)</strong>.
        </p>
        <a
          href="https://pgportal.gov.in"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
        >
          Open Official CPGRAMS Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Ticket Creation Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-sm text-slate-900 dark:text-white">
            Submit a Assistance / Clarification Request
          </h2>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Issue Category
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="Missing Document Clarification">Missing Document Clarification</option>
              <option value="Eligibility Rule Appeal">Eligibility Rule Appeal</option>
              <option value="Official Portal Application Issue">Official Portal Application Issue</option>
              <option value="Disbursement Status Delay">Disbursement Status Delay</option>
              <option value="Other Human Help">Other Human Help</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Detailed Description of your issue
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue, scheme name, or what you need human assistance with..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Submitting..." : "Submit Ticket"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Existing Tickets List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Your Recent Escalations ({tickets.length})
        </h3>

        {tickets.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No previous support tickets recorded.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {t.ticket_number}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {t.status}
                  </span>
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">{t.issue_type}</p>
                <p className="text-slate-500">{t.description}</p>
                {t.admin_response && (
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 text-indigo-900 dark:text-indigo-200">
                    <strong>Welfare Officer Note:</strong> {t.admin_response}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
