"use client";

import Link from "next/link";
import { Target, Mail, Phone, MapPin, Send, Github } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { isLocale, localizedPath, type Locale } from "@/lib/routing";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

const serviceLinks = [
  { href: "/services/ai-support-agent", key: "ai_agents_service" },
  { href: "/services/telegram-bot-automation", key: "automation_service" },
  { href: "/services", key: "saas_service" },
  { href: "/services/crm-automation", key: "integration_service" },
  { href: "/tools/automation-roi-calculator", key: "roi_calculator" },
] as const;

export function Footer() {
  const nextIntlLocale = useLocale();
  const locale: Locale = isLocale(nextIntlLocale) ? nextIntlLocale : "uz";
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href={localizedPath("/", locale)} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Target className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-display font-bold text-white">FullFocus</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/fullfocus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FullFocus Telegram"
                className="glass-card w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/fullfocus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FullFocus GitHub"
                className="glass-card w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("navigation")}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizedPath(link.href, locale)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("services")}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizedPath(link.href, locale)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:hello@fullfocus.dev" className="hover:text-white transition-colors">
                  hello@fullfocus.dev
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-teal-400" />
                <a href="tel:+998901234567" className="hover:text-white transition-colors">
                  +998 90 123 45 67
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>{t("location")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Gradient divider */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent -mt-8" />

          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FullFocus. {t("rights")}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href={localizedPath("/privacy", locale)} className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
