import Link from "next/link";
import { Award, Github, Linkedin, Lightbulb, Send, Target, Users } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { CTASection, SectionHeading, TechStackSection } from "@/components/site";
import { Card } from "@/components/ui";
import { getPublicTeamMembers } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

export const revalidate = 300;

const valueIcons = [Target, Users, Lightbulb, Award];
const valueGradients = [
  "from-emerald-500/20 to-teal-500/10",
  "from-teal-500/20 to-blue-500/10",
  "from-blue-500/20 to-emerald-500/10",
  "from-emerald-500/20 to-blue-500/10",
];

const avatarGradients = [
  "from-emerald-500 to-teal-500",
  "from-teal-500 to-blue-500",
  "from-blue-500 to-purple-500",
  "from-purple-500 to-emerald-500",
];

export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");
  const yearsExperience = Math.max(1, new Date().getFullYear() - 2021);
  const team = await getPublicTeamMembers(locale);

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden noise-bg">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-green rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")} <span className="gradient-text">{t("highlight")}</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                {t("mission_title")}{" "}
                <span className="gradient-text">{t("mission_highlight")}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">{t("mission_p1")}</p>
              <p className="text-gray-400 leading-relaxed">{t("mission_p2")}</p>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {(["projects", "years", "clients", "team"] as const).map((statKey) => (
                  <div key={statKey} className="text-center p-4">
                    <div className="text-4xl font-display font-bold gradient-text mb-1">
                      {t(`stats_${statKey}_value`, { years: yearsExperience })}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {t(`stats_${statKey}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            badge={t("values_badge")}
            title={t("values_title")}
            highlight={t("values_highlight")}
            description={t("values_description")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueIcons.map((Icon, index) => (
              <Card key={index} glass hover className="text-center h-full">
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t("team_badge")}
            title={t("team_title")}
            highlight={t("team_highlight")}
            description={t("team_description")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={member.id} glass hover className="text-center h-full group">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${
                    avatarGradients[index % avatarGradients.length]
                  } rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-display font-bold shadow-lg overflow-hidden`}
                >
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-emerald-400 text-sm mb-2">{member.position}</p>
                {member.bio && <p className="text-gray-400 text-sm">{member.bio}</p>}
                <div className="mt-4 flex items-center justify-center gap-3 text-gray-500">
                  {member.linkedin && (
                    <Link href={member.linkedin} target="_blank" className="hover:text-white">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  )}
                  {member.github && (
                    <Link href={member.github} target="_blank" className="hover:text-white">
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                  {member.telegram && (
                    <Link href={member.telegram} target="_blank" className="hover:text-white">
                      <Send className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TechStackSection />
      <CTASection />
    </>
  );
}
