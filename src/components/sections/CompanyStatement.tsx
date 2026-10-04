"use client";

import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowRight } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { useOffices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

/**
 * Strong company statement: the single most important thing the business does,
 * written as a large editorial statement rather than a tagline.
 */
export function CompanyStatement() {
  const t = useT();
  const offices = useOffices();

  return (
    <section
      className="relative overflow-hidden border-y border-white/5 bg-navy-950 py-24 text-white sm:py-36"
      aria-labelledby="statement-heading"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-25" />
      <Container className="relative">
        <span className="mb-6 inline-flex items-center gap-2 text-sm font-medium tracking-widest text-green-300 uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {t("statement.label")}
        </span>
        <h2
          id="statement-heading"
          className="max-w-5xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <TextReveal text={t("statement.title")} />
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-2xl text-base leading-relaxed text-navy-100/75 sm:text-lg">
            {t("statement.body")}
          </p>
          <Button href="/services" variant="outline-light" size="lg" className="shrink-0">
            {t("ui.exploreServices")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Button>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8 text-sm text-white/60">
          {offices.map((office) => (
            <li key={office.id} className="inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden="true" />
              {office.area}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
