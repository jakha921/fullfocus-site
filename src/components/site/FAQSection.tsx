"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { FAQJsonLd } from "@/components/seo";

const faqIndices = [0, 1, 2, 3, 4, 5];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("faq");
  const faqs = faqIndices.map((index) => ({
    question: t(`items.${index}.q`),
    answer: t(`items.${index}.a`),
  }));

  return (
    <section className="py-24 relative">
      <FAQJsonLd faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          description={t("subtitle")}
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                className="w-full glass-card rounded-xl p-5 flex items-center justify-between gap-4 text-left hover:border-white/15 transition-all duration-300"
              >
                <span className="font-display font-semibold text-white text-sm md:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-4 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
