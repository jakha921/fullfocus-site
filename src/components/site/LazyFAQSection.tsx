"use client";

import dynamic from "next/dynamic";

export const LazyFAQSection = dynamic(
  () => import("./FAQSection").then((mod) => mod.FAQSection),
  { ssr: false },
);
