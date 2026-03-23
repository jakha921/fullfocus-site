"use client";

import { motion } from "framer-motion";
import { Clock, Headset, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

const painItems = [
  { icon: Clock, key: "manual" },
  { icon: Headset, key: "support" },
  { icon: Users, key: "scaling" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function PainSection() {
  const t = useTranslations("pain");

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          description={t("subtitle")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {painItems.map((pain) => {
            const Icon = pain.icon;
            return (
              <motion.div key={pain.key} variants={itemVariants}>
                <div className="glass-card rounded-2xl p-6 h-full group hover:border-red-500/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-sm font-bold text-red-400 mb-2">
                    {t(`${pain.key}_metric`)}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-2">
                    {t(`${pain.key}.title`)}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`${pain.key}_desc_full`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl font-display font-bold"
        >
          <span className="gradient-text">{t("transition")}</span>
        </motion.p>
      </div>
    </section>
  );
}
