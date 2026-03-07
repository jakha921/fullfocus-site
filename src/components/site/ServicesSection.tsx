"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Palette, Database } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Card } from "@/components/ui";

const services = [
  {
    number: "01",
    icon: Code,
    title: "Веб-разработка",
    description:
      "Создаём современные веб-приложения на React, Next.js и Node.js с фокусом на производительность",
    href: "/services#web",
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Мобильные приложения",
    description:
      "Разрабатываем нативные и кроссплатформенные приложения для iOS и Android",
    href: "/services#mobile",
  },
  {
    number: "03",
    icon: Palette,
    title: "UI/UX Дизайн",
    description:
      "Проектируем интуитивные интерфейсы, которые пользователи любят использовать",
    href: "/services#design",
  },
  {
    number: "04",
    icon: Database,
    title: "ERP/CRM системы",
    description:
      "Внедряем и настраиваем системы автоматизации бизнес-процессов",
    href: "/services#erp",
  },
];

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
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Наши услуги"
          title="Комплексные"
          highlight="IT-решения"
          description="Предоставляем полный спектр услуг для цифровой трансформации вашего бизнеса"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={itemVariants}>
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
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Подробнее <ArrowRight className="w-4 h-4" />
                        </span>
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
