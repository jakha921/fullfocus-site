"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const featuredProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    category: "Веб-разработка",
    technologies: ["React", "Node.js", "PostgreSQL"],
    shortDesc: "Современная платформа для онлайн-торговли с интеграцией платежей",
    gradient: "from-green-500/30 to-teal-500/20",
    techColors: {
      React: "bg-blue-500/20 text-blue-400",
      "Node.js": "bg-green-500/20 text-green-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
    },
  },
  {
    id: "2",
    title: "Mobile Banking App",
    category: "Мобильные приложения",
    technologies: ["Flutter", "Firebase"],
    shortDesc: "Мобильное приложение для управления финансами",
    gradient: "from-teal-500/30 to-blue-500/20",
    techColors: {
      Flutter: "bg-cyan-500/20 text-cyan-400",
      Firebase: "bg-orange-500/20 text-orange-400",
    },
  },
  {
    id: "3",
    title: "CRM System",
    category: "ERP/CRM",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    shortDesc: "Система управления взаимоотношениями с клиентами",
    gradient: "from-blue-500/30 to-green-500/20",
    techColors: {
      "Next.js": "bg-white/10 text-gray-300",
      Prisma: "bg-purple-500/20 text-purple-400",
      PostgreSQL: "bg-blue-600/20 text-blue-300",
    },
  },
];

export function PortfolioSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Портфолио"
          title="Наши"
          highlight="проекты"
          description="Примеры работ, которыми мы гордимся"
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {/* Large featured project */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2"
          >
            <Link href={`/portfolio/${featuredProjects[0].id}`} className="block h-full">
              <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[320px] relative flex flex-col justify-end">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${featuredProjects[0].gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 text-white font-semibold">
                    <ExternalLink className="w-4 h-4" />
                    Смотреть проект
                  </div>
                </div>

                {/* Category */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glass-card rounded-full text-xs text-white">
                    {featuredProjects[0].category}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {featuredProjects[0].title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">{featuredProjects[0].shortDesc}</p>
                  <div className="flex flex-wrap gap-2">
                    {featuredProjects[0].technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 rounded text-xs ${(featuredProjects[0].techColors as unknown as Record<string, string>)[tech] || "bg-gray-800 text-gray-400"}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller projects */}
          {featuredProjects.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.15 }}
            >
              <Link href={`/portfolio/${project.id}`} className="block h-full">
                <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[150px] relative flex flex-col justify-end">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                      <ExternalLink className="w-3 h-3" />
                      Смотреть
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 glass-card rounded-full text-xs text-white">
                      {project.category}
                    </span>
                  </div>

                  <div className="relative z-10 p-4">
                    <h3 className="font-display font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech) => (
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
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            Все проекты <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
