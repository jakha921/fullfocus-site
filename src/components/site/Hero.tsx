import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui";
import { useLocale, useTranslations } from "next-intl";
import { isLocale, localizedPath, type Locale } from "@/lib/routing";

export type HeroContent = {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  subtitle?: string;
  cta?: string;
  secondaryCta?: string;
};

export function Hero({ content }: { content?: HeroContent }) {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const nextIntlLocale = useLocale();
  const locale: Locale = isLocale(nextIntlLocale) ? nextIntlLocale : "uz";
  const hero = {
    badge: content?.badge || t("badge"),
    titleLine1: content?.titleLine1 || t("title_line1"),
    titleLine2: content?.titleLine2 || t("title_line2"),
    titleLine3: content?.titleLine3 || t("title_line3"),
    subtitle:
      content?.subtitle || `${t("subtitle_text")} ${t("subtitle_highlight")}`,
    cta: content?.cta || t("cta"),
    secondaryCta: content?.secondaryCta,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      <Image
        src="/images/hero-automation-dashboard.avif"
        alt="FullFocus AI automation dashboard"
        fill
        priority
        decoding="sync"
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
            <div>
              <Badge variant="success" pulse>
                {hero.badge}
              </Badge>
            </div>

            <h1
              className="mx-auto max-w-[22rem] break-words font-display text-4xl font-bold tracking-tight text-white leading-[0.95] sm:max-w-xl sm:text-5xl md:text-7xl lg:mx-0 lg:max-w-4xl lg:text-8xl"
            >
              {hero.titleLine1}{" "}
              <br />
              <span className="gradient-text">{hero.titleLine2}</span>{" "}
              <br />
              <span className="text-3xl text-gray-400 sm:text-4xl md:text-5xl lg:text-6xl">{hero.titleLine3}</span>
            </h1>

            <p
              className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-400 leading-relaxed"
            >
              {hero.subtitle}
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href={localizedPath("/quiz", locale)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25"
              >
                {hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              {hero.secondaryCta && (
                <Link
                  href={localizedPath("/portfolio", locale)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-8 py-4 font-semibold text-white transition-all hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  {hero.secondaryCta}
                </Link>
              )}
            </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase gradient-text">{tc("scroll")}</span>
        <ArrowDown className="w-4 h-4 text-gray-500 animate-bounce" />
      </div>
    </section>
  );
}
