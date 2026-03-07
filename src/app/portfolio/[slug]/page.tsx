"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { CTASection } from "@/components/site";

// Demo project data
const project = {
  id: "1",
  title: "E-commerce Platform",
  slug: "ecommerce-platform",
  description: `
    <h2>О проекте</h2>
    <p>Современная e-commerce платформа для онлайн-ритейлера с широким ассортиментом товаров. 
    Платформа обрабатывает тысячи заказов ежедневно и интегрирована с множеством платёжных систем.</p>
    
    <h2>Задача</h2>
    <p>Клиенту требовалось масштабируемое решение для замены устаревшей системы. 
    Основные требования: высокая производительность, интеграция с платёжными системами, 
    удобная админ-панель для управления товарами и заказами.</p>
    
    <h2>Решение</h2>
    <p>Мы разработали современную платформу на базе React и Node.js с использованием PostgreSQL 
    для хранения данных и Redis для кэширования. Система развёрнута в облачной инфраструктуре 
    с автоматическим масштабированием.</p>
  `,
  category: "web",
  client: "Retail Co.",
  technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
  images: ["/images/project-1.jpg"],
  coverImage: "/images/project-1.jpg",
  link: "https://example.com",
};

const relatedProjects = [
  {
    id: "2",
    title: "Mobile Banking App",
    category: "mobile",
    categoryName: "Мобильные приложения",
    coverImage: "/images/project-2.jpg",
  },
  {
    id: "3",
    title: "CRM System",
    category: "erp",
    categoryName: "ERP/CRM",
    coverImage: "/images/project-3.jpg",
  },
];

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Все проекты
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <span className="text-green-500">{project.client}</span>
              <span>•</span>
              <span>Веб-разработка</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="sticky top-24">
                <h3 className="text-white font-semibold mb-4">Технологии</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-white font-semibold mb-2">Клиент</h3>
                <p className="text-gray-400 mb-6">{project.client}</p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full">
                      Посмотреть сайт
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Другие проекты</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedProjects.map((p) => (
              <Link key={p.id} href={`/portfolio/${p.id}`}>
                <Card hover className="overflow-hidden group p-0">
                  <div className="relative aspect-video bg-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-gray-800" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                        {p.categoryName}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-500 transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
