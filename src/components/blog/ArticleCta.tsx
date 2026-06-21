import Link from "next/link";
import { ArrowRight, BarChart3, Bot } from "lucide-react";

export function ArticleCta() {
  return (
    <aside className="my-10 rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-teal-300/20 bg-black/20 px-3 py-1 text-sm font-medium text-teal-200">
            <Bot className="h-4 w-4" />
            Bepul AI audit
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            Qaysi jarayonni birinchi avtomatlashtirish kerakligini aniqlang
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
            Qisqa savollarga javob bering. Natijada muammo, ustuvor avtomatlashtirish
            yo&apos;nalishi va mini-hisobot uchun Telegram CTA olasiz.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
          >
            Auditdan o&apos;tish
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tools/automation-roi-calculator"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:text-white"
          >
            ROI hisoblash
            <BarChart3 className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
