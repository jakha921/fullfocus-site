import {
  Hero,
  ServicesSection,
  PortfolioSection,
  TestimonialsSection,
  ProcessSection,
  TechStackSection,
  SocialProofBar,
  PainSection,
  CTASection,
  FAQSection,
  LazyIdeaAuctionSection,
  BlogSection,
} from "@/components/site";
import type { CtaContent } from "@/components/site/CTASection";
import type { HeroContent } from "@/components/site/Hero";
import {
  getContentBlock,
  getFeaturedProjects,
  getPublicServices,
  getPublicTestimonials,
} from "@/lib/cms";
import { getPublishedBlogPosts } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo-metadata";
import { getLocale } from "next-intl/server";

export const revalidate = 300;

const heroFallback: Record<Locale, HeroContent> = {
  ru: {
    badge: "AI-автоматизация для роста",
    titleLine1: "Автоматизируем заявки,",
    titleLine2: "продажи и поддержку.",
    titleLine3: "Вы масштабируете бизнес.",
    subtitle:
      "AI-агенты, Telegram/CRM workflows и SaaS-инструменты, которые сокращают ручную работу и показывают ROI в цифрах.",
    cta: "Получить AI-аудит",
    secondaryCta: "Посмотреть кейсы",
  },
  en: {
    badge: "AI automation for growth",
    titleLine1: "Automate leads,",
    titleLine2: "sales and support.",
    titleLine3: "Scale the business.",
    subtitle:
      "AI agents, Telegram/CRM workflows, and SaaS tools that cut manual work and show ROI in clear numbers.",
    cta: "Get an AI audit",
    secondaryCta: "View case studies",
  },
  uz: {
    badge: "O'sish uchun AI avtomatlashtirish",
    titleLine1: "Ariza, sotuv va",
    titleLine2: "supportni avtomatlashtiramiz.",
    titleLine3: "Siz biznesni kengaytirasiz.",
    subtitle:
      "AI agentlar, Telegram/CRM workflow va SaaS vositalar qo'lda ishni kamaytiradi va ROIni raqam bilan ko'rsatadi.",
    cta: "AI-audit olish",
    secondaryCta: "Keyslarni ko'rish",
  },
};

const ctaFallback: Record<Locale, CtaContent> = {
  ru: {
    title: "Найдём, где автоматизация быстрее всего вернёт деньги",
    subtitle:
      "За 30 минут разберём процессы, заявки и CRM. После звонка получите 3+ конкретные точки автоматизации.",
    button: "Записаться на AI-аудит",
  },
  en: {
    title: "Find the automation points that pay back first",
    subtitle:
      "In 30 minutes we review your processes, leads, and CRM. You leave with 3+ concrete automation opportunities.",
    button: "Book an AI audit",
  },
  uz: {
    title: "Eng tez pul qaytaradigan avtomatlashtirish nuqtalarini topamiz",
    subtitle:
      "30 daqiqada jarayon, ariza va CRMni ko'rib chiqamiz. Suhbatdan keyin 3+ aniq avtomatlashtirish imkoniyatini olasiz.",
    button: "AI-auditga yozilish",
  },
};

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  return createPageMetadata({
    path: "/",
    locale,
    title: "FullFocus - AI Business Automation",
    description:
      "AI automation agency for business: AI agents, Telegram and CRM workflows, SaaS tools, and lead automation with measurable ROI.",
    keywords: [
      "AI automation",
      "business automation Uzbekistan",
      "AI agents",
      "CRM automation",
      "Telegram bot automation",
    ],
  });
}

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const [services, projects, testimonials, heroContent, ctaContent, blogPosts] =
    await Promise.all([
      getPublicServices(locale),
      getFeaturedProjects(locale),
      getPublicTestimonials(locale),
      getContentBlock("home.hero", locale, heroFallback[locale]),
      getContentBlock("home.cta", locale, ctaFallback[locale]),
      getPublishedBlogPosts(locale, undefined, 3),
    ]);

  return (
    <>
      <Hero content={heroContent} />
      <SocialProofBar />
      <PainSection />
      <ServicesSection services={services} />
      <PortfolioSection projects={projects} />
      <ProcessSection />
      <TechStackSection />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection locale={locale} posts={blogPosts} />
      <FAQSection />
      <CTASection content={ctaContent} />
      <LazyIdeaAuctionSection />
    </>
  );
}
