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

    const members = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

const createSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  photo: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  telegram: z.string().optional(),
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

    const member = await prisma.teamMember.create({
      data: {
        ...data,
        photo: data.photo || null,
        bio: data.bio || null,
        linkedin: data.linkedin || null,
        github: data.github || null,
        telegram: data.telegram || null,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
