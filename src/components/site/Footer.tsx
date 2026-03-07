"use client";

import Link from "next/link";
import { Target, Mail, Phone, MapPin, Send, Github } from "lucide-react";

const footerLinks = {
  navigation: [
    { href: "/", label: "Главная" },
    { href: "/about", label: "О нас" },
    { href: "/services", label: "Услуги" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/blog", label: "Блог" },
    { href: "/contact", label: "Контакты" },
  ],
  services: [
    { href: "/services#web", label: "Веб-разработка" },
    { href: "/services#mobile", label: "Мобильные приложения" },
    { href: "/services#design", label: "UI/UX Дизайн" },
    { href: "/services#erp", label: "ERP/CRM системы" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
                <Target className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-display font-bold text-white">FullFocus</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Создаём современные IT-продукты, которые помогают бизнесу расти и
              достигать новых высот в цифровом мире.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/fullfocus"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/fullfocus"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-green-400" />
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
                <span>Ташкент, Узбекистан</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Gradient divider */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent -mt-8" />

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FullFocus. Все права защищены.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
