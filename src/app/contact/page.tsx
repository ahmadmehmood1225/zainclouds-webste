import type { Metadata } from "next";
import { LocalizedPageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Zain Clouds | Start Your Project",
  description:
    "Contact Zain Clouds about ecommerce, CRM, ERP, ERPNext, POS or custom software. We work with businesses across Saudi Arabia, Pakistan and the Gulf.",
  path: "/contact",
  keywords: ["contact Zain Clouds", "software company contact", "start a software project"],
});

export default function ContactPage() {
  return (
    <>
      <LocalizedPageHero
        labelKey="page.contact.label"
        titleKey="page.contact.title"
        descriptionKey="page.contact.description"
        image="/images/hero/hero-background.svg"
      />
      <Breadcrumbs crumbs={[{ name: "Contact", path: "/contact" }]} />
      <ContactSection />
    </>
  );
}