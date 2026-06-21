import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  Clock3,
  DollarSign,
  Workflow,
} from "lucide-react";
import Script from "next/script";
import { createPageMetadata } from "@/lib/seo-metadata";
import {
  getServiceLandingPage,
  serviceLandingPages,
} from "@/lib/service-landing-pages";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return serviceLandingPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const page = getServiceLandingPage(params.slug);
  if (!page) return {};

  return createPageMetadata({
    path: `/services/${page.slug}`,
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
  });
}

export default function ServiceLandingPage({ params }: ServicePageProps) {
  const page = getServiceLandingPage(params.slug);
  if (!page) notFound();

  const pageUrl = `https://fullfocus.dev/services/${page.slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.metaTitle,
        description: page.description,
        isPartOf: {
          "@type": "WebSite",
          name: "FullFocus",
          url: "https://fullfocus.dev",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://fullfocus.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://fullfocus.dev/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.metaTitle,
        url: pageUrl,
        provider: {
          "@type": "Organization",
          name: "FullFocus",
          url: "https://fullfocus.dev",
        },
        areaServed: {
          "@type": "Country",
          name: "Uzbekistan",
        },
        serviceType: page.title,
        description: page.description,
        offers: {
          "@type": "Offer",
          url: pageUrl,
          priceCurrency: "USD",
          price: page.startingPriceAmount,
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Script
        id={`service-jsonld-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="relative overflow-hidden px-4 pb-16 pt-32 noise-bg sm:px-6 lg:px-8">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full ambient-glow-teal blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-200">
              {page.badge}
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              {page.hero}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {page.subhero}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-green-500/20 transition hover:from-green-400 hover:to-teal-400"
              >
                Get AI Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:text-white"
              >
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <Clock3 className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">Timeline</p>
            <p className="mt-1 text-xl font-semibold">{page.timeline}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <DollarSign className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">Budget</p>
            <p className="mt-1 text-xl font-semibold">{page.startingPrice}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <Workflow className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">Primary CTA</p>
            <p className="mt-1 text-xl font-semibold">AI automation audit</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-300">
              Problems
            </p>
            <h2 className="font-display text-3xl font-bold">When this becomes urgent</h2>
            <div className="mt-6 space-y-3">
              {page.problems.map((problem) => (
                <div
                  key={problem}
                  className="rounded-lg border border-white/10 bg-zinc-950 p-4 text-sm leading-6 text-zinc-300"
                >
                  {problem}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-300">
              Outcomes
            </p>
            <h2 className="font-display text-3xl font-bold">What we build</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {page.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
            <p className="text-sm font-medium text-teal-200">Expected impact</p>
            <p className="mt-4 font-display text-5xl font-bold text-white">
              {page.proof.metric}
            </p>
            <p className="mt-2 text-sm text-zinc-300">{page.proof.metricLabel}</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950 p-6">
            <div className="mb-5 flex items-center gap-3">
              <ArrowRightLeft className="h-5 w-5 text-teal-300" />
              <h2 className="font-display text-2xl font-bold">Before and after</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-white/[0.03] p-4">
                <p className="mb-2 text-sm font-semibold text-zinc-500">Before</p>
                <p className="text-sm leading-6 text-zinc-300">{page.proof.before}</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] p-4">
                <p className="mb-2 text-sm font-semibold text-teal-300">After</p>
                <p className="text-sm leading-6 text-zinc-300">{page.proof.after}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-zinc-400">{page.proof.scenario}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-300">
              Workflow
            </p>
            <h2 className="font-display text-3xl font-bold">Implementation plan</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {page.workflow.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-white/10 bg-zinc-950 p-5">
                <p className="font-display text-3xl font-bold text-white/20">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-lg border border-teal-300/20 bg-teal-300/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-teal-200">Integrations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {page.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded-lg bg-black/25 px-3 py-1 text-sm text-zinc-200"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/quiz"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
            >
              Start with audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
