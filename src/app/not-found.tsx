import Link from 'next/link';
import { getLocale } from 'next-intl/server';

const copy = {
  uz: {
    title: "Sahifa topilmadi",
    body: "Bu havola eskirgan yoki manzil noto'g'ri kiritilgan.",
    home: "Bosh sahifaga qaytish",
    audit: "AI-audit olish",
  },
  ru: {
    title: "Страница не найдена",
    body: "Ссылка устарела или адрес введен неправильно.",
    home: "На главную",
    audit: "Получить AI-аудит",
  },
  en: {
    title: "Page not found",
    body: "This link is outdated or the address was entered incorrectly.",
    home: "Back home",
    audit: "Get AI audit",
  },
};

function resolveLocale(locale: string) {
  return locale === 'ru' || locale === 'en' || locale === 'uz' ? locale : 'uz';
}

export default async function NotFound() {
  const locale = resolveLocale(await getLocale());
  const t = copy[locale];

  return (
    <main className="min-h-[70vh] px-4 py-32 text-white">
      <div className="mx-auto max-w-xl rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="mb-3 text-sm font-medium text-teal-300">404</p>
        <h1 className="font-display text-3xl font-bold">{t.title}</h1>
        <p className="mt-4 text-zinc-400">{t.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            {t.home}
          </Link>
          <Link
            href="/quiz"
            className="rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
          >
            {t.audit}
          </Link>
        </div>
      </div>
    </main>
  );
}
