export type AutomationAuditAnswers = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  automationArea: string;
  painPoints: string[];
  tools: string[];
  volume: string;
  budget: string;
  timeline: string;
};

export type AutomationEstimate = {
  min: number;
  max: number;
  weeks: {
    min: number;
    max: number;
  };
};

export type MiniAutomationReport = {
  summary: string;
  recommendedSolution: string;
  quickWins: string[];
  risks: string[];
  nextSteps: string[];
};

export type AutomationAuditPayload = {
  version: "automation-audit-v1" | "legacy-project-estimate";
  painPoints: string[];
  tools: string[];
  volume: string;
  leadScore?: number;
  leadTemperature?: string;
  report?: MiniAutomationReport;
};

export type AuditLocale = "uz" | "ru" | "en";

export function normalizeAuditLocale(value: unknown): AuditLocale {
  return value === "ru" || value === "en" || value === "uz" ? value : "uz";
}

const automationAreaLabelsByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    sales: "Sotuvlar va lidlar",
    support: "Mijozlarni qo'llab-quvvatlash",
    marketing: "Marketing",
    operations: "Operatsiyalar va jarayonlar",
    finance: "Moliya va hujjatlar",
    hr: "HR va yollash",
    analytics: "Hisobot va analitika",
    ecommerce: "E-commerce",
    website: "Korporativ sayt",
    webapp: "Veb-ilova",
    mobile: "Mobil ilova",
    erp: "ERP/CRM tizimi",
    other: "Boshqa",
  },
  ru: {
    sales: "Продажи и лиды",
    support: "Поддержка клиентов",
    marketing: "Маркетинг",
    operations: "Операции и процессы",
    finance: "Финансы и документы",
    hr: "HR и найм",
    analytics: "Отчеты и аналитика",
    ecommerce: "E-commerce",
    website: "Корпоративный сайт",
    webapp: "Веб-приложение",
    mobile: "Мобильное приложение",
    erp: "ERP/CRM система",
    other: "Другое",
  },
  en: {
    sales: "Sales and leads",
    support: "Customer support",
    marketing: "Marketing",
    operations: "Operations and processes",
    finance: "Finance and documents",
    hr: "HR and hiring",
    analytics: "Reporting and analytics",
    ecommerce: "E-commerce",
    website: "Corporate website",
    webapp: "Web application",
    mobile: "Mobile application",
    erp: "ERP/CRM system",
    other: "Other",
  },
};

const painPointLabelsByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    manual_entry: "Qo'lda ma'lumot kiritish va ko'chirish",
    missed_leads: "Lidlar yo'qoladi yoki kech qayta ishlanadi",
    slow_response: "Mijozlar javobni uzoq kutadi",
    reports: "Hisobotlar qo'lda yig'iladi",
    duplicate_data: "Ma'lumotlar turli tizimlarda takrorlanadi",
    no_visibility: "Statuslar bo'yicha aniq ko'rinish yo'q",
    human_errors: "Qo'lda bajariladigan ishlar sabab xatolar ko'p",
    documents: "Hujjatlar va shablonlar qo'lda tayyorlanadi",
    auth: "Avtorizatsiya",
    payment: "To'lovlar",
    admin: "Admin panel",
    api: "API integratsiya",
    analytics: "Analitika",
    multilang: "Ko'p tillilik",
  },
  ru: {
    manual_entry: "Ручной ввод и копирование данных",
    missed_leads: "Лиды теряются или долго обрабатываются",
    slow_response: "Клиенты долго ждут ответа",
    reports: "Отчеты собираются вручную",
    duplicate_data: "Данные дублируются в разных системах",
    no_visibility: "Нет прозрачной картины по статусам",
    human_errors: "Много ошибок из-за ручных действий",
    documents: "Документы и шаблоны готовятся вручную",
    auth: "Авторизация",
    payment: "Платежи",
    admin: "Админ-панель",
    api: "API интеграция",
    analytics: "Аналитика",
    multilang: "Многоязычность",
  },
  en: {
    manual_entry: "Manual data entry and copying",
    missed_leads: "Leads get lost or processed too late",
    slow_response: "Customers wait too long for a reply",
    reports: "Reports are assembled manually",
    duplicate_data: "Data is duplicated across systems",
    no_visibility: "No clear visibility into statuses",
    human_errors: "Manual work causes frequent errors",
    documents: "Documents and templates are prepared manually",
    auth: "Authentication",
    payment: "Payments",
    admin: "Admin panel",
    api: "API integration",
    analytics: "Analytics",
    multilang: "Multilingual support",
  },
};

const toolLabelsByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    crm: "CRM",
    sheets: "Google Sheets / Excel",
    onec: "1C",
    website: "Sayt",
    no_system: "Hozircha tizim yo'q",
  },
  ru: {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    crm: "CRM",
    sheets: "Google Sheets / Excel",
    onec: "1C",
    website: "Сайт",
    no_system: "Пока нет системы",
  },
  en: {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    crm: "CRM",
    sheets: "Google Sheets / Excel",
    onec: "1C",
    website: "Website",
    no_system: "No system yet",
  },
};

const volumeLabelsByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    low: "Kuniga 20 tagacha murojaat/operatsiya",
    medium: "Kuniga 20-100",
    high: "Kuniga 100-500",
    enterprise: "Kuniga 500+",
  },
  ru: {
    low: "До 20 обращений/операций в день",
    medium: "20-100 в день",
    high: "100-500 в день",
    enterprise: "500+ в день",
  },
  en: {
    low: "Up to 20 requests/operations per day",
    medium: "20-100 per day",
    high: "100-500 per day",
    enterprise: "500+ per day",
  },
};

const budgetLabelsByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    starter: "MVP / aniq bir avtomatlashtirish",
    growth: "Bir nechta integratsiya",
    scale: "Bo'lim jarayoni",
    enterprise: "Kompleks avtomatlashtirish",
    not_sure: "Baholash kerak",
    small: "MVP / aniq vazifa",
    medium: "Bir nechta integratsiya",
    large: "Bo'lim jarayoni",
  },
  ru: {
    starter: "MVP / точечная автоматизация",
    growth: "Несколько интеграций",
    scale: "Процесс отдела",
    enterprise: "Комплексная автоматизация",
    not_sure: "Нужно оценить",
    small: "MVP / точечная задача",
    medium: "Несколько интеграций",
    large: "Процесс отдела",
  },
  en: {
    starter: "MVP / focused automation",
    growth: "Several integrations",
    scale: "Department process",
    enterprise: "Complex automation",
    not_sure: "Needs assessment",
    small: "MVP / focused task",
    medium: "Several integrations",
    large: "Department process",
  },
};

const timelineLabelsByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    urgent: "1 oy ichida kerak",
    normal: "1-3 oy",
    relaxed: "3-6 oy",
    flexible: "Bosqichma-bosqich mumkin",
  },
  ru: {
    urgent: "Нужно в течение месяца",
    normal: "1-3 месяца",
    relaxed: "3-6 месяцев",
    flexible: "Можно поэтапно",
  },
  en: {
    urgent: "Needed within a month",
    normal: "1-3 months",
    relaxed: "3-6 months",
    flexible: "Can be phased",
  },
};

const leadTemperatureLabelsByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    hot: "Issiq lid",
    warm: "Iliq lid",
    cold: "Dastlabki qiziqish",
  },
  ru: {
    hot: "Горячий лид",
    warm: "Теплый лид",
    cold: "Ранний интерес",
  },
  en: {
    hot: "Hot lead",
    warm: "Warm lead",
    cold: "Early interest",
  },
};

export const automationAreaLabels = automationAreaLabelsByLocale.ru;
export const painPointLabels = painPointLabelsByLocale.ru;
export const toolLabels = toolLabelsByLocale.ru;
export const volumeLabels = volumeLabelsByLocale.ru;
export const budgetLabels = budgetLabelsByLocale.ru;
export const timelineLabels = timelineLabelsByLocale.ru;
export const leadTemperatureLabels = leadTemperatureLabelsByLocale.ru;

const areaBases: Record<string, AutomationEstimate> = {
  sales: { min: 1800, max: 7000, weeks: { min: 2, max: 6 } },
  support: { min: 1800, max: 6500, weeks: { min: 2, max: 6 } },
  marketing: { min: 1600, max: 6000, weeks: { min: 2, max: 5 } },
  operations: { min: 3000, max: 12000, weeks: { min: 4, max: 10 } },
  finance: { min: 3000, max: 14000, weeks: { min: 4, max: 12 } },
  hr: { min: 2200, max: 8000, weeks: { min: 3, max: 8 } },
  analytics: { min: 2200, max: 9000, weeks: { min: 3, max: 8 } },
  ecommerce: { min: 3000, max: 12000, weeks: { min: 4, max: 10 } },
  other: { min: 2000, max: 9000, weeks: { min: 3, max: 8 } },
};

const volumeMultipliers: Record<string, number> = {
  low: 1,
  medium: 1.2,
  high: 1.45,
  enterprise: 1.8,
};

const quickWinByPainPointByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    manual_entry: "Formalar, messenjerlar va jadvallardan kelgan murojaatlarni bitta oqimga yig'ish.",
    missed_leads: "Lidlarni avtomatik yaratish va SLA eslatmalarini sozlash.",
    slow_response: "Tez-tez beriladigan savollarga AI-javoblarni ishga tushirish va murakkab holatlarni menejerga uzatish.",
    reports: "Lidlar, sotuvlar, vazifalar va SLA bo'yicha avtomatik dashboard qilish.",
    duplicate_data: "CRM, jadvallar va ichki tizimlarni yagona ma'lumot manbasi orqali sinxronlash.",
    no_visibility: "Jarayon statuslari va tor joylar bo'yicha kunlik hisobot kiritish.",
    human_errors: "Takroriy operatsiyalar uchun tekshiruvlar, shablonlar va avtomatik qadamlar qo'shish.",
    documents: "KP, shartnoma, hisob va hisobotlarni shablon asosida avtomatik yaratish.",
  },
  ru: {
    manual_entry: "Собрать заявки из форм, мессенджеров и таблиц в один поток.",
    missed_leads: "Настроить автоматическое создание лидов и SLA-напоминания.",
    slow_response: "Запустить AI-ответы на частые вопросы с передачей сложных кейсов менеджеру.",
    reports: "Сделать авто-дашборд по лидам, продажам, задачам и SLA.",
    duplicate_data: "Синхронизировать CRM, таблицы и внутренние системы через единый источник данных.",
    no_visibility: "Ввести статусы процесса и ежедневный отчет по узким местам.",
    human_errors: "Добавить проверки, шаблоны и автоматические шаги для повторяемых операций.",
    documents: "Автоматизировать генерацию КП, договоров, счетов и отчетов по шаблонам.",
  },
  en: {
    manual_entry: "Collect requests from forms, messengers, and spreadsheets into one flow.",
    missed_leads: "Set up automatic lead creation and SLA reminders.",
    slow_response: "Launch AI replies for frequent questions with handoff for complex cases.",
    reports: "Create an auto-dashboard for leads, sales, tasks, and SLA.",
    duplicate_data: "Sync CRM, spreadsheets, and internal systems through one source of truth.",
    no_visibility: "Introduce process statuses and a daily report on bottlenecks.",
    human_errors: "Add checks, templates, and automated steps for repeatable operations.",
    documents: "Automate proposals, contracts, invoices, and reports from templates.",
  },
};

const recommendedByAreaByLocale: Record<AuditLocale, Record<string, string>> = {
  uz: {
    sales: "AI lead intake + CRM avtomatlashtirish + follow-up ssenariylari.",
    support: "AI support agent + bilimlar bazasi + operatorga eskalatsiya.",
    marketing: "Kontent reja, lead magnet va mailing avtomatlashtirish.",
    operations: "Statuslar, vazifalar va bo'limlararo integratsiyalar uchun workflow engine.",
    finance: "Hujjatlar, hisoblar, solishtirishlar va hisobotlarni avtomatlashtirish.",
    hr: "Avtojavoblar, kandidat scoring va hisobotlar bilan HR pipeline.",
    analytics: "Yagona BI dashboard va boshqaruv hisobotlarini avtomatik yig'ish.",
    ecommerce: "Buyurtmalar, qo'llab-quvvatlash, ombor statuslari va takroriy savdolarni avtomatlashtirish.",
  },
  ru: {
    sales: "AI lead intake + CRM automation + follow-up сценарии.",
    support: "AI support agent + база знаний + эскалация оператору.",
    marketing: "Автоматизация контент-плана, лид-магнитов и рассылок.",
    operations: "Workflow engine для статусов, задач и интеграций между отделами.",
    finance: "Автоматизация документов, счетов, сверок и отчетов.",
    hr: "HR pipeline с автоответами, скорингом кандидатов и отчетами.",
    analytics: "Единый BI-дашборд и автоматическая сборка управленческих отчетов.",
    ecommerce: "Автоматизация заказов, поддержки, складских статусов и повторных продаж.",
  },
  en: {
    sales: "AI lead intake + CRM automation + follow-up scenarios.",
    support: "AI support agent + knowledge base + human escalation.",
    marketing: "Automation for content planning, lead magnets, and campaigns.",
    operations: "Workflow engine for statuses, tasks, and cross-team integrations.",
    finance: "Automation for documents, invoices, reconciliations, and reports.",
    hr: "HR pipeline with auto-replies, candidate scoring, and reports.",
    analytics: "Unified BI dashboard and automatic management reporting.",
    ecommerce: "Automation for orders, support, stock statuses, and repeat sales.",
  },
};

function uniqueStrings(values: unknown, limit = 12): string[] {
  if (!Array.isArray(values)) return [];
  return Array.from(
    new Set(
      values
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    )
  ).slice(0, limit);
}

function roundToHundred(value: number): number {
  return Math.max(500, Math.round(value / 100) * 100);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function labelFromLocale(
  labels: Record<AuditLocale, Record<string, string>>,
  value: string,
  locale: AuditLocale
): string {
  return labels[locale]?.[value] || labels.ru[value] || value;
}

export function labelAutomationArea(value: string, locale: AuditLocale = "ru"): string {
  return labelFromLocale(automationAreaLabelsByLocale, value, locale);
}

export function labelPainPoint(value: string, locale: AuditLocale = "ru"): string {
  return labelFromLocale(painPointLabelsByLocale, value, locale);
}

export function labelTool(value: string, locale: AuditLocale = "ru"): string {
  return labelFromLocale(toolLabelsByLocale, value, locale);
}

export function labelVolume(value: string, locale: AuditLocale = "ru"): string {
  return labelFromLocale(volumeLabelsByLocale, value, locale);
}

export function labelBudget(value: string, locale: AuditLocale = "ru"): string {
  return labelFromLocale(budgetLabelsByLocale, value, locale);
}

export function labelTimeline(value: string, locale: AuditLocale = "ru"): string {
  return labelFromLocale(timelineLabelsByLocale, value, locale);
}

export function labelLeadTemperature(value: string, locale: AuditLocale = "ru"): string {
  return labelFromLocale(leadTemperatureLabelsByLocale, value, locale);
}

export function createAutomationAuditReport(
  data: AutomationAuditAnswers,
  localeInput: unknown = "ru"
): {
  estimate: AutomationEstimate;
  leadScore: number;
  leadTemperature: "hot" | "warm" | "cold";
  report: MiniAutomationReport;
} {
  const locale = normalizeAuditLocale(localeInput);
  const base = areaBases[data.automationArea] || areaBases.other;
  const volumeMultiplier = volumeMultipliers[data.volume] || 1.1;
  const complexityMultiplier =
    1 + data.painPoints.length * 0.08 + data.tools.length * 0.04;
  const budgetMultiplier =
    data.budget === "enterprise" ? 1.35 : data.budget === "scale" ? 1.15 : 1;
  const multiplier = volumeMultiplier * complexityMultiplier * budgetMultiplier;

  const estimate = {
    min: roundToHundred(base.min * multiplier),
    max: roundToHundred(base.max * multiplier),
    weeks: {
      min: base.weeks.min,
      max:
        base.weeks.max +
        (data.volume === "enterprise" ? 4 : data.painPoints.length >= 5 ? 2 : 0),
    },
  };

  const leadScore = clamp(
    30 +
      data.painPoints.length * 8 +
      data.tools.length * 3 +
      (data.volume === "high" ? 12 : data.volume === "enterprise" ? 18 : 0) +
      (data.timeline === "urgent" ? 14 : data.timeline === "normal" ? 8 : 3) +
      (data.budget === "enterprise" || data.budget === "scale" ? 10 : 0),
    0,
    100
  );
  const leadTemperature = leadScore >= 78 ? "hot" : leadScore >= 55 ? "warm" : "cold";

  const areaLabel = labelAutomationArea(data.automationArea, locale).toLocaleLowerCase(
    locale === "en" ? "en-US" : locale === "ru" ? "ru-RU" : "uz-UZ"
  );
  const painLabels = data.painPoints.map((item) => labelPainPoint(item, locale));
  const toolLabelsText = data.tools.map((item) => labelTool(item, locale));
  const quickWinsByPainPoint = quickWinByPainPointByLocale[locale];
  const quickWins = Array.from(
    new Set(
      data.painPoints
        .map((painPoint) => quickWinsByPainPoint[painPoint])
        .filter((value): value is string => Boolean(value))
    )
  ).slice(0, 4);

  if (quickWins.length < 3) {
    const fallbackQuickWins: Record<AuditLocale, string[]> = {
      uz: [
        "Jarayon xaritasini tuzish: murojaat manbasi, mas'ul, status, natija.",
        "1 ta takroriy jarayonni tanlab, 2-3 haftada avtomatlashtirish MVP sini ishga tushirish.",
        "Har kuni tor joylar bo'yicha qisqa status hisobotini chiqarish.",
      ],
      ru: [
        "Собрать карту процесса: источник заявки, ответственный, статус, результат.",
        "Выделить 1 повторяемый процесс и запустить MVP автоматизации за 2-3 недели.",
        "Ввести ежедневный короткий отчет по узким местам процесса.",
      ],
      en: [
        "Map the process: request source, owner, status, and result.",
        "Pick one repeatable process and launch an automation MVP in 2-3 weeks.",
        "Add a short daily report on process bottlenecks.",
      ],
    };
    quickWins.push(...fallbackQuickWins[locale]);
  }

  const riskCopy: Record<AuditLocale, string[]> = {
    uz: [
      "Avval minimal ma'lumot manbasini tanlash kerak, aks holda avtomatlashtirish barqaror bo'lmaydi.",
      "Integratsiyalar ko'p: kirish huquqlari, API va servis limitlarini oldindan tekshirish kerak.",
      "Yuqori hajmda limitlar, xatolar monitoringi va menejer uchun aniq fallback muhim.",
      "AI qismini test savollar to'plami va javob sifatini nazorat qilish bilan ishga tushirish kerak.",
    ],
    ru: [
      "Сначала нужно выбрать минимальный источник данных, иначе автоматизация будет нестабильной.",
      "Много интеграций: нужно заранее проверить доступы, API и ограничения сервисов.",
      "При высоком объеме важны лимиты, мониторинг ошибок и понятный fallback для менеджера.",
      "AI-часть нужно запускать с тестовым набором вопросов и контролем качества ответов.",
    ],
    en: [
      "First choose a minimum source of truth, otherwise automation will be unstable.",
      "Many integrations: check access, APIs, and service limits in advance.",
      "At high volume, limits, error monitoring, and clear human fallback matter.",
      "Launch the AI part with a test question set and answer quality control.",
    ],
  };
  const risks = [
    data.tools.includes("no_system") ? riskCopy[locale][0] : null,
    data.tools.length >= 4 ? riskCopy[locale][1] : null,
    data.volume === "high" || data.volume === "enterprise" ? riskCopy[locale][2] : null,
    riskCopy[locale][3],
  ].filter((value): value is string => Boolean(value));

  const emptyPain = {
    uz: "jarayonni aniqlashtirish kerak",
    ru: "процесс пока нужно уточнить",
    en: "the process still needs clarification",
  };
  const emptyTools = {
    uz: "ko'rsatilmagan",
    ru: "не указан",
    en: "not specified",
  };
  const defaultRecommendation = {
    uz: "Jarayon diagnostikasi, avtomatlashtirish MVP si va keyin metrikalar asosida kengaytirish.",
    ru: "Диагностика процесса, MVP автоматизации и последующее расширение по метрикам.",
    en: "Process diagnostics, an automation MVP, and further expansion based on metrics.",
  };
  const nextStepsByLocale: Record<AuditLocale, string[]> = {
    uz: [
      "Hozirgi jarayon va qo'lda bajariladigan ish nuqtalarini qayd etish.",
      "CRM, jadvallar, sayt, messenjerlar yoki test ma'lumotlariga kirishlarni tayyorlash.",
      "Automation flow prototipini yig'ish va real murojaatlarda tekshirish.",
      "MVPdan keyin analitika, bildirishnomalar va jamoa reglamentini ulash.",
    ],
    ru: [
      "Зафиксировать текущий процесс и точки ручного труда.",
      "Дать доступы к CRM, таблицам, сайту, мессенджерам или тестовым данным.",
      "Собрать прототип automation flow и проверить его на реальных заявках.",
      "После MVP подключить аналитику, уведомления и регламент работы команды.",
    ],
    en: [
      "Document the current process and manual work points.",
      "Prepare access to CRM, spreadsheets, website, messengers, or test data.",
      "Build an automation flow prototype and test it on real requests.",
      "After MVP, connect analytics, notifications, and team operating rules.",
    ],
  };
  const summary =
    locale === "uz"
      ? `Asosiy so'rov: ${areaLabel}. Eng sezilarli muammolar: ${
          painLabels.slice(0, 3).join(", ") || emptyPain[locale]
        }. Hozirgi stack: ${toolLabelsText.join(", ") || emptyTools[locale]}.`
      : locale === "en"
        ? `Main request: ${areaLabel}. Most visible problems: ${
            painLabels.slice(0, 3).join(", ") || emptyPain[locale]
          }. Current stack: ${toolLabelsText.join(", ") || emptyTools[locale]}.`
        : `Основной запрос: ${areaLabel}. Самые заметные проблемы: ${
            painLabels.slice(0, 3).join(", ") || emptyPain[locale]
          }. Текущий стек: ${toolLabelsText.join(", ") || emptyTools[locale]}.`;

  const report: MiniAutomationReport = {
    summary,
    recommendedSolution:
      recommendedByAreaByLocale[locale][data.automationArea] || defaultRecommendation[locale],
    quickWins,
    risks,
    nextSteps: nextStepsByLocale[locale],
  };

  return { estimate, leadScore, leadTemperature, report };
}

export function parseAutomationAuditFeatures(featuresJson: string): AutomationAuditPayload {
  try {
    const parsed = JSON.parse(featuresJson);
    if (Array.isArray(parsed)) {
      return {
        version: "legacy-project-estimate",
        painPoints: uniqueStrings(parsed),
        tools: [],
        volume: "",
      };
    }

    if (parsed && typeof parsed === "object") {
      const payload = parsed as Partial<AutomationAuditPayload>;
      return {
        version: payload.version === "automation-audit-v1" ? "automation-audit-v1" : "legacy-project-estimate",
        painPoints: uniqueStrings(payload.painPoints),
        tools: uniqueStrings(payload.tools),
        volume: typeof payload.volume === "string" ? payload.volume : "",
        leadScore: typeof payload.leadScore === "number" ? payload.leadScore : undefined,
        leadTemperature:
          typeof payload.leadTemperature === "string" ? payload.leadTemperature : undefined,
        report: payload.report,
      };
    }
  } catch {
    return {
      version: "legacy-project-estimate",
      painPoints: [featuresJson],
      tools: [],
      volume: "",
    };
  }

  return {
    version: "legacy-project-estimate",
    painPoints: [],
    tools: [],
    volume: "",
  };
}

export function buildTelegramBotUrl(
  username: string | null | undefined,
  payload: string
): string | null {
  const cleaned = username?.replace(/^@/, "").trim();
  if (!cleaned) return null;
  return `https://t.me/${encodeURIComponent(cleaned)}?start=${encodeURIComponent(payload)}`;
}
