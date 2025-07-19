import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { 
  Heart, 
  // Phone, 
  Mail, 
  // MapPin, 
  Calendar, 
  Users, 
  Stethoscope, 
  FileText, 
  Shield, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Clock,
  Award,
  Building,
  BookOpen,
  CreditCard,
  Video,
  ChevronRight,
  Ambulance,
  UserCheck,
  // Search,
  MessageSquare,
  TrendingUp,
  Languages,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
   const [emailSubscription, setEmailSubscription] = useState({
    email: '',
    isLoading: false,
    message: '',
    isSuccess: false,
    isError: false
  });

  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailSubscription.email) {
      setEmailSubscription(prev => ({
        ...prev,
        message: 'Please enter your email address',
        isError: true,
        isSuccess: false
      }));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailSubscription.email)) {
      setEmailSubscription(prev => ({
        ...prev,
        message: 'Please enter a valid email address',
        isError: true,
        isSuccess: false
      }));
      return;
    }

    setEmailSubscription(prev => ({
      ...prev,
      isLoading: true,
      message: '',
      isError: false,
      isSuccess: false
    }));

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailSubscription.email
        })
      });

      const data = await response.json();

      if (data.success) {
        setEmailSubscription(prev => ({
          ...prev,
          message: data.message,
          isSuccess: true,
          isError: false,
          email: '' // Clear the email field
        }));
      } else {
        setEmailSubscription(prev => ({
          ...prev,
          message: data.message,
          isError: true,
          isSuccess: false
        }));
      }
    } catch (error) {
      setEmailSubscription(prev => ({
        ...prev,
        message: 'An error occurred. Please try again later.',
        isError: true,
        isSuccess: false
      }));
    } finally {
      setEmailSubscription(prev => ({
        ...prev,
        isLoading: false
      }));
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setEmailSubscription(prev => ({
        ...prev,
        message: '',
        isError: false,
        isSuccess: false
      }));
    }, 5000);
  };

  const footerSections = [
    {
      title: 'For Patients & Visitors',
      links: [
        { name: 'Request Appointment', href: '/appointment', icon: Calendar },
        { name: 'Find a Specialist', href: '/specialists', icon: Stethoscope },
        { name: 'Medical Departments', href: '/departments', icon: Building },
        { name: 'Lab Results', href: '/lab-results', icon: FileText },
        { name: 'Patient Guide', href: '/patient-guide', icon: BookOpen },
        { name: 'Emergency Services', href: '/emergency', icon: Ambulance }
      ]
    },
    {
      title: 'For Medical Professionals',
      links: [
        { name: 'Research & Publications', href: '/research', icon: Award },
        { name: 'Career Opportunities', href: '/careers', icon: Users },
        { name: 'Academic Programs', href: '/academics', icon: BookOpen },
        { name: "Doctor's Portal", href: '/doctor-portal', icon: UserCheck },
        { name: 'Medical Resources', href: '/resources', icon: FileText },
        { name: 'Continuing Education', href: '/education', icon: Award }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'About Us', href: '/about', icon: Building },
        { name: 'News & Events', href: '/news', icon: FileText },
        { name: 'Health Community', href: '/community', icon: MessageSquare },
        { name: 'Privacy Policy', href: '/privacy', icon: Shield },
        { name: 'Terms of Service', href: '/terms', icon: FileText },
        { name: 'Contact Us', href: '/contact', icon: Mail }
      ]
    },
    {
      title: 'Additional Resources',
      links: [
        { name: 'International Patients', href: '/international', icon: Globe },
        { name: 'Insurance Information', href: '/insurance', icon: CreditCard },
        { name: 'Health Checkup Packages', href: '/packages', icon: Heart },
        { name: 'Telemedicine Services', href: '/telemedicine', icon: Video },
        { name: 'Health Blog', href: '/blog', icon: FileText },
        { name: 'Patient Support', href: '/support', icon: Users }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/medicalq', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/medicalq', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/medicalq', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/medicalq', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/medicalq', color: 'hover:text-red-500' }
  ];

  const contactInfo = [
    // { icon: Phone, text: '+91-11-2575-0000', href: 'tel:+911125750000', label: 'Main' },
    { icon: Ambulance, text: '+91-11-6969-6969', href: 'tel:+911169696969', label: 'Emergency' },
    { icon: Mail, text: 'info@medicalq.com', href: 'mailto:info@medicalq.com', label: 'General Inquiries' },
    // { icon: MapPin, text: 'Rajinder Nagar, New Delhi - 110060', href: 'https://maps.google.com', label: 'Location' }
  ];

  const certifications = [
    { name: 'NABH Accredited', icon: Award },
    { name: 'ISO 9001:2025 Certified', icon: Shield },
    { name: 'HIPAA & GDPR Compliant', icon: Globe },
    { name: 'NABL Approved Labs', icon: Award }
  ];

  const languages = ['English', 'Hindi', 'Punjabi', 'Urdu'];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Hospital Info - Takes 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Heart className="h-12 w-12 text-medical-teal" fill="currentColor" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-medical-blue rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-medical-gradient bg-clip-text text-transparent">
                    MedicalQ
                  </h3>
                  <p className="text-sm text-gray-400">{t('header.tagline')}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                A Modern Hub for Reliable Medical Knowledge, Powered by Doctors & AI.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3 text-gray-300 hover:text-medical-teal transition-colors group p-2 rounded-lg hover:bg-gray-800"
                  >
                    <item.icon className="h-4 w-4 text-medical-teal group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-medium">{item.text}</span>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Operating Hours */}
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-medical-teal" />
                  {t('footer.operatingHours')}
                </h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>{t('footer.opd')}:</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('footer.emergency')}:</span>
                    <span className="text-medical-teal font-semibold">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('footer.labServices')}:</span>
                    <span>6:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-3">{t('footer.followUs')}</h4>
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.2 }}
                      className={`p-3 bg-gray-800 rounded-full text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700`}
                    >
                      <social.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Sections - Each takes 1 column */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title} className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: linkIndex * 0.05, duration: 0.4 }}
                    >
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-gray-400 hover:text-medical-teal transition-colors group text-sm py-1"
                      >
                        <link.icon className="h-3 w-3 text-medical-teal/60 group-hover:text-medical-teal group-hover:scale-110 transition-all" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.name}
                        </span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Newsletter & Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-medical-teal" />
                {t('footer.stayUpdated')}
              </h4>
              <p className="text-gray-400">
                {t('footer.newsletterDescription')}
              </p>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-medical-teal" />
                  <span>{t('footer.healthTips')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-medical-teal" />
                  <span>{t('footer.updates')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-medical-teal" />
                  <span>{t('footer.expertInsights')}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-4 py-4">
              <form onSubmit={handleEmailSubscription}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
 <input
  type="email"
  value={emailSubscription.email}
  onChange={(e) =>
    setEmailSubscription((prev) => ({
      ...prev,
      email: e.target.value,
    }))
  }
  disabled={emailSubscription.isLoading}
  style={{
    width: "700px", 
    minWidth: "unset",
    maxWidth: "unset", 
    flexGrow: 0,
    flexShrink: 0,
  }}
  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
  placeholder={t('footer.enterEmail')}
/>

  <motion.button
    type="submit"
    disabled={emailSubscription.isLoading}
    whileHover={{ scale: emailSubscription.isLoading ? 1 : 1.05 }}
    whileTap={{ scale: emailSubscription.isLoading ? 1 : 0.95 }}
    className="flex-shrink-0 px-6 py-3 bg-medical-gradient text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
  >
    {emailSubscription.isLoading ? (
      <>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        {t('footer.subscribing')}
      </>
    ) : (
      t('footer.subscribe')
    )}
  </motion.button>
</div>

                
                {/* Success/Error Messages */}
                {emailSubscription.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm ${
                      emailSubscription.isSuccess 
                        ? 'bg-green-900/20 border border-green-800/30 text-green-400' 
                        : 'bg-red-900/20 border border-red-800/30 text-red-400'
                    }`}
                  >
                    {emailSubscription.isSuccess ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>{emailSubscription.message}</span>
                  </motion.div>
                )}
              </form>
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <Languages className="h-4 w-4 mr-2 text-medical-teal" />
                {t('footer.languagesAvailable')}
              </h4>
              <div className="flex justify-start">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 pt-6 border-t border-gray-800"
        >
          <h4 className="text-lg font-semibold mb-4 text-center">{t('footer.accreditations')}</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <cert.icon className="h-4 w-4 text-medical-teal" />
                <span className="text-sm text-gray-300">{cert.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="w-full flex justify-center">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <p>© {currentYear} MedicalQ. All rights reserved.</p>
                <div className="flex flex-wrap justify-center items-center space-x-4">
                  <a href="/privacy" className="hover:text-medical-teal transition-colors">Privacy Policy</a>
                  <span>•</span>
                  <a href="/terms" className="hover:text-medical-teal transition-colors">Terms of Service</a>
                  <span>•</span>
                  <a href="/sitemap" className="hover:text-medical-teal transition-colors">Sitemap</a>
                  <span>•</span>
                  <a href="/accessibility" className="hover:text-medical-teal transition-colors">Accessibility</a>
                </div>
              </div>
            </div>


            {/* <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-medical-teal" />
                <span>NABH Accredited</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-medical-teal" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-medical-teal" />
                <span>HIPAA & GDPR Compliant</span>
              </div>
            </div>  */}
            
          </div>
          
          {/* Emergency Notice */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
              <p className="text-red-400 text-sm font-medium flex items-center justify-center">
                <Ambulance className="h-4 w-4 mr-2" />
                {t('footer.emergencyNotice')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
