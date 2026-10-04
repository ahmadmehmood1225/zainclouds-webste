"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easing } from "@/lib/animations/easing";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { useProcessSteps } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import { cn } from "@/lib/cn";

/**
 * Scroll-driven process narrative: the connecting track draws as the section
 * scrolls and each step activates in sequence as the line reaches it.
 */
export function ProcessSection() {
  const t = useT();
  const steps = useProcessSteps();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const list = trackRef.current;
    const section = sectionRef.current;
    if (!list || !section) return;

    if (prefersReducedMotion()) {
      gsap.set("[data-process-fill]", { scaleY: 1 });
      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step) => {
        step.classList.add("is-active");
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-process-fill]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: easing.none,
          scrollTrigger: {
            trigger: list,
            start: "top 72%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          onEnter: () => step.classList.add("is-active"),
          onLeaveBack: () => step.classList.remove("is-active"),
        });
      });
    }, section);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-20 sm:py-28"
      aria-labelledby="process-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(28,131,119,0.14),transparent_65%)]"
      />
      <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            dark
            id="process-heading"
            label={t("process.label")}
            title={t("process.title")}
            description={t("process.description")}
          />
          <p className="mt-8 hidden text-sm font-medium tracking-widest text-white/40 uppercase lg:block">
            {t("process.hint")}
          </p>
        </div>

        <ol ref={trackRef} className="relative mt-2 lg:mt-0" aria-label={t("process.label")}>
          <span
            aria-hidden="true"
            className="absolute inset-y-2 start-[5px] w-px bg-white/10"
          />
          <span
            data-process-fill
            aria-hidden="true"
            className="absolute inset-y-2 start-[5px] w-px origin-top scale-y-0 bg-teal-400"
          />
          {steps.map((step) => (
            <li
              key={step.number}
              data-process-step
              className={cn(
                "relative border-t border-white/10 pb-14 pt-8 ps-14 transition-[border-color,transform] duration-500 sm:ps-20",
                "last:pb-2 [.is-active_&]:border-teal-400/40",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute start-0 top-10 h-2.5 w-2.5 rounded-full border border-white/20 bg-navy-800 transition-all duration-500 [.is-active_&]:border-teal-300 [.is-active_&]:bg-teal-400"
              />
              <span
                aria-hidden="true"
                className="font-display text-sm font-semibold tracking-widest text-white/35 transition-colors duration-500 [.is-active_&]:text-teal-300"
              >
                {step.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-navy-100 transition-colors duration-500 [.is-active_&]:text-white sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-200/60 transition-colors duration-500 [.is-active_&]:text-white/85 sm:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
