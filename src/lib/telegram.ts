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
    `👤 <b>Имя:</b> ${data.name}`,
    `📧 <b>Email:</b> ${data.email}`,
    data.phone ? `📱 <b>Телефон:</b> ${data.phone}` : null,
    data.serviceType ? `💼 <b>Услуга:</b> ${data.serviceType}` : null,
    data.budget ? `💰 <b>Бюджет:</b> ${data.budget}` : null,
    `📝 <b>Сообщение:</b> ${data.message.slice(0, 200)}`,
    data.source ? `📌 <b>Источник:</b> ${data.source}` : null,
    ``,
    `🔗 <a href="https://site.fullfocus.dev/admin/requests/${data.id}">Открыть в панели</a>`,
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
}): string {
  return [
    `🎯 <b>Новый результат квиза!</b>`,
    ``,
    `👤 <b>Имя:</b> ${data.name}`,
    `📧 <b>Email:</b> ${data.email}`,
    data.phone ? `📱 <b>Телефон:</b> ${data.phone}` : null,
    data.company ? `🏢 <b>Компания:</b> ${data.company}` : null,
    `💼 <b>Тип:</b> ${data.projectType}`,
    `💰 <b>Бюджет:</b> ${data.budget}`,
    `⏰ <b>Сроки:</b> ${data.timeline}`,
    `📊 <b>Оценка:</b> $${data.estimateMin.toLocaleString()} – $${data.estimateMax.toLocaleString()}`,
    ``,
    `🔗 <a href="https://site.fullfocus.dev/admin/quiz-results">Открыть в панели</a>`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
