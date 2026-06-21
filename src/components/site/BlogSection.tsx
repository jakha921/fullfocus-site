"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "@/components/ui";

const blogPosts = [
  {
    slug: "biznes-jarayonlarini-avtomatlashtirish",
    title: "Biznes jarayonlarini avtomatlashtirish",
    excerpt: "Qaysi jarayonlarni birinchi avtomatlashtirish kerakligini aniqlash uchun amaliy qo'llanma.",
    category: "AI automation",
    createdAt: new Date("2026-06-21"),
    coverImage: "/images/blog-automation-audit.jpg",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    slug: "telegram-bot-biznes-avtomatlashtirish",
    title: "Telegram bot biznes uchun",
    excerpt: "Telegram orqali keladigan murojaatlarni yo'qotmaslik va CRMga avtomatik tushirish yo'li.",
    category: "Telegram bots",
    createdAt: new Date("2026-06-21"),
    coverImage: "/images/blog-telegram-bot.jpg",
    gradient: "from-teal-500/20 to-blue-500/10",
  },
  {
    slug: "crm-avtomatlashtirish-sotuv-voronkasi",
    title: "CRM avtomatlashtirish",
    excerpt: "Leadlar, manager vazifalari, follow-up va hisobotlar CRM ichida qanday avtomatlashtiriladi.",
    category: "CRM automation",
    createdAt: new Date("2026-06-21"),
    coverImage: "/images/blog-crm-automation.jpg",
    gradient: "from-blue-500/20 to-emerald-500/10",
  },
];

export function BlogSection() {
  const [featured, ...rest] = blogPosts;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Блог"
          title="Полезные"
          highlight="статьи"
          description="Делимся опытом и знаниями в области IT"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured post - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link href={`/blog/${featured.slug}`}>
              <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[280px] relative flex flex-col justify-end hover:border-white/15 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="absolute inset-0 object-cover opacity-60 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="glass-card rounded-full p-2">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="gradient">{featured.category}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {featured.createdAt.toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{featured.excerpt}</p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller posts */}
          <div className="flex flex-col gap-6">
            {rest.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.15 }}
                className="flex-1"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="glass-card rounded-2xl overflow-hidden group h-full relative flex flex-col justify-end hover:border-white/15 transition-all duration-300 min-h-[120px]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="absolute inset-0 object-cover opacity-50 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="relative z-10 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="gradient" className="text-xs px-2 py-0.5">
                          {post.category}
                        </Badge>
                      </div>
                      <h3 className="font-display font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Все статьи <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
