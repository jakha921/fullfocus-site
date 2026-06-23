"use client";

import dynamic from "next/dynamic";

export const LazyCTASection = dynamic(
  () => import("./CTASection").then((mod) => mod.CTASection),
  { ssr: false },
);
