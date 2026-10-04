import type { Metadata } from "next";
import { LocalizedPageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AboutSection } from "@/components/sections/AboutSection";
import { CredibilitySection } from "@/components/sections/CredibilitySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyZainClouds } from "@/components/sections/WhyZainClouds";
import { TeamSection } from "@/components/sections/TeamSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Zain Clouds | Software Company in Saudi Arabia, Pakistan and Dubai",
  description:
    "Zain Clouds is a software company building ecommerce, CRM, ERP, ERPNext, POS and custom software for businesses across Saudi Arabia, Pakistan, Dubai and the Gulf region.",
  path: "/about",
  keywords: ["about Zain Clouds", "software company Saudi Arabia", "software company Dubai"],
});

export default function AboutPage() {
  return (
    <>
      <LocalizedPageHero
        labelKey="page.about.label"
        titleKey="page.about.title"
        descriptionKey="page.about.description"
        image="/images/hero/hero-background.svg"
      />
      <Breadcrumbs crumbs={[{ name: "About", path: "/about" }]} />
      <AboutSection />
      <CredibilitySection />
      <ProcessSection />
      <WhyZainClouds />
      <LeadershipSection />
      <TeamSection />
      <CTASection />
      <ContactSection />
    </>
  );
}