"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const categories = [
  { value: "all", label: "Все" },
  { value: "web", label: "Веб-разработка" },
  { value: "mobile", label: "Мобильные" },
  { value: "design", label: "Дизайн" },
  { value: "erp", label: "ERP/CRM" },
];

const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    category: "web",
    categoryName: "Веб-разработка",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    shortDesc: "Современная платформа для онлайн-торговли с интеграцией платёжных систем",
    gradient: "from-green-500/30 to-teal-500/20",
    techColors: {
      React: "bg-blue-500/20 text-blue-400",
      "Node.js": "bg-green-500/20 text-green-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
      Redis: "bg-red-500/20 text-red-400",
    },
  },
  {
    id: "2",
    title: "Mobile Banking App",
    category: "mobile",
    categoryName: "Мобильные приложения",
    technologies: ["Flutter", "Firebase", "Stripe"],
    shortDesc: "Мобильное приложение для управления финансами с биометрической аутентификацией",
    gradient: "from-teal-500/30 to-blue-500/20",
    techColors: {
      Flutter: "bg-cyan-500/20 text-cyan-400",
      Firebase: "bg-orange-500/20 text-orange-400",
      Stripe: "bg-purple-500/20 text-purple-400",
    },
  },
  {
    id: "3",
    title: "CRM System",
    category: "erp",
    categoryName: "ERP/CRM",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    shortDesc: "Система управления взаимоотношениями с клиентами для B2B продаж",
    gradient: "from-blue-500/30 to-green-500/20",
    techColors: {
      "Next.js": "bg-white/10 text-gray-300",
      Prisma: "bg-purple-500/20 text-purple-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
    },
  },
  {
    id: "4",
    title: "SaaS Dashboard",
    category: "web",
    categoryName: "Веб-разработка",
    technologies: ["Vue.js", "Django", "PostgreSQL"],
    shortDesc: "Аналитическая панель для SaaS-продукта с real-time метриками",
    gradient: "from-purple-500/30 to-teal-500/20",
    techColors: {
      "Vue.js": "bg-green-600/20 text-green-300",
      Django: "bg-green-800/20 text-green-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
    },
  },
  {
    id: "5",
    title: "Food Delivery App",
    category: "mobile",
    categoryName: "Мобильные приложения",
    technologies: ["React Native", "Node.js", "MongoDB"],
    shortDesc: "Приложение для доставки еды с tracking системой",
    gradient: "from-orange-500/30 to-red-500/20",
    techColors: {
      "React Native": "bg-blue-500/20 text-blue-400",
      "Node.js": "bg-green-500/20 text-green-400",
      MongoDB: "bg-green-700/20 text-green-300",
    },
  },
  {
    id: "6",
    title: "Brand Identity",
    category: "design",
    categoryName: "Дизайн",
    technologies: ["Figma", "Illustrator", "After Effects"],
    shortDesc: "Разработка фирменного стиля для финтех-стартапа",
    gradient: "from-pink-500/30 to-purple-500/20",
    techColors: {
      Figma: "bg-pink-500/20 text-pink-400",
      Illustrator: "bg-orange-500/20 text-orange-400",
      "After Effects": "bg-purple-500/20 text-purple-400",
    },
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
              Наши <span className="gradient-text">проекты</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Примеры работ, которыми мы гордимся
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 glass-card hover:border-white/15 ${
                  activeCategory === cat.value
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/portfolio/${project.id}`} className="block h-full">
                    <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[280px] relative flex flex-col justify-end hover:border-white/15 transition-all duration-300">
                      {/* Gradient bg */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2 text-white font-semibold text-sm">
                          <ExternalLink className="w-4 h-4" />
                          Смотреть проект
                        </div>
                      </div>

                      {/* Category */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 glass-card rounded-full text-xs text-white">
                          {project.categoryName}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6">
                        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {project.shortDesc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded text-xs ${(project.techColors as unknown as Record<string, string>)[tech] || "bg-gray-800 text-gray-400"}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
