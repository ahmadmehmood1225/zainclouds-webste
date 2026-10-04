"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin } from "@/components/ui/icons";
import { useCredibilityFacts, useOffices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

/**
 * Company credibility: verifiable presence and honest posture. No fabricated
 * numbers, awards or client logos.
 */
export function CredibilitySection() {
  const t = useT();
  const facts = useCredibilityFacts();
  const offices = useOffices();

  return (
    <section className="bg-navy-50/60 py-20 sm:py-28" aria-labelledby="credibility-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                id="credibility-heading"
                label={t("credibility.label")}
                title={t("credibility.title")}
                description={t("credibility.description")}
              />
            </Reveal>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {facts.map((fact, index) => (
                <Reveal as="li" key={fact.title} delay={index * 60}>
                  <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-6">
                    <h3 className="font-display text-base font-semibold tracking-tight text-navy-900">
                      {fact.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{fact.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={120}>
            <div className="space-y-4">
              {offices.map((office) => (
                <div
                  key={office.id}
                  className="flex items-start gap-4 rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-7"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-teal-300">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight text-navy-900">
                      {office.title}
                    </p>
                    <p className="text-sm font-medium text-teal-700">{office.area}</p>
                    <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                      {office.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}