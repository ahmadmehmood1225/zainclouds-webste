import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { CompanyStatement } from "@/components/sections/CompanyStatement";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { ServiceSpotlight } from "@/components/sections/ServiceSpotlight";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { CredibilitySection } from "@/components/sections/CredibilitySection";
import { PartnershipsSection } from "@/components/sections/PartnershipsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScheduleCallSection } from "@/components/sections/ScheduleCallSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqStructuredData } from "@/lib/jsonld";
import { homeFaqs } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: "Zain Clouds | Ecommerce, ERP, CRM and Custom Software Solutions",
  description:
    "Zain Clouds builds ecommerce, CRM, ERP, ERPNext, POS and custom software solutions for businesses across Saudi Arabia, Pakistan and the Gulf region.",
  path: "/",
  keywords: [
    "software company Saudi Arabia",
    "ecommerce development",
    "ERP solutions",
    "CRM software",
    "POS systems",
    "custom software Dubai",
  ],
});

export default function HomePage() {
  return (
    <>
      {/* Structured data is emitted once, in the default region, because the
          region is a stored preference rather than a separate URL. */}
      <JsonLd data={faqStructuredData(homeFaqs)} />
      <Hero />
      <CompanyStatement />
      <CapabilityStrip />
      <ServiceShowcase />
      <ServiceSpotlight slug="ecommerce" />
      <ServiceSpotlight slug="crm" reverse />
      <ServiceSpotlight slug="erp" otherSlug="erpnext" />
      <ServiceSpotlight slug="pos" reverse />
      <ServiceSpotlight slug="custom-software" />
      <ProcessSection />
      <TechnologySection />
      <StatsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <LeadershipSection variant="teaser" />
      <CredibilitySection />
      <PartnershipsSection />
      <FaqSection />
      <CTASection />
      <ScheduleCallSection />
      <ContactSection />
    </>
  );
}