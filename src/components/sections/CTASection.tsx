"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { useT } from "@/lib/use-copy";

export function CTASection() {
  const t = useT();

  return (
    <section
      className="relative overflow-hidden border-y border-navy-900/10 bg-teal-50 py-20 sm:py-24"
      aria-labelledby="cta-heading"
    >
      <Container className="relative">
        <Reveal variant="clip" duration={1}>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2
                id="cta-heading"
                className="font-display text-4xl font-bold tracking-tight text-balance text-navy-900 sm:text-5xl"
              >
                {t("cta.title")}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-900/70 sm:text-lg">
                {t("cta.body")}
              </p>
            </div>
            <Button href="/contact" variant="dark" size="lg" className="shrink-0">
              {t("cta.button")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}