import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  return createPageMetadata({
    path: "/portfolio",
    locale,
    title: "Automation, CRM, SaaS and AI Case Studies",
    description:
      "Explore FullFocus work across AI support agents, e-commerce automation, CRM analytics, SaaS dashboards, and business software projects.",
    keywords: ["automation cases", "AI agent case study", "CRM analytics portfolio"],
  });
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children;
}
