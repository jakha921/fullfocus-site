"use client";

import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import { SectionHeading, CTASection, TechStackSection } from "@/components/site";
import { Card } from "@/components/ui";

const values = [
  {
    icon: Target,
    title: "Фокус на результат",
    description: "Мы ориентированы на достижение конкретных бизнес-целей наших клиентов",
    gradient: "from-green-500/20 to-teal-500/10",
  },
  {
    icon: Users,
    title: "Командная работа",
    description: "Эффективное взаимодействие внутри команды и с клиентами",
    gradient: "from-teal-500/20 to-blue-500/10",
  },
  {
    icon: Lightbulb,
    title: "Инновации",
    description: "Используем современные технологии и подходы для решения задач",
    gradient: "from-blue-500/20 to-green-500/10",
  },
  {
    icon: Award,
    title: "Качество",
    description: "Строго следим за качеством кода и конечного продукта",
    gradient: "from-green-500/20 to-blue-500/10",
  },
];

const team = [
  {
    name: "Ахмад Рузибоев",
    position: "CEO & Founder",
    bio: "Более 10 лет опыта в IT-индустрии",
    initials: "АР",
    gradient: "from-green-500 to-teal-500",
  },
  {
    name: "Бобур Каримов",
    position: "CTO",
    bio: "Архитектор решений, эксперт в cloud технологиях",
    initials: "БК",
    gradient: "from-teal-500 to-blue-500",
  },
  {
    name: "Нигора Назарова",
    position: "Lead Designer",
    bio: "UI/UX специалист с международным опытом",
    initials: "НН",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "Жасур Алимов",
    position: "Full-Stack Developer",
    bio: "Expert в React, Node.js и облачных решениях",
    initials: "ЖА",
    gradient: "from-purple-500 to-green-500",
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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden noise-bg">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              О компании{" "}
              <span className="gradient-text">FullFocus</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Мы — команда профессионалов, которая создаёт цифровые продукты,
              помогающие бизнесу расти и достигать новых высот
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Наша <span className="gradient-text">миссия</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Мы верим, что технологии могут трансформировать любой бизнес.
                Наша цель — помогать компаниям использовать потенциал цифровых
                решений для достижения конкурентных преимуществ.
              </p>
              <p className="text-gray-400 leading-relaxed">
                С 2019 года мы реализовали более 50 проектов для клиентов из
                различных отраслей — от стартапов до крупных предприятий.
              </p>
            </motion.div>

            {/* Stats block instead of empty video placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-card rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "50+", label: "Проектов", color: "gradient-text" },
                    { value: "5+", label: "Лет опыта", color: "gradient-text" },
                    { value: "30+", label: "Клиентов", color: "gradient-text" },
                    { value: "15+", label: "Специалистов", color: "gradient-text" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4">
                      <div className={`text-4xl font-display font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 relative">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            badge="Ценности"
            title="Наши"
            highlight="принципы"
            description="Фундамент, на котором строится наша работа"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={itemVariants}>
                <Card glass hover className="text-center h-full">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Команда"
            title="Наши"
            highlight="специалисты"
            description="Люди, которые делают FullFocus особенным"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <Card glass hover className="text-center h-full group">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-display font-bold shadow-lg`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-green-400 text-sm mb-2">{member.position}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackSection />

      <CTASection />
    </>
  );
}
