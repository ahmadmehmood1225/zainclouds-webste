import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/services/ServicePageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbStructuredData,
  faqStructuredData,
  serviceStructuredData,
} from "@/lib/jsonld";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: service.path,
    keywords: service.seo.keywords,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={serviceStructuredData({
          name: service.name,
          description: service.tagline,
          path: service.path,
          serviceType: service.category,
        })}
      />
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "Services", path: "/services" },
          { name: service.name, path: service.path },
        ])}
      />
      {/* Structured data is emitted from the canonical English copy, once, so
          the indexed description matches the metadata above. */}
      <JsonLd data={faqStructuredData(service.faqs)} />
      <ServicePageView slug={slug} />
    </>
  );
}