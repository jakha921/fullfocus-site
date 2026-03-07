"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, MessageCircle } from "lucide-react";

export function CTASection() {
  const [slots, setSlots] = useState<string | null>(null);
  const [monthName, setMonthName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings/public")
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.available_slots || null);
        setMonthName(data.month_name || null);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-2xl p-10 md:p-14 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Готовы начать{" "}
              <span className="gradient-text">проект</span>?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Получите бесплатную оценку вашего проекта за 2 минуты или свяжитесь с нами для консультации
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-black font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/25"
              >
                <Calculator className="w-5 h-5" />
                Получить оценку проекта
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-gray-500 text-white font-semibold rounded-lg transition-all hover:bg-white/5"
              >
                <MessageCircle className="w-5 h-5" />
                Связаться с нами
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Бесплатная консультация
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                Ответим в течение 24 часов
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                50+ успешных проектов
              </span>
            </div>
            {slots && monthName && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-orange-400 font-semibold">
                  Осталось {slots} мест в {monthName}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
