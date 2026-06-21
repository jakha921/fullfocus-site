"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      <Image
        src="/images/hero-automation-dashboard.jpg"
        alt="FullFocus AI automation dashboard"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover object-[62%_center] opacity-65"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.97)_0%,rgba(10,10,10,0.88)_42%,rgba(10,10,10,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.1)_40%,rgba(10,10,10,0.55)_100%)]" />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] ambient-glow-teal rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="success" pulse>
                {t("badge")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-[22rem] break-words font-display text-4xl font-bold tracking-tight text-white leading-[0.95] sm:max-w-xl sm:text-5xl md:text-7xl lg:mx-0 lg:max-w-4xl lg:text-8xl"
            >
              {t("title_line1")}{" "}
              <br />
              <span className="gradient-text">{t("title_line2")}</span>{" "}
              <br />
              <span className="text-3xl text-gray-400 sm:text-4xl md:text-5xl lg:text-6xl">{t("title_line3")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-400 leading-relaxed"
            >
              {t("subtitle_text")}{" "}
              <span className="whitespace-nowrap font-semibold text-white">{t("subtitle_highlight")}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25"
              >
                {t("cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase gradient-text">{tc("scroll")}</span>
        <ArrowDown className="w-4 h-4 text-gray-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
