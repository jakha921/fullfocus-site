"use client";

import { motion } from "framer-motion";
import { Search, Palette, Code2, TestTube, Rocket, LifeBuoy } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Анализ",
    description: "Изучаем бизнес, аудиторию и конкурентов. Формируем требования и ТЗ.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Дизайн",
    description: "Прорабатываем UX-концепцию, создаём прототипы и финальный дизайн.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Разработка",
    description: "Пишем чистый код по стандартам, с Code Review на каждом этапе.",
  },
  {
    number: "04",
    icon: TestTube,
    title: "Тестирование",
    description: "Ручное и автоматизированное тестирование. QA на всех устройствах.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Запуск",
    description: "Деплой в продакшн, настройка мониторинга и обучение команды.",
  },
  {
    number: "06",
    icon: LifeBuoy,
    title: "Поддержка",
    description: "Техническое сопровождение, обновления и развитие продукта.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Процесс"
          title="Как мы"
          highlight="работаем"
          description="Прозрачный процесс от идеи до запуска — вы всегда знаете, на каком этапе находится проект"
        />

        {/* Desktop Timeline */}
        <div className="hidden md:flex items-start gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-start flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="glass-card rounded-xl p-5 flex-1 group hover:border-white/15 transition-all duration-300"
                >
                  <div className="text-3xl font-display font-bold gradient-text mb-3">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/10 flex items-center justify-center mb-3 group-hover:from-green-500/30 group-hover:to-teal-500/20 transition-all">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 w-4 h-px bg-gradient-to-r from-green-500/50 to-transparent mt-12 self-start" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Stack */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-xl p-5 flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="text-2xl font-display font-bold gradient-text">{step.number}</div>
                </div>
                <div>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/10 flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-green-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
