import {
  labelAutomationArea,
  labelBudget,
  labelPainPoint,
  labelTimeline,
  labelTool,
  labelVolume,
  leadTemperatureLabels,
} from "./automation-audit";

export async function sendTelegramMessage(
  text: string,
  options?: { token?: string; chatId?: string }
): Promise<void> {
  const token = options?.token || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = options?.chatId || process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[Telegram] Not configured");
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("[Telegram] Error:", err);
  }
}

function escapeHtml(value: string | number | null | undefined): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatContactMessage(data: {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  serviceType?: string | null;
  budget?: string | null;
  message: string;
  source?: string | null;
}): string {
  return [
    `🔔 <b>Новая заявка с сайта!</b>`,
    ``,
    `👤 <b>Имя:</b> ${escapeHtml(data.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(data.email)}`,
    data.phone ? `📱 <b>Телефон:</b> ${escapeHtml(data.phone)}` : null,
    data.serviceType ? `💼 <b>Услуга:</b> ${escapeHtml(data.serviceType)}` : null,
    data.budget ? `💰 <b>Бюджет:</b> ${escapeHtml(data.budget)}` : null,
    `📝 <b>Сообщение:</b> ${escapeHtml(data.message.slice(0, 200))}`,
    data.source ? `📌 <b>Источник:</b> ${escapeHtml(data.source)}` : null,
    ``,
    `🔗 <a href="https://fullfocus.dev/admin/requests/${data.id}">Открыть в панели</a>`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function formatQuizMessage(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  projectType: string;
  budget: string;
  timeline: string;
  estimateMin: number;
  estimateMax: number;
  estimateWeeksMin?: number;
  estimateWeeksMax?: number;
  automationArea?: string;
  painPoints?: string[];
  tools?: string[];
  volume?: string;
  leadScore?: number;
  leadTemperature?: string;
  reportSummary?: string;
  quickWins?: string[];
  reportUrl?: string;
  telegramBotUrl?: string | null;
}): string {
  if (data.automationArea) {
    return [
      `🎯 <b>Новый AI-аудит автоматизации</b>`,
      ``,
      `👤 <b>Имя:</b> ${escapeHtml(data.name)}`,
      `📧 <b>Email:</b> ${escapeHtml(data.email)}`,
      data.phone ? `📱 <b>Телефон:</b> ${escapeHtml(data.phone)}` : null,
      data.company ? `🏢 <b>Компания:</b> ${escapeHtml(data.company)}` : null,
      ``,
      `🤖 <b>Зона:</b> ${escapeHtml(labelAutomationArea(data.automationArea))}`,
      `🔥 <b>Score:</b> ${escapeHtml(data.leadScore ?? 0)}/100${
        data.leadTemperature
          ? ` · ${escapeHtml(leadTemperatureLabels[data.leadTemperature] || data.leadTemperature)}`
          : ""
      }`,
      data.volume ? `📦 <b>Объем:</b> ${escapeHtml(labelVolume(data.volume))}` : null,
      `💰 <b>Бюджет:</b> ${escapeHtml(labelBudget(data.budget))}`,
      `⏰ <b>Срок:</b> ${escapeHtml(labelTimeline(data.timeline))}`,
      `📊 <b>Оценка:</b> $${data.estimateMin.toLocaleString()} - $${data.estimateMax.toLocaleString()}`,
      data.estimateWeeksMin && data.estimateWeeksMax
        ? `🗓 <b>Срок разработки:</b> ${data.estimateWeeksMin}-${data.estimateWeeksMax} недель`
        : null,
      ``,
      data.painPoints?.length
        ? `⚠️ <b>Боли:</b> ${escapeHtml(data.painPoints.map(labelPainPoint).join(", "))}`
        : null,
      data.tools?.length
        ? `🧩 <b>Инструменты:</b> ${escapeHtml(data.tools.map(labelTool).join(", "))}`
        : null,
      data.reportSummary ? `📝 <b>Mini-report:</b> ${escapeHtml(data.reportSummary)}` : null,
      data.quickWins?.length
        ? `✅ <b>Quick wins:</b>\n${data.quickWins
            .slice(0, 3)
            .map((item) => `• ${escapeHtml(item)}`)
            .join("\n")}`
        : null,
      ``,
      data.reportUrl ? `🔗 <a href="${escapeHtml(data.reportUrl)}">Открыть mini-report</a>` : null,
      data.telegramBotUrl
        ? `🤖 <a href="${escapeHtml(data.telegramBotUrl)}">Проверить bot CTA</a>`
        : null,
      `🛠 <a href="https://fullfocus.dev/admin/quiz-results">Открыть в панели</a>`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
  }

  return [
    `🎯 <b>Новый результат квиза!</b>`,
    ``,
    `👤 <b>Имя:</b> ${escapeHtml(data.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(data.email)}`,
    data.phone ? `📱 <b>Телефон:</b> ${escapeHtml(data.phone)}` : null,
    data.company ? `🏢 <b>Компания:</b> ${escapeHtml(data.company)}` : null,
    `💼 <b>Тип:</b> ${escapeHtml(data.projectType)}`,
    `💰 <b>Бюджет:</b> ${escapeHtml(data.budget)}`,
    `⏰ <b>Сроки:</b> ${escapeHtml(data.timeline)}`,
    `📊 <b>Оценка:</b> $${data.estimateMin.toLocaleString()} – $${data.estimateMax.toLocaleString()}`,
    ``,
    `🔗 <a href="https://fullfocus.dev/admin/quiz-results">Открыть в панели</a>`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
