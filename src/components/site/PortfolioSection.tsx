"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

const projectsMeta = [
  {
    id: "1",
    index: 0,
    technologies: ["OpenAI", "LangChain", "Next.js"],
    gradient: "from-green-500/30 to-teal-500/20",
    techColors: {
      OpenAI: "bg-green-500/20 text-green-400",
      LangChain: "bg-purple-500/20 text-purple-400",
      "Next.js": "bg-white/10 text-gray-300",
    } as Record<string, string>,
  },
  {
    id: "2",
    index: 1,
    technologies: ["n8n", "Supabase"],
    gradient: "from-teal-500/30 to-blue-500/20",
    techColors: {
      n8n: "bg-orange-500/20 text-orange-400",
      Supabase: "bg-green-500/20 text-green-400",
    } as Record<string, string>,
  },
  {
    id: "3",
    index: 2,
    technologies: ["Django", "React", "OpenAI"],
    gradient: "from-blue-500/30 to-green-500/20",
    techColors: {
      Django: "bg-green-700/20 text-green-300",
      React: "bg-blue-500/20 text-blue-400",
      OpenAI: "bg-green-500/20 text-green-400",
    } as Record<string, string>,
  },
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");

  const first = projectsMeta[0];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          description={t("description")}
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
            <Link href={`/portfolio/${first.id}`} className="block h-full">
              <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[320px] relative flex flex-col justify-end">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${first.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* ROI Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-sm font-bold text-green-400">{t(`projects.${first.index}.roi`)}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 text-white font-semibold">
                    <ExternalLink className="w-4 h-4" />
                    {t("view_case")}
                  </div>
                </div>

                {/* Category */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glass-card rounded-full text-xs text-white">
                    {t(`projects.${first.index}.category`)}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {t(`projects.${first.index}.title`)}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">{t(`projects.${first.index}.desc`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {first.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 rounded text-xs ${first.techColors[tech] || "bg-gray-800 text-gray-400"}`}
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
          {projectsMeta.slice(1).map((project, index) => (
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

                  {/* ROI Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-bold text-green-400">{t(`projects.${project.index}.roi`)}</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                      <ExternalLink className="w-3 h-3" />
                      {t("view")}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 glass-card rounded-full text-xs text-white">
                      {t(`projects.${project.index}.category`)}
                    </span>
                  </div>

                  <div className="relative z-10 p-4">
                    <h3 className="font-display font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                      {t(`projects.${project.index}.title`)}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech) => (
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
            {t("all_cases")} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
