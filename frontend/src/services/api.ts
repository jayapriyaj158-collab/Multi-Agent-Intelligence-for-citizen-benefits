import {
  Scheme,
  EligibilityResult,
  Profile,
  User,
  DocumentItem,
  DocumentReadiness,
  MissingDocumentGuide,
  ApplicationItem,
  ChatResponse,
  NotificationItem
} from '../types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ access_token: string; user_id: number; email: string; full_name: string; role: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password })
    });
    if (!res.ok) {
      let message = 'Login failed';
      try {
        const err = await res.json();
        if (typeof err.detail === 'string') {
          message = err.detail;
        } else if (Array.isArray(err.detail)) {
          message = err.detail.map((d: any) => d.msg || JSON.stringify(d)).join(', ');
        }
      } catch {
        if (res.status === 502 || res.status === 504 || res.status === 500) {
          message = 'Backend server not responding. Please make sure the backend is running on port 8001.';
        }
      }
      throw new Error(message);
    }
    return res.json();
  },

  async register(data: { email: string; password: string; full_name: string; role?: string; phone?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Registration failed' }));
      throw new Error(err.detail || 'Registration failed');
    }
    return res.json();
  },

  async getMe(): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  // Profile
  async getProfile(): Promise<Profile> {
    const res = await fetch(`${API_BASE}/profile`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  async updateProfile(data: Partial<Profile>): Promise<Profile> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Schemes
  async getSchemes(params?: { query?: string; category?: string; state?: string; occupation?: string; max_income?: number; gender?: string }): Promise<Scheme[]> {
    const q = new URLSearchParams();
    if (params?.query) q.append('query', params.query);
    if (params?.category) q.append('category', params.category);
    if (params?.state) q.append('state', params.state);
    if (params?.occupation) q.append('occupation', params.occupation);
    if (params?.max_income !== undefined) q.append('max_income', params.max_income.toString());
    if (params?.gender) q.append('gender', params.gender);

    const res = await fetch(`${API_BASE}/schemes?${q.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch schemes');
    return res.json();
  },

  async getScheme(idOrCode: string | number): Promise<Scheme> {
    const res = await fetch(`${API_BASE}/schemes/${idOrCode}`);
    if (!res.ok) throw new Error('Scheme not found');
    return res.json();
  },

  async checkEligibility(idOrCode: string | number, profileOverride?: Partial<Profile>): Promise<EligibilityResult> {
    const res = await fetch(`${API_BASE}/schemes/${idOrCode}/eligibility`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ profile_override: profileOverride })
    });
    if (!res.ok) throw new Error('Failed to evaluate eligibility');
    return res.json();
  },

  async compareSchemes(schemeIds: string[]): Promise<{ comparison_count: number; schemes: Scheme[] }> {
    const res = await fetch(`${API_BASE}/schemes/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schemeIds)
    });
    if (!res.ok) throw new Error('Failed to compare schemes');
    return res.json();
  },

  async toggleSaveScheme(schemeId: number): Promise<{ saved: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/schemes/${schemeId}/save`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to toggle save');
    return res.json();
  },

  async getSavedSchemes(): Promise<Scheme[]> {
    const res = await fetch(`${API_BASE}/schemes/saved/all`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch saved schemes');
    return res.json();
  },

  // AI Chat & Multi-Agent
  async sendChatMessage(message: string, conversationId?: number, language: string = 'en', profileContext?: any): Promise<ChatResponse> {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        message,
        conversation_id: conversationId,
        language,
        profile_context: profileContext
      })
    });
    if (!res.ok) throw new Error('Failed to communicate with AI Orchestrator');
    return res.json();
  },

  async getBenefitGaps(profileOverride?: any): Promise<any> {
    const res = await fetch(`${API_BASE}/ai/benefit-gap`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileOverride || {})
    });
    if (!res.ok) throw new Error('Failed to analyze benefit gaps');
    return res.json();
  },

  // Documents
  async getDocuments(): Promise<DocumentItem[]> {
    const res = await fetch(`${API_BASE}/documents`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  async uploadDocument(file: File, documentType: string): Promise<DocumentItem> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', documentType);

    const token = localStorage.getItem('token');
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      headers,
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return res.json();
  },

  async getDocumentReadiness(schemeIdOrCode: string | number): Promise<DocumentReadiness> {
    const res = await fetch(`${API_BASE}/documents/readiness/${schemeIdOrCode}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to check document readiness');
    return res.json();
  },

  async getDocumentGuidance(docName: string): Promise<MissingDocumentGuide> {
    const res = await fetch(`${API_BASE}/documents/guidance/${encodeURIComponent(docName)}`);
    if (!res.ok) throw new Error('Failed to fetch document guidance');
    return res.json();
  },

  // Applications
  async getApplications(): Promise<ApplicationItem[]> {
    const res = await fetch(`${API_BASE}/applications`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch applications');
    return res.json();
  },

  async createApplication(data: { scheme_id: number; application_number?: string; tracking_mode?: string; notes?: string }): Promise<ApplicationItem> {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create application');
    return res.json();
  },

  async updateApplicationStatus(id: number, status: string, notes?: string): Promise<ApplicationItem> {
    const res = await fetch(`${API_BASE}/applications/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async getFieldExplainer(fieldKey: string): Promise<any> {
    const res = await fetch(`${API_BASE}/applications/field-explainer/${encodeURIComponent(fieldKey)}`);
    if (!res.ok) throw new Error('Failed to fetch field explanation');
    return res.json();
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    const res = await fetch(`${API_BASE}/notifications`, { headers: getAuthHeaders() });
    if (!res.ok) return [];
    return res.json();
  },

  async markNotificationRead(id: number): Promise<any> {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Support
  async createSupportTicket(data: { issue_type: string; scheme_id?: number; description: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/support`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create ticket');
    return res.json();
  },

  async getSupportTickets(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/support`, { headers: getAuthHeaders() });
    if (!res.ok) return [];
    return res.json();
  },

  // Admin
  async getAdminAnalytics(): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },

  async getAdminSchemes(status?: string): Promise<Scheme[]> {
    const res = await fetch(`${API_BASE}/admin/schemes${status ? `?status=${status}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch admin schemes');
    return res.json();
  },

  async verifyScheme(id: number): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/schemes/${id}/verify`, { method: 'POST', headers: getAuthHeaders() });
    return res.json();
  },

  async archiveScheme(id: number): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/schemes/${id}/archive`, { method: 'POST', headers: getAuthHeaders() });
    return res.json();
  },

  async getKnowledgeFreshness(): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/freshness`);
    if (!res.ok) throw new Error('Failed to fetch freshness report');
    return res.json();
  },

  async getAuditLogs(limit: number = 25): Promise<any[]> {
    const res = await fetch(`${API_BASE}/admin/audit-logs?limit=${limit}`);
    if (!res.ok) return [];
    return res.json();
  },

  async addSchemeRule(data: { scheme_id: number; criterion_name: string; field_name: string; operator: string; expected_value: string; failure_reason: string; user_facing_label: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/schemes/rule`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
