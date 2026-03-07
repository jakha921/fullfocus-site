import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  shortDesc: z.string().optional(),
  category: z.string().min(1).optional(),
  client: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  coverImage: z.string().min(1).optional(),
  link: z.string().optional(),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (_error) {
    console.error("Get project error:", _error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

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

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json(project);
  } catch (_error) {
    console.error("Update project error:", _error);
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
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: "Project deleted" });
  } catch (_error) {
    console.error("Delete project error:", _error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
