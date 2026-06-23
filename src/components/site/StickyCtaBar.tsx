"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getCurrentMonthName } from "@/lib/current-month";
import { isLocale, localizedPath, type Locale } from "@/lib/routing";

export function StickyCtaBar() {
  const t = useTranslations("stickycta");
  const nextIntlLocale = useLocale();
  const locale: Locale = isLocale(nextIntlLocale) ? nextIntlLocale : "uz";
  const [isVisible, setIsVisible] = useState(false);
  const [slots, setSlots] = useState<string | null>(null);
  const monthName = getCurrentMonthName(locale);

  useEffect(() => {
    const dismissed = localStorage.getItem("sticky_bar_dismissed_date");
    if (dismissed === new Date().toDateString()) return;

    fetch("/api/settings/public")
      .then((r) => r.json())
      .then((data) => {
        if (data.sticky_bar_enabled === "true") {
          setSlots(data.available_slots || null);
          const timer = setTimeout(() => setIsVisible(true), 3000);
          return () => clearTimeout(timer);
        }
      })
      .catch(() => {});
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("sticky_bar_dismissed_date", new Date().toDateString());
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-emerald-500/20"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-sm text-white">
                {slots ? (
                  <span className="font-medium">
                    {t("slots_message", { slots, month: monthName })}
                  </span>
                ) : (
                  t("limited")
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={localizedPath("/quiz", locale)}
                className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-sm rounded-lg transition-all hover:scale-[1.02]"
              >
                {t("cta")}
              </Link>
              <button
                onClick={handleDismiss}
                aria-label={t("dismiss")}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
