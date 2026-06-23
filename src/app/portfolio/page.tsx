import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getPublicProjects } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routing";

export const revalidate = 300;

type PortfolioPageProps = {
  searchParams?: {
    category?: string;
  };
};

const gradients = [
  "from-emerald-500/30 to-teal-500/20",
  "from-teal-500/30 to-blue-500/20",
  "from-blue-500/30 to-emerald-500/20",
  "from-purple-500/30 to-teal-500/20",
  "from-orange-500/30 to-red-500/20",
  "from-pink-500/30 to-purple-500/20",
];

function hrefForCategory(category: string | undefined, locale: Locale) {
  const basePath = localizedPath("/portfolio", locale);
  return category ? `${basePath}?category=${encodeURIComponent(category)}` : basePath;
}

function projectCardImage(src: string) {
  return src.replace(
    /\/images\/project-([1-6])\.(?:avif|jpe?g)$/i,
    "/images/project-$1-card.avif",
  );
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("portfolio_page");
  const projects = await getPublicProjects(locale);
  const categories = Array.from(new Set(projects.map((project) => project.category)));
  const activeCategory = searchParams?.category?.trim();
  const filteredProjects = activeCategory
    ? projects.filter((project) => project.category === activeCategory)
    : projects;

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden noise-bg">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-teal rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")} <span className="gradient-text">{t("highlight")}</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={hrefForCategory(undefined, locale)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 glass-card hover:border-white/15 ${
                !activeCategory
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t("all")}
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={hrefForCategory(category, locale)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 glass-card hover:border-white/15 ${
                  activeCategory === category
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-10 text-center">
              <h2 className="font-display text-2xl font-bold text-white">
                Кейсы готовятся
              </h2>
              <p className="mt-3 text-sm text-gray-400">
                Добавьте активные проекты в админке, и они появятся здесь.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <Link key={project.id} href={localizedPath(`/portfolio/${project.slug}`, locale)} className="block h-full">
                  <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[280px] relative flex flex-col justify-end hover:border-white/15 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
                    <Image
                      src={projectCardImage(project.coverImage)}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="absolute inset-0 object-cover opacity-60 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/15" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2 text-white font-semibold text-sm">
                        <ExternalLink className="w-4 h-4" />
                        {t("view_project")}
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 glass-card rounded-full text-xs text-white">
                        {project.category}
                      </span>
                    </div>

                    <div className="relative z-10 p-6">
                      <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {project.shortDesc || project.description.replace(/<[^>]+>/g, " ")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded text-xs bg-emerald-500/15 text-emerald-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
