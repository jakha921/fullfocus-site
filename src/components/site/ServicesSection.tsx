import Link from "next/link";
import { ArrowRight, Bot, Workflow, Code2, Plug } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { Card } from "@/components/ui";
import type { PublicService } from "@/lib/cms";

const serviceItems = [
  { number: "01", icon: Bot, key: "ai_agents", href: "/services/ai-support-agent" },
  { number: "02", icon: Workflow, key: "automation", href: "/services/telegram-bot-automation" },
  { number: "03", icon: Code2, key: "saas", href: "/services" },
  { number: "04", icon: Plug, key: "integration", href: "/services/crm-automation" },
] as const;

const iconMap = {
  Bot,
  Workflow,
  Code2,
  Plug,
} as const;

export function ServicesSection({ services = [] }: { services?: PublicService[] }) {
  const t = useTranslations("services");
  const items =
    services.length > 0
      ? services.map((service, index) => ({
          number: String(index + 1).padStart(2, "0"),
          icon: iconMap[service.icon as keyof typeof iconMap] || Bot,
          key: service.slug,
          href: `/services#${service.slug}`,
          title: service.title,
          description: service.description,
          metric: service.features[0] || t("more"),
        }))
      : serviceItems.map((service) => ({
          ...service,
          title: t(`${service.key}.title`),
          description: t(`${service.key}_full_desc`),
          metric: t(`${service.key}_metric`),
        }));

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          description={t("subtitle")}
        />

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {items.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.key}>
                <Link href={service.href}>
                  <Card glass hover className="h-full group relative overflow-hidden">
                    {/* Service number */}
                    <div
                      aria-hidden="true"
                      className="absolute top-4 right-4 text-4xl font-display font-bold text-gray-500 select-none"
                    >
                      {service.number}
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:from-emerald-500/30 group-hover:to-teal-500/20 transition-all">
                        <Icon className="w-6 h-6 text-emerald-400 group-hover:-translate-y-1 transition-transform duration-300" />
                        </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400/80 bg-emerald-500/10 px-3 py-1 rounded-full">
                            {service.metric}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {t("more")} <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
