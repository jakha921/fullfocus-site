import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  path: "/services",
  title: "AI Automation Services for Business",
  description:
    "AI agents, process automation, CRM and ERP integrations, SaaS development, and analytics systems for growing businesses in Uzbekistan.",
  keywords: [
    "AI automation services",
    "business automation Uzbekistan",
    "CRM automation",
    "AI agents for business",
  ],
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
