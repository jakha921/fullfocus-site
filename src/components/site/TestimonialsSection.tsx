import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { Card } from "@/components/ui";
import type { PublicTestimonial } from "@/lib/cms";

const testimonialsMeta = [
  {
    id: "1",
    index: 0,
    rating: 5,
    initials: "AP",
    gradient: "from-emerald-500 to-teal-500",
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
    gradient: "from-blue-500 to-emerald-500",
  },
];

export function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: PublicTestimonial[];
}) {
  const t = useTranslations("testimonials");
  const items =
    testimonials.length > 0
      ? testimonials.map((testimonial, index) => ({
          id: testimonial.id,
          rating: testimonial.rating,
          initials: testimonial.avatar
            ? ""
            : testimonial.clientName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
          gradient: testimonialsMeta[index % testimonialsMeta.length].gradient,
          text: testimonial.content,
          name: testimonial.clientName,
          role: testimonial.position || "",
          company: testimonial.company,
          avatar: testimonial.avatar,
        }))
      : testimonialsMeta.map((testimonial) => ({
          ...testimonial,
          text: t(`items.${testimonial.index}.text`),
          name: t(`items.${testimonial.index}.name`),
          role: t(`items.${testimonial.index}.role`),
          company: t(`items.${testimonial.index}.company`),
          avatar: null,
        }));

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
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
            >
              <Card glass hover className="h-full flex flex-col">
                {/* Big quote */}
                <div
                  aria-hidden="true"
                  className="font-display text-6xl gradient-text opacity-40 leading-none mb-4 select-none"
                >
                  &ldquo;
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed flex-1 mb-6">
                  {testimonial.text}
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
                    {testimonial.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      testimonial.initials
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {testimonial.role ? `${testimonial.role}, ` : ""}{testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
