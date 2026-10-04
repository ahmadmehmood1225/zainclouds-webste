"use client";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { legalDocuments } from "@/data/legal";
import { siteConfig } from "@/lib/site";
import { interpolate, useLocale } from "@/lib/use-copy";

/**
 * Renders the privacy policy or the terms page in the active region. English
 * stays canonical in the server page metadata, while the body follows the
 * visitor's stored region.
 */
export function LegalPageView({ document: slug }: { document: "privacy" | "terms" }) {
  const { locale, t } = useLocale();
  const document = legalDocuments[slug][locale];

  const fill = (template: string) => interpolate(template, { company: siteConfig.legalName });

  const updated = new Date().toLocaleDateString(locale === "ar" ? "ar-SA-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const description =
    slug === "privacy"
      ? `${t("legal.lastUpdated")} ${updated}. ${fill(document.description)}`
      : fill(document.description);

  return (
    <>
      <PageHero
        label={document.label}
        title={document.title}
        description={description}
        image="/images/hero/hero-background.svg"
      />
      <Breadcrumbs
        crumbs={[
          {
            name: document.title,
            path: slug === "privacy" ? "/privacy-policy" : "/terms-and-conditions",
          },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <article className="mx-auto max-w-3xl">
          <p className="leading-relaxed text-navy-900/75">{fill(document.intro)}</p>
          <div className="mt-10 space-y-10">
            {document.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-navy-900/70">
                    {fill(paragraph)}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </Container>
    </>
  );
}
