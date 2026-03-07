import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [requestsCount, projectsCount, postsCount, testimonialsCount] =
      await Promise.all([
        prisma.contactRequest.count(),
        prisma.project.count({ where: { isActive: true } }),
        prisma.blogPost.count({ where: { isPublished: true } }),
        prisma.testimonial.count({ where: { isActive: true } }),
      ]);

    return NextResponse.json({
      requests: requestsCount,
      projects: projectsCount,
      posts: postsCount,
      testimonials: testimonialsCount,
    });
  } catch (_error) {
    console.error("Stats error:", _error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
