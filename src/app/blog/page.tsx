"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui";

const categories = [
  { value: "all", label: "Все" },
  { value: "tech", label: "Технологии" },
  { value: "design", label: "Дизайн" },
  { value: "tips", label: "Советы" },
];

const blogPosts = [
  {
    id: "1",
    title: "Как выбрать IT-подрядчика для вашего проекта",
    slug: "how-to-choose-it-contractor",
    excerpt: "Руководство по выбору надёжного партнёра для разработки программного обеспечения. На что обратить внимание при выборе.",
    category: "tips",
    categoryName: "Советы",
    authorName: "Ахмад Рузибоев",
    createdAt: new Date("2024-01-15"),
    gradient: "from-green-500/20 to-teal-500/10",
    featured: true,
  },
  {
    id: "2",
    title: "Тренды веб-разработки в 2025 году",
    slug: "web-development-trends-2025",
    excerpt: "Обзор ключевых технологий и подходов, которые будут определять индустрию.",
    category: "tech",
    categoryName: "Технологии",
    authorName: "Бобур Каримов",
    createdAt: new Date("2024-02-01"),
    gradient: "from-teal-500/20 to-blue-500/10",
    featured: false,
  },
  {
    id: "3",
    title: "Зачем вашему бизнесу нужен UX-дизайн",
    slug: "why-ux-design-matters",
    excerpt: "Как качественный дизайн интерфейсов влияет на конверсию и удержание пользователей.",
    category: "design",
    categoryName: "Дизайн",
    authorName: "Нигора Назарова",
    createdAt: new Date("2024-02-15"),
    gradient: "from-blue-500/20 to-purple-500/10",
    featured: false,
  },
  {
    id: "4",
    title: "Введение в Server Components",
    slug: "server-components-intro",
    excerpt: "Разбираемся, что такое React Server Components, как они работают.",
    category: "tech",
    categoryName: "Технологии",
    authorName: "Жасур Алимов",
    createdAt: new Date("2024-03-01"),
    gradient: "from-purple-500/20 to-green-500/10",
    featured: false,
  },
  {
    id: "5",
    title: "Best practices для REST API",
    slug: "rest-api-best-practices",
    excerpt: "Лучшие практики проектирования REST API для надёжного интерфейса.",
    category: "tech",
    categoryName: "Технологии",
    authorName: "Бобур Каримов",
    createdAt: new Date("2024-03-15"),
    gradient: "from-green-500/20 to-teal-500/10",
    featured: false,
  },
  {
    id: "6",
    title: "Дизайн-системы: от идеи до внедрения",
    slug: "design-systems-guide",
    excerpt: "Пошаговое руководство по созданию дизайн-системы для вашего продукта.",
    category: "design",
    categoryName: "Дизайн",
    authorName: "Нигора Назарова",
    createdAt: new Date("2024-04-01"),
    gradient: "from-pink-500/20 to-purple-500/10",
    featured: false,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const rest = filteredPosts.filter((p) => p.id !== featured?.id);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden noise-bg">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Наш <span className="gradient-text">блог</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Делимся опытом, знаниями и мыслями о разработке и дизайне
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 glass-card hover:border-white/15 ${
                  activeCategory === cat.value
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured post */}
              {featured && (
                <div className="mb-6">
                  <Link href={`/blog/${featured.slug}`}>
                    <div className="glass-card rounded-2xl overflow-hidden group relative flex flex-col justify-end hover:border-white/15 transition-all duration-300 min-h-[280px]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="glass-card rounded-full p-2">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <div className="relative z-10 p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="gradient">{featured.categoryName}</Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {featured.createdAt.toLocaleDateString("ru-RU", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-gray-300 line-clamp-2 max-w-2xl">{featured.excerpt}</p>
                        <p className="text-gray-500 text-sm mt-3">{featured.authorName}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest posts grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[200px] relative flex flex-col justify-end hover:border-white/15 transition-all duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="relative z-10 p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="gradient" className="text-xs px-2 py-0.5">
                              {post.categoryName}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.createdAt.toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-white group-hover:text-green-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-500 text-xs mt-2">{post.authorName}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
