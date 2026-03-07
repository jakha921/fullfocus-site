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

    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(projects);
  } catch (_error) {
    console.error("Get projects error:", _error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  shortDesc: z.string().optional(),
  category: z.string().min(1),
  client: z.string().optional(),
  technologies: z.array(z.string()),
  images: z.array(z.string()),
  coverImage: z.string().min(1),
  link: z.string().optional(),
  featured: z.boolean().optional(),
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

    const project = await prisma.project.create({
      data: {
        ...data,
        shortDesc: data.shortDesc || null,
        client: data.client || null,
        link: data.link || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (_error) {
    console.error("Create project error:", _error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
