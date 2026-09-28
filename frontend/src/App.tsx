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

// Route Guards
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

const RootRedirect: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

// Main App Layout
const AppLayout: React.FC = () => {
  const [voiceOpen, setVoiceOpen] = useState(false);
  const { isSimpleMode } = useSimpleMode();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar onOpenVoice={() => setVoiceOpen(true)} />

      <main className="flex-1">
        {isSimpleMode && isAuthenticated ? (
          <SimpleModeHome onOpenVoice={() => setVoiceOpen(true)} />
        ) : (
          <Routes>
            {/* Root: redirects to /dashboard if logged in, else /login */}
            <Route path="/" element={<RootRedirect />} />

            {/* Public Auth Routes */}
            <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
            <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />

            {/* Protected Citizen Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><CitizenDashboard /></ProtectedRoute>} />
            <Route path="/explorer" element={<ProtectedRoute><SchemeExplorerPage /></ProtectedRoute>} />
            <Route path="/scheme-explorer" element={<ProtectedRoute><SchemeExplorerPage /></ProtectedRoute>} />
            <Route path="/schemes/:id" element={<ProtectedRoute><SchemeDetailPage /></ProtectedRoute>} />
            <Route path="/compare" element={<ProtectedRoute><SchemeComparePage /></ProtectedRoute>} />
            <Route path="/assistant" element={<ProtectedRoute><AIAssistantPage onOpenVoice={() => setVoiceOpen(true)} /></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistantPage onOpenVoice={() => setVoiceOpen(true)} /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><DocumentCenterPage /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><SavedSchemesPage /></ProtectedRoute>} />
            <Route path="/benefit-gap" element={<ProtectedRoute><BenefitGapPage /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="/how-it-works" element={<ProtectedRoute><HowItWorksPage /></ProtectedRoute>} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/schemes" element={<AdminRoute><AdminSchemesPage /></AdminRoute>} />
            <Route path="/admin/rules" element={<AdminRoute><AdminRuleEditor /></AdminRoute>} />
            <Route path="/admin/freshness" element={<AdminRoute><AdminFreshnessPage /></AdminRoute>} />
            <Route path="/admin/audit" element={<AdminRoute><AdminAuditLogsPage /></AdminRoute>} />

            {/* Fallback to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      <Footer />

      {/* Global Multilingual Voice Assistant Modal */}
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
