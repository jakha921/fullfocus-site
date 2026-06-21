import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  path: "/blog",
  title: "AI Automation and Business Systems Blog",
  description:
    "Practical articles about AI automation, CRM systems, business process optimization, SaaS development, and technology for companies.",
  keywords: ["AI automation blog", "business process automation", "CRM automation tips"],
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
