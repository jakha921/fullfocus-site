import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  return createPageMetadata({
    path: "/blog",
    locale,
    title: "AI Automation Blog for Business",
    description:
      "Practical articles about AI automation, Telegram bots, CRM automation, lead management, reporting, and business process optimization.",
    keywords: [
      "AI automation blog",
      "business process automation",
      "CRM automation tips",
      "Telegram bot automation",
      "AI agents Uzbekistan",
    ],
  });
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
