'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const copy = {
  uz: {
    title: "Sahifani ochib bo'lmadi",
    body: "Vaqtinchalik xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko'ring.",
    retry: "Qayta urinish",
    home: "Bosh sahifaga qaytish",
  },
  ru: {
    title: "Не удалось открыть страницу",
    body: "Произошла временная ошибка. Попробуйте еще раз чуть позже.",
    retry: "Повторить",
    home: "На главную",
  },
  en: {
    title: "Could not open the page",
    body: "A temporary error occurred. Please try again later.",
    retry: "Try again",
    home: "Back home",
  },
};

function resolveLocale(locale: string) {
  return locale === 'ru' || locale === 'en' || locale === 'uz' ? locale : 'uz';
}

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = resolveLocale(useLocale());
  const t = copy[locale];

  useEffect(() => {
    console.error('[AppErrorBoundary]', error);
  }, [error]);

  return (
    <main className="min-h-[70vh] px-4 py-32 text-white">
      <div className="mx-auto max-w-xl rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="mb-3 text-sm font-medium text-teal-300">FullFocus</p>
        <h1 className="font-display text-3xl font-bold">{t.title}</h1>
        <p className="mt-4 text-zinc-400">{t.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
          >
            {t.retry}
          </button>
          <Link
            href="/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
