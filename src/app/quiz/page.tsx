import { LeadQuiz } from '@/components/quiz';
import { createPageMetadata } from '@/lib/seo-metadata';

export const metadata = createPageMetadata({
  path: '/quiz',
  title: 'AI Automation Audit',
  description:
    'Answer a short diagnostic quiz and get automation ideas for sales, support, marketing, operations, reporting, and analytics.',
  keywords: ['AI automation audit', 'business automation quiz', 'automation estimate'],
});

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-teal rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            AI-аудит <span className="gradient-text">автоматизации</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Оставьте контакты, ответьте на вопросы и получите мини-отчет
          </p>
        </div>
        <LeadQuiz />
      </div>
    </div>
  );
}
