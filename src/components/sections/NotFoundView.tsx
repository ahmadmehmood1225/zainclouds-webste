"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";
import { useT } from "@/lib/use-copy";

/** Localized 404 so the page reads correctly in every region. */
export function NotFoundView() {
  const t = useT();

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-950/70 to-navy-950"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-teal-600/10 blur-3xl"
      />
      <Container className="relative py-32">
        <div className="max-w-xl">
          <LogoMark className="h-14 w-14" />
          <p className="num mt-10 font-display text-6xl font-semibold tracking-tight text-teal-300 sm:text-7xl">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("system.notFoundTitle")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-navy-100/75 sm:text-lg">
            {t("system.notFoundBody")}
          </p>
          <div className="mt-9">
            <Button href="/" variant="primary" size="lg">
              {t("nav.backHome")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
