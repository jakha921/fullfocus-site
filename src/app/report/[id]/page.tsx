import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  labelPainPoint,
  labelTimeline,
  labelTool,
  labelVolume,
  leadTemperatureLabels,
  parseAutomationAuditFeatures,
} from "@/lib/automation-audit";

export const dynamic = "force-dynamic";

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
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME,
    reportId
  );
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  const result = await prisma.quizResult.findUnique({
    where: { id: params.id },
  });

  if (!result) notFound();

  const audit = parseAutomationAuditFeatures(result.features);
  const report = audit.report;
  const telegramBotUrl = await getTelegramBotUrl(result.id);
  const leadTemperature = audit.leadTemperature
    ? leadTemperatureLabels[audit.leadTemperature] || audit.leadTemperature
    : "Новый лид";

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-200">
              <Sparkles className="h-4 w-4" />
              Mini-report
            </p>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
              AI-аудит автоматизации для {result.company || result.name}
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Первичная оценка собрана на основе ответов в квизе. Финальное ТЗ нужно
              уточнить на коротком созвоне.
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
            <p className="text-sm text-zinc-500">Фокус</p>
            <p className="mt-1 font-semibold">{labelAutomationArea(result.projectType)}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <Clock3 className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">Срок</p>
            <p className="mt-1 font-semibold">{labelTimeline(result.timeline)}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <ShieldCheck className="mb-4 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-500">Масштаб</p>
            <p className="mt-1 font-semibold">{labelBudget(result.budget)}</p>
          </div>
        </div>

        <section className="mt-6 rounded-lg border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-xl font-bold">Короткий вывод</h2>
          <p className="mt-3 leading-7 text-zinc-300">
            {report?.summary || "Нужно уточнить процесс и собрать карту автоматизации."}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-white">Боли</p>
              <div className="flex flex-wrap gap-2">
                {audit.painPoints.map((item) => (
                  <span key={item} className="rounded-lg bg-white/[0.05] px-3 py-1 text-sm text-zinc-300">
                    {labelPainPoint(item)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-white">Инструменты</p>
              <div className="flex flex-wrap gap-2">
                {audit.tools.map((item) => (
                  <span key={item} className="rounded-lg bg-white/[0.05] px-3 py-1 text-sm text-zinc-300">
                    {labelTool(item)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {report && (
          <section className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold">Quick wins</h2>
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
              <h2 className="text-xl font-bold">Следующие шаги</h2>
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
              <p className="text-sm text-teal-200">Объем: {labelVolume(audit.volume)}</p>
              <h2 className="mt-1 text-xl font-bold">Разобрать это в Telegram</h2>
              <p className="mt-2 text-sm text-zinc-300">
                Масштаб: {labelBudget(result.budget)} · примерный срок разработки:{" "}
                {result.estimateWeeksMin}-{result.estimateWeeksMax} недель.
              </p>
            </div>
            <a
              href={telegramBotUrl || "https://fullfocus.dev/contact"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
            >
              {telegramBotUrl ? "Открыть бота" : "Связаться"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
