"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

const clients = ["Uzum", "EPAM", "IT Park", "UZCARD", "Click", "Payme"];

export function SocialProofBar() {
  const t = useTranslations("socialproof");

  const metrics = [
    { value: "50+", label: t("projects") },
    { value: "30+", label: t("clients") },
    { value: "300%", label: t("avg_roi") },
  ];

  return (
    <section className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl px-8 py-6"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Client logos */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {clients.map((client) => (
                <div
                  key={client}
                  className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-400">{client}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/10" />

            {/* Metrics */}
            <div className="flex items-center gap-6">
              {metrics.map((metric, index) => (
                <div key={metric.label} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-600">|</span>}
                  <span className="font-display font-bold text-white">{metric.value}</span>
                  <span className="text-sm text-gray-400">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
