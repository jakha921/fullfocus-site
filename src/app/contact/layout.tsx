import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  path: "/contact",
  title: "Contact FullFocus - Book an AI Automation Audit",
  description:
    "Contact FullFocus to discuss AI agents, CRM automation, process automation, integrations, or a free AI automation audit for your business.",
  keywords: ["book AI audit", "FullFocus contact", "automation consultation"],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
