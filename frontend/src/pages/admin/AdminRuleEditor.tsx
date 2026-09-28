import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, Plus, ShieldCheck, ArrowLeft, CheckCircle2, Code2, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';
import { Scheme } from '../../types';

export const AdminRuleEditor: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState<number>(0);
  const [criterionName, setCriterionName] = useState('');
  const [fieldName, setFieldName] = useState('annual_income');
  const [operator, setOperator] = useState('lte');
  const [expectedValue, setExpectedValue] = useState('');
  const [failureReason, setFailureReason] = useState('');
  const [userFacingLabel, setUserFacingLabel] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const scs = await api.getSchemes();
        setSchemes(scs);
        if (scs.length > 0) setSelectedSchemeId(scs[0].id);
      } catch (e) {
        console.warn(e);
      }
    };
    fetchSchemes();
  }, []);

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchemeId || !criterionName || !expectedValue) return;

    setSubmitting(true);
    setSuccessMsg('');
    try {
      await api.addSchemeRule({
        scheme_id: selectedSchemeId,
        criterion_name: criterionName,
        field_name: fieldName,
        operator: operator,
        expected_value: expectedValue,
        failure_reason: failureReason || `${criterionName} requirement not satisfied.`,
        user_facing_label: userFacingLabel || `${fieldName} must be ${operator} ${expectedValue}`
      });
      setSuccessMsg("Eligibility rule successfully added and bound to deterministic rule engine!");
      setCriterionName('');
      setExpectedValue('');
      setFailureReason('');
      setUserFacingLabel('');
    } catch (e: any) {
      alert(e.message || "Failed to add rule");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 font-medium mb-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Admin Center</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="w-6 h-6 text-indigo-600" />
          <span>Visual Eligibility Rule Builder</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Construct deterministic rules directly verified by the engine. The LLM is never allowed to modify rules autonomously.
        </p>
      </div>

      {/* Safety Notice (Requirement #35) */}
      <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
        <p className="leading-relaxed">
          <strong>AI Safety Policy:</strong> Eligibility rules are strictly deterministic. Each rule defined below is evaluated mathematically (eq, lte, gte, in) against citizen profiles.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleCreateRule} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Target Government Scheme
          </label>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(parseInt(e.target.value))}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.scheme_name} ({s.scheme_id})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Profile Field (Attribute)
            </label>
            <select
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="annual_income">annual_income (Float)</option>
              <option value="age">age (Integer)</option>
              <option value="state">state (String)</option>
              <option value="occupation">occupation (String)</option>
              <option value="education">education (String)</option>
              <option value="social_category">social_category (String)</option>
              <option value="gender">gender (String)</option>
              <option value="marital_status">marital_status (String)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Deterministic Operator
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono"
            >
              <option value="lte">&lt;= (Less than or equal to)</option>
              <option value="gte">&gt;= (Greater than or equal to)</option>
              <option value="eq">== (Exact equality)</option>
              <option value="in">IN (Comma separated list)</option>
              <option value="contains">CONTAINS (Substring)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Expected Target Value
            </label>
            <input
              type="text"
              required
              value={expectedValue}
              onChange={(e) => setExpectedValue(e.target.value)}
              placeholder="e.g. 250000 or Tamil Nadu"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Criterion Name
          </label>
          <input
            type="text"
            required
            value={criterionName}
            onChange={(e) => setCriterionName(e.target.value)}
            placeholder="e.g. Annual Family Income Threshold"
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            User Facing Label (Displayed on Citizen Dashboard)
          </label>
          <input
            type="text"
            required
            value={userFacingLabel}
            onChange={(e) => setUserFacingLabel(e.target.value)}
            placeholder="e.g. Annual family income must be ≤ ₹2,50,000"
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Failure Reason (Shown to citizen if condition is not satisfied)
          </label>
          <input
            type="text"
            required
            value={failureReason}
            onChange={(e) => setFailureReason(e.target.value)}
            placeholder="e.g. Annual family income exceeds the ₹2.50 Lakh cap."
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          />
        </div>

        {/* Live Visual Expression Preview */}
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-500" />
          <span>
            RULE PREVIEW: IF citizen.{fieldName} {operator} '{expectedValue || '...'}' THEN SATISFIED ELSE FAILED
          </span>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{submitting ? "Binding Rule..." : "Add Rule to Engine"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
