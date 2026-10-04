"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/lib/use-copy";
import {
  Users,
  Code,
  Layers,
  Headset,
  Globe,
  type IconName,
} from "@/components/ui/icons";

/** Icon per card is structural; the wording comes from the copy layer. */
const reasonIcons: IconName[] = [
  "crm",
  "custom-software",
  "erp",
  "grid",
  "distribution",
];

const iconComponents: Record<string, typeof Users> = {
  crm: Users,
  "custom-software": Code,
  erp: Layers,
  grid: Headset,
  distribution: Globe,
};

export function WhyZainClouds() {
  const { t, list } = useLocale();
  const titles = list("why.titles");
  const bodies = list("why.bodies");

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="why-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="why-heading"
            label={t("why.label")}
            title={t("why.title")}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {reasonIcons.map((icon, index) => {
            const Icon = iconComponents[icon];
            const title = titles[index];
            if (!Icon) return null;
            return (
              <Reveal key={title} delay={index * 60} variant="scale">
                <div className="group h-full rounded-2xl border border-navy-900/10 bg-navy-50/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-teal-50 sm:p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-teal-300 transition-colors duration-300 group-hover:bg-teal-600 group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-navy-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                    {bodies[index]}
                  </p>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={300}>
            <a
              href="/about"
              className="group flex h-full flex-col justify-end rounded-2xl bg-navy-900 p-7 text-white transition-all duration-300 hover:-translate-y-1 sm:p-8"
            >
              <span className="font-display text-2xl font-semibold tracking-tight">
                {t("why.ctaTitle")}
              </span>
              <span className="mt-3 text-sm text-navy-200/70">
                {t("why.ctaBody")}
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal-300">
                {t("why.ctaLink")}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}