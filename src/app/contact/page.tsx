"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Github, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/site";
import { Card } from "@/components/ui";

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

const contactInfoMeta = [
  {
    icon: Mail,
    key: "email" as const,
    value: "hello@fullfocus.dev",
    href: "mailto:hello@fullfocus.dev",
    gradient: "from-green-500/20 to-teal-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Phone,
    key: "phone" as const,
    value: "+998 90 123 45 67",
    href: "tel:+998901234567",
    gradient: "from-teal-500/20 to-blue-500/10",
    iconColor: "text-teal-400",
  },
  {
    icon: MapPin,
    key: "address" as const,
    valueKey: "address_value" as const,
    href: null,
    gradient: "from-blue-500/20 to-purple-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Clock,
    key: "hours" as const,
    valueKey: "hours_value" as const,
    href: null,
    gradient: "from-purple-500/20 to-green-500/10",
    iconColor: "text-purple-400",
  },
];

const faqIndices = [0, 1, 2, 3, 4];

export default function ContactPage() {
  const t = useTranslations("contact_page");

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
              {t("title")} <span className="gradient-text">{t("highlight")}</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("description")}
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
                  {t("form_title")} <span className="gradient-text">{t("form_highlight")}</span>
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
                  {t("contact_info")}
                </h2>
                <div className="space-y-4">
                  {contactInfoMeta.map((item) => {
                    const Icon = item.icon;
                    const title = t(item.key);
                    const value = item.valueKey ? t(item.valueKey) : item.value;
                    return (
                      <div key={item.key} className="flex items-start gap-4">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-white hover:text-green-400 transition-colors"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-white">{value}</p>
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
                  {t("social")}
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
                {t("map")}
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
              {t("faq_title")} <span className="gradient-text">{t("faq_highlight")}</span>
            </h2>
            <p className="text-gray-400">{t("faq_desc")}</p>
          </motion.div>

          <div className="space-y-3">
            {faqIndices.map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <FAQItem question={t(`faq.${index}.q`)} answer={t(`faq.${index}.a`)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
