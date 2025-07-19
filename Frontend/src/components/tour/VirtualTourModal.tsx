import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink, Download, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  // Google Drive video link - replace with your actual link
  const videoUrl = "https://drive.google.com/file/d/1AXsSWyNtySzT2Ccy-Jk1BaHno_ugBkMp/view?usp=sharing";
  const embedUrl = "https://drive.google.com/file/d/1AXsSWyNtySzT2Ccy-Jk1BaHno_ugBkMp/preview";

  const handleOpenInNewTab = () => {
    window.open(videoUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MedicalQ Virtual Tour',
          text: 'Check out this virtual tour of MedicalQ medical platform',
          url: videoUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(videoUrl);
      alert('Link copied to clipboard!');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-6xl bg-white dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-medical-blue to-medical-teal p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{t('tour.title')}</h2>
                <p className="text-lg opacity-90">{t('tour.subtitle')}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  title={t('tour.share')}
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenInNewTab}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  title={t('tour.openInNewTab')}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Video Content */}
          <div className="relative">
            <div className="aspect-video bg-gray-900">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="MedicalQ Virtual Tour"
              />
            </div>
            
            {/* Video Overlay for Loading */}
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center text-white"
              >
                <Play className="h-16 w-16 mx-auto mb-4 text-medical-teal" />
                <p className="text-lg font-medium">{t('tour.loading')}</p>
              </motion.div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('tour.aboutTitle')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('tour.aboutDescription')}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('tour.featuresTitle')}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-medical-teal rounded-full mr-3" />
                    {t('tour.feature1')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-medical-teal rounded-full mr-3" />
                    {t('tour.feature2')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-medical-teal rounded-full mr-3" />
                    {t('tour.feature3')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-medical-teal rounded-full mr-3" />
                    {t('tour.feature4')}
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenInNewTab}
                className="flex-1 py-3 bg-medical-gradient text-white rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200"
              >
                <ExternalLink className="h-5 w-5" />
                <span>{t('tour.watchFullVideo')}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 py-3 bg-white dark:bg-dark-surface border-2 border-medical-teal text-medical-teal rounded-lg font-semibold hover:bg-medical-teal hover:text-white transition-all duration-200"
              >
                {t('tour.getStarted')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VirtualTourModal;