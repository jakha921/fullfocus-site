"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mb-16 ${align === "center" ? "text-center mx-auto" : "text-left"}`}
    >
      {badge && (
        <Badge variant="gradient" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
