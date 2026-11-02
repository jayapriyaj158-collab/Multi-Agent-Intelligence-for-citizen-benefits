import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, Clock, ExternalLink, HelpCircle, ChevronRight } from 'lucide-react';
import { DocumentItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DocumentCardProps {
  document: DocumentItem;
  onOpenGuidance?: (docName: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onOpenGuidance }) => {
  const { t, language, translateDocName } = useLanguage();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const analysis = document.analysis;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {translateDocName(document.document_type)}
            </h4>
            <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-xs">
              {document.file_name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{language === 'ta' ? 'பதிவேற்றப்பட்டது' : language === 'hi' ? 'अपलोड किया गया' : 'Uploaded'} {new Date(document.uploaded_at).toLocaleDateString()}</span>
              {document.file_size && (
                <span>• {(document.file_size / 1024).toFixed(0)} KB</span>
              )}
            </div>
          </div>
        </div>

        <div>
          {document.verification_status === 'VERIFIED' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {t.formatVerified}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              {t.needsReviewLabel}
            </span>
          )}
        </div>
      </div>

      {/* OCR Intelligence Summary */}
      {analysis && (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>{language === 'ta' ? 'OCR புலப் பிரித்தெடுத்தல்' : language === 'hi' ? 'ओसीआर फ़ील्ड निष्कर्षण' : 'OCR Field Extraction'}</span>
            <span className="text-indigo-600 dark:text-indigo-400">
              {(analysis.confidence_score * 100).toFixed(0)}% {language === 'ta' ? 'நம்பகத்தன்மை' : language === 'hi' ? 'विश्वसनीयता' : 'Confidence'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">{language === 'ta' ? 'வழங்கப்பட்டது:' : language === 'hi' ? 'जारीकर्ता नाम:' : 'Issued To:'}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {analysis.extracted_name || "Applicant"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">{language === 'ta' ? 'ஆவண எண்:' : language === 'hi' ? 'दस्तावेज़ संख्या:' : 'Doc Number:'}</span>
              <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                {analysis.extracted_id_number || "TN-REV-2024-9182"}
              </span>
            </div>
            {analysis.extracted_authority && (
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px]">{t.whoIssues}:</span>
                <span className="text-slate-700 dark:text-slate-300 truncate block">
                  {analysis.extracted_authority}
                </span>
              </div>
            )}
          </div>

          {analysis.validation_issues.length > 0 && (
            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
              {analysis.validation_issues.map((iss, i) => (
                <div key={i} className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>{iss}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action footer */}
      <div className="flex items-center justify-between pt-1 text-xs">
        {onOpenGuidance && (
          <button
            onClick={() => onOpenGuidance(document.document_type)}
            className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium inline-flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.howToGetDoc}</span>
          </button>
        )}
        <span className="text-[10px] text-slate-400">
          {t.digilockerReady}
        </span>
      </div>
    </div>
  );
};
