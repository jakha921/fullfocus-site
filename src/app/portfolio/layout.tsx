import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  path: "/portfolio",
  title: "Automation, CRM, SaaS and AI Case Studies",
  description:
    "Explore FullFocus work across AI support agents, e-commerce automation, CRM analytics, SaaS dashboards, and business software projects.",
  keywords: ["automation cases", "AI agent case study", "CRM analytics portfolio"],
});

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children;
}
