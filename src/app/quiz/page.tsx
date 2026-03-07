import { LeadQuiz } from '@/components/quiz';

export const metadata = {
  title: 'Оценка проекта | FullFocus',
  description: 'Ответьте на несколько вопросов и получите персональную оценку проекта с рекомендациями по срокам и бюджету.',
};

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
            Оценка <span className="gradient-text">проекта</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Ответьте на несколько вопросов и получите персональную оценку
          </p>
        </div>
        <LeadQuiz />
      </div>
    </div>
  );
}
