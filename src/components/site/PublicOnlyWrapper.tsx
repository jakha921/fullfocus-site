"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const StickyCtaBar = dynamic(
  () => import("./StickyCtaBar").then((mod) => mod.StickyCtaBar),
  { ssr: false }
);
const ExitIntentPopup = dynamic(
  () => import("./ExitIntentPopup").then((mod) => mod.ExitIntentPopup),
  { ssr: false }
);

export function PublicOnlyWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/login") return null;
  return (
    <>
      <StickyCtaBar />
      <ExitIntentPopup />
    </>
  );
}
