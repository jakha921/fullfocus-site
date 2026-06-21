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

export const automationAreaLabels: Record<string, string> = {
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
};

export const painPointLabels: Record<string, string> = {
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
};

export const toolLabels: Record<string, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  crm: "CRM",
  sheets: "Google Sheets / Excel",
  onec: "1C",
  website: "Сайт",
  no_system: "Пока нет системы",
};

export const volumeLabels: Record<string, string> = {
  low: "До 20 обращений/операций в день",
  medium: "20-100 в день",
  high: "100-500 в день",
  enterprise: "500+ в день",
};

export const budgetLabels: Record<string, string> = {
  starter: "MVP / точечная автоматизация",
  growth: "Несколько интеграций",
  scale: "Процесс отдела",
  enterprise: "Комплексная автоматизация",
  not_sure: "Нужно оценить",
  small: "MVP / точечная задача",
  medium: "Несколько интеграций",
  large: "Процесс отдела",
};

export const timelineLabels: Record<string, string> = {
  urgent: "Нужно в течение месяца",
  normal: "1-3 месяца",
  relaxed: "3-6 месяцев",
  flexible: "Можно поэтапно",
};

export const leadTemperatureLabels: Record<string, string> = {
  hot: "Горячий лид",
  warm: "Теплый лид",
  cold: "Ранний интерес",
};

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

const quickWinByPainPoint: Record<string, string> = {
  manual_entry: "Собрать заявки из форм, мессенджеров и таблиц в один поток.",
  missed_leads: "Настроить автоматическое создание лидов и SLA-напоминания.",
  slow_response: "Запустить AI-ответы на частые вопросы с передачей сложных кейсов менеджеру.",
  reports: "Сделать авто-дашборд по лидам, продажам, задачам и SLA.",
  duplicate_data: "Синхронизировать CRM, таблицы и внутренние системы через единый источник данных.",
  no_visibility: "Ввести статусы процесса и ежедневный отчет по узким местам.",
  human_errors: "Добавить проверки, шаблоны и автоматические шаги для повторяемых операций.",
  documents: "Автоматизировать генерацию КП, договоров, счетов и отчетов по шаблонам.",
};

const recommendedByArea: Record<string, string> = {
  sales: "AI lead intake + CRM automation + follow-up сценарии.",
  support: "AI support agent + база знаний + эскалация оператору.",
  marketing: "Автоматизация контент-плана, лид-магнитов и рассылок.",
  operations: "Workflow engine для статусов, задач и интеграций между отделами.",
  finance: "Автоматизация документов, счетов, сверок и отчетов.",
  hr: "HR pipeline с автоответами, скорингом кандидатов и отчетами.",
  analytics: "Единый BI-дашборд и автоматическая сборка управленческих отчетов.",
  ecommerce: "Автоматизация заказов, поддержки, складских статусов и повторных продаж.",
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

export function labelAutomationArea(value: string): string {
  return automationAreaLabels[value] || value;
}

export function labelPainPoint(value: string): string {
  return painPointLabels[value] || value;
}

export function labelTool(value: string): string {
  return toolLabels[value] || value;
}

export function labelVolume(value: string): string {
  return volumeLabels[value] || value;
}

export function labelBudget(value: string): string {
  return budgetLabels[value] || value;
}

export function labelTimeline(value: string): string {
  return timelineLabels[value] || value;
}

export function createAutomationAuditReport(data: AutomationAuditAnswers): {
  estimate: AutomationEstimate;
  leadScore: number;
  leadTemperature: "hot" | "warm" | "cold";
  report: MiniAutomationReport;
} {
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

  const areaLabel = labelAutomationArea(data.automationArea).toLowerCase();
  const painLabels = data.painPoints.map(labelPainPoint);
  const toolLabelsText = data.tools.map(labelTool);
  const quickWins = Array.from(
    new Set(
      data.painPoints
        .map((painPoint) => quickWinByPainPoint[painPoint])
        .filter((value): value is string => Boolean(value))
    )
  ).slice(0, 4);

  if (quickWins.length < 3) {
    quickWins.push(
      "Собрать карту процесса: источник заявки, ответственный, статус, результат.",
      "Выделить 1 повторяемый процесс и запустить MVP автоматизации за 2-3 недели."
    );
  }

  const risks = [
    data.tools.includes("no_system")
      ? "Сначала нужно выбрать минимальный источник данных, иначе автоматизация будет нестабильной."
      : null,
    data.tools.length >= 4
      ? "Много интеграций: нужно заранее проверить доступы, API и ограничения сервисов."
      : null,
    data.volume === "high" || data.volume === "enterprise"
      ? "При высоком объеме важны лимиты, мониторинг ошибок и понятный fallback для менеджера."
      : null,
    "AI-часть нужно запускать с тестовым набором вопросов и контролем качества ответов.",
  ].filter((value): value is string => Boolean(value));

  const report: MiniAutomationReport = {
    summary: `Основной запрос: ${areaLabel}. Самые заметные проблемы: ${
      painLabels.slice(0, 3).join(", ") || "процесс пока нужно уточнить"
    }. Текущий стек: ${toolLabelsText.join(", ") || "не указан"}.`,
    recommendedSolution:
      recommendedByArea[data.automationArea] ||
      "Диагностика процесса, MVP автоматизации и последующее расширение по метрикам.",
    quickWins,
    risks,
    nextSteps: [
      "Зафиксировать текущий процесс и точки ручного труда.",
      "Дать доступы к CRM, таблицам, сайту, мессенджерам или тестовым данным.",
      "Собрать прототип automation flow и проверить его на реальных заявках.",
      "После MVP подключить аналитику, уведомления и регламент работы команды.",
    ],
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
