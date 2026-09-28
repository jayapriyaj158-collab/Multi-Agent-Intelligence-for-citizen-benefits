import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Check,
  X
} from 'lucide-react';
import { api } from '../services/api';
import { DocumentItem, Scheme, DocumentReadiness, MissingDocumentGuide } from '../types';
import { DocumentCard } from '../components/DocumentCard';

export const DocumentCenterPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('');
  const [readiness, setReadiness] = useState<DocumentReadiness | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Upload Form
  const [selectedDocType, setSelectedDocType] = useState<string>('Income Certificate');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Guidance Modal
  const [activeGuide, setActiveGuide] = useState<MissingDocumentGuide | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [docs, scs] = await Promise.all([
        api.getDocuments(),
        api.getSchemes()
      ]);
      setDocuments(docs);
      setSchemes(scs);
      if (scs.length > 0 && !selectedSchemeId) {
        setSelectedSchemeId(scs[0].scheme_id);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchReadiness = async () => {
      if (selectedSchemeId) {
        try {
          const r = await api.getDocumentReadiness(selectedSchemeId);
          setReadiness(r);
        } catch (e) {
          console.warn(e);
        }
      }
    };
    fetchReadiness();
  }, [selectedSchemeId, documents]);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    setUploading(true);
    setUploadSuccess(false);
    try {
      await api.uploadDocument(selectedFile, selectedDocType);
      await fetchData();
      setSelectedFile(null);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (e) {
      alert("Upload failed. Please check file format.");
    } finally {
      setUploading(false);
    }
  };

  const handleOpenGuidance = async (docName: string) => {
    try {
      const g = await api.getDocumentGuidance(docName);
      setActiveGuide(g);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Document Intelligence Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Automated OCR classification, consistency validation, and missing certificate acquisition guidance.
          </p>
        </div>

        {/* DigiLocker Notice (Requirement #42) */}
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>DigiLocker Integration Ready (Production integration available in API mode)</span>
        </div>
      </div>

      {/* Top 2-Column: Upload Box + Scheme Readiness Evaluator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Upload Document for Intelligence OCR Analysis
            </h3>
          </div>

          {uploadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Document uploaded and verified via OCR extraction!</span>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Document Certificate Type
              </label>
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="Income Certificate">Income Certificate (வருமானச் சான்றிதழ்)</option>
                <option value="Community / Caste Certificate">Community / Caste Certificate (சாதிச் சான்றிதழ்)</option>
                <option value="Bonafide / Student Certificate">Bonafide / Student Certificate</option>
                <option value="Nativity / Domicile Certificate">Nativity / Domicile Certificate</option>
                <option value="Aadhaar Card">Aadhaar Card (UIDAI)</option>
                <option value="Land Record / Patta Chitta">Land Record / Patta Chitta</option>
                <option value="Ration Card / Family Card">Ration Card / Family Card</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Select File (PDF, JPG, PNG)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{uploading ? "Analyzing Document with OCR..." : "Upload & Analyze Document"}</span>
            </button>
          </form>
        </div>

        {/* Scheme Document Readiness Evaluator (Requirement #14) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Document Preparation Readiness
            </h3>
            {readiness && (
              <span className="text-sm font-extrabold text-indigo-600">
                {readiness.readiness_percentage}% Ready
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Evaluate your document completeness against any verified scheme:
          </p>

          <div>
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              {schemes.map((s) => (
                <option key={s.id} value={s.scheme_id}>
                  {s.scheme_name}
                </option>
              ))}
            </select>
          </div>

          {readiness && (
            <div className="space-y-3 pt-2 text-xs">
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    readiness.readiness_percentage >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${readiness.readiness_percentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200">
                  <span className="font-bold text-emerald-800 dark:text-emerald-200 block">
                    ✓ Available ({readiness.available_documents.length})
                  </span>
                  <p className="text-[11px] text-emerald-700 mt-1 line-clamp-2">
                    {readiness.available_documents.join(', ') || 'None uploaded yet'}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200">
                  <span className="font-bold text-rose-800 dark:text-rose-200 block">
                    ⚠ Missing ({readiness.missing_documents.length})
                  </span>
                  <p className="text-[11px] text-rose-700 mt-1 line-clamp-2">
                    {readiness.missing_documents.join(', ') || 'All required documents ready'}
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                {readiness.disclaimer}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Your Verified Documents ({documents.length})
        </h2>

        {documents.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No documents uploaded yet
            </p>
            <p className="text-xs text-slate-500">
              Upload your certificates above to compute document readiness scores.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onOpenGuidance={handleOpenGuidance}
              />
            ))}
          </div>
        )}
      </div>

      {/* Missing Document Guidance Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Document Procurement Guide
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {activeGuide.document_name}
                </h3>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                className="p-1 text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white block">What is this document?</strong>
                <p className="mt-0.5">{activeGuide.what_is_it}</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">Who issues it?</strong>
                <p className="mt-0.5">{activeGuide.who_issues}</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">Where to apply?</strong>
                <p className="mt-0.5">{activeGuide.where_to_apply} ({activeGuide.online_offline})</p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block">Step-by-Step Procedure:</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-500">
                  {activeGuide.expected_process?.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 italic">
                {activeGuide.disclaimer}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <a
                href={activeGuide.official_source_url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
              >
                Open State Issuing Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setActiveGuide(null)}
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
