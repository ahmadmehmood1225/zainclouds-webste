import type { Metadata } from "next";
import { LocalizedPageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CareersView } from "@/components/sections/CareersView";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers | Zain Clouds",
  description:
    "Join the Zain Clouds team in Saudi Arabia, Pakistan and Dubai. Careers in leadership, engineering, product, design, implementation and support.",
  path: "/careers",
  keywords: ["careers at Zain Clouds", "software jobs Saudi Arabia", "software jobs Pakistan"],
});

export default function CareersPage() {
  return (
    <>
      <LocalizedPageHero
        labelKey="page.careers.label"
        titleKey="page.careers.title"
        descriptionKey="page.careers.description"
        image="/images/hero/hero-background.svg"
      />
      <Breadcrumbs crumbs={[{ name: "Careers", path: "/careers" }]} />

      <CareersView />

      <ContactSection />
    </>
  );
}