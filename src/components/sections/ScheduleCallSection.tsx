"use client";

import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Calendar, ArrowRight, Clock, Mail, ShieldCheck } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/use-copy";

const promiseIcons = [ShieldCheck, Clock, Calendar];

export function ScheduleCallSection() {
  const { t, list } = useLocale();
  const promises = useMemo(
    () => list("schedule.promises").map((label, index) => ({ label, Icon: promiseIcons[index] })),
    [list],
  );

  return (
    <section
      className="relative overflow-hidden border-y border-white/5 bg-navy-950 py-20 sm:py-28"
      aria-labelledby="schedule-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_0%,rgba(28,131,119,0.16),transparent_65%)]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-widest text-green-300 uppercase">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {t("schedule.eyebrow")}
          </span>
          <Reveal variant="clip" duration={1}>
            <h2
              id="schedule-heading"
              className="text-4xl font-bold tracking-tight text-balance text-white sm:text-6xl"
            >
              {t("schedule.title")}
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-200/70 sm:text-lg">
              {t("schedule.body")}
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {promises.map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-navy-100"
              >
                <Icon className="h-4 w-4 text-teal-300" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="primary" size="lg">
              {t("schedule.bookCall")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="outline-light" size="lg">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}