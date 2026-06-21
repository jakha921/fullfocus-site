import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage, formatQuizMessage } from '@/lib/telegram';
import {
  buildTelegramBotUrl,
  createAutomationAuditReport,
  labelAutomationArea,
  labelBudget,
  labelPainPoint,
  labelTimeline,
  labelTool,
  labelVolume,
  type AutomationAuditAnswers,
} from '@/lib/automation-audit';

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function cleanStringArray(value: unknown, limit = 12): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean)
    )
  ).slice(0, limit);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data: AutomationAuditAnswers = {
      name: cleanString(body.name),
      email: cleanString(body.email).toLowerCase(),
      phone: cleanString(body.phone),
      company: cleanString(body.company),
      automationArea: cleanString(body.automationArea || body.projectType),
      painPoints: cleanStringArray(body.painPoints || body.features),
      tools: cleanStringArray(body.tools),
      volume: cleanString(body.volume),
      budget: cleanString(body.budget),
      timeline: cleanString(body.timeline),
    };

    if (
      !data.name ||
      !/\S+@\S+\.\S+/.test(data.email) ||
      !data.automationArea ||
      data.painPoints.length === 0 ||
      data.tools.length === 0 ||
      !data.volume ||
      !data.budget ||
      !data.timeline
    ) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 });
    }

    const { estimate, leadScore, leadTemperature, report } =
      createAutomationAuditReport(data);

    const quizResult = await prisma.quizResult.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        projectType: data.automationArea,
        budget: data.budget,
        timeline: data.timeline,
        features: JSON.stringify({
          version: 'automation-audit-v1',
          painPoints: data.painPoints,
          tools: data.tools,
          volume: data.volume,
          leadScore,
          leadTemperature,
          report,
        }),
        estimateMin: estimate.min,
        estimateMax: estimate.max,
        estimateWeeksMin: estimate.weeks.min,
        estimateWeeksMax: estimate.weeks.max,
      },
    });

    const telegramSettings = await prisma.setting.findMany({
      where: {
        key: {
          in: ['telegram_bot_token', 'telegram_chat_id', 'telegram_bot_username'],
        },
      },
    });
    const tgToken = telegramSettings.find((s) => s.key === 'telegram_bot_token')?.value;
    const tgChatId = telegramSettings.find((s) => s.key === 'telegram_chat_id')?.value;
    const tgBotUsername =
      telegramSettings.find((s) => s.key === 'telegram_bot_username')?.value ||
      process.env.TELEGRAM_BOT_USERNAME ||
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      new URL(request.url).origin ||
      'https://fullfocus.dev';
    const reportUrl = `${origin.replace(/\/$/, '')}/report/${quizResult.id}`;
    const telegramBotUrl = buildTelegramBotUrl(tgBotUsername, quizResult.id);

    sendTelegramMessage(
      formatQuizMessage({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        projectType: data.automationArea,
        budget: data.budget,
        timeline: data.timeline,
        estimateMin: quizResult.estimateMin,
        estimateMax: quizResult.estimateMax,
        estimateWeeksMin: quizResult.estimateWeeksMin,
        estimateWeeksMax: quizResult.estimateWeeksMax,
        automationArea: data.automationArea,
        painPoints: data.painPoints,
        tools: data.tools,
        volume: data.volume,
        leadScore,
        leadTemperature,
        reportSummary: report.summary,
        quickWins: report.quickWins,
        reportUrl,
        telegramBotUrl,
      }),
      { token: tgToken, chatId: tgChatId }
    ).catch(console.error);

    await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        serviceType: 'AI automation audit',
        budget: labelBudget(data.budget),
        message: [
          data.company ? `Company: ${data.company}` : null,
          `Automation area: ${labelAutomationArea(data.automationArea)}`,
          `Pain points: ${data.painPoints.map(labelPainPoint).join(', ')}`,
          `Tools: ${data.tools.map(labelTool).join(', ')}`,
          `Volume: ${labelVolume(data.volume)}`,
          `Timeline: ${labelTimeline(data.timeline)}`,
          `Lead score: ${leadScore}/100`,
          `Mini-report: ${report.summary}`,
          `Report URL: ${reportUrl}`,
        ]
          .filter((line): line is string => Boolean(line))
          .join('\n'),
        source: 'automation_audit_quiz',
      },
    });

    return NextResponse.json({
      success: true,
      id: quizResult.id,
      reportUrl,
      telegramBotUrl,
      leadScore,
      leadTemperature,
      estimate,
      report,
    });
  } catch (_error) {
    console.error('Quiz submission error:', _error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
