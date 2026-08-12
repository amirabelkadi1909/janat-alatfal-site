import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, User, Phone, Mail, Calendar, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

// Environment variable for production API URL (Render) or local fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Registration() {
  const { language, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    age: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.childName.trim()) {
      newErrors.childName = t.registration.validation.childName;
    }
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = t.registration.validation.parentName;
    }

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age || isNaN(ageNum) || ageNum < 1 || ageNum > 12) {
      newErrors.age = t.registration.validation.age;
    }

    const phoneRegex = /^[0-9]{9,12}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = t.registration.validation.phone;
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-+]/g, ''))) {
      newErrors.phone = t.registration.validation.phone;
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = t.registration.validation.email;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        triggerConfetti();

        setFormData({
          childName: '',
          parentName: '',
          age: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        setApiError(data.error || (language === 'ar' ? 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً' : 'Une erreur s\'est produite'));
      }
    } catch (error) {
      console.error('Server connection error:', error);
      setApiError(
        language === 'ar' 
          ? 'تعذر الاتصال بالخادم. يرجى التحقق من الاتصال بالأينترنت.' 
          : 'Impossible de contacter le serveur. Veuillez vérifier votre connexion.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section id="registration" className="py-24 bg-gradient-to-b from-white to-rose-50/20 relative overflow-hidden select-none">
      <div className="absolute top-20 right-[-10%] w-72 h-72 bg-pastel-blue/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-[-10%] w-80 h-80 bg-pastel-yellow/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            {t.registration.title}
          </h2>
          <div className="h-1.5 bg-rose-300 rounded-full mx-auto my-4 w-20" />
          <p className="text-lg sm:text-xl text-slate-500 font-semibold leading-relaxed">
            {t.registration.subtitle}
          </p>
        </div>

        {/* Main Card Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 sm:p-12 shadow-md"
        >
          {/* Server Error Alert */}
          {apiError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-600 text-sm font-bold">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Child Name Input */}
              <div className="flex flex-col text-start">
                <label className="text-sm font-extrabold text-slate-600 mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" />
                  {t.registration.childName} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'أدخل اسم الطفل' : 'Ex: Adam Lachgar'}
                    className={`w-full px-4 py-3 rounded-2xl border bg-slate-50/50 focus:bg-white transition-all text-sm font-semibold outline-none ${
                      errors.childName 
                        ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-50'
                    }`}
                  />
                  {errors.childName && (
                    <span className="flex items-center gap-1 mt-1 text-xs text-rose-500 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.childName}
                    </span>
                  )}
                </div>
              </div>

              {/* Parent Name Input */}
              <div className="flex flex-col text-start">
                <label className="text-sm font-extrabold text-slate-600 mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" />
                  {t.registration.parentName} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'أدخل اسم الولي الكامل' : 'Ex: Mohamed Lachgar'}
                    className={`w-full px-4 py-3 rounded-2xl border bg-slate-50/50 focus:bg-white transition-all text-sm font-semibold outline-none ${
                      errors.parentName 
                        ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-50'
                    }`}
                  />
                  {errors.parentName && (
                    <span className="flex items-center gap-1 mt-1 text-xs text-rose-500 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.parentName}
                    </span>
                  )}
                </div>
              </div>

              {/* Age Input */}
              <div className="flex flex-col text-start">
                <label className="text-sm font-extrabold text-slate-600 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {t.registration.age} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="12"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'مثال: 4' : 'Ex: 4'}
                    className={`w-full px-4 py-3 rounded-2xl border bg-slate-50/50 focus:bg-white transition-all text-sm font-semibold outline-none ${
                      errors.age 
                        ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-50'
                    }`}
                  />
                  {errors.age && (
                    <span className="flex items-center gap-1 mt-1 text-xs text-rose-500 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.age}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Input */}
              <div className="flex flex-col text-start">
                <label className="text-sm font-extrabold text-slate-600 mb-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {t.registration.phone} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'مثال: 0550123456' : 'Ex: 0550123456'}
                    className={`w-full px-4 py-3 rounded-2xl border bg-slate-50/50 focus:bg-white transition-all text-sm font-semibold outline-none ${
                      errors.phone 
                        ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-50'
                    }`}
                  />
                  {errors.phone && (
                    <span className="flex items-center gap-1 mt-1 text-xs text-rose-500 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Email Input */}
            <div className="flex flex-col text-start">
              <label className="text-sm font-extrabold text-slate-600 mb-2 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                {t.registration.email}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني للولي' : 'parent@gmail.com'}
                  className={`w-full px-4 py-3 rounded-2xl border bg-slate-50/50 focus:bg-white transition-all text-sm font-semibold outline-none ${
                    errors.email 
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100' 
                      : 'border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-50'
                  }`}
                />
                {errors.email && (
                  <span className="flex items-center gap-1 mt-1 text-xs text-rose-500 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Message Area */}
            <div className="flex flex-col text-start">
              <label className="text-sm font-extrabold text-slate-600 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                {t.registration.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder={language === 'ar' ? 'أدخل أي ملاحظات ترغب في إعلامنا بها...' : 'Ex: Allergies, préférences de communication...'}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all text-sm font-semibold outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-extrabold text-base shadow-lg shadow-rose-100 hover:shadow-xl hover:shadow-rose-200 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? t.registration.sending : t.registration.submit}</span>
                <Send className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </form>
        </motion.div>
      </div>

      {/* Success Modal Dialogue */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-slate-100 flex flex-col items-center text-center"
            >
              <CheckCircle className="w-16 h-16 text-emerald-400 mb-6 animate-bounce" />
              
              <h3 className="text-2xl font-black text-slate-800 font-cairo">
                {t.registration.successTitle}
              </h3>
              
              <p className="mt-4 text-slate-500 font-semibold leading-relaxed text-sm sm:text-base">
                {t.registration.successText}
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="mt-8 px-6 py-2.5 bg-slate-800 hover:bg-slate-950 text-white font-extrabold text-sm rounded-xl cursor-pointer transition-colors shadow-md"
              >
                {language === 'ar' ? 'حسناً' : 'D\'accord'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}