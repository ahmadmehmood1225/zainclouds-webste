"use client";

import { useT } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/icons";

type BenefitsSectionProps = {
  title: string;
  description?: string;
  benefits: string[];
  light?: boolean;
};

export function BenefitsSection({ title, description, benefits, light }: BenefitsSectionProps) {
  const t = useT();

  return (
    <section
      className={light ? "bg-navy-950 py-20 sm:py-28" : "bg-white py-20 sm:py-28"}
      aria-labelledby="benefits-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            dark={light}
            id="benefits-heading"
            label={t("benefits.label")}
            title={title}
            description={description}
          />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit} delay={index * 60}>
              <div
                className={`flex h-full items-start gap-4 rounded-2xl border p-6 ${
                  light
                    ? "border-white/10 bg-white/5"
                    : "border-navy-900/10 bg-navy-50/50"
                }`}
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-navy-950">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className={`text-base leading-relaxed ${light ? "text-navy-100/85" : "text-navy-900/80"}`}>
                  {benefit}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}