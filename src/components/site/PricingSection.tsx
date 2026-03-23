"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

const planKeys = ["project", "retainer", "performance"] as const;
const planFeatureCounts = [4, 5, 4];
const popularIndex = 1;

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

export function PricingSection() {
  const t = useTranslations("pricing");
  const tCommon = useTranslations("common");

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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {planKeys.map((key, planIndex) => {
            const isPopular = planIndex === popularIndex;
            const featureCount = planFeatureCounts[planIndex];

            return (
              <motion.div key={key} variants={itemVariants}>
                <div
                  className={`glass-card rounded-2xl p-8 h-full flex flex-col relative ${
                    isPopular ? "border-green-500/30 shadow-lg shadow-green-500/10" : ""
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-green-500 to-teal-500 text-black text-xs font-bold rounded-full">
                      {tCommon("popular")}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-display font-semibold text-white mb-2">
                      {t(`${key}.name`)}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-bold gradient-text">
                        {t(`${key}.price`)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {t(`${key}.period`)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-3">
                      {t(`${key}.description`)}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {Array.from({ length: featureCount }, (_, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">
                          {t(`${key}.features.${i}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      isPopular
                        ? "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-black shadow-lg shadow-green-500/25"
                        : "border border-gray-700 hover:border-gray-500 text-white hover:bg-white/5"
                    }`}
                  >
                    {t("cta")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
