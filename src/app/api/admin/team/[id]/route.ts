import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  position: z.string().min(1).optional(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  telegram: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);

    const member = await prisma.teamMember.update({ where: { id }, data });

    return NextResponse.json(member);
  } catch (_error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.teamMember.delete({ where: { id } });

    return NextResponse.json({ message: "Member deleted" });
  } catch (_error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
