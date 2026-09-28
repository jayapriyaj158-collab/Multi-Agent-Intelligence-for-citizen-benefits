import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  HelpCircle, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Layers, 
  Phone, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { api } from '../services/api';
import { Scheme, EligibilityResult, DocumentReadiness, MissingDocumentGuide } from '../types';
import { EligibilityBadge } from '../components/EligibilityBadge';
import { useAuth } from '../contexts/AuthContext';

export const SchemeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(null);
  const [readiness, setReadiness] = useState<DocumentReadiness | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDocGuide, setSelectedDocGuide] = useState<MissingDocumentGuide | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const s = await api.getScheme(id);
        setScheme(s);

        // Fetch deterministic eligibility evaluation
        const elig = await api.checkEligibility(id);
        setEligibility(elig);

        // Fetch document readiness
        const ready = await api.getDocumentReadiness(id);
        setReadiness(ready);
      } catch (e) {
        console.warn('Failed loading scheme details', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-medium">Loading verified scheme specifications...</p>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Scheme Not Found</h2>
        <p className="text-xs text-slate-500">The requested scheme ID does not exist in the verified knowledge base.</p>
        <Link to="/explorer" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
          Back to Explorer
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link to="/explorer" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scheme Explorer</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: scheme.scheme_name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Scheme link copied to clipboard!");
              }
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 text-xs flex items-center gap-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Scheme Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {scheme.category}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {scheme.state} ({scheme.government_level})
          </span>
          {scheme.is_umang_supported && (
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Available on UMANG
            </span>
          )}
          {scheme.is_digilocker_supported && (
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              DigiLocker Connected
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {scheme.scheme_name}
          </h1>
          {scheme.short_name && (
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
              Commonly known as: {scheme.short_name}
            </p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            {scheme.ministry} • {scheme.department}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={scheme.official_application_url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <Link
            to={`/assistant?scheme=${scheme.scheme_id}&action=apply`}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Guided Application Assistant</span>
          </Link>

          <button
            onClick={async () => {
              if (!isAuthenticated) {
                navigate('/login');
                return;
              }
              const res = await api.createApplication({ scheme_id: scheme.id });
              alert(`Application registered for Manual Demo Tracking! Tracking ID: ${res.application_number}`);
              navigate('/applications');
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold"
          >
            Track Manually
          </button>
        </div>
      </div>

      {/* Grid: 20+ Structured Sections (Requirement #8) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Overview */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              1. Overview
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {scheme.description}
            </p>
            {scheme.objective && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Key Objective:</strong>
                {scheme.objective}
              </div>
            )}
          </section>

          {/* Section 2: Who is it for? */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              2. Who is it for? (Target Beneficiaries)
            </h3>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {scheme.target_group}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 text-[10px] block">Age Range:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.age_min || 0} to {scheme.age_max || "No Upper Limit"} yrs
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 text-[10px] block">Income Ceiling:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.income_limit ? `≤ ₹${scheme.income_limit.toLocaleString()}` : "No Income Cap"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 text-[10px] block">Gender:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.gender_criteria}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: Benefits */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              3. Benefits & Entitlements
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 text-sm font-medium leading-relaxed">
              {scheme.benefits}
            </div>
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Type: <strong>{scheme.benefit_type}</strong></span>
              <span>Disbursement: <strong>{scheme.frequency}</strong></span>
            </div>
          </section>

          {/* Section 4: Explainable Eligibility Breakdown (Requirement #10) */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                4. Explainable Eligibility Evaluation
              </h3>
              {eligibility && <EligibilityBadge status={eligibility.status} size="sm" />}
            </div>

            {eligibility && (
              <>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {eligibility.summary_explanation}
                </p>

                <div className="space-y-2 pt-2">
                  {eligibility.criteria_evaluated.map((crit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2">
                        {crit.status === 'SATISFIED' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : crit.status === 'FAILED' ? (
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        ) : (
                          <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                            {crit.user_facing_label}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {crit.detail}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        crit.status === 'SATISFIED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        crit.status === 'FAILED' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {crit.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500">
                  {eligibility.disclaimer}
                </div>
              </>
            )}
          </section>

          {/* Section 5: Application Process Steps */}
          {scheme.application_steps && scheme.application_steps.length > 0 && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                5. Step-by-Step Application Process
              </h3>
              <div className="space-y-3">
                {scheme.application_steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {st.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {st.title}
                      </h4>
                      <p className="text-slate-500 mt-0.5 leading-relaxed">
                        {st.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Scheme Specific FAQs */}
          {scheme.faq && scheme.faq.length > 0 && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                6. Frequently Asked Questions (FAQ)
              </h3>
              <div className="space-y-2">
                {scheme.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between"
                    >
                      <span>{item.question}</span>
                      {openFaqIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openFaqIdx === idx && (
                      <div className="p-3.5 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (1 Col): Document Checklist & Source Metadata */}
        <div className="space-y-6">
          {/* Document Readiness Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                Required Documents
              </h3>
              {readiness && (
                <span className="text-xs font-bold text-indigo-600">
                  {readiness.readiness_percentage}% Ready
                </span>
              )}
            </div>

            <div className="space-y-2">
              {scheme.required_documents?.map((docName, idx) => {
                const isAvail = readiness?.available_documents.includes(docName);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {docName}
                      </span>
                      {isAvail ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                          Available
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                          Missing
                        </span>
                      )}
                    </div>

                    {!isAvail && readiness?.guidance[docName] && (
                      <button
                        onClick={() => setSelectedDocGuide(readiness.guidance[docName])}
                        className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>How to obtain this certificate</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              to="/documents"
              className="block w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100"
            >
              Upload & Verify Documents
            </Link>
          </div>

          {/* Scheme Trust & Source Metadata */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Source & Verification Trust
            </h4>

            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <div>
                <span className="text-slate-400 block text-[10px]">Official Source:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.source_name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Source Level:</span>
                <span className="font-semibold text-indigo-600">
                  Level {scheme.source_level} (Official Authority)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Last Verified:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scheme.last_verified_at || "2026-09-20"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Status:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {scheme.verification_status}
                </span>
              </div>
            </div>

            <a
              href={scheme.official_source_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-indigo-600 hover:underline pt-2 font-semibold"
            >
              Verify on Department Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Helpline Support */}
          {scheme.helpline && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Official Helpline:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{scheme.helpline}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Missing Document Guidance Modal (Requirement #15) */}
      {selectedDocGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Missing Document Guidance
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {selectedDocGuide.document_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocGuide(null)}
                className="p-1 text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white block">What is this document?</strong>
                <p className="mt-0.5">{selectedDocGuide.what_is_it}</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">Who issues it?</strong>
                <p className="mt-0.5">{selectedDocGuide.who_issues}</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">Where to apply?</strong>
                <p className="mt-0.5">{selectedDocGuide.where_to_apply} ({selectedDocGuide.online_offline})</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">Step-by-Step Procedure:</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-500">
                  {selectedDocGuide.expected_process.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">Information / Proofs Needed:</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedDocGuide.required_inputs.map((inp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                      {inp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 italic">
                {selectedDocGuide.disclaimer}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <a
                href={selectedDocGuide.official_source_url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
              >
                Open State e-District / Issuing Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedDocGuide(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
