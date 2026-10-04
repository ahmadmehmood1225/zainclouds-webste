"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";
import { Check, ArrowRight } from "@/components/ui/icons";
import { useIndustries, useServices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

/**
 * Visible body of an industry page. The page itself stays a Server Component for
 * metadata and breadcrumbs JSON-LD; this client boundary resolves the localized
 * industry and service records.
 */
export function IndustryPageView({ slug }: { slug: string }) {
  const t = useT();
  const industries = useIndustries();
  const industry = industries.find((item) => item.slug === slug);
  const services = useServices().filter((service) => service.category !== "Development");

  if (!industry) return null;

  return (
    <>
      <PageHero
        label={industry.name}
        title={t("industry.pageTitle", { industry: industry.name })}
        description={industry.description}
        image={`/images/industries/${industry.slug}.svg`}
      />
      <Breadcrumbs
        crumbs={[
          { name: t("nav.industries"), path: "/industries" },
          { name: industry.name, path: industry.path },
        ]}
      />

      <section className="bg-white py-20 sm:py-28" aria-labelledby="industry-solutions">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                id="industry-solutions"
                label={t("services.label")}
                title={t("industry.solutionsTitle", { industry: industry.name })}
              />
              <ul className="mt-8 space-y-4">
                {industry.solutions.map((solution) => (
                  <li key={solution} className="flex items-start gap-3 text-base text-navy-900/80">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {solution}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-2xl border border-navy-900/10">
                <Image
                  src={`/images/industries/${industry.slug}.svg`}
                  alt={t("industry.imageAlt", { industry: industry.name })}
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/60 py-20 sm:py-28" aria-labelledby="industry-challenges">
        <Container>
          <Reveal>
            <SectionHeading
              id="industry-challenges"
              label={t("industry.challengesLabel")}
              title={t("industry.challengesTitle")}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
            {industry.challenges.map((challenge, index) => (
              <Reveal key={challenge} delay={index * 60}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7 sm:p-8">
                  <span className="num font-display text-sm font-semibold text-teal-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-base leading-relaxed text-navy-900/80">{challenge}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="industry-services">
        <Container>
          <Reveal>
            <SectionHeading
              id="industry-services"
              label={t("industry.servicesLabel")}
              title={t("industry.servicesTitle")}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 50}>
                <a
                  href={service.path}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-navy-900/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:bg-brand-500 hover:shadow-[0_24px_60px_-30px_rgba(7,85,233,0.55)] focus-visible:bg-brand-500"
                >
                  <div>
                    <span className="num font-display text-sm font-semibold text-brand-700 transition-colors group-hover:text-white group-focus-visible:text-white">
                      {service.number}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-navy-900 transition-colors group-hover:text-white group-focus-visible:text-white">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-700 transition-colors group-hover:text-white/85 group-focus-visible:text-white/85">
                      {service.tagline}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-700 transition-colors group-hover:text-white group-focus-visible:text-white">
                    {t("ui.learnMore")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
      <ContactSection />
    </>
  );
}
