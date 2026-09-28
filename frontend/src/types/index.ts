export interface SchemeRule {
  id?: number;
  criterion_name: string;
  field_name: string;
  operator: string;
  expected_value: string;
  rule_type: string;
  weight?: number;
  failure_reason: string;
  user_facing_label: string;
}

export interface Scheme {
  id: number;
  scheme_id: string;
  scheme_name: string;
  short_name?: string;
  description: string;
  objective?: string;
  benefits: string;
  benefit_type?: string;
  department?: string;
  ministry?: string;
  government_level: string;
  state: string;
  district?: string;
  category: string;
  sub_category?: string;
  target_group?: string;
  age_min?: number;
  age_max?: number;
  gender_criteria?: string;
  occupation_criteria?: string[];
  education_criteria?: string[];
  income_limit?: number;
  income_period?: string;
  social_category?: string[];
  required_documents?: string[];
  optional_documents?: string[];
  application_steps?: Array<{ step: number; title: string; detail: string }>;
  application_mode?: string;
  official_application_url: string;
  official_source_url: string;
  status_check_url?: string;
  deadline?: string;
  renewal_rules?: string;
  frequency?: string;
  helpline?: string;
  faq?: Array<{ question: string; answer: string }>;
  source_name: string;
  source_level: number;
  verification_status: string;
  is_umang_supported?: boolean;
  is_digilocker_supported?: boolean;
  last_verified_at?: string;
  rules?: SchemeRule[];
}

export interface CriterionResult {
  criterion_name: string;
  user_facing_label: string;
  status: 'SATISFIED' | 'FAILED' | 'MISSING_INFO';
  detail: string;
  rule_type: string;
  field_name: string;
  user_value?: any;
  expected_value: any;
}

export interface EligibilityResult {
  scheme_id: string;
  scheme_name: string;
  status: 'LIKELY ELIGIBLE' | 'POTENTIALLY ELIGIBLE' | 'LIKELY NOT ELIGIBLE' | 'INSUFFICIENT INFORMATION';
  status_color: 'emerald' | 'amber' | 'rose' | 'sky';
  criteria_evaluated: CriterionResult[];
  criteria_passed_count: number;
  criteria_total_count: number;
  missing_criteria_fields: string[];
  summary_explanation: string;
  profile_match_score: number;
  disclaimer: string;
}

export interface Profile {
  id?: number;
  user_id?: number;
  age?: number;
  gender?: string;
  state?: string;
  district?: string;
  occupation?: string;
  education?: string;
  annual_income?: number;
  social_category?: string;
  disability_status?: boolean;
  disability_percentage?: number;
  marital_status?: string;
  residence_type?: string;
  family_members_count?: number;
  is_bpl?: boolean;
  preferred_language?: string;
  completion_percentage?: number;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'citizen' | 'admin';
  phone?: string;
}

export interface DocumentAnalysis {
  id?: number;
  detected_document_type?: string;
  extracted_name?: string;
  extracted_id_number?: string;
  extracted_date?: string;
  extracted_income?: number;
  extracted_authority?: string;
  confidence_score: number;
  validation_issues: string[];
  is_consistent: 'VALID' | 'NEEDS_REVIEW' | 'INCOMPLETE';
  ocr_raw_text?: string;
}

export interface DocumentItem {
  id: number;
  document_type: string;
  file_name: string;
  file_size?: number;
  mime_type: string;
  verification_status: string;
  uploaded_at: string;
  analysis?: DocumentAnalysis;
}

export interface DocumentReadiness {
  scheme_id: string;
  scheme_name: string;
  total_required: number;
  total_available: number;
  readiness_percentage: number;
  available_documents: string[];
  missing_documents: string[];
  guidance: Record<string, MissingDocumentGuide>;
  disclaimer: string;
}

export interface MissingDocumentGuide {
  document_name: string;
  what_is_it: string;
  why_required: string;
  who_issues: string;
  where_to_apply: string;
  online_offline: string;
  expected_process: string[];
  official_source_url: string;
  required_inputs: string[];
  disclaimer: string;
}

export interface ApplicationHistoryItem {
  id: number;
  status: string;
  notes?: string;
  updated_by: string;
  timestamp: string;
}

export interface ApplicationItem {
  id: number;
  user_id: number;
  scheme_id: number;
  application_number: string;
  tracking_mode: string;
  current_status: string;
  submission_date: string;
  official_portal_used?: string;
  notes?: string;
  reminder_date?: string;
  last_status_update: string;
  history?: ApplicationHistoryItem[];
  scheme?: Scheme;
}

export interface AgentTraceItem {
  agent_name: string;
  status: string;
  summary: string;
  duration_ms: number;
}

export interface CitationItem {
  source_name: string;
  source_url: string;
  source_level: number;
  last_verified: string;
  relevance_snippet: string;
}

export interface ChatResponse {
  conversation_id: number;
  reply: string;
  language: string;
  intent: string;
  confidence: number;
  agents_called: AgentTraceItem[];
  citations: CitationItem[];
  card_type?: string;
  card_data?: any;
  suggested_actions?: string[];
  voice_audio_hint?: string;
  audit_run_id?: number;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}
