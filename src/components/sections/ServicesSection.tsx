"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, Grid, iconMap, type IconName } from "@/components/ui/icons";
import { useServices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import { cn } from "@/lib/cn";

/**
 * The six services, as an index.
 *
 * The practices accordion above explains how we work. This list below is the actual
 * catalogue, one row per service, each one linking to its own page. A flat list reads
 * faster than a grid of cards when every row is a real destination, and it keeps the
 * detail pages one click away instead of hidden behind a card that says "explore".
 *
 * Rows are links, not buttons: a reader can middle click, copy the address or open the
 * page in a new tab, which a scripted handler would take away.
 */
export function ServicesSection() {
  const t = useT();
  const services = useServices();

  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            label={t("services.label")}
            title={t("services.title")}
            description={t("services.description")}
          />
        </Reveal>

        <ul className="mt-12 border-t border-ink-900/10 sm:mt-16">
          {services.map((service, index) => {
            const Icon = iconMap[service.slug as IconName] ?? Grid;
            return (
              <Reveal key={service.slug} delay={Math.min(index, 4) * 60} distance={16} duration={0.55}>
                <li className="border-b border-ink-900/10">
                  <Link
                    href={service.path}
                    className="group flex items-center gap-5 py-6 transition-colors duration-300 hover:bg-white/70 sm:gap-8 sm:py-7"
                  >
                    <span className="num w-6 shrink-0 font-display text-xs font-semibold tracking-[0.2em] text-ink-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-900/12 text-ink-700 transition-colors duration-300",
                        "group-hover:border-brand-400 group-hover:text-brand-700",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold tracking-tight text-ink-900 sm:text-2xl">
                        {service.name}
                      </span>
                      <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-ink-900/60">
                        {service.tagline}
                      </span>
                    </span>

                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-ink-400 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600 rtl:rotate-90"
                    />
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
