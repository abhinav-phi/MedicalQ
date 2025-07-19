import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import BookingModal from '../appointments/BookingModal';
import VirtualTourModal from '../tour/VirtualTourModal';
import { useTranslation } from 'react-i18next';

import { 
  Heart, 
  Users, 
  Clock, 
  Shield, 
  ArrowRight, 
  Play,
  Sparkles,
  Stethoscope,
  Activity,
  Brain,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const { t } = useTranslation();

  const floatingIcons = [
    { icon: Heart, delay: 0, x: 100, y: 50 },
    { icon: Stethoscope, delay: 0.5, x: -80, y: 80 },
    { icon: Activity, delay: 1, x: 120, y: -60 },
    { icon: Brain, delay: 1.5, x: -100, y: -40 },
    { icon: Shield, delay: 2, x: 80, y: 90 },
  ];

  const stats = [
    { value: '50+', label: 'Medical Departments', icon: Heart },
    { value: '500+', label: 'Expert Doctors', icon: Users },
    { value: '24/7', label: 'Emergency Care', icon: Clock },
    { value: '98%', label: 'Patient Satisfaction', icon: Shield },
  ];

  const scrollToExplore = () => {
    const nextSection = document.querySelector('#verified-doctors');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-medical-teal/10 dark:bg-medical-teal/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-medical-blue/10 dark:bg-medical-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-medical-green/10 dark:bg-medical-green/20 rounded-full blur-3xl"
        />

        {/* Floating Medical Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2], 
              scale: [1, 1.2, 1],
              x: [item.x, item.x + 20, item.x],
              y: [item.y, item.y - 20, item.y],
            }}
            transition={{
              delay: item.delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
          >
            <item.icon className="h-8 w-8 text-medical-teal" />
          </motion.div>
        ))}

        {/* Particle Effects */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-medical-teal rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center px-4 py-2 bg-medical-teal/10 border border-medical-teal/20 rounded-full text-medical-teal text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Trusted by 100,000+ patients across India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-900 dark:text-white">{t('hero.smart')} </span>
            <span className="bg-medical-gradient bg-clip-text text-transparent">
              {t('hero.health')}
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">{t('hero.starts')} </span>
            <span className="text-medical-blue">{t('hero.here')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(20, 184, 166, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-medical-gradient text-white rounded-full font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-medical-teal/30 transition-all duration-300"
            >
              <span>{t('hero.bookAppointment')}</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTourModalOpen(true)}
              className="px-8 py-4 bg-white dark:bg-dark-surface border-2 border-gray-200 dark:border-dark-border text-gray-900 dark:text-white rounded-full font-semibold text-lg flex items-center space-x-2 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-dark-card transition-all duration-300"
            >
              <Play className="h-5 w-5" />
              <span>{t('hero.virtualTour')}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 text-center group hover:bg-white/90 dark:hover:bg-dark-surface/90 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-medical-gradient rounded-full mb-4 group-hover:shadow-lg group-hover:shadow-medical-teal/30 transition-all duration-300"
              >
                <stat.icon className="h-6 w-6 text-white" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToExplore}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-medical-teal dark:hover:text-medical-teal transition-colors cursor-pointer group"
          >
            <span className="text-sm mb-2 group-hover:text-medical-teal transition-colors">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 group-hover:border-medical-teal rounded-full flex justify-center transition-colors">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-medical-teal rounded-full mt-2"
              />
            </div>
            <ChevronDown className="h-4 w-4 mt-2 group-hover:text-medical-teal transition-colors" />
          </motion.button>
        </motion.div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      
      <VirtualTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
