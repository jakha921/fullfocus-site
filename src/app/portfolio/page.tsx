"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const projectsMeta = [
  {
    id: "1",
    index: 0,
    category: "web",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    gradient: "from-green-500/30 to-teal-500/20",
    techColors: {
      React: "bg-blue-500/20 text-blue-400",
      "Node.js": "bg-green-500/20 text-green-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
      Redis: "bg-red-500/20 text-red-400",
    } as Record<string, string>,
  },
  {
    id: "2",
    index: 1,
    category: "mobile",
    technologies: ["Flutter", "Firebase", "Stripe"],
    gradient: "from-teal-500/30 to-blue-500/20",
    techColors: {
      Flutter: "bg-cyan-500/20 text-cyan-400",
      Firebase: "bg-orange-500/20 text-orange-400",
      Stripe: "bg-purple-500/20 text-purple-400",
    } as Record<string, string>,
  },
  {
    id: "3",
    index: 2,
    category: "erp",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    gradient: "from-blue-500/30 to-green-500/20",
    techColors: {
      "Next.js": "bg-white/10 text-gray-300",
      Prisma: "bg-purple-500/20 text-purple-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
    } as Record<string, string>,
  },
  {
    id: "4",
    index: 3,
    category: "web",
    technologies: ["Vue.js", "Django", "PostgreSQL"],
    gradient: "from-purple-500/30 to-teal-500/20",
    techColors: {
      "Vue.js": "bg-green-600/20 text-green-300",
      Django: "bg-green-800/20 text-green-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
    } as Record<string, string>,
  },
  {
    id: "5",
    index: 4,
    category: "mobile",
    technologies: ["React Native", "Node.js", "MongoDB"],
    gradient: "from-orange-500/30 to-red-500/20",
    techColors: {
      "React Native": "bg-blue-500/20 text-blue-400",
      "Node.js": "bg-green-500/20 text-green-400",
      MongoDB: "bg-green-700/20 text-green-300",
    } as Record<string, string>,
  },
  {
    id: "6",
    index: 5,
    category: "design",
    technologies: ["Figma", "Illustrator", "After Effects"],
    gradient: "from-pink-500/30 to-purple-500/20",
    techColors: {
      Figma: "bg-pink-500/20 text-pink-400",
      Illustrator: "bg-orange-500/20 text-orange-400",
      "After Effects": "bg-purple-500/20 text-purple-400",
    } as Record<string, string>,
  },
];

export default function PortfolioPage() {
  const t = useTranslations("portfolio_page");
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryKeys = [
    { value: "all", labelKey: "all" },
    { value: "web", labelKey: "web" },
    { value: "mobile", labelKey: "mobile" },
    { value: "design", labelKey: "design" },
    { value: "erp", labelKey: "erp" },
  ] as const;

  const filteredProjects =
    activeCategory === "all"
      ? projectsMeta
      : projectsMeta.filter((p) => p.category === activeCategory);

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
              {t("title")} <span className="gradient-text">{t("highlight")}</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categoryKeys.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 glass-card hover:border-white/15 ${
                  activeCategory === cat.value
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t(cat.labelKey)}
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
                          {t("view_project")}
                        </div>
                      </div>

                      {/* Category */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 glass-card rounded-full text-xs text-white">
                          {t(`projects.${project.index}.category`)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6">
                        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {t(`projects.${project.index}.title`)}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {t(`projects.${project.index}.desc`)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded text-xs ${project.techColors[tech] || "bg-gray-800 text-gray-400"}`}
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
