"use client";

import { motion } from "framer-motion";
import { Phone, Lightbulb, Code2, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

const stepIcons = [Phone, Lightbulb, Code2, Rocket];
const stepNumbers = ["01", "02", "03", "04"];

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          description={t("description")}
        />

        {/* Desktop Timeline */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {stepNumbers.map((number, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card rounded-xl p-5 group hover:border-white/15 transition-all duration-300"
              >
                <div className="text-3xl font-display font-bold gradient-text mb-3">
                  {number}
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/10 flex items-center justify-center mb-3 group-hover:from-green-500/30 group-hover:to-teal-500/20 transition-all">
                  <Icon className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {t(`steps.${index}.title`)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {t(`steps.${index}.description`)}
                </p>
                <span className="text-xs font-bold text-teal-400/80 bg-teal-500/10 px-2 py-1 rounded-full">
                  {t(`steps.${index}.duration`)}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Stack */}
        <div className="md:hidden space-y-4">
          {stepNumbers.map((number, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-xl p-5 flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="text-2xl font-display font-bold gradient-text">{number}</div>
                </div>
                <div>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/10 flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-green-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-1">
                    {t(`steps.${index}.title`)}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {t(`steps.${index}.description`)}
                  </p>
                  <span className="text-xs font-bold text-teal-400/80 bg-teal-500/10 px-2 py-1 rounded-full">
                    {t(`steps.${index}.duration`)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
