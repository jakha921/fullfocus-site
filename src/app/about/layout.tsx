import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  return createPageMetadata({
    path: "/about",
    locale,
    title: "About FullFocus - AI Automation Team in Uzbekistan",
    description:
      "Meet FullFocus, an AI business automation team in Tashkent building AI agents, workflow automation, CRM integrations, and SaaS products.",
    keywords: ["FullFocus team", "AI automation Uzbekistan", "Tashkent IT company"],
  });
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
