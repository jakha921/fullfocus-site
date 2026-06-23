import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import type { PublicProject } from "@/lib/cms";
import { isLocale, localizedPath, type Locale } from "@/lib/routing";

const fallbackProjects = [
  {
    id: "fallback-1",
    href: "/portfolio",
    titleKey: "projects.0.title",
    descKey: "projects.0.desc",
    categoryKey: "projects.0.category",
    roiKey: "projects.0.roi",
    image: "/images/project-1.avif",
    technologies: ["OpenAI", "LangChain", "Next.js"],
    gradient: "from-emerald-500/30 to-teal-500/20",
  },
  {
    id: "fallback-2",
    href: "/portfolio",
    titleKey: "projects.1.title",
    descKey: "projects.1.desc",
    categoryKey: "projects.1.category",
    roiKey: "projects.1.roi",
    image: "/images/project-2.avif",
    technologies: ["n8n", "Supabase"],
    gradient: "from-teal-500/30 to-blue-500/20",
  },
  {
    id: "fallback-3",
    href: "/portfolio",
    titleKey: "projects.2.title",
    descKey: "projects.2.desc",
    categoryKey: "projects.2.category",
    roiKey: "projects.2.roi",
    image: "/images/project-3.avif",
    technologies: ["Django", "React", "OpenAI"],
    gradient: "from-blue-500/30 to-emerald-500/20",
  },
];

const gradients = [
  "from-emerald-500/30 to-teal-500/20",
  "from-teal-500/30 to-blue-500/20",
  "from-blue-500/30 to-emerald-500/20",
];

function projectCardImage(src: string) {
  return src.replace(
    /\/images\/project-([1-6])\.(?:avif|jpe?g)$/i,
    "/images/project-$1-card.avif",
  );
}

function techClass(index: number) {
  const classes = [
    "bg-emerald-500/20 text-emerald-400",
    "bg-purple-500/20 text-purple-400",
    "bg-white/10 text-gray-300",
  ];
  return classes[index % classes.length];
}

export function PortfolioSection({ projects = [] }: { projects?: PublicProject[] }) {
  const nextIntlLocale = useLocale();
  const locale: Locale = isLocale(nextIntlLocale) ? nextIntlLocale : "uz";
  const t = useTranslations("portfolio");

  const items =
    projects.length > 0
      ? projects.map((project, index) => ({
          id: project.id,
          href: `/portfolio/${project.slug}`,
          title: project.title,
          desc: project.shortDesc || project.description.replace(/<[^>]+>/g, " "),
          category: project.category,
          roi: "ROI tracked",
          image: projectCardImage(project.coverImage),
          technologies: project.technologies,
          gradient: gradients[index % gradients.length],
        }))
      : fallbackProjects.map((project) => ({
          id: project.id,
          href: project.href,
          title: t(project.titleKey),
          desc: t(project.descKey),
          category: t(project.categoryKey),
          roi: t(project.roiKey),
          image: projectCardImage(project.image),
          technologies: project.technologies,
          gradient: project.gradient,
        }));

  const [first, ...rest] = items;
  if (!first) return null;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          <div
            className="md:col-span-2 md:row-span-2"
          >
            <Link href={localizedPath(first.href, locale)} className="block h-full">
              <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[320px] relative flex flex-col justify-end">
                <div className={`absolute inset-0 bg-gradient-to-br ${first.gradient}`} />
                <Image
                  src={first.image}
                  alt={first.title}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="absolute inset-0 object-cover opacity-70 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-400">{first.roi}</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 text-white font-semibold">
                    <ExternalLink className="w-4 h-4" />
                    {t("view_case")}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glass-card rounded-full text-xs text-white">
                    {first.category}
                  </span>
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {first.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{first.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {first.technologies.slice(0, 4).map((tech, index) => (
                      <span key={tech} className={`px-2 py-1 rounded text-xs ${techClass(index)}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {rest.slice(0, 2).map((project) => (
            <div
              key={project.id}
            >
              <Link href={localizedPath(project.href, locale)} className="block h-full">
                <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[150px] relative flex flex-col justify-end">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="absolute inset-0 object-cover opacity-60 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 glass-card rounded-full text-xs text-white">
                      {project.category}
                    </span>
                  </div>
                  <div className="relative z-10 p-4">
                    <h3 className="font-display font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech, techIndex) => (
                        <span key={tech} className={`px-2 py-0.5 rounded text-xs ${techClass(techIndex)}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div
          className="text-center mt-12"
        >
          <Link
            href={localizedPath("/portfolio", locale)}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {t("all_cases")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
