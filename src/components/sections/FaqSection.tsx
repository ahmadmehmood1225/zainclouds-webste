"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ArrowRight } from "@/components/ui/icons";
import { gsap } from "@/lib/animations/gsap";
import { prefersFinePointer, prefersReducedMotion } from "@/lib/animations/motion";
import { useHomeFaqs } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import type { Faq } from "@/data/faqs";

type FaqSectionProps = {
  /** Service pages pass their own questions; the homepage uses the regional set. */
  items?: Faq[];
  serviceName?: string;
};

/**
 * Homepage FAQ.
 *
 * The answers are the ones prospects actually ask on the first call, so the
 * section carries weight instead of filler. The heading column stays put while
 * the answers are read, and a hairline marks how far through the list you are.
 * The structured data for this section is emitted by the page, in the default
 * region, because the region itself is a local preference and not a URL.
 */
export function FaqSection({ items, serviceName }: FaqSectionProps = {}) {
  const t = useT();
  const homeFaqs = useHomeFaqs();
  const faqs = items ?? homeFaqs;
  const listRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const rail = railRef.current;
    if (!list || !rail) return;
    if (prefersReducedMotion() || !prefersFinePointer()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate overflow-hidden bg-ink-50 py-20 sm:py-28"
    >
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Parallax strength={4}>
                <Reveal>
                  <SectionHeading
                    id="faq-heading"
                    label={t(serviceName ? "faq.serviceLabel" : "faq.label")}
                    title={
                      serviceName
                        ? t("faq.serviceTitle", { service: serviceName })
                        : t("faq.title")
                    }
                    description={
                      serviceName ? t("faq.serviceDescription") : t("faq.description")
                    }
                  />
                </Reveal>
              </Parallax>

              <Reveal delay={140} className="mt-8">
                <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                    {t("faq.moreTitle")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/65">
                    {t("faq.moreBody")}
                  </p>
                  <Link
                    href="/contact"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
                  >
                    {t("faq.moreButton")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 rtl:rotate-180 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <div ref={listRef} className="relative lg:col-span-8">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-0 hidden w-px bg-ink-900/10 lg:block"
            />
            <span
              ref={railRef}
              aria-hidden="true"
              className="absolute inset-y-0 start-0 hidden w-px origin-top bg-brand-500/70 lg:block"
            />
            {faqs.length > 0 ? (
              <Reveal delay={100} className="lg:ps-8">
                <Accordion items={faqs.map((item) => ({ ...item }))} />
              </Reveal>
            ) : (
              <p className="lg:ps-8 text-sm text-ink-900/60">{t("faq.empty")}</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
