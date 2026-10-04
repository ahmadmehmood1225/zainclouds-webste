"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { useServices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import type { ServiceAccent } from "@/data/services";
import { cn } from "@/lib/cn";

const blueAccent = {
  bar: "bg-brand-200",
  chip: "bg-white/10 text-white ring-1 ring-white/20",
  text: "text-brand-700",
  tick: "text-brand-200",
  rule: "border-brand-200",
  glow: "rgba(143,179,255,0.2)",
};

const accentMeta: Record<ServiceAccent, typeof blueAccent> = {
  green: blueAccent,
  pink: blueAccent,
  yellow: blueAccent,
  navy: blueAccent,
};

/**
 * Service showcase on a white surface, with the selected system presented on blue.
 *
 * Selecting a service swaps the contents of one panel rather than loading a
 * scene per service: what the system includes, what it connects to, and the
 * route to the full page. It reads as a product sheet, stays fast, and keeps
 * every word on the page real.
 */
export function ServiceShowcase() {
  const t = useT();
  const services = useServices();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex] ?? services[0];
  const accent = accentMeta[active.accent];

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span
              className={cn(
                "mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase",
                accent.text,
              )}
            >
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {t("showcase.label")}
            </span>
            <h2
              id="services-heading"
              className="text-4xl font-bold tracking-tight text-balance text-navy-900 sm:text-5xl lg:text-6xl"
            >
              <TextReveal text={t("showcase.title")} />
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-700 sm:text-lg">
              {t("showcase.body")}
            </p>
          </div>
          <p className="hidden shrink-0 text-sm font-medium text-navy-500 lg:block">
            {t("showcase.hint")}
          </p>
        </div>

        <div className="mt-12 items-start gap-10 lg:mt-16 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <div role="list" className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {services.map((service, index) => (
              <div key={service.slug} role="listitem" className="group relative">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-pressed={index === activeIndex}
                  className={cn(
                    "group relative flex w-full items-center gap-5 py-6 pe-16 ps-7 text-start transition-colors duration-300 sm:gap-7 sm:ps-8",
                    index === activeIndex
                      ? "bg-brand-500 text-white"
                      : "text-navy-900 hover:bg-brand-50",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-sm font-semibold leading-none transition-colors duration-300",
                      index === activeIndex
                        ? "text-white/75"
                        : "text-navy-500 group-hover:text-brand-700",
                    )}
                  >
                    {service.number}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-display text-xl tracking-tight transition-all duration-300 sm:text-2xl",
                        index === activeIndex
                          ? "translate-x-1 text-white"
                          : "text-navy-800 group-hover:translate-x-1 group-hover:text-brand-700",
                      )}
                    >
                      {service.name}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-xs font-medium tracking-widest uppercase transition-colors duration-300",
                        index === activeIndex ? "text-white/75" : "text-navy-500",
                      )}
                    >
                      {service.category}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute start-2 top-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-300 sm:start-3",
                      accent.bar,
                      index === activeIndex && "scale-y-100",
                    )}
                  />
                </button>
                <Link
                  href={service.path}
                  aria-label={t("ui.viewDetails", { name: service.name })}
                  className="absolute end-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-none border border-navy-900/15 text-navy-800 transition-[background-color,border-color,color,transform] duration-300 group-hover:-translate-x-0.5 group-hover:border-brand-500 group-hover:bg-white group-hover:text-black hover:-translate-x-0.5 hover:border-brand-500 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>

          <div
            data-cursor="explore"
            className="relative mt-10 flex min-h-[30rem] flex-col overflow-hidden rounded-2xl bg-brand-700 p-6 text-white ring-1 ring-brand-800 sm:p-8 lg:sticky lg:top-28 lg:mt-0 lg:min-h-[34rem]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 78% 12%, ${accent.glow} 0%, transparent 58%)`,
              }}
            />
            <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-15" />

            <div className="relative flex flex-1 flex-col">
              <span
                className={cn(
                  "inline-flex self-start rounded-full px-3 py-1 text-xs font-medium tracking-wide",
                  accent.chip,
                )}
              >
                {active.number} · {active.category}
              </span>

              <div className={cn("mt-5 border-s-2 ps-4", accent.rule)}>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {active.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
                  {active.tagline}
                </p>
              </div>

              <div className="mt-7">
                <p className="text-[11px] font-semibold tracking-widest text-navy-200/60 uppercase">
                  {t("showcase.builtIn")}
                </p>
                <ul className="mt-3 space-y-2">
                  {active.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", accent.tick)} />
                      <span className="text-[13px] leading-snug text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-7">
                <p className="text-[11px] font-semibold tracking-widest text-navy-200/60 uppercase">
                  {t("showcase.connectsWith")}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {active.integrations.slice(0, 4).map((integration) => (
                    <li
                      key={integration}
                      className="rounded-full border border-white/12 px-3 py-1 text-[11px] text-navy-100/80"
                    >
                      {integration}
                    </li>
                  ))}
                </ul>
                <Link
                  href={active.path}
                  className="group mt-6 inline-flex items-center gap-2 bg-transparent px-3 py-2 text-sm font-medium text-green-300 transition-[background-color,color] duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t("ui.viewService")}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-400/15 transition-[background-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-black/5 group-hover:text-black rtl:rotate-90 motion-reduce:transition-none"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
