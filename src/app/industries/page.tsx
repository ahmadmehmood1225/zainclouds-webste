import type { Metadata } from "next";
import { LocalizedPageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve | Zain Clouds",
  description:
    "Retail, healthcare, manufacturing, distribution, hospitality and ecommerce software built by Zain Clouds for businesses across Saudi Arabia, Pakistan and the Gulf.",
  path: "/industries",
  keywords: ["industry software", "retail", "healthcare", "manufacturing", "distribution"],
});

export default function IndustriesPage() {
  return (
    <>
      <LocalizedPageHero
        labelKey="page.industries.label"
        titleKey="page.industries.title"
        descriptionKey="page.industries.description"
        image="/images/hero/hero-background.svg"
      />
      <Breadcrumbs crumbs={[{ name: "Industries", path: "/industries" }]} />
      <IndustriesSection />
      <CTASection />
      <ContactSection />
    </>
  );
}