"use client";

import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading, CTASection, TechStackSection } from "@/components/site";
import { Card } from "@/components/ui";

const valueIcons = [Target, Users, Lightbulb, Award];
const valueGradients = [
  "from-green-500/20 to-teal-500/10",
  "from-teal-500/20 to-blue-500/10",
  "from-blue-500/20 to-green-500/10",
  "from-green-500/20 to-blue-500/10",
];

const teamGradients = [
  "from-green-500 to-teal-500",
  "from-teal-500 to-blue-500",
  "from-blue-500 to-purple-500",
  "from-purple-500 to-green-500",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const t = useTranslations("about");

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
              {t("title")}{" "}
              <span className="gradient-text">{t("highlight")}</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                {t("mission_title")}{" "}
                <span className="gradient-text">{t("mission_highlight")}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                {t("mission_p1")}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {t("mission_p2")}
              </p>
            </motion.div>

            {/* Stats block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-card rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {(["projects", "years", "clients", "team"] as const).map((statKey) => (
                    <div key={statKey} className="text-center p-4">
                      <div className="text-4xl font-display font-bold gradient-text mb-1">
                        {t(`stats_${statKey}_value`)}
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">
                        {t(`stats_${statKey}`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 relative">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            badge={t("values_badge")}
            title={t("values_title")}
            highlight={t("values_highlight")}
            description={t("values_description")}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueIcons.map((Icon, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card glass hover className="text-center h-full">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${valueGradients[index]} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {t(`values.${index}.title`)}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {t(`values.${index}.description`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t("team_badge")}
            title={t("team_title")}
            highlight={t("team_highlight")}
            description={t("team_description")}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamGradients.map((gradient, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card glass hover className="text-center h-full group">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-display font-bold shadow-lg`}
                  >
                    {t(`team.${index}.initials`)}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {t(`team.${index}.name`)}
                  </h3>
                  <p className="text-green-400 text-sm mb-2">
                    {t(`team.${index}.position`)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {t(`team.${index}.bio`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackSection />

      <CTASection />
    </>
  );
}
