import type { Metadata } from "next";
import { LocalizedPageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Software Services | Zain Clouds",
  description:
    "Ecommerce, CRM, ERP, ERPNext, POS and custom software services from Zain Clouds, delivered for businesses across Saudi Arabia, Pakistan and the Gulf.",
  path: "/services",
  keywords: ["software services", "ecommerce", "CRM", "ERP", "POS", "custom software"],
});

export default function ServicesPage() {
  return (
    <>
      <LocalizedPageHero
        labelKey="page.services.label"
        titleKey="page.services.title"
        descriptionKey="page.services.description"
        image="/images/hero/hero-background.svg"
      />
      <Breadcrumbs crumbs={[{ name: "Services", path: "/services" }]} />
      <ServicesAccordion />
      <ServicesSection />
      <CTASection />
      <ContactSection />
    </>
  );
}