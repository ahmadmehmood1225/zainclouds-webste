"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { useStats } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import type { StatItem } from "@/data/stats";

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

/**
 * Big editorial figures with a scroll-linked count-up and a gentle parallax on
 * the whole band. The grid drifts at a different speed to the page so the
 * numbers feel anchored while the scroll passes through.
 */
export function StatsSection() {
  const t = useT();
  const stats = useStats();
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { yPercent: 7 },
        {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-navy-900/10 bg-white py-20 sm:py-28"
      aria-labelledby="stats-heading"
    >
      <Container className="relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-widest text-teal-700 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-teal-600" />
              {t("stats.label")}
            </span>
            <h2
              id="stats-heading"
              className="font-display text-4xl font-bold tracking-tight text-balance text-navy-900 sm:text-5xl"
            >
              <TextReveal text={t("stats.title")} />
            </h2>
          </div>
          <p className="max-w-sm shrink-0 text-base leading-relaxed text-navy-900/60">
            {t("stats.body")}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-navy-900/10 md:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="num bg-white px-8 py-10">
              <p
                className="font-display text-6xl leading-none font-semibold tracking-tight text-navy-900 sm:text-7xl"
                title={stat.placeholder ? t("stats.draftFigure") : undefined}
              >
                <StatNumber stat={stat} />
                {stat.suffix ? <span className="text-teal-600">{stat.suffix}</span> : null}
              </p>
              <h3 className="mt-4 text-sm font-semibold tracking-wide text-navy-900">
                {stat.label}
              </h3>
              {stat.detail ? (
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/55">
                  {stat.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatNumber({ stat }: { stat: StatItem }) {
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const counter = { current: 0 };
    const tween = gsap.fromTo(
      counter,
      { current: 0 },
      {
        current: stat.value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = formatNumber(counter.current);
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stat.value]);

  return (
    <span ref={valueRef} aria-label={`${formatNumber(stat.value)}${stat.suffix ?? ""}`}>
      {formatNumber(stat.value)}
    </span>
  );
}