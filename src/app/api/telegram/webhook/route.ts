import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";
import {
  labelAutomationArea,
  labelBudget,
  labelPainPoint,
  labelTimeline,
  labelTool,
  labelVolume,
  leadTemperatureLabels,
  parseAutomationAuditFeatures,
} from "@/lib/automation-audit";

type TelegramUpdate = {
  message?: {
    text?: string;
    chat?: {
      id?: number | string;
    };
    from?: {
      first_name?: string;
    };
  };
};

function escapeHtml(value: string | number | null | undefined): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatIntro(firstName?: string) {
  return [
    `Здравствуйте${firstName ? `, ${escapeHtml(firstName)}` : ""}.`,
    ``,
    `Чтобы получить mini-report, откройте ссылку с сайта FullFocus или отправьте команду:`,
    `<code>/start REPORT_ID</code>`,
  ].join("\n");
}

function formatReportMessage(result: {
  id: string;
  company: string | null;
  name: string;
  projectType: string;
  budget: string;
  timeline: string;
  features: string;
  estimateMin: number;
  estimateMax: number;
  estimateWeeksMin: number;
  estimateWeeksMax: number;
}) {
  const audit = parseAutomationAuditFeatures(result.features);
  const report = audit.report;
  const leadTemperature = audit.leadTemperature
    ? leadTemperatureLabels[audit.leadTemperature] || audit.leadTemperature
    : "новый лид";

  return [
    `🤖 <b>Ваш mini-report FullFocus</b>`,
    ``,
    `🏢 <b>Для:</b> ${escapeHtml(result.company || result.name)}`,
    `🎯 <b>Фокус:</b> ${escapeHtml(labelAutomationArea(result.projectType))}`,
    `🔥 <b>Score:</b> ${escapeHtml(audit.leadScore ?? 0)}/100 · ${escapeHtml(leadTemperature)}`,
    audit.volume ? `📦 <b>Объем:</b> ${escapeHtml(labelVolume(audit.volume))}` : null,
    `📐 <b>Масштаб:</b> ${escapeHtml(labelBudget(result.budget))}`,
    `⏰ <b>Срок:</b> ${escapeHtml(labelTimeline(result.timeline))}`,
    `🗓 <b>Срок разработки:</b> ${result.estimateWeeksMin}-${result.estimateWeeksMax} недель`,
    ``,
    audit.painPoints.length
      ? `⚠️ <b>Боли:</b> ${escapeHtml(audit.painPoints.map(labelPainPoint).join(", "))}`
      : null,
    audit.tools.length
      ? `🧩 <b>Инструменты:</b> ${escapeHtml(audit.tools.map(labelTool).join(", "))}`
      : null,
    report ? `📝 <b>Вывод:</b> ${escapeHtml(report.summary)}` : null,
    report?.quickWins.length
      ? `✅ <b>Quick wins:</b>\n${report.quickWins
          .slice(0, 3)
          .map((item) => `• ${escapeHtml(item)}`)
          .join("\n")}`
      : null,
    ``,
    `🔗 <a href="https://fullfocus.dev/report/${escapeHtml(result.id)}">Открыть web-версию</a>`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

async function getTelegramSettings() {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: ["telegram_bot_token", "telegram_webhook_secret"],
      },
    },
  });

  return {
    token:
      settings.find((setting) => setting.key === "telegram_bot_token")?.value ||
      process.env.TELEGRAM_BOT_TOKEN,
    webhookSecret:
      settings.find((setting) => setting.key === "telegram_webhook_secret")?.value ||
      process.env.TELEGRAM_WEBHOOK_SECRET,
  };
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "telegram-webhook" });
}

export async function POST(request: NextRequest) {
  const { token, webhookSecret } = await getTelegramSettings();
  if (!token) return NextResponse.json({ ok: true });

  if (webhookSecret) {
    const receivedSecret = request.headers.get("x-telegram-bot-api-secret-token");
    if (receivedSecret !== webhookSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const update = (await request.json()) as TelegramUpdate;
  const chatId = update.message?.chat?.id;
  const text = update.message?.text?.trim() || "";

  if (!chatId) return NextResponse.json({ ok: true });

  if (!text.startsWith("/start")) {
    await sendTelegramMessage(formatIntro(update.message?.from?.first_name), {
      token,
      chatId: String(chatId),
    });
    return NextResponse.json({ ok: true });
  }

  const reportId = text.split(/\s+/)[1];
  if (!reportId) {
    await sendTelegramMessage(formatIntro(update.message?.from?.first_name), {
      token,
      chatId: String(chatId),
    });
    return NextResponse.json({ ok: true });
  }

  const result = await prisma.quizResult.findUnique({
    where: { id: reportId },
  });

  await sendTelegramMessage(
    result
      ? formatReportMessage(result)
      : "Mini-report не найден. Пройдите AI-аудит на https://fullfocus.dev/quiz.",
    { token, chatId: String(chatId) }
  );

  return NextResponse.json({ ok: true });
}
