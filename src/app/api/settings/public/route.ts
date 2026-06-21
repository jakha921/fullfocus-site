import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logServerError } from "@/lib/server-log";

export const revalidate = 60;

export async function GET() {
  try {
    const keys = ["available_slots", "sticky_bar_enabled"];
    const settings = await prisma.setting.findMany({
      where: { key: { in: keys } },
    });
    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });
    return NextResponse.json(result);
  } catch (error) {
    logServerError("Public settings fetch failed", error, {
      route: "/api/settings/public",
    });
    return NextResponse.json({});
  }
}
