import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(testimonials);
  } catch (_error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

const createSchema = z.object({
  clientName: z.string().min(1),
  company: z.string().min(1),
  position: z.string().optional(),
  content: z.string().min(1),
  avatar: z.string().optional(),
  rating: z.number().min(1).max(5),
  isActive: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = createSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: {
        ...data,
        position: data.position || null,
        avatar: data.avatar || null,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
