"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import { easing } from "@/lib/animations/easing";
import { prefersFinePointer, prefersReducedMotion } from "@/lib/animations/motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { OperationsEcosystem } from "@/components/hero/OperationsEcosystem";
import { ArrowRight } from "@/components/ui/icons";
import { useLocale } from "@/lib/use-copy";
import { getHeroContent } from "@/data/hero";
import { regions } from "@/data/regions";
import { cn } from "@/lib/cn";

/**
 * Home hero.
 *
 * The headline, the supporting copy, the cities and the product visual all come
 * from the selected region, so KSA, MEA and PK each get the message and the
 * operating context that applies to them. The brand structure and the type
 * system stay identical across regions.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { region } = useLocale();
  const hero = getHeroContent(region);
  const regionName = regions.find((item) => item.id === region)?.name ?? "";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const runIntro = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: easing.steady } });

        tl.fromTo(
          "[data-hero-bg]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.9, ease: easing.inOut },
          0,
        )
          .fromTo(
            "[data-hero-eyebrow]",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            0.1,
          )
          .fromTo(
            "[data-hero-heading] [data-word]",
            { yPercent: 118, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.05,
              ease: easing.hero,
            },
            0.22,
          )
          .fromTo(
            "[data-hero-desc]",
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            0.62,
          )
          .fromTo(
            "[data-hero-cta]",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07 },
            0.74,
          )
          .fromTo(
            "[data-hero-metrics]",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            0.88,
          )
          .fromTo(
            "[data-hero-locations]",
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            0.98,
          );
      });

      return () => ctx.revert();
    };

    if (prefersReducedMotion()) return;

    // Runs on mount only, and only once per mount. Region switching swaps the
    // copy without replaying the entrance, which keeps a region change from
    // resetting the section the visitor is reading.
    const intro = runIntro();

    if (!prefersFinePointer()) return intro;

    const scroll = gsap.context(() => {
      gsap.to("[data-hero-copy]", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-console]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      intro?.();
      scroll.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-brand-700 pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      <div data-hero-bg aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div
          className={cn(
            "absolute inset-0",
            "bg-[radial-gradient(120%_85%_at_50%_-10%,rgba(255,255,255,0.18),transparent_60%)]",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-40",
            "bg-gradient-to-b from-transparent to-brand-700",
          )}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div data-hero-copy className="lg:col-span-5">
            <span
              data-hero-eyebrow
              className="inline-flex items-center gap-2.5 border-s border-teal-400/40 ps-4 text-xs font-semibold tracking-[0.18em] text-teal-200 uppercase"
            >
              {hero.eyebrow}
            </span>

            <h1
              data-hero-heading
              className="mt-6 font-display text-[2.75rem] leading-[1.08] font-bold tracking-tight text-balance text-white sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="block">
                  <span data-mask className="inline-block overflow-hidden align-bottom">
                    <span
                      data-word
                      className={cn(
                        "inline-block -mb-[0.16em] pb-[0.16em]",
                        index === hero.accentLine && "text-teal-300",
                      )}
                    >
                      {line}
                    </span>
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-hero-desc
              className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
            >
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton>
                <Link
                  data-hero-cta
                  href="/contact"
                  className="group inline-flex h-12 items-center justify-center gap-2 bg-brand-500 px-7 text-base font-medium tracking-tight text-white transition-colors duration-200 hover:bg-brand-600"
                >
                  {hero.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 rtl:rotate-180 group-hover:translate-x-0.5" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  data-hero-cta
                  href="/services"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-white/25 px-7 text-base font-medium tracking-tight text-white transition-colors duration-200 hover:border-white/55 hover:bg-white/5"
                >
                  {hero.secondaryCta}
                </Link>
              </MagneticButton>
            </div>

            <div data-hero-metrics className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
              {hero.locations.map((location) => (
                <span
                  key={location}
                  className="inline-flex items-center gap-2 text-sm text-white/65"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  {location}
                </span>
              ))}
            </div>

            <p
              data-hero-locations
              className="mt-4 max-w-md text-xs leading-relaxed text-navy-200/60"
            >
              {hero.marketNote}
              <span className="ms-2 text-navy-300/50">({regionName})</span>
            </p>
          </div>

          <div data-hero-console className="lg:col-span-7">
            <p className="sr-only">{hero.summary}</p>
            <OperationsEcosystem data={hero.ecosystem} />
            <p
              aria-hidden="true"
              className="mt-3 hidden text-[11px] tracking-wide text-navy-300/45 lg:block lg:text-end"
            >
              {hero.ecosystem.consoleLabel} · {hero.ecosystem.workspace}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
