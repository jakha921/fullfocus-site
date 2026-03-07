"use client";
import { usePathname } from "next/navigation";
import { StickyCtaBar } from "./StickyCtaBar";
import { ExitIntentPopup } from "./ExitIntentPopup";

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
