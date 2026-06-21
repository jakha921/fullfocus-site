"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Code,
  Smartphone,
  Palette,
  Database,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CTASection } from "@/components/site";
import { Card } from "@/components/ui";
import { serviceLandingPages } from "@/lib/service-landing-pages";
import Link from "next/link";

const serviceItems = [
  {
    id: "web",
    number: "01",
    icon: Code,
    featureCount: 6,
    image: "/images/project-1.jpg",
    imageAlt: "Web automation and CRM dashboard",
    gradient: "from-emerald-500/20 to-teal-500/10",
    accentColor: "border-emerald-500",
  },
  {
    id: "mobile",
    number: "02",
    icon: Smartphone,
    featureCount: 6,
    image: "/images/project-2.jpg",
    imageAlt: "Mobile and Telegram workflow automation",
    gradient: "from-teal-500/20 to-blue-500/10",
    accentColor: "border-teal-500",
  },
  {
    id: "design",
    number: "03",
    icon: Palette,
    featureCount: 6,
    image: "/images/project-6.jpg",
    imageAlt: "AI product design and conversion journey dashboard",
    gradient: "from-blue-500/20 to-purple-500/10",
    accentColor: "border-blue-500",
  },
  {
    id: "erp",
    number: "04",
    icon: Database,
    featureCount: 6,
    image: "/images/project-4.jpg",
    imageAlt: "ERP and CRM operations automation portal",
    gradient: "from-purple-500/20 to-emerald-500/10",
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
                  <Card glass className={`group relative border-l-4 ${service.accentColor} overflow-hidden`}>
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
                        <Link
                          href="/quiz"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98]"
                        >
                          {t("discuss_project")}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <div className={`relative aspect-video overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br ${service.gradient}`}>
                          <Image
                            src={service.image}
                            alt={service.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover opacity-70 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-85"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-300">
              SEO landing pages
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Automation services by use case
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Focused pages for high-intent automation requests. Each page includes
              problems, workflows, integrations, timeline, and a direct audit CTA.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {serviceLandingPages.map((page) => (
              <Link
                key={page.slug}
                href={`/services/${page.slug}`}
                className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-teal-300/40 hover:bg-white/[0.05]"
              >
                <p className="text-sm font-medium text-teal-300">{page.badge}</p>
                <h3 className="mt-4 font-display text-xl font-bold text-white">
                  {page.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {page.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
