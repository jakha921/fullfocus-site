'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Send } from 'lucide-react';

interface QuizData {
  projectType: string;
  budget: string;
  timeline: string;
  features: string[];
  name: string;
  email: string;
  phone: string;
  company: string;
}

const initialData: QuizData = {
  projectType: '',
  budget: '',
  timeline: '',
  features: [],
  name: '',
  email: '',
  phone: '',
  company: '',
};

const projectEstimates: Record<string, { min: number; max: number; weeks: { min: number; max: number } }> = {
  website: { min: 2000, max: 8000, weeks: { min: 2, max: 6 } },
  webapp: { min: 8000, max: 30000, weeks: { min: 6, max: 16 } },
  mobile: { min: 10000, max: 40000, weeks: { min: 8, max: 20 } },
  ecommerce: { min: 5000, max: 20000, weeks: { min: 4, max: 12 } },
  erp: { min: 15000, max: 80000, weeks: { min: 12, max: 36 } },
  other: { min: 3000, max: 20000, weeks: { min: 4, max: 12 } },
};

const featureMultipliers: Record<string, number> = {
  auth: 1.2,
  payment: 1.3,
  admin: 1.15,
  api: 1.1,
  analytics: 1.05,
  multilang: 1.2,
};

export function LeadQuiz() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { key: 'projectType', title: 'Какой проект нужен?', type: 'single' },
    { key: 'features', title: 'Какой функционал?', type: 'multi' },
    { key: 'budget', title: 'Примерный бюджет?', type: 'single' },
    { key: 'timeline', title: 'Когда нужен проект?', type: 'single' },
    { key: 'contact', title: 'Ваши контакты', type: 'form' },
  ];

  const options: Record<string, Array<{ value: string; label: string; icon: string }>> = {
    projectType: [
      { value: 'website', label: 'Сайт', icon: '🌐' },
      { value: 'webapp', label: 'Веб-приложение', icon: '💻' },
      { value: 'mobile', label: 'Мобильное приложение', icon: '📱' },
      { value: 'ecommerce', label: 'Интернет-магазин', icon: '🛒' },
      { value: 'erp', label: 'ERP/CRM', icon: '📊' },
      { value: 'other', label: 'Другое', icon: '🔧' },
    ],
    features: [
      { value: 'auth', label: 'Авторизация', icon: '🔐' },
      { value: 'payment', label: 'Платежи', icon: '💳' },
      { value: 'admin', label: 'Админ-панель', icon: '⚙️' },
      { value: 'api', label: 'API интеграция', icon: '🔗' },
      { value: 'analytics', label: 'Аналитика', icon: '📈' },
      { value: 'multilang', label: 'Мультиязычность', icon: '🌍' },
    ],
    budget: [
      { value: 'small', label: 'До $5,000', icon: '💰' },
      { value: 'medium', label: '$5,000 - $15,000', icon: '💰💰' },
      { value: 'large', label: '$15,000 - $50,000', icon: '💰💰💰' },
      { value: 'enterprise', label: 'От $50,000', icon: '💰💰💰💰' },
      { value: 'not_sure', label: 'Не определился', icon: '🤔' },
    ],
    timeline: [
      { value: 'urgent', label: 'Срочно (1 месяц)', icon: '⚡' },
      { value: 'normal', label: '1-3 месяца', icon: '📅' },
      { value: 'relaxed', label: '3-6 месяцев', icon: '🗓️' },
      { value: 'flexible', label: 'Гибкие сроки', icon: '🔄' },
    ],
  };

  const calculateEstimate = () => {
    const base = projectEstimates[data.projectType] || projectEstimates.other;
    let multiplier = 1;

    data.features.forEach(f => {
      multiplier *= featureMultipliers[f] || 1;
    });

    return {
      min: Math.round(base.min * multiplier),
      max: Math.round(base.max * multiplier),
      weeks: base.weeks,
    };
  };

  const handleSingleSelect = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key: string, value: string) => {
    setData(prev => {
      const arr = prev[key as keyof QuizData] as string[];
      const exists = arr.includes(value);
      return {
        ...prev,
        [key]: exists ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          estimate: calculateEstimate(),
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    const currentStep = steps[step];
    const value = data[currentStep.key as keyof QuizData];

    if (currentStep.type === 'single') return !!value;
    if (currentStep.type === 'multi') return (value as string[]).length > 0;
    if (currentStep.type === 'form') return data.name && data.email;

    return false;
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 max-w-lg mx-auto"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
          <p className="text-zinc-400">Спасибо за интерес к FullFocus</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-400 text-sm mb-2">Что дальше?</p>
            <ul className="text-sm text-zinc-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Наш менеджер изучит ваш запрос
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Свяжемся с вами в течение 24 часов
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Обсудим детали и подготовим предложение
              </li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400 text-sm font-medium">
              📞 Бесплатная консультация включена
            </p>
          </div>
        </div>

        <a
          href="/"
          className="block w-full text-center px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl text-white font-semibold transition"
        >
          Вернуться на главную
        </a>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 md:p-8 max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition ${
              i <= step ? 'bg-green-500' : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>

      {/* Step info */}
      <div className="text-center mb-6">
        <p className="text-zinc-500 text-sm mb-1">Шаг {step + 1} из {steps.length}</p>
        <h3 className="text-xl font-bold text-white">{steps[step].title}</h3>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="min-h-[280px]"
        >
          {steps[step].type === 'form' ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={data.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:border-green-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email *"
                value={data.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:border-green-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Телефон (WhatsApp/Telegram)"
                value={data.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:border-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Название компании"
                value={data.company}
                onChange={e => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:border-green-500 focus:outline-none"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {options[steps[step].key]?.map(opt => {
                const isSelected =
                  steps[step].type === 'single'
                    ? data[steps[step].key as keyof QuizData] === opt.value
                    : (data[steps[step].key as keyof QuizData] as string[]).includes(opt.value);

                return (
                  <button
                    key={opt.value}
                    onClick={() =>
                      steps[step].type === 'single'
                        ? handleSingleSelect(steps[step].key, opt.value)
                        : handleMultiSelect(steps[step].key, opt.value)
                    }
                    className={`p-4 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-green-500 bg-green-500/10 text-white'
                        : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{opt.icon}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-4 py-3 text-zinc-400 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Назад
          </button>
        )}

        <div className="flex-1" />

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-xl text-white transition"
          >
            Далее
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-xl text-white transition"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
