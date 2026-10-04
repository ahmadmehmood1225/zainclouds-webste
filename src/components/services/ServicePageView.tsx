"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceStory } from "@/components/services/ServiceStory";
import { ServiceCapabilities } from "@/components/services/ServiceCapabilities";
import { ServiceIntegrations } from "@/components/services/ServiceIntegrations";
import { ServiceValue } from "@/components/services/ServiceValue";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useService } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

/**
 * Visible body of a service page. The page itself stays a Server Component so
 * metadata and structured data are generated from the canonical English source,
 * while this client boundary resolves the service for the active region and
 * hands the localized record to the presentational sections.
 */
export function ServicePageView({ slug }: { slug: string }) {
  const service = useService(slug);
  const t = useT();

  if (!service) return null;

  return (
    <>
      <ServiceHero service={service} />
      <Breadcrumbs
        crumbs={[
          { name: t("nav.services"), path: "/services" },
          { name: service.name, path: service.path },
        ]}
      />
      <ServiceStory service={service} />
      <ServiceCapabilities service={service} />
      <ServiceIntegrations service={service} />
      <ServiceValue service={service} />
      <ProcessSection />
      <FaqSection items={service.faqs} serviceName={service.name} />
      <RelatedServices service={service} />
      <CTASection />
      <ContactSection />
    </>
  );
}
