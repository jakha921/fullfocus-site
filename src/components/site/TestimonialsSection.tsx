"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { Card } from "@/components/ui";

const testimonialsMeta = [
  {
    id: "1",
    index: 0,
    rating: 5,
    initials: "AP",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "2",
    index: 1,
    rating: 5,
    initials: "MI",
    gradient: "from-teal-500 to-blue-500",
  },
  {
    id: "3",
    index: 2,
    rating: 5,
    initials: "DK",
    gradient: "from-blue-500 to-green-500",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsMeta.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card glass hover className="h-full flex flex-col">
                {/* Big quote */}
                <div className="font-display text-6xl gradient-text opacity-40 leading-none mb-4 select-none">
                  &ldquo;
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed flex-1 mb-6">
                  {t(`items.${testimonial.index}.text`)}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {t(`items.${testimonial.index}.name`)}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {t(`items.${testimonial.index}.role`)}, {t(`items.${testimonial.index}.company`)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
