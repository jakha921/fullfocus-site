import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  path: "/about",
  title: "About FullFocus - AI Automation Team in Uzbekistan",
  description:
    "Meet FullFocus, an AI business automation team in Tashkent building AI agents, workflow automation, CRM integrations, and SaaS products.",
  keywords: ["FullFocus team", "AI automation Uzbekistan", "Tashkent IT company"],
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
