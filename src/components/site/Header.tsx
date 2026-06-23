"use client";

import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Target, Globe, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  isLocale,
  localizedPath,
  stripLocaleFromPath,
  type Locale,
} from "@/lib/routing";
import { cn } from "@/lib/utils";

const navKeys = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/contact", key: "contact" },
] as const;

const languages = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const nextIntlLocale = useLocale();
  const locale: Locale = isLocale(nextIntlLocale) ? nextIntlLocale : "uz";
  const [currentLang, setCurrentLang] = useState(locale);
  const [scrolled, setScrolled] = useState(false);

  const t = useTranslations("nav");
  const tCta = useTranslations("cta");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentLang(locale);
  }, [locale]);

  const handleLanguageChange = (lang: string) => {
    if (!isLocale(lang)) return;
    const basePath = stripLocaleFromPath(pathname || "/").path;
    document.cookie = `locale=${lang};path=/;max-age=31536000`;
    setCurrentLang(lang);
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
    startTransition(() => {
      router.push(localizedPath(basePath, lang));
    });
  };

  return (
    <header
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pt-2 sm:px-4"
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto transition-[max-width] duration-500 ease-out",
          scrolled ? "max-w-5xl" : "max-w-7xl"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-xl border px-4 shadow-black/20 backdrop-blur-xl transition-all duration-500 ease-out sm:px-6 lg:px-7",
            scrolled
              ? "h-12 border-white/15 bg-black/85 shadow-2xl"
              : "h-14 border-white/10 bg-black/55 shadow-lg md:h-16"
          )}
        >
          {/* Logo */}
          <Link href={localizedPath("/", locale)} className="flex items-center gap-2 group">
            <div
              className={cn(
                "flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20 transition-all duration-500",
                scrolled ? "h-7 w-7" : "h-8 w-8"
              )}
            >
              <Target
                className={cn(
                  "text-black transition-all duration-500",
                  scrolled ? "h-4 w-4" : "h-5 w-5"
                )}
              />
            </div>
            <span
              className={cn(
                "font-display font-bold text-white transition-all duration-500 group-hover:text-emerald-400",
                scrolled ? "text-lg" : "text-xl"
              )}
            >
              FullFocus
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className={cn(
              "hidden items-center transition-all duration-500 md:flex",
              scrolled ? "gap-5" : "gap-8"
            )}
          >
            {navKeys.map((link) => (
              <Link
                key={link.href}
                href={localizedPath(link.href, locale)}
                className="relative text-sm text-gray-400 hover:text-white transition-colors group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right side: Language + CTA */}
          <div
            className={cn(
              "hidden items-center transition-all duration-500 md:flex",
              scrolled ? "gap-3" : "gap-4"
            )}
          >
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-label="Change language"
                aria-expanded={isLangMenuOpen}
                className={cn(
                  "flex items-center gap-2 rounded-lg text-gray-400 transition-all hover:bg-white/5 hover:text-white",
                  scrolled ? "px-2.5 py-1.5" : "px-3 py-2"
                )}
              >
                <Globe className={cn("w-4 h-4", isPending && "animate-spin")} />
                <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
                <ChevronDown
                  className={cn("w-3 h-3 transition-transform", isLangMenuOpen && "rotate-180")}
                />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 top-full mt-2 glass-card rounded-lg overflow-hidden shadow-xl min-w-[100px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-white/5 transition-colors",
                        currentLang === lang.code && "text-emerald-400"
                      )}
                    >
                      <span className="text-sm font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={localizedPath("/quiz", locale)}
              className={cn(
                "rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold text-black shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98]",
                scrolled ? "px-4 py-1.5" : "px-5 py-2"
              )}
            >
              {tCta("button")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-black/95 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
          <div className="px-4 py-4 space-y-2">
            {navKeys.map((link) => (
              <Link
                key={link.href}
                href={localizedPath(link.href, locale)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="flex gap-2 px-4 py-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                    currentLang === lang.code
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <Link
              href={localizedPath("/quiz", locale)}
              className="block mt-4 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold rounded-lg text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {tCta("button")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
