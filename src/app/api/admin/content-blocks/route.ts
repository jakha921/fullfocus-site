import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const blockSchema = z.object({
  key: z.string().min(1),
  locale: z.enum(["ru", "en", "uz"]),
  payload: z.record(z.unknown()),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blocks = await prisma.contentBlock.findMany({
    orderBy: [{ key: "asc" }, { locale: "asc" }],
  });

  return NextResponse.json(blocks);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const blocks = z.array(blockSchema).parse(Array.isArray(body) ? body : [body]);

  const saved = await Promise.all(
    blocks.map((block) =>
      prisma.contentBlock.upsert({
        where: {
          key_locale: {
            key: block.key,
            locale: block.locale,
          },
        },
        update: {
          payload: block.payload as Prisma.InputJsonValue,
          isActive: block.isActive ?? true,
          order: block.order ?? 0,
        },
        create: {
          key: block.key,
          locale: block.locale,
          payload: block.payload as Prisma.InputJsonValue,
          isActive: block.isActive ?? true,
          order: block.order ?? 0,
        },
      })
    )
  );

  return NextResponse.json(saved);
}
