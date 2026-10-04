"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/use-copy";

const partners = ["Captain Chef", "Code Canyon", "Baba Foods"];

export function PartnershipsSection() {
  const t = useT();

  return (
    <section
      className="relative overflow-hidden bg-brand-500 py-20 text-white sm:py-28"
      aria-labelledby="partnerships-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 -top-48 h-[32rem] w-[32rem] rounded-full border border-white/10"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-3 text-sm font-medium tracking-widest text-white/75 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {t("partnerships.label")}
            <span aria-hidden="true" className="h-px w-8 bg-current" />
          </p>
          <h2
            id="partnerships-heading"
            className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t("partnerships.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t("partnerships.description")}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-0">
          {partners.map((partner, index) => (
            <li key={partner} className="min-w-0">
              <Reveal delay={index * 80} className="h-full">
                <div className="flex min-h-36 h-full items-center justify-center border border-white/20 px-6 py-8 text-center transition-colors duration-300 hover:bg-white/10 sm:border-y-0 sm:border-s-0 sm:border-e sm:first:border-s">
                  <span className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {partner}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
