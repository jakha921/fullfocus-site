import { LeadQuiz } from '@/components/quiz';
import { quizCopy, resolveQuizLocale } from '@/components/quiz/quiz-content';
import { createPageMetadata } from '@/lib/seo-metadata';
import { getLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n';

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  return createPageMetadata({
    path: '/quiz',
    locale,
    title: 'AI Automation Audit',
    description:
      'Answer a short diagnostic quiz and get automation ideas for sales, support, marketing, operations, reporting, and analytics.',
    keywords: ['AI automation audit', 'business automation quiz', 'automation estimate'],
  });
}

export default async function QuizPage() {
  const locale = resolveQuizLocale(await getLocale());
  const copy = quizCopy[locale];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-teal rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {copy.pageTitle} <span className="gradient-text">{copy.pageHighlight}</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            {copy.pageDescription}
          </p>
        </div>
        <LeadQuiz />
      </div>
    </div>
  );
}
