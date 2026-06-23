import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  const requests = await prisma.contactRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "createdAt",
    "name",
    "email",
    "phone",
    "serviceType",
    "budget",
    "status",
    "source",
    "message",
    "notes",
  ];
  const rows = requests.map((item) =>
    [
      item.createdAt.toISOString(),
      item.name,
      item.email,
      item.phone,
      item.serviceType,
      item.budget,
      item.status,
      item.source,
      item.message,
      item.notes,
    ]
      .map(csvCell)
      .join(",")
  );
  const csv = [header.map(csvCell).join(","), ...rows].join("\n");

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fullfocus-requests-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
