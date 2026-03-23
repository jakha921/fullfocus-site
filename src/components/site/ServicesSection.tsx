"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Workflow, Code2, Plug } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { Card } from "@/components/ui";

const serviceItems = [
  { number: "01", icon: Bot, key: "ai_agents", href: "/services#ai-agents" },
  { number: "02", icon: Workflow, key: "automation", href: "/services#automation" },
  { number: "03", icon: Code2, key: "saas", href: "/services#saas" },
  { number: "04", icon: Plug, key: "integration", href: "/services#integration" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  const t = useTranslations("services");

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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {serviceItems.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.key} variants={itemVariants}>
                <Link href={service.href}>
                  <Card glass hover className="h-full group relative overflow-hidden">
                    {/* Service number */}
                    <div className="absolute top-4 right-4 text-4xl font-display font-bold text-white/5 select-none">
                      {service.number}
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:from-green-500/30 group-hover:to-teal-500/20 transition-all">
                        <Icon className="w-6 h-6 text-green-400 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {t(`${service.key}.title`)}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                          {t(`${service.key}_full_desc`)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-green-400/80 bg-green-500/10 px-3 py-1 rounded-full">
                            {t(`${service.key}_metric`)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {t("more")} <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
