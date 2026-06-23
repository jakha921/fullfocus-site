import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Button, Card } from "@/components/ui";
import { CTASection } from "@/components/site";
import { getPublicProjectBySlug, getRelatedProjects } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";
import { sanitizeBlogHtml } from "@/lib/blog";
import { absoluteLocalizedUrl, localizedAlternates, localizedPath } from "@/lib/routing";

export const revalidate = 300;

type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

function projectCardImage(src: string) {
  return src.replace(
    /\/images\/project-([1-6])\.(?:avif|jpe?g)$/i,
    "/images/project-$1-card.avif",
  );
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = await getPublicProjectBySlug(params.slug, locale);
  if (!project) return {};

  return {
    title: `${project.title} | FullFocus`,
    description: project.shortDesc || project.description.replace(/<[^>]+>/g, " "),
    alternates: {
      canonical: absoluteLocalizedUrl(`/portfolio/${project.slug}`, locale),
      languages: localizedAlternates(`/portfolio/${project.slug}`),
    },
    openGraph: {
      title: project.title,
      description: project.shortDesc || undefined,
      url: absoluteLocalizedUrl(`/portfolio/${project.slug}`, locale),
      images: [{ url: project.coverImage, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const locale = (await getLocale()) as Locale;
  const project = await getPublicProjectBySlug(params.slug, locale);
  if (!project) notFound();

  const relatedProjects = await getRelatedProjects(project, locale);
  const sanitizedDescription = sanitizeBlogHtml(project.description);

  return (
    <>
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href={localizedPath("/portfolio", locale)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Все проекты
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            {project.client && <span className="text-emerald-500">{project.client}</span>}
            {project.client && <span>•</span>}
            <span>{project.category}</span>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-gray-800">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <article
                className="max-w-none text-zinc-300 [&_a]:text-teal-300 [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:mb-2 [&_p]:mb-5 [&_p]:leading-8 [&_strong]:text-white [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            </div>

            <div>
              <Card className="sticky top-24">
                <h3 className="text-white font-semibold mb-4">Технологии</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.client && (
                  <>
                    <h3 className="text-white font-semibold mb-2">Клиент</h3>
                    <p className="text-gray-400 mb-6">{project.client}</p>
                  </>
                )}

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full">
                      Посмотреть сайт
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="py-16 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Другие проекты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={localizedPath(`/portfolio/${relatedProject.slug}`, locale)}>
                  <Card hover className="overflow-hidden group p-0">
                    <div className="relative aspect-video bg-gray-800">
                      <Image
                        src={projectCardImage(relatedProject.coverImage)}
                        alt={relatedProject.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                          {relatedProject.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-500 transition-colors">
                        {relatedProject.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
