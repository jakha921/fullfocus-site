import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage, formatQuizMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, projectType, budget, timeline, features, estimate } = body;

    // Save quiz result to database
    const quizResult = await prisma.quizResult.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        projectType,
        budget,
        timeline,
        features: JSON.stringify(features),
        estimateMin: estimate.min,
        estimateMax: estimate.max,
        estimateWeeksMin: estimate.weeks.min,
        estimateWeeksMax: estimate.weeks.max,
      },
    });

    const telegramSettings = await prisma.setting.findMany({
      where: { key: { in: ["telegram_bot_token", "telegram_chat_id"] } },
    });
    const tgToken = telegramSettings.find(s => s.key === "telegram_bot_token")?.value;
    const tgChatId = telegramSettings.find(s => s.key === "telegram_chat_id")?.value;

    sendTelegramMessage(
      formatQuizMessage({
        name,
        email,
        phone: phone || null,
        company: company || null,
        projectType,
        budget,
        timeline,
        estimateMin: quizResult.estimateMin,
        estimateMax: quizResult.estimateMax,
      }),
      { token: tgToken, chatId: tgChatId }
    ).catch(console.error);

    // Also create a contact request for follow-up
    await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: `Quiz submission: ${projectType} project, Budget: ${budget}, Timeline: ${timeline}, Features: ${features.join(', ')}` + (company ? `, Company: ${company}` : ''),
        source: 'quiz',
      },
    });

    return NextResponse.json({ success: true, id: quizResult.id });
  } catch (_error) {
    console.error('Quiz submission error:', _error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
