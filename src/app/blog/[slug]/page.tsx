"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";

// Demo post data
const post = {
  id: "1",
  title: "Как выбрать IT-подрядчика для вашего проекта",
  slug: "how-to-choose-it-contractor",
  excerpt:
    "Руководство по выбору надёжного партнёра для разработки программного обеспечения",
  content: `
    <p>Выбор правильного IT-подрядчика — критически важное решение, которое может определить успех или провал вашего проекта. В этой статье мы разберём ключевые критерии, на которые стоит обратить внимание.</p>
    
    <h2>1. Определите свои потребности</h2>
    <p>Прежде чем начать поиск подрядчика, чётко сформулируйте требования к проекту:</p>
    <ul>
      <li>Какую проблему должен решать продукт?</li>
      <li>Какой стек технологий вам нужен?</li>
      <li>Каковы сроки и бюджет проекта?</li>
    </ul>
    
    <h2>2. Изучите портфолио</h2>
    <p>Портфолио — лучший способ оценить компетенции команды. Обращайте внимание на:</p>
    <ul>
      <li>Похожие проекты в вашей отрасли</li>
      <li>Качество выполненных работ</li>
      <li>Разнообразие технологий</li>
    </ul>
    
    <h2>3. Проверьте отзывы</h2>
    <p>Не стесняйтесь просить контакты предыдущих клиентов. Хороший подрядчик охотно поделится рекомендациями.</p>
    
    <h2>4. Оцените коммуникацию</h2>
    <p>Эффективная коммуникация — ключ к успеху проекта. Обратите внимание на:</p>
    <ul>
      <li>Скорость ответов на запросы</li>
      <li>Качество постановки вопросов</li>
      <li>Готовность объяснять технические детали</li>
    </ul>
    
    <h2>Заключение</h2>
    <p>Выбор подрядчика — это инвестиция времени, которая окупается качественным результатом. Не торопитесь, проводите тщательную оценку и доверьтесь своей интуиции.</p>
  `,
  category: "tips",
  categoryName: "Советы",
  tags: ["подрядчик", "разработка", "выбор"],
  authorName: "Ахмад Рузибоев",
  createdAt: new Date("2024-01-15"),
  coverImage: "/images/blog-1.jpg",
};

const relatedPosts = [
  {
    id: "2",
    title: "Тренды веб-разработки в 2025 году",
    categoryName: "Технологии",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    title: "Зачем вашему бизнесу нужен UX-дизайн",
    categoryName: "Дизайн",
    createdAt: new Date("2024-02-15"),
  },
];

export default function BlogPostPage({
  params: _params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0, y: 0 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Все статьи
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="success">{post.categoryName}</Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.createdAt.toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-gray-400">
              <User className="w-4 h-4" />
              <span>{post.authorName}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-video bg-gradient-to-br from-green-500/20 to-gray-800 rounded-xl"
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="prose prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-800">
              <span className="text-gray-400">Поделиться:</span>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Скопировать ссылку
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">
            Похожие статьи
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`}>
                <Card hover className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {p.categoryName}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {p.createdAt.toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-green-500 transition-colors">
                    {p.title}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
