import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Last 7 days chart data
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const requests = await prisma.contactRequest.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    select: { createdAt: true, serviceType: true },
  });

  // Build 7-day array with zeros
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
      count: 0,
      _dateStr: date.toDateString(),
    };
  });

  // Fill in counts
  requests.forEach((r) => {
    const dateStr = new Date(r.createdAt).toDateString();
    const entry = chartData.find((d) => d._dateStr === dateStr);
    if (entry) entry.count += 1;
  });

  // Pie data: group by serviceType
  const serviceMap: Record<string, number> = {};
  requests.forEach((r) => {
    const key = r.serviceType || "Другое";
    serviceMap[key] = (serviceMap[key] || 0) + 1;
  });
  const pieData = Object.entries(serviceMap).map(([name, value]) => ({ name, value }));

  return NextResponse.json({
    chartData: chartData.map(({ date, count }) => ({ date, count })),
    pieData,
  });
}
