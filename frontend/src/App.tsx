import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SimpleModeProvider, useSimpleMode } from './contexts/SimpleModeContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceModal } from './components/VoiceModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SchemeExplorerPage } from './pages/SchemeExplorerPage';
import { SchemeDetailPage } from './pages/SchemeDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { DocumentCenterPage } from './pages/DocumentCenterPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { SavedSchemesPage } from './pages/SavedSchemesPage';
import { SchemeComparePage } from './pages/SchemeComparePage';
import { BenefitGapPage } from './pages/BenefitGapPage';
import { SupportPage } from './pages/SupportPage';
import { SimpleModeHome } from './pages/SimpleModeHome';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminSchemesPage } from './pages/admin/AdminSchemesPage';
import { AdminRuleEditor } from './pages/admin/AdminRuleEditor';
import { AdminFreshnessPage } from './pages/admin/AdminFreshnessPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

// Simple mode wrapper
const AppLayout: React.FC = () => {
  const [voiceOpen, setVoiceOpen] = useState(false);
  const { isSimpleMode } = useSimpleMode();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar onOpenVoice={() => setVoiceOpen(true)} />

      <main className="flex-1">
        {isSimpleMode ? (
          <SimpleModeHome onOpenVoice={() => setVoiceOpen(true)} />
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage onOpenVoice={() => setVoiceOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/explorer" element={<SchemeExplorerPage />} />
            <Route path="/schemes/:id" element={<SchemeDetailPage />} />
            <Route path="/compare" element={<SchemeComparePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Citizen pages */}
            <Route path="/assistant" element={<AIAssistantPage onOpenVoice={() => setVoiceOpen(true)} />} />
            <Route path="/dashboard" element={<CitizenDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/documents" element={<DocumentCenterPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/saved" element={<SavedSchemesPage />} />
            <Route path="/benefit-gap" element={<BenefitGapPage />} />
            <Route path="/support" element={<SupportPage />} />

            {/* Admin pages */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/schemes" element={<AdminSchemesPage />} />
            <Route path="/admin/rules" element={<AdminRuleEditor />} />
            <Route path="/admin/freshness" element={<AdminFreshnessPage />} />
            <Route path="/admin/audit" element={<AdminAuditLogsPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      <Footer />

      {/* Global Voice Assistant Modal */}
      <VoiceModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <SimpleModeProvider>
            <AppLayout />
          </SimpleModeProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
