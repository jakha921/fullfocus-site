import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  return createPageMetadata({
    path: "/contact",
    locale,
    title: "Contact FullFocus - Book an AI Automation Audit",
    description:
      "Contact FullFocus to discuss AI agents, CRM automation, process automation, integrations, or a free AI automation audit for your business.",
    keywords: ["book AI audit", "FullFocus contact", "automation consultation"],
  });
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
