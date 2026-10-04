import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageView } from "@/components/sections/IndustryPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { industries, getIndustry } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/jsonld";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: industry.path,
    keywords: industry.seo.keywords,
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: industry.path },
        ])}
      />
      <IndustryPageView slug={slug} />
    </>
  );
}