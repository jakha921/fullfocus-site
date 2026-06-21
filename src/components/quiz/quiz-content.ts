export const quizLocales = ["uz", "ru", "en"] as const;
export type QuizLocale = (typeof quizLocales)[number];

export const quizStepOrder = [
  "contact",
  "automationArea",
  "painPoints",
  "tools",
  "volume",
  "budget",
  "timeline",
] as const;

export type StepKey = (typeof quizStepOrder)[number];

export const quizStepTypes: Record<StepKey, "form" | "single" | "multi"> = {
  contact: "form",
  automationArea: "single",
  painPoints: "multi",
  tools: "multi",
  volume: "single",
  budget: "single",
  timeline: "single",
};

type OptionText = {
  value: string;
  label: string;
  description: string;
};

type QuizCopy = {
  pageTitle: string;
  pageHighlight: string;
  pageDescription: string;
  multiHint: string;
  back: string;
  next: string;
  submit: string;
  submitting: string;
  genericError: string;
  form: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  result: {
    title: string;
    description: string;
    score: string;
    quickSteps: string;
    telegramCta: string;
    reportCta: string;
    webVersion: string;
    telegramFallback: string;
    autoOpen: string;
  };
  steps: Record<StepKey, { title: string; eyebrow: string }>;
  options: Record<Exclude<StepKey, "contact">, OptionText[]>;
};

export function resolveQuizLocale(locale: string): QuizLocale {
  return locale === "ru" || locale === "en" || locale === "uz" ? locale : "uz";
}

export const quizCopy: Record<QuizLocale, QuizCopy> = {
  uz: {
    pageTitle: "AI-audit",
    pageHighlight: "avtomatlashtirish",
    pageDescription: "Kontaktlaringizni qoldiring, 5 tagacha savolga javob bering va mini-hisobot oling.",
    multiHint: "Bir nechta variantni tanlash mumkin.",
    back: "Orqaga",
    next: "Keyingi",
    submit: "Hisobotni olish",
    submitting: "Hisobot tayyorlanmoqda...",
    genericError: "So'rovni yuborib bo'lmadi. Iltimos, birozdan keyin qayta urinib ko'ring.",
    form: {
      name: "Ismingiz *",
      email: "Email *",
      phone: "Telefon yoki Telegram",
      company: "Kompaniya",
    },
    result: {
      title: "Mini-hisobot tayyor",
      description: "Ariza saqlandi. Hisobotni Telegram bot orqali ochishingiz mumkin.",
      score: "Lead score",
      quickSteps: "Birinchi tezkor qadamlar",
      telegramCta: "Telegram'da mini-hisobotni ochish",
      reportCta: "Mini-hisobotni webda ochish",
      webVersion: "Web-versiya",
      telegramFallback: "Telegram bot havolasi hozircha sozlanmagan. Web-versiya orqali hisobotni oching.",
      autoOpen: "Telegram 2 soniyadan keyin avtomatik ochiladi.",
    },
    steps: {
      contact: {
        eyebrow: "Kontakt",
        title: "Mini-hisobotni qayerga yuboramiz?",
      },
      automationArea: {
        eyebrow: "Fokus",
        title: "Avval nimani avtomatlashtirmoqchisiz?",
      },
      painPoints: {
        eyebrow: "Muammolar",
        title: "Hozir qaysi muammolar xalal bermoqda?",
      },
      tools: {
        eyebrow: "Instrumentlar",
        title: "Jarayon hozir qayerda yuritiladi?",
      },
      volume: {
        eyebrow: "Yuklama",
        title: "Taxminiy hajm qanday?",
      },
      budget: {
        eyebrow: "Masshtab",
        title: "Qanday yechim masshtabini muhokama qilish qulay?",
      },
      timeline: {
        eyebrow: "Muddat",
        title: "Birinchi ishchi natija qachon kerak?",
      },
    },
    options: {
      automationArea: [
        { value: "sales", label: "Sotuv va lidlar", description: "Arizalar, CRM, follow-up, voronka" },
        { value: "support", label: "Qo'llab-quvvatlash", description: "AI-bot, bilimlar bazasi, murojaatlar" },
        { value: "marketing", label: "Marketing", description: "Kontent, mailing, lead magnetlar" },
        { value: "operations", label: "Operatsiyalar", description: "Vazifalar, statuslar, ichki jarayonlar" },
        { value: "finance", label: "Moliya", description: "Hujjatlar, hisoblar, solishtirishlar" },
        { value: "analytics", label: "Analitika", description: "Dashboardlar, hisobotlar, metrikalar" },
        { value: "ecommerce", label: "E-commerce", description: "Buyurtmalar, ombor, takroriy savdolar" },
        { value: "hr", label: "HR", description: "Nomzodlar, anketalar, scoring" },
      ],
      painPoints: [
        { value: "manual_entry", label: "Qo'lda kiritish", description: "Ma'lumotlarni servislar orasida ko'chirasiz" },
        { value: "missed_leads", label: "Lidlar yo'qoladi", description: "Arizadan bitimgacha nazorat yo'q" },
        { value: "slow_response", label: "Javob sekin", description: "Mijozlar menejerni kutadi" },
        { value: "reports", label: "Qo'lda hisobot", description: "Raqamlarni yig'ish soatlab vaqt oladi" },
        { value: "duplicate_data", label: "Dublikat ma'lumot", description: "CRM, jadval va sayt sinxron emas" },
        { value: "no_visibility", label: "Shaffoflik yo'q", description: "Jarayon qayerda to'xtagani ko'rinmaydi" },
        { value: "human_errors", label: "Jamoa xatolari", description: "Takroriy ishlar tez-tez buziladi" },
        { value: "documents", label: "Hujjatlar", description: "KP, hisob va shartnomalar qo'lda" },
      ],
      tools: [
        { value: "telegram", label: "Telegram", description: "Chatlar, bot, kanallar" },
        { value: "whatsapp", label: "WhatsApp", description: "Arizalar va support" },
        { value: "instagram", label: "Instagram", description: "Direct, lidlar, kontent" },
        { value: "crm", label: "CRM", description: "amoCRM, Bitrix24 yoki o'z CRM" },
        { value: "sheets", label: "Sheets / Excel", description: "Jadvallar va hisobotlar" },
        { value: "onec", label: "1C", description: "Moliya, ombor, hujjatlar" },
        { value: "website", label: "Sayt", description: "Formalar, kabinet, arizalar" },
        { value: "no_system", label: "Tizim yo'q", description: "Jarayon odamlar xotirasida" },
      ],
      volume: [
        { value: "low", label: "Kuniga 20 gacha", description: "Kichik oqim, tartib kerak" },
        { value: "medium", label: "Kuniga 20-100", description: "SLA nazorati kerak bo'ladi" },
        { value: "high", label: "Kuniga 100-500", description: "Navbat, hisobot, monitoring kerak" },
        { value: "enterprise", label: "Kuniga 500+", description: "Ishonchli arxitektura kerak" },
      ],
      budget: [
        { value: "starter", label: "MVP / aniq avtomatlashtirish", description: "Bitta jarayon, tez start" },
        { value: "growth", label: "Bir nechta integratsiya", description: "CRM, Telegram, hisobot yoki xabarlar" },
        { value: "scale", label: "Bo'lim jarayoni", description: "Jamoa yoki yo'nalish uchun tizim" },
        { value: "enterprise", label: "Kompleks avtomatlashtirish", description: "Bir nechta bo'lim va muhim jarayonlar" },
        { value: "not_sure", label: "Baholash kerak", description: "Qisqa auditdan keyin aniqlaymiz" },
      ],
      timeline: [
        { value: "urgent", label: "1 oygacha", description: "Tez ishga tushirish kerak" },
        { value: "normal", label: "1-3 oy", description: "MVP uchun optimal" },
        { value: "relaxed", label: "3-6 oy", description: "Bosqichma-bosqich yurish mumkin" },
        { value: "flexible", label: "Moslashuvchan", description: "Sifat va iqtisod muhim" },
      ],
    },
  },
  ru: {
    pageTitle: "AI-аудит",
    pageHighlight: "автоматизации",
    pageDescription: "Оставьте контакты, ответьте максимум на 5 вопросов и получите мини-отчет.",
    multiHint: "Можно выбрать несколько вариантов.",
    back: "Назад",
    next: "Далее",
    submit: "Получить отчет",
    submitting: "Готовим отчет...",
    genericError: "Не удалось отправить опрос. Попробуйте еще раз чуть позже.",
    form: {
      name: "Ваше имя *",
      email: "Email *",
      phone: "Телефон или Telegram",
      company: "Компания",
    },
    result: {
      title: "Мини-отчет готов",
      description: "Заявка сохранена. Отчет можно открыть через Telegram-бота.",
      score: "Lead score",
      quickSteps: "Первые быстрые шаги",
      telegramCta: "Открыть мини-отчет в Telegram",
      reportCta: "Открыть мини-отчет",
      webVersion: "Web-версия",
      telegramFallback: "Ссылка на Telegram-бота пока не настроена. Откройте web-версию отчета.",
      autoOpen: "Telegram откроется автоматически через 2 секунды.",
    },
    steps: {
      contact: { eyebrow: "Контакт", title: "Куда отправить мини-отчет?" },
      automationArea: { eyebrow: "Фокус", title: "Что хотите автоматизировать первым?" },
      painPoints: { eyebrow: "Боли", title: "Какие проблемы сейчас мешают?" },
      tools: { eyebrow: "Инструменты", title: "Где сейчас живет процесс?" },
      volume: { eyebrow: "Нагрузка", title: "Какой примерный объем?" },
      budget: { eyebrow: "Масштаб", title: "Какой масштаб решения комфортно обсуждать?" },
      timeline: { eyebrow: "Срок", title: "Когда нужен первый рабочий результат?" },
    },
    options: {
      automationArea: [
        { value: "sales", label: "Продажи и лиды", description: "Заявки, CRM, follow-up, воронка" },
        { value: "support", label: "Поддержка", description: "AI-бот, база знаний, обращения" },
        { value: "marketing", label: "Маркетинг", description: "Контент, рассылки, лид-магниты" },
        { value: "operations", label: "Операции", description: "Задачи, статусы, внутренние процессы" },
        { value: "finance", label: "Финансы", description: "Документы, счета, сверки" },
        { value: "analytics", label: "Аналитика", description: "Дашборды, отчеты, метрики" },
        { value: "ecommerce", label: "E-commerce", description: "Заказы, склад, повторные продажи" },
        { value: "hr", label: "HR", description: "Кандидаты, анкеты, скоринг" },
      ],
      painPoints: [
        { value: "manual_entry", label: "Ручной ввод", description: "Копируете данные между сервисами" },
        { value: "missed_leads", label: "Теряются лиды", description: "Нет контроля заявки до сделки" },
        { value: "slow_response", label: "Долгий ответ", description: "Клиенты ждут менеджера" },
        { value: "reports", label: "Ручные отчеты", description: "Сбор цифр занимает часы" },
        { value: "duplicate_data", label: "Дубли данных", description: "CRM, таблицы и сайт не синхронизированы" },
        { value: "no_visibility", label: "Нет прозрачности", description: "Не видно, где процесс застрял" },
        { value: "human_errors", label: "Ошибки команды", description: "Повторяемые действия часто ломаются" },
        { value: "documents", label: "Документы", description: "КП, счета, договоры вручную" },
      ],
      tools: [
        { value: "telegram", label: "Telegram", description: "Чаты, бот, каналы" },
        { value: "whatsapp", label: "WhatsApp", description: "Заявки и поддержка" },
        { value: "instagram", label: "Instagram", description: "Direct, лиды, контент" },
        { value: "crm", label: "CRM", description: "amoCRM, Bitrix24 или своя CRM" },
        { value: "sheets", label: "Sheets / Excel", description: "Таблицы и отчеты" },
        { value: "onec", label: "1C", description: "Финансы, склад, документы" },
        { value: "website", label: "Сайт", description: "Формы, личный кабинет, заявки" },
        { value: "no_system", label: "Пока нет системы", description: "Процесс держится на людях" },
      ],
      volume: [
        { value: "low", label: "До 20 в день", description: "Небольшой поток, нужен порядок" },
        { value: "medium", label: "20-100 в день", description: "Уже нужен контроль SLA" },
        { value: "high", label: "100-500 в день", description: "Нужны очереди, отчеты, мониторинг" },
        { value: "enterprise", label: "500+ в день", description: "Нужна надежная архитектура" },
      ],
      budget: [
        { value: "starter", label: "MVP / точечная автоматизация", description: "Один процесс, быстрый запуск" },
        { value: "growth", label: "Несколько интеграций", description: "CRM, Telegram, отчеты или уведомления" },
        { value: "scale", label: "Процесс отдела", description: "Система под команду или направление" },
        { value: "enterprise", label: "Комплексная автоматизация", description: "Несколько отделов и критичные процессы" },
        { value: "not_sure", label: "Нужно оценить", description: "Определим после короткого аудита" },
      ],
      timeline: [
        { value: "urgent", label: "До 1 месяца", description: "Нужен быстрый запуск" },
        { value: "normal", label: "1-3 месяца", description: "Оптимально для MVP" },
        { value: "relaxed", label: "3-6 месяцев", description: "Можно пройти этапами" },
        { value: "flexible", label: "Гибко", description: "Важно качество и экономика" },
      ],
    },
  },
  en: {
    pageTitle: "AI automation",
    pageHighlight: "audit",
    pageDescription: "Leave your contacts, answer up to 5 questions, and get a mini-report.",
    multiHint: "You can choose several options.",
    back: "Back",
    next: "Next",
    submit: "Get report",
    submitting: "Preparing report...",
    genericError: "We could not submit the quiz. Please try again later.",
    form: {
      name: "Your name *",
      email: "Email *",
      phone: "Phone or Telegram",
      company: "Company",
    },
    result: {
      title: "Mini-report is ready",
      description: "Your request is saved. Open the report through the Telegram bot.",
      score: "Lead score",
      quickSteps: "First quick steps",
      telegramCta: "Open mini-report in Telegram",
      reportCta: "Open mini-report",
      webVersion: "Web version",
      telegramFallback: "Telegram bot link is not configured yet. Open the web report instead.",
      autoOpen: "Telegram will open automatically in 2 seconds.",
    },
    steps: {
      contact: { eyebrow: "Contact", title: "Where should we send the mini-report?" },
      automationArea: { eyebrow: "Focus", title: "What do you want to automate first?" },
      painPoints: { eyebrow: "Pain points", title: "What problems block you now?" },
      tools: { eyebrow: "Tools", title: "Where does the process live today?" },
      volume: { eyebrow: "Load", title: "What is the approximate volume?" },
      budget: { eyebrow: "Scale", title: "What solution scale is comfortable to discuss?" },
      timeline: { eyebrow: "Timeline", title: "When do you need the first working result?" },
    },
    options: {
      automationArea: [
        { value: "sales", label: "Sales and leads", description: "Requests, CRM, follow-up, funnel" },
        { value: "support", label: "Support", description: "AI bot, knowledge base, tickets" },
        { value: "marketing", label: "Marketing", description: "Content, campaigns, lead magnets" },
        { value: "operations", label: "Operations", description: "Tasks, statuses, internal processes" },
        { value: "finance", label: "Finance", description: "Documents, invoices, reconciliations" },
        { value: "analytics", label: "Analytics", description: "Dashboards, reports, metrics" },
        { value: "ecommerce", label: "E-commerce", description: "Orders, stock, repeat sales" },
        { value: "hr", label: "HR", description: "Candidates, forms, scoring" },
      ],
      painPoints: [
        { value: "manual_entry", label: "Manual entry", description: "Copying data between services" },
        { value: "missed_leads", label: "Lost leads", description: "No control from request to deal" },
        { value: "slow_response", label: "Slow response", description: "Customers wait for a manager" },
        { value: "reports", label: "Manual reports", description: "Collecting numbers takes hours" },
        { value: "duplicate_data", label: "Duplicate data", description: "CRM, spreadsheets, and site are not synced" },
        { value: "no_visibility", label: "No visibility", description: "You cannot see where the process stalls" },
        { value: "human_errors", label: "Team errors", description: "Repeatable actions break often" },
        { value: "documents", label: "Documents", description: "Proposals, invoices, contracts by hand" },
      ],
      tools: [
        { value: "telegram", label: "Telegram", description: "Chats, bot, channels" },
        { value: "whatsapp", label: "WhatsApp", description: "Requests and support" },
        { value: "instagram", label: "Instagram", description: "Direct, leads, content" },
        { value: "crm", label: "CRM", description: "amoCRM, Bitrix24, or custom CRM" },
        { value: "sheets", label: "Sheets / Excel", description: "Spreadsheets and reports" },
        { value: "onec", label: "1C", description: "Finance, stock, documents" },
        { value: "website", label: "Website", description: "Forms, account, requests" },
        { value: "no_system", label: "No system yet", description: "The process is held by people" },
      ],
      volume: [
        { value: "low", label: "Up to 20/day", description: "Small flow, needs order" },
        { value: "medium", label: "20-100/day", description: "SLA control becomes important" },
        { value: "high", label: "100-500/day", description: "Queues, reports, monitoring needed" },
        { value: "enterprise", label: "500+/day", description: "Reliable architecture needed" },
      ],
      budget: [
        { value: "starter", label: "MVP / focused automation", description: "One process, fast launch" },
        { value: "growth", label: "Several integrations", description: "CRM, Telegram, reports, or alerts" },
        { value: "scale", label: "Department process", description: "System for a team or function" },
        { value: "enterprise", label: "Complex automation", description: "Several departments and critical processes" },
        { value: "not_sure", label: "Need assessment", description: "We will define it after a short audit" },
      ],
      timeline: [
        { value: "urgent", label: "Within 1 month", description: "Need a fast launch" },
        { value: "normal", label: "1-3 months", description: "Optimal for MVP" },
        { value: "relaxed", label: "3-6 months", description: "Can be done in stages" },
        { value: "flexible", label: "Flexible", description: "Quality and economics matter" },
      ],
    },
  },
};
