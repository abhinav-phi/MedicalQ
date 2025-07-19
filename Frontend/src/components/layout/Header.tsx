import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Bell, 
  Menu, 
  X, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Shield,
  Moon,
  Sun,
  Phone,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar';

interface HeaderProps {
  onAuthModal: (type: 'login' | 'register') => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthModal }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileMenuItems = [
    { icon: User, label: t('header.profile'), href: '/profile' },
    { icon: Settings, label: t('header.settings'), href: '/settings' },
    { icon: HelpCircle, label: t('header.help'), href: '/help' },
    { icon: Shield, label: t('header.privacy'), href: '/privacy' },
  ];

  const handleEmergencyCall = () => {
    window.open('tel:+91-11-6969-6969', '_self');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <Heart className="h-8 w-8 text-medical-teal" fill="currentColor" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-medical-blue rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-medical-gradient bg-clip-text text-transparent">
                MedicalQ
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                {t('header.tagline')}
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar placeholder={t('header.searchPlaceholder')} />
          </div>

          {/* Emergency & Communities Section */}
          <div className="hidden lg:flex items-center space-x-3 mx-6">
            {/* Emergency Number */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmergencyCall}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">{t('header.emergency')}</span>
            </motion.button>

            {/* Explore Communities */}
            <Link to="/community">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-medical-teal hover:bg-medical-teal/90 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Users className="h-4 w-4" />
                <span className="text-sm">{t('header.communities')}</span>
              </motion.button>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {user ? (
              <>
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card"
                >
                  <Bell className="h-5 w-5" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-medical-teal"
                    />
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        {user.role === 'doctor' && (
                          <Shield className="h-3 w-3 mr-1 text-medical-blue" />
                        )}
                        {t(`header.${user.role}`)}
                      </div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-dark-border">
                          <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                        <div className="py-2">
                          {profileMenuItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                          <button
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors w-full text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>{t('header.signOut')}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAuthModal('login')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-medical-teal transition-colors"
                >
                  {t('header.signIn')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAuthModal('register')}
                  className="px-4 py-2 bg-medical-gradient text-white rounded-full font-medium hover:shadow-lg hover:shadow-medical-teal/25 transition-all duration-200"
                >
                  {t('header.getStarted')}
                </motion.button>
              </div>
            )}

            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border"
          >
            <div className="px-4 py-4 space-y-4">
              <SearchBar placeholder={t('header.searchPlaceholder')} />
              
              {/* Mobile Emergency & Communities */}
              <div className="flex space-x-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEmergencyCall}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-red-500 text-white rounded-lg font-medium"
                >
                  <Phone className="h-4 w-4" />
                  <span>{t('header.emergency')}</span>
                </motion.button>
                <Link to="/community" className="flex-1">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-medical-teal text-white rounded-lg font-medium"
                  >
                    <Users className="h-4 w-4" />
                    <span>{t('header.communities')}</span>
                  </motion.button>
                </Link>
              </div>

              {!user && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => onAuthModal('login')}
                    className="flex-1 py-2 text-center text-gray-700 dark:text-gray-300 hover:text-medical-teal transition-colors"
                  >
                    {t('header.signIn')}
                  </button>
                  <button
                    onClick={() => onAuthModal('register')}
                    className="flex-1 py-2 bg-medical-gradient text-white rounded-lg font-medium"
                  >
                    {t('header.getStarted')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
