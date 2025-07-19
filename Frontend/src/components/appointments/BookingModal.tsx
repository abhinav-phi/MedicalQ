import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, FileText, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../../configs/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctor?: {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
  } | null;
}

interface BookingForm {
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'consultation' | 'follow-up' | 'emergency';
  reason: string;
  symptoms: string;
  duration: number;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  emergencyContact: string;
  medicalHistory: string;
  currentMedications: string;
  insuranceProvider: string;
  insuranceNumber: string;
  preferredLanguage: string;
  specialRequests: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedDoctor }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingForm>({
    defaultValues: {
      patientName: user?.name || '',
      patientEmail: user?.email || '',
      appointmentType: 'consultation',
      duration: 30,
      preferredLanguage: 'English'
    }
  });

  const appointmentTypes = [
    { value: 'consultation', label: t('booking.consultation'), duration: 30, price: 500 },
    { value: 'follow-up', label: t('booking.followUp'), duration: 15, price: 300 },
    { value: 'emergency', label: t('booking.emergency'), duration: 45, price: 1000 }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const languages = ['English', 'Hindi', 'Punjabi', 'Urdu'];

  const onSubmit = async (data: BookingForm) => {
    if (!user) {
      toast.error(t('booking.loginRequired'));
      return;
    }

    setIsSubmitting(true);
    try {
      const appointmentData = {
        ...data,
        doctorId: selectedDoctor?.id || data.doctorId,
        patientId: user.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
        appointmentDateTime: `${data.appointmentDate}T${data.appointmentTime}:00.000Z`
      };

      const response = await api.post('/api/appointments', appointmentData);
      
      if (response.data.success) {
        toast.success(t('booking.appointmentBooked'));
        onClose();
        form.reset();
        setCurrentStep(1);
      } else {
        toast.error(response.data.message || t('booking.bookingFailed'));
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || t('booking.bookingError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl bg-white dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
            
            <div className="flex items-center space-x-4">
              {selectedDoctor && (
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-16 h-16 rounded-full border-2 border-white/20"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold mb-1">{t('booking.bookAppointment')}</h2>
                {selectedDoctor && (
                  <p className="text-lg opacity-90">
                    {t('booking.with')} {selectedDoctor.name} - {selectedDoctor.specialty}
                  </p>
                )}
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-white text-medical-blue' : 'bg-white/20 text-white/60'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('booking.appointmentDetails')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Appointment Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.appointmentType')}
                      </label>
                      <select
                        {...form.register('appointmentType', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      >
                        {appointmentTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label} - ₹{type.price} ({type.duration} min)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.preferredDate')}
                      </label>
                      <input
                        type="date"
                        {...form.register('appointmentDate', { required: true })}
                        min={getMinDate()}
                        max={getMaxDate()}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.preferredTime')}
                      </label>
                      <select
                        {...form.register('appointmentTime', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      >
                        <option value="">{t('booking.selectTime')}</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.preferredLanguage')}
                      </label>
                      <select
                        {...form.register('preferredLanguage')}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Reason for Visit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('booking.reasonForVisit')}
                    </label>
                    <textarea
                      {...form.register('reason', { required: true })}
                      rows={3}
                      placeholder={t('booking.reasonPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('booking.symptoms')}
                    </label>
                    <textarea
                      {...form.register('symptoms')}
                      rows={3}
                      placeholder={t('booking.symptomsPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('booking.personalInformation')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.fullName')}
                      </label>
                      <input
                        type="text"
                        {...form.register('patientName', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.phoneNumber')}
                      </label>
                      <input
                        type="tel"
                        {...form.register('patientPhone', { required: true })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.emailAddress')}
                      </label>
                      <input
                        type="email"
                        {...form.register('patientEmail', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Emergency Contact */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.emergencyContact')}
                      </label>
                      <input
                        type="tel"
                        {...form.register('emergencyContact')}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Medical History */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('booking.medicalHistory')}
                    </label>
                    <textarea
                      {...form.register('medicalHistory')}
                      rows={3}
                      placeholder={t('booking.medicalHistoryPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Current Medications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('booking.currentMedications')}
                    </label>
                    <textarea
                      {...form.register('currentMedications')}
                      rows={2}
                      placeholder={t('booking.medicationsPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Insurance & Final Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('booking.insuranceAndPayment')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Insurance Provider */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.insuranceProvider')}
                      </label>
                      <input
                        type="text"
                        {...form.register('insuranceProvider')}
                        placeholder={t('booking.insuranceProviderPlaceholder')}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Insurance Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('booking.insuranceNumber')}
                      </label>
                      <input
                        type="text"
                        {...form.register('insuranceNumber')}
                        placeholder={t('booking.insuranceNumberPlaceholder')}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('booking.specialRequests')}
                    </label>
                    <textarea
                      {...form.register('specialRequests')}
                      rows={3}
                      placeholder={t('booking.specialRequestsPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Appointment Summary */}
                  <div className="bg-gray-50 dark:bg-dark-card p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {t('booking.appointmentSummary')}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {selectedDoctor && (
                        <div className="flex justify-between">
                          <span>{t('booking.doctor')}:</span>
                          <span>{selectedDoctor.name}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>{t('booking.type')}:</span>
                        <span>{form.watch('appointmentType')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('booking.date')}:</span>
                        <span>{form.watch('appointmentDate')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('booking.time')}:</span>
                        <span>{form.watch('appointmentTime')}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                        <span>{t('booking.estimatedCost')}:</span>
                        <span>₹{appointmentTypes.find(t => t.value === form.watch('appointmentType'))?.price || 500}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                  >
                    {t('booking.previous')}
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                >
                  {t('booking.cancel')}
                </button>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-medical-gradient text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    {t('booking.next')}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-medical-gradient text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        {t('booking.booking')}
                      </>
                    ) : (
                      t('booking.confirmBooking')
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;