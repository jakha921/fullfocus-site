"use client";

import dynamic from "next/dynamic";

export const LazyIdeaAuctionSection = dynamic(
  () => import("./IdeaAuctionSection").then((mod) => mod.IdeaAuctionSection),
  { ssr: false }
);
