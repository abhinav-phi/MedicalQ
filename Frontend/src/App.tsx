import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import Stats from './components/home/Stats';
import SpecialistDoctors from './components/doctors/SpecialistDoctors';
import CommunityPage from './components/community/CommunityPage';
import CommunityAds from './components/community/CommunityAds';
import Footer from './components/layout/Footer';
import AuthModal from './components/auth/AuthModal';
import UserDashboard from './components/dashboard/UserDashboard';

const HomePage: React.FC = () => {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'register' }>({
    isOpen: false,
    type: 'login'
  });

  const handleAuthModal = (type: 'login' | 'register') => {
    setAuthModal({ isOpen: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, type: 'login' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen"> {/* Changed dark:bg-dark-bg to dark:bg-slate-900 */}
      <Header onAuthModal={handleAuthModal} />
      
      {/* Main Content with proper spacing */}
      <main>
        <Hero onGetStarted={() => handleAuthModal('register')} />
        
        {/* Add proper spacing between sections */}
        <div className="py-12" />
        
        {/* Verified Doctors Section */}
        <div id="verified-doctors">
          <SpecialistDoctors />
        </div>
        
        {/* Add spacing */}
        <div className="py-12" />
        
        {/* Features Section */}
        <Features />
        
        {/* Add spacing */}
        <div className="py-12" />
        
        {/* Stats Section */}
        <Stats />
        
        {/* Add spacing */}
        <div className="py-12" />
        
        {/* Community Ads Sidebar - Fixed position for desktop */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-80 z-40 hidden xl:block">
          <CommunityAds />
        </div>
        
        {/* Mobile Community Ads - Show below community platform on mobile */}
        <div className="xl:hidden py-8">
          <div className="max-w-md mx-auto px-4">
            <CommunityAds />
          </div>
        </div>
      </main>
      
      <Footer />
      
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialTab={authModal.type}
      />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'register' }>({
    isOpen: false,
    type: 'login'
  });

  const handleAuthModal = (type: 'login' | 'register') => {
    setAuthModal({ isOpen: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, type: 'login' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center"> {/* Changed dark:bg-dark-bg */}
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4" /> {/* Changed border colors */}
          <p className="text-gray-600 dark:text-gray-400">Loading MedicalQ...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900"> {/* Changed dark:bg-dark-bg */}
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <HomePage />
              )
            } 
          />
          <Route 
            path="/community" 
            element={<CommunityPage />} 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <>
                  <Header onAuthModal={handleAuthModal} />
                  <UserDashboard />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AuthModal
          isOpen={authModal.isOpen}
          onClose={closeAuthModal}
          initialTab={authModal.type}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              border: '1px solid var(--toast-border)',
            },
            success: {
              iconTheme: {
                primary: '#14b8a6',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        
        {/* CSS Variables for Toast Theming */}
        <style>{`
          :root {
            --toast-bg: #ffffff;
            --toast-color: #1f2937;
            --toast-border: #e5e7eb;
          }
          
          .dark {
            --toast-bg: #1e293b;
            --toast-color: #ffffff;
            --toast-border: #475569;
          }
        `}</style>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;