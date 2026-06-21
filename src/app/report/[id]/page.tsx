import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  buildTelegramBotUrl,
  labelAutomationArea,
  labelBudget,
  labelLeadTemperature,
  labelPainPoint,
  labelTimeline,
  labelTool,
  labelVolume,
  normalizeAuditLocale,
  parseAutomationAuditFeatures,
} from "@/lib/automation-audit";

export const dynamic = "force-dynamic";

const defaultTelegramBotUsername = "fullfocusdev_bot";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return {
    title: "Mini Automation Report",
    description: "Private mini-report for an AI automation audit lead.",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `https://fullfocus.dev/report/${params.id}`,
    },
  };
}

async function getTelegramBotUrl(reportId: string) {
  const usernameSetting = await prisma.setting.findUnique({
    where: { key: "telegram_bot_username" },
  });
  return buildTelegramBotUrl(
    usernameSetting?.value ||
      process.env.TELEGRAM_BOT_USERNAME ||
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ||
      defaultTelegramBotUsername,
    reportId
  );
}

const reportCopy = {
  uz: {
    badge: "Mini-hisobot",
    titlePrefix: "AI avtomatlashtirish auditi:",
    description:
      "Dastlabki baholash quiz javoblari asosida tuzildi. Yakuniy TZ qisqa qo'ng'iroqda aniqlashtiriladi.",
    newLead: "Yangi lid",
    focus: "Fokus",
    timeline: "Muddat",
    scale: "Masshtab",
    summaryTitle: "Qisqa xulosa",
    defaultSummary: "Jarayonni aniqlashtirish va avtomatlashtirish xaritasini tuzish kerak.",
    painPoints: "Muammolar",
    tools: "Instrumentlar",
    quickWins: "Quick wins",
    nextSteps: "Keyingi qadamlar",
    volume: "Hajm",
    telegramTitle: "Buni Telegram'da muhokama qilish",
    estimatePrefix: "Masshtab",
    estimateWeeks: "taxminiy ishlab chiqish muddati",
    weeks: "hafta",
    openBot: "Botni ochish",
    contact: "Bog'lanish",
  },
  ru: {
    badge: "Mini-report",
    titlePrefix: "AI-аудит автоматизации для",
    description:
      "Первичная оценка собрана на основе ответов в квизе. Финальное ТЗ нужно уточнить на коротком созвоне.",
    newLead: "Новый лид",
    focus: "Фокус",
    timeline: "Срок",
    scale: "Масштаб",
    summaryTitle: "Короткий вывод",
    defaultSummary: "Нужно уточнить процесс и собрать карту автоматизации.",
    painPoints: "Боли",
    tools: "Инструменты",
    quickWins: "Quick wins",
    nextSteps: "Следующие шаги",
    volume: "Объем",
    telegramTitle: "Разобрать это в Telegram",
    estimatePrefix: "Масштаб",
    estimateWeeks: "примерный срок разработки",
    weeks: "недель",
    openBot: "Открыть бота",
    contact: "Связаться",
  },
  en: {
    badge: "Mini-report",
    titlePrefix: "AI automation audit for",
    description:
      "The initial assessment is based on quiz answers. The final specification should be clarified on a short call.",
    newLead: "New lead",
    focus: "Focus",
    timeline: "Timeline",
    scale: "Scale",
    summaryTitle: "Short summary",
    defaultSummary: "The process needs clarification and an automation map.",
    painPoints: "Pain points",
    tools: "Tools",
    quickWins: "Quick wins",
    nextSteps: "Next steps",
    volume: "Volume",
    telegramTitle: "Discuss this in Telegram",
    estimatePrefix: "Scale",
    estimateWeeks: "estimated development time",
    weeks: "weeks",
    openBot: "Open bot",
    contact: "Contact",
  },
} as const;

export default async function ReportPage({ params }: { params: { id: string } }) {
  const locale = normalizeAuditLocale(await getLocale());
  const copy = reportCopy[locale];
  const result = await prisma.quizResult.findUnique({
    where: { id: params.id },
  });

  if (!result) notFound();

  const audit = parseAutomationAuditFeatures(result.features);
  const report = audit.report;
  const telegramBotUrl = await getTelegramBotUrl(result.id);
  const leadTemperature = audit.leadTemperature
    ? labelLeadTemperature(audit.leadTemperature, locale)
    : copy.newLead;

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-200">
              <Sparkles className="h-4 w-4" />
              {copy.badge}
            </p>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
              {copy.titlePrefix} {result.company || result.name}
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              {copy.description}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-zinc-500">Lead score</p>
            <p className="text-3xl font-bold text-teal-300">{audit.leadScore || 0}/100</p>
            <p className="text-sm text-zinc-400">{leadTemperature}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <BarChart3 className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">{copy.focus}</p>
            <p className="mt-1 font-semibold">{labelAutomationArea(result.projectType, locale)}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <Clock3 className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">{copy.timeline}</p>
            <p className="mt-1 font-semibold">{labelTimeline(result.timeline, locale)}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <ShieldCheck className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">{copy.scale}</p>
            <p className="mt-1 font-semibold">{labelBudget(result.budget, locale)}</p>
          </div>
        </div>

        <section className="mt-6 rounded-lg border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-xl font-bold">{copy.summaryTitle}</h2>
          <p className="mt-3 leading-7 text-zinc-300">
            {report?.summary || copy.defaultSummary}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-white">{copy.painPoints}</p>
              <div className="flex flex-wrap gap-2">
                {audit.painPoints.map((item) => (
                  <span key={item} className="rounded-lg bg-white/[0.05] px-3 py-1 text-sm text-zinc-300">
                    {labelPainPoint(item, locale)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-white">{copy.tools}</p>
              <div className="flex flex-wrap gap-2">
                {audit.tools.map((item) => (
                  <span key={item} className="rounded-lg bg-white/[0.05] px-3 py-1 text-sm text-zinc-300">
                    {labelTool(item, locale)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {report && (
          <section className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold">{copy.quickWins}</h2>
              <div className="mt-4 space-y-3">
                {report.quickWins.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold">{copy.nextSteps}</h2>
              <div className="mt-4 space-y-3">
                {report.nextSteps.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mt-6 rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-teal-200">{copy.volume}: {labelVolume(audit.volume, locale)}</p>
              <h2 className="mt-1 text-xl font-bold">{copy.telegramTitle}</h2>
              <p className="mt-2 text-sm text-zinc-300">
                {copy.estimatePrefix}: {labelBudget(result.budget, locale)} · {copy.estimateWeeks}:{" "}
                {result.estimateWeeksMin}-{result.estimateWeeksMax} {copy.weeks}.
              </p>
            </div>
            <a
              href={telegramBotUrl || "https://fullfocus.dev/contact"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
            >
              {telegramBotUrl ? copy.openBot : copy.contact}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
