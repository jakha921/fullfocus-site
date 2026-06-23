import Link from "next/link";
import { ArrowRight, BarChart3, Bot } from "lucide-react";
import { useLocale } from "next-intl";
import { isLocale, localizedPath, type Locale } from "@/lib/routing";

const copy: Record<
  Locale,
  {
    badge: string;
    title: string;
    description: string;
    audit: string;
    roi: string;
  }
> = {
  uz: {
    badge: "Bepul AI audit",
    title: "Qaysi jarayonni birinchi avtomatlashtirish kerakligini aniqlang",
    description:
      "Qisqa savollarga javob bering. Natijada muammo, ustuvor avtomatlashtirish yo'nalishi va mini-hisobot uchun Telegram CTA olasiz.",
    audit: "Auditdan o'tish",
    roi: "ROI hisoblash",
  },
  ru: {
    badge: "Бесплатный AI-аудит",
    title: "Определите, какой процесс автоматизировать первым",
    description:
      "Ответьте на короткие вопросы. В результате получите приоритетную точку автоматизации и CTA для мини-отчета в Telegram.",
    audit: "Пройти аудит",
    roi: "Посчитать ROI",
  },
  en: {
    badge: "Free AI audit",
    title: "Find the first process worth automating",
    description:
      "Answer a few questions and get a priority automation opportunity plus a Telegram CTA for a mini report.",
    audit: "Start audit",
    roi: "Calculate ROI",
  },
};

export function ArticleCta() {
  const nextIntlLocale = useLocale();
  const locale: Locale = isLocale(nextIntlLocale) ? nextIntlLocale : "uz";
  const text = copy[locale];

  return (
    <aside className="my-10 rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-teal-300/20 bg-black/20 px-3 py-1 text-sm font-medium text-teal-200">
            <Bot className="h-4 w-4" />
            {text.badge}
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            {text.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
            {text.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
          <Link
            href={localizedPath("/quiz", locale)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
          >
            {text.audit}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={localizedPath("/tools/automation-roi-calculator", locale)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:text-white"
          >
            {text.roi}
            <BarChart3 className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
