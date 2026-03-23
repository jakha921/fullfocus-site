import {
  Hero,
  ServicesSection,
  PortfolioSection,
  TestimonialsSection,
  CTASection,
  ProcessSection,
  TechStackSection,
  SocialProofBar,
  PainSection,
  PricingSection,
  FAQSection,
  IdeaAuctionSection,
} from "@/components/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <PainSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TechStackSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <IdeaAuctionSection />
    </>
  );
}
