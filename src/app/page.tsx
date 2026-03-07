import {
  Hero,
  ServicesSection,
  StatsSection,
  PortfolioSection,
  TestimonialsSection,
  BlogSection,
  CTASection,
  ProcessSection,
  TechStackSection,
  ClientsSection,
} from "@/components/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <PortfolioSection />
      <ClientsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
