import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  path: "/blog",
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

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
