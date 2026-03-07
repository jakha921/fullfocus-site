"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] ambient-glow-teal rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="success" pulse>
                IT Solutions
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none"
            >
              Creating Digital
              <br />
              <span className="gradient-text">Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-400 leading-relaxed"
            >
              Мы создаём современные IT-продукты, которые помогают бизнесу расти и
              достигать новых высот
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-black font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/25"
              >
                Обсудить проект
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-gray-500 text-white rounded-lg transition-all hover:bg-white/5"
              >
                Наши работы
              </Link>
            </motion.div>
          </div>

          {/* Right: Floating cards */}
          <div className="flex-shrink-0 relative w-72 h-64 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="animate-float absolute top-0 right-0 glass-card rounded-2xl p-5 w-52"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <div className="text-2xl font-display font-bold text-white">50+</div>
                  <div className="text-xs text-gray-400">Успешных проектов</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="animate-float-delayed absolute bottom-0 left-0 glass-card rounded-2xl p-5 w-48"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
                <div>
                  <div className="text-2xl font-display font-bold text-white">5+</div>
                  <div className="text-xs text-gray-400">Лет опыта</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase gradient-text">Scroll</span>
        <ArrowDown className="w-4 h-4 text-gray-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
