"use client";

import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Palette,
  Database,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CTASection } from "@/components/site";
import { Card, Button } from "@/components/ui";
import Link from "next/link";

const serviceItems = [
  {
    id: "web",
    number: "01",
    icon: Code,
    featureCount: 6,
    gradient: "from-green-500/20 to-teal-500/10",
    accentColor: "border-green-500",
  },
  {
    id: "mobile",
    number: "02",
    icon: Smartphone,
    featureCount: 6,
    gradient: "from-teal-500/20 to-blue-500/10",
    accentColor: "border-teal-500",
  },
  {
    id: "design",
    number: "03",
    icon: Palette,
    featureCount: 6,
    gradient: "from-blue-500/20 to-purple-500/10",
    accentColor: "border-blue-500",
  },
  {
    id: "erp",
    number: "04",
    icon: Database,
    featureCount: 6,
    gradient: "from-purple-500/20 to-green-500/10",
    accentColor: "border-purple-500",
  },
];

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

export default function ServicesPage() {
  const t = useTranslations("services_page");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden noise-bg">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-teal rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")}{" "}
              <span className="gradient-text">{t("highlight")}</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {serviceItems.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  variants={itemVariants}
                >
                  <Card glass className={`relative border-l-4 ${service.accentColor} overflow-hidden`}>
                    {/* Number watermark */}
                    <div className="absolute top-4 right-6 text-6xl font-display font-bold text-white/5 select-none">
                      {service.number}
                    </div>

                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                            {t(`items.${index}.title`)}
                          </h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                          {t(`items.${index}.description`)}
                        </p>
                        <ul className="grid grid-cols-2 gap-3 mb-6">
                          {Array.from({ length: service.featureCount }, (_, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-gray-300 text-sm"
                            >
                              <span className="text-xs font-display font-bold gradient-text flex-shrink-0">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {t(`items.${index}.features.${i}`)}
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact">
                          <Button variant="gradient">
                            {t("discuss_project")} <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>

                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <div className={`aspect-video bg-gradient-to-br ${service.gradient} rounded-xl border border-white/5`} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
