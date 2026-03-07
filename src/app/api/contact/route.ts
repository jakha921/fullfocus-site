import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendTelegramMessage, formatContactMessage } from "@/lib/telegram";

const contactSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Некорректный email"),
  phone: z.string().optional(),
  serviceType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        serviceType: validatedData.serviceType || null,
        budget: validatedData.budget || null,
        message: validatedData.message,
        status: "new",
        source: validatedData.source || "website",
      },
    });

    const telegramSettings = await prisma.setting.findMany({
      where: { key: { in: ["telegram_bot_token", "telegram_chat_id"] } },
    });
    const tgToken = telegramSettings.find(s => s.key === "telegram_bot_token")?.value;
    const tgChatId = telegramSettings.find(s => s.key === "telegram_chat_id")?.value;

    sendTelegramMessage(
      formatContactMessage({
        id: contactRequest.id,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        serviceType: validatedData.serviceType,
        budget: validatedData.budget,
        message: validatedData.message,
        source: validatedData.source || "website",
      }),
      { token: tgToken, chatId: tgChatId }
    ).catch(console.error);

    return NextResponse.json(
      { message: "Заявка успешно отправлена", id: contactRequest.id },
      { status: 201 }
    );
  } catch (_error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Ошибка валидации", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", _error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
