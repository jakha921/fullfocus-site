import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  labelAutomationArea,
  labelBudget,
  labelPainPoint,
  labelTimeline,
  labelTool,
  labelVolume,
  parseAutomationAuditFeatures,
} from "@/lib/automation-audit";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await prisma.quizResult.findMany({
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "createdAt",
    "name",
    "email",
    "phone",
    "company",
    "automationArea",
    "budget",
    "timeline",
    "volume",
    "painPoints",
    "tools",
    "leadScore",
    "leadTemperature",
    "estimateWeeks",
    "reportSummary",
  ];
  const rows = results.map((result) => {
    const audit = parseAutomationAuditFeatures(result.features);
    return [
      result.createdAt.toISOString(),
      result.name,
      result.email,
      result.phone,
      result.company,
      labelAutomationArea(result.projectType),
      labelBudget(result.budget),
      labelTimeline(result.timeline),
      audit.version === "automation-audit-v1" ? labelVolume(audit.volume) : "",
      audit.painPoints.map((item) => labelPainPoint(item)).join("; "),
      audit.version === "automation-audit-v1"
        ? audit.tools.map((item) => labelTool(item)).join("; ")
        : "",
      audit.version === "automation-audit-v1" ? audit.leadScore || "" : "",
      audit.version === "automation-audit-v1" ? audit.leadTemperature || "" : "",
      `${result.estimateWeeksMin}-${result.estimateWeeksMax}`,
      audit.version === "automation-audit-v1" ? audit.report?.summary || "" : "",
    ]
      .map(csvCell)
      .join(",");
  });
  const csv = [header.map(csvCell).join(","), ...rows].join("\n");

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fullfocus-ai-audits-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
