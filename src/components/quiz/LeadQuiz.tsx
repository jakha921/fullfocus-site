'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Headphones,
  LineChart,
  MessageSquare,
  Send,
  ShoppingCart,
  Sparkles,
  Timer,
  UserRound,
  WalletCards,
  Workflow,
  Zap,
} from 'lucide-react';
import type { MiniAutomationReport } from '@/lib/automation-audit';

interface QuizData {
  name: string;
  email: string;
  phone: string;
  company: string;
  automationArea: string;
  painPoints: string[];
  tools: string[];
  volume: string;
  budget: string;
  timeline: string;
}

interface SubmitResult {
  id: string;
  reportUrl: string;
  telegramBotUrl: string | null;
  leadScore: number;
  leadTemperature: string;
  report: MiniAutomationReport;
}

type StepKey =
  | 'contact'
  | 'automationArea'
  | 'painPoints'
  | 'tools'
  | 'volume'
  | 'budget'
  | 'timeline';

type Step = {
  key: StepKey;
  title: string;
  eyebrow: string;
  type: 'form' | 'single' | 'multi';
};

type Option = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const initialData: QuizData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  automationArea: '',
  painPoints: [],
  tools: [],
  volume: '',
  budget: '',
  timeline: '',
};

const steps: Step[] = [
  {
    key: 'contact',
    title: 'Куда отправить мини-отчет?',
    eyebrow: 'Контакт',
    type: 'form',
  },
  {
    key: 'automationArea',
    title: 'Что хотите автоматизировать первым?',
    eyebrow: 'Фокус',
    type: 'single',
  },
  {
    key: 'painPoints',
    title: 'Какие проблемы сейчас мешают?',
    eyebrow: 'Боли',
    type: 'multi',
  },
  {
    key: 'tools',
    title: 'Где сейчас живет процесс?',
    eyebrow: 'Инструменты',
    type: 'multi',
  },
  {
    key: 'volume',
    title: 'Какой примерный объем?',
    eyebrow: 'Нагрузка',
    type: 'single',
  },
  {
    key: 'budget',
    title: 'Какой масштаб решения комфортно обсуждать?',
    eyebrow: 'Масштаб',
    type: 'single',
  },
  {
    key: 'timeline',
    title: 'Когда нужен первый рабочий результат?',
    eyebrow: 'Срок',
    type: 'single',
  },
];

const options: Record<Exclude<StepKey, 'contact'>, Option[]> = {
  automationArea: [
    {
      value: 'sales',
      label: 'Продажи и лиды',
      description: 'Заявки, CRM, follow-up, воронка',
      icon: LineChart,
    },
    {
      value: 'support',
      label: 'Поддержка',
      description: 'AI-бот, база знаний, обращения',
      icon: Headphones,
    },
    {
      value: 'marketing',
      label: 'Маркетинг',
      description: 'Контент, рассылки, лид-магниты',
      icon: Sparkles,
    },
    {
      value: 'operations',
      label: 'Операции',
      description: 'Задачи, статусы, внутренние процессы',
      icon: Workflow,
    },
    {
      value: 'finance',
      label: 'Финансы',
      description: 'Документы, счета, сверки',
      icon: WalletCards,
    },
    {
      value: 'analytics',
      label: 'Аналитика',
      description: 'Дашборды, отчеты, метрики',
      icon: BarChart3,
    },
    {
      value: 'ecommerce',
      label: 'E-commerce',
      description: 'Заказы, склад, повторные продажи',
      icon: ShoppingCart,
    },
    {
      value: 'hr',
      label: 'HR',
      description: 'Кандидаты, анкеты, скоринг',
      icon: UserRound,
    },
  ],
  painPoints: [
    {
      value: 'manual_entry',
      label: 'Ручной ввод',
      description: 'Копируете данные между сервисами',
      icon: FileText,
    },
    {
      value: 'missed_leads',
      label: 'Теряются лиды',
      description: 'Нет контроля заявки до сделки',
      icon: Zap,
    },
    {
      value: 'slow_response',
      label: 'Долгий ответ',
      description: 'Клиенты ждут менеджера',
      icon: MessageSquare,
    },
    {
      value: 'reports',
      label: 'Ручные отчеты',
      description: 'Сбор цифр занимает часы',
      icon: BarChart3,
    },
    {
      value: 'duplicate_data',
      label: 'Дубли данных',
      description: 'CRM, таблицы и сайт не синхронизированы',
      icon: Boxes,
    },
    {
      value: 'no_visibility',
      label: 'Нет прозрачности',
      description: 'Не видно, где процесс застрял',
      icon: Clock3,
    },
    {
      value: 'human_errors',
      label: 'Ошибки команды',
      description: 'Повторяемые действия часто ломаются',
      icon: CheckCircle2,
    },
    {
      value: 'documents',
      label: 'Документы',
      description: 'КП, счета, договоры вручную',
      icon: FileText,
    },
  ],
  tools: [
    {
      value: 'telegram',
      label: 'Telegram',
      description: 'Чаты, бот, каналы',
      icon: MessageSquare,
    },
    {
      value: 'whatsapp',
      label: 'WhatsApp',
      description: 'Заявки и поддержка',
      icon: MessageSquare,
    },
    {
      value: 'instagram',
      label: 'Instagram',
      description: 'Direct, лиды, контент',
      icon: Sparkles,
    },
    {
      value: 'crm',
      label: 'CRM',
      description: 'amoCRM, Bitrix24 или своя CRM',
      icon: Workflow,
    },
    {
      value: 'sheets',
      label: 'Sheets / Excel',
      description: 'Таблицы и отчеты',
      icon: BarChart3,
    },
    {
      value: 'onec',
      label: '1C',
      description: 'Финансы, склад, документы',
      icon: WalletCards,
    },
    {
      value: 'website',
      label: 'Сайт',
      description: 'Формы, личный кабинет, заявки',
      icon: Building2,
    },
    {
      value: 'no_system',
      label: 'Пока нет системы',
      description: 'Процесс держится на людях',
      icon: Bot,
    },
  ],
  volume: [
    {
      value: 'low',
      label: 'До 20 в день',
      description: 'Небольшой поток, нужен порядок',
      icon: Clock3,
    },
    {
      value: 'medium',
      label: '20-100 в день',
      description: 'Уже нужен контроль SLA',
      icon: Workflow,
    },
    {
      value: 'high',
      label: '100-500 в день',
      description: 'Нужны очереди, отчеты, мониторинг',
      icon: LineChart,
    },
    {
      value: 'enterprise',
      label: '500+ в день',
      description: 'Нужна надежная архитектура',
      icon: Boxes,
    },
  ],
  budget: [
    {
      value: 'starter',
      label: 'MVP / точечная автоматизация',
      description: 'Один процесс, быстрый запуск',
      icon: WalletCards,
    },
    {
      value: 'growth',
      label: 'Несколько интеграций',
      description: 'CRM, Telegram, отчеты или уведомления',
      icon: WalletCards,
    },
    {
      value: 'scale',
      label: 'Процесс отдела',
      description: 'Система под команду или направление',
      icon: WalletCards,
    },
    {
      value: 'enterprise',
      label: 'Комплексная автоматизация',
      description: 'Несколько отделов и критичные процессы',
      icon: WalletCards,
    },
    {
      value: 'not_sure',
      label: 'Нужно оценить',
      description: 'Определим после короткого аудита',
      icon: Bot,
    },
  ],
  timeline: [
    {
      value: 'urgent',
      label: 'До 1 месяца',
      description: 'Нужен быстрый запуск',
      icon: Zap,
    },
    {
      value: 'normal',
      label: '1-3 месяца',
      description: 'Оптимально для MVP',
      icon: Clock3,
    },
    {
      value: 'relaxed',
      label: '3-6 месяцев',
      description: 'Можно пройти этапами',
      icon: Workflow,
    },
    {
      value: 'flexible',
      label: 'Гибко',
      description: 'Важно качество и экономика',
      icon: CheckCircle2,
    },
  ],
};

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function LeadQuiz() {
  const quizRef = useRef<HTMLDivElement>(null);
  const didMountRef = useRef(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  const currentStep = steps[step];
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  useEffect(() => {
    if (!result) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [result]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, result]);

  const handleSingleSelect = (key: keyof QuizData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key: 'painPoints' | 'tools', value: string) => {
    setData((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== value) : [...prev[key], value],
      };
    });
  };

  const handleInputChange = (key: keyof QuizData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (currentStep.type === 'form') {
      return data.name.trim().length > 1 && /\S+@\S+\.\S+/.test(data.email);
    }
    if (currentStep.type === 'multi') {
      return data[currentStep.key as 'painPoints' | 'tools'].length > 0;
    }
    return Boolean(data[currentStep.key as keyof QuizData]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Не удалось отправить опрос');
      }

      setResult(payload);
      setSecondsLeft(15 * 60);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось отправить опрос');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        ref={quizRef}
        className="mx-auto max-w-2xl scroll-mt-24 rounded-lg border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 md:p-8"
      >
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-400/15 text-teal-300">
            <Check className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Мини-отчет готов</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Заявка сохранена, а короткий отчет можно открыть без логина.
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-teal-400/20 bg-teal-400/10 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-teal-200">Lead score: {result.leadScore}/100</div>
            <div className="flex items-center gap-2 text-sm text-teal-200">
              <Timer className="h-4 w-4" />
              {formatTimer(secondsLeft)}
            </div>
          </div>
          <p className="text-sm leading-6 text-zinc-200">{result.report.summary}</p>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-sm font-semibold text-white">Первые быстрые шаги</p>
          {result.report.quickWins.slice(0, 3).map((item) => (
            <div key={item} className="flex gap-3 rounded-lg bg-white/[0.03] p-3 text-sm text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={result.telegramBotUrl || result.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
          >
            {result.telegramBotUrl ? 'Получить отчет в Telegram' : 'Открыть мини-отчет'}
            <ArrowRight className="h-4 w-4" />
          </a>
          {result.telegramBotUrl && (
            <a
              href={result.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Web-версия
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div
      ref={quizRef}
      className="mx-auto max-w-2xl scroll-mt-24 rounded-lg border border-white/10 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30 md:p-8"
    >
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-teal-300">{currentStep.eyebrow}</span>
          <span className="text-zinc-500">
            {step + 1} / {steps.length}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold leading-tight text-white">{currentStep.title}</h3>
        {currentStep.type === 'multi' && (
          <p className="mt-2 text-sm text-zinc-500">Можно выбрать несколько вариантов.</p>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.key}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-[360px]"
        >
          {currentStep.type === 'form' ? (
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={data.name}
                onChange={(event) => handleInputChange('name', event.target.value)}
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-teal-400"
              />
              <input
                type="email"
                placeholder="Email *"
                value={data.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-teal-400"
              />
              <input
                type="tel"
                placeholder="Телефон или Telegram"
                value={data.phone}
                onChange={(event) => handleInputChange('phone', event.target.value)}
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-teal-400"
              />
              <input
                type="text"
                placeholder="Компания"
                value={data.company}
                onChange={(event) => handleInputChange('company', event.target.value)}
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-teal-400"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {options[currentStep.key as Exclude<StepKey, 'contact'>].map((option) => {
                const Icon = option.icon;
                const selected =
                  currentStep.type === 'single'
                    ? data[currentStep.key as keyof QuizData] === option.value
                    : data[currentStep.key as 'painPoints' | 'tools'].includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      currentStep.type === 'single'
                        ? handleSingleSelect(currentStep.key as keyof QuizData, option.value)
                        : handleMultiSelect(currentStep.key as 'painPoints' | 'tools', option.value)
                    }
                    className={`min-h-[112px] rounded-lg border p-4 text-left transition ${
                      selected
                        ? 'border-teal-300 bg-teal-300/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Icon className={`h-5 w-5 ${selected ? 'text-teal-300' : 'text-zinc-500'}`} />
                      {selected && <Check className="h-4 w-4 text-teal-300" />}
                    </div>
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-zinc-500">{option.description}</span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {submitError && (
        <p className="mt-4 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {submitError}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((value) => value - 1)}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </button>
        )}

        <div className="flex-1" />

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((value) => value + 1)}
            disabled={!canProceed()}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-teal-400 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            Далее
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-teal-400 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            {isSubmitting ? 'Готовим отчет...' : 'Получить отчет'}
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
