import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Code2, Plug, Workflow } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { CTASection } from "@/components/site";
import { Card } from "@/components/ui";
import { getPublicServices } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routing";
import { serviceLandingPages } from "@/lib/service-landing-pages";

export const revalidate = 300;

const iconMap = {
  Bot,
  Workflow,
  Code2,
  Plug,
} as const;

const serviceImages = [
  "/images/project-1-card.avif",
  "/images/project-2-card.avif",
  "/images/project-3-card.avif",
  "/images/project-4-card.avif",
];

export default async function ServicesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("services_page");
  const services = await getPublicServices(locale);

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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Bot;
              const image = serviceImages[index % serviceImages.length];
              return (
                <Card
                  key={service.id}
                  id={service.slug}
                  glass
                  className="group relative overflow-hidden border-l-4 border-emerald-500"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-4 right-6 text-6xl font-display font-bold text-gray-500 select-none"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-emerald-300" />
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={localizedPath("/quiz", locale)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98]"
                      >
                        {t("discuss_project")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-emerald-500/20 to-teal-500/10">
                        <Image
                          src={image}
                          alt={service.title}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover opacity-70 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-300">
              SEO landing pages
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Automation services by use case
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Focused pages for high-intent automation requests: Telegram bots,
              CRM workflows, AI support, integrations, timeline, and audit CTA.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {serviceLandingPages.map((page) => (
              <Link
                key={page.slug}
                href={localizedPath(`/services/${page.slug}`, locale)}
                className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-teal-300/40 hover:bg-white/[0.05]"
              >
                <p className="text-sm font-medium text-teal-300">{page.badge}</p>
                <h3 className="mt-4 font-display text-xl font-bold text-white">
                  {page.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {page.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
