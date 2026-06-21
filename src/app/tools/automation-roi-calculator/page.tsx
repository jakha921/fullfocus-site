import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AutomationRoiCalculator } from "@/components/tools/AutomationRoiCalculator";
import { createPageMetadata } from "@/lib/seo-metadata";

const pageUrl = "https://fullfocus.dev/tools/automation-roi-calculator";

const faqs = [
  {
    question: "How do I calculate automation ROI?",
    answer:
      "Estimate monthly labor savings, revenue recovered from faster follow-up, and implementation cost. ROI is the annual impact minus implementation cost, divided by implementation cost.",
  },
  {
    question: "What processes usually create the fastest automation ROI?",
    answer:
      "Lead capture, CRM follow-ups, Telegram bot automation, support FAQs, reporting, document generation, and repetitive data entry usually show results quickly.",
  },
  {
    question: "Is this calculator a final project estimate?",
    answer:
      "No. It is a directional model. A final estimate needs process mapping, tool access, integration checks, data quality review, and a clear implementation brief.",
  },
];

export const metadata: Metadata = createPageMetadata({
  path: "/tools/automation-roi-calculator",
  title: "Automation ROI Calculator",
  description:
    "Estimate monthly savings, annual impact, payback period, and first-year ROI for business process automation, CRM automation, Telegram bots, and AI support agents.",
  keywords: [
    "automation ROI calculator",
    "business automation ROI",
    "AI automation calculator",
    "CRM automation ROI",
    "Telegram bot automation ROI",
  ],
});

export default function AutomationRoiCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Automation ROI Calculator",
        description:
          "Estimate monthly savings, annual impact, payback period, and first-year ROI for automation projects.",
        isPartOf: {
          "@type": "WebSite",
          name: "FullFocus",
          url: "https://fullfocus.dev",
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#calculator`,
        name: "Automation ROI Calculator",
        url: pageUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "USD",
        },
        provider: {
          "@type": "Organization",
          name: "FullFocus",
          url: "https://fullfocus.dev",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Script
        id="automation-roi-calculator-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden px-4 pb-14 pt-32 noise-bg sm:px-6 lg:px-8">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute right-0 top-0 h-[460px] w-[460px] rounded-full ambient-glow-teal blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 inline-flex rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-200">
            Free automation tool
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">
            Automation ROI Calculator
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Estimate how much time and revenue your business can recover by automating
            manual work, CRM follow-ups, Telegram workflows, reports, and support.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AutomationRoiCalculator />
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            {
              title: "CRM automation",
              text: "Best for missed follow-ups, fragmented lead sources, and manual reports.",
              href: "/services/crm-automation",
            },
            {
              title: "Telegram bot automation",
              text: "Best for businesses where clients already write in Telegram.",
              href: "/services/telegram-bot-automation",
            },
            {
              title: "AI support agent",
              text: "Best for repeated support questions and 24/7 first response.",
              href: "/services/ai-support-agent",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-teal-300/40 hover:bg-white/[0.05]"
            >
              <CheckCircle2 className="mb-4 h-5 w-5 text-teal-300" />
              <h2 className="font-display text-xl font-bold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
              <span className="mt-5 flex w-fit items-center gap-2 text-sm font-semibold text-teal-300">
                View service
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-300">
              FAQ
            </p>
            <h2 className="font-display text-3xl font-bold">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-white/10 bg-zinc-950 p-5">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
