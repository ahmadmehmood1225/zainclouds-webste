import type { Metadata } from "next";
import { LocalizedPageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PortfolioList } from "@/components/sections/PortfolioList";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio | Zain Clouds",
  description:
    "Software projects from Zain Clouds covering ecommerce, POS, ERP, healthcare, CRM and distribution systems for businesses in Saudi Arabia, Pakistan and the Gulf.",
  path: "/portfolio",
  keywords: ["software portfolio", "ecommerce projects", "ERP projects", "POS projects"],
});

export default function PortfolioPage() {
  return (
    <>
      <LocalizedPageHero
        labelKey="page.portfolio.label"
        titleKey="page.portfolio.title"
        descriptionKey="page.portfolio.description"
        image="/images/hero/hero-background.svg"
      />
      <Breadcrumbs crumbs={[{ name: "Portfolio", path: "/portfolio" }]} />

      <PortfolioList />

      <CTASection />
      <ContactSection />
    </>
  );
}