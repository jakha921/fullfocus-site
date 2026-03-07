"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Github, ChevronDown } from "lucide-react";
import { ContactForm } from "@/components/site";
import { Card } from "@/components/ui";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@fullfocus.dev",
    href: "mailto:hello@fullfocus.dev",
    gradient: "from-green-500/20 to-teal-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Phone,
    title: "Телефон",
    value: "+998 90 123 45 67",
    href: "tel:+998901234567",
    gradient: "from-teal-500/20 to-blue-500/10",
    iconColor: "text-teal-400",
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: "Ташкент, Узбекистан",
    href: null,
    gradient: "from-blue-500/20 to-purple-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Clock,
    title: "Часы работы",
    value: "Пн-Пт: 9:00 - 18:00",
    href: null,
    gradient: "from-purple-500/20 to-green-500/10",
    iconColor: "text-purple-400",
  },
];

const faqs = [
  {
    question: "Сколько стоит разработка сайта?",
    answer: "Стоимость зависит от сложности и функциональности. Лендинг — от $500, корпоративный сайт — от $1500, веб-приложение — от $3000. Пройдите наш квиз для точной оценки.",
  },
  {
    question: "Как долго занимает разработка проекта?",
    answer: "Сроки зависят от объёма работ. Лендинг — 1-2 недели, корпоративный сайт — 3-4 недели, сложные веб-приложения — 2-4 месяца. Мы всегда соблюдаем договорённые сроки.",
  },
  {
    question: "Предоставляете ли вы поддержку после запуска?",
    answer: "Да, мы предлагаем техническую поддержку и сопровождение проектов. Включает исправление багов, обновления и добавление новых функций по запросу.",
  },
  {
    question: "Работаете ли вы с зарубежными клиентами?",
    answer: "Да, мы работаем с клиентами по всему миру. Общаемся на русском, узбекском и английском языках. Принимаем оплату в различных валютах.",
  },
  {
    question: "Как проходит процесс разработки?",
    answer: "Наш процесс: Анализ → Дизайн → Разработка → Тестирование → Запуск → Поддержка. На каждом этапе вы получаете регулярные отчёты и можете вносить правки.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-display font-semibold text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-green-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden noise-bg">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-teal rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Свяжитесь с <span className="gradient-text">нами</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Готовы обсудить ваш проект? Заполните форму или свяжитесь с нами напрямую
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card glass className="h-full">
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Отправить <span className="gradient-text">заявку</span>
                </h2>
                <ContactForm />
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Контактная информация
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-gray-400 text-sm mb-1">{item.title}</h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-white hover:text-green-400 transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white">{item.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-4">
                  Мы в соцсетях
                </h2>
                <div className="flex gap-3">
                  <a
                    href="https://t.me/fullfocus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card w-12 h-12 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/fullfocus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card w-12 h-12 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glass-card rounded-xl aspect-video flex items-center justify-center text-gray-500">
                📍 Ташкент, Узбекистан
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Частые <span className="gradient-text">вопросы</span>
            </h2>
            <p className="text-gray-400">Ответы на популярные вопросы о нашей работе</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
