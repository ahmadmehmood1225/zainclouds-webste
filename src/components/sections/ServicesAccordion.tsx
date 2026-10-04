"use client";

import { useCallback, useId, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { iconMap, ArrowUpRight, Check, Plus } from "@/components/ui/icons";
import type { Practice } from "@/data/practices";
import { usePractices, useServices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import { cn } from "@/lib/cn";

/**
 * Services, as a list that opens.
 *
 * Interaction rules, chosen so the list feels deliberate rather than busy:
 *
 * - Opening a row animates its height with the `0fr -> 1fr` grid technique, which
 *   needs no measurement, no per frame JavaScript and no inline style written to the
 *   DOM. The content inside simply fades and rises as the box opens.
 * - Exactly one row is open at a time on pointer devices, because a list of five open
 *   rows stops being a list.
 * - Hovering a row previews it. On touch there is no hover, so the row is only ever
 *   changed by an explicit tap, which is the accessible path.
 * - The plus glyph is one element that rotates 180 degrees and whose two arms cross
 *   into a minus, so the open and closed states share a single transition.
 * - Nothing here reads or writes a DOM node outside its own ref, and no row is
 *   unmounted when the selection moves, only restyled. That is what keeps opening and
 *   closing rows from ever producing a React removal error.
 */
export function ServicesAccordion() {
  const t = useT();
  const services = useServices();
  const allPractices = usePractices();
  const uid = useId().replace(/:/g, "");
  const [openSlug, setOpenSlug] = useState<string>(allPractices[0]?.slug ?? "");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const toggle = useCallback((slug: string) => {
    // Opening the open row again leaves it open rather than closing it. A list that
    // can be fully collapsed loses its own reference point, and the close control is
    // already available in the panel.
    setOpenSlug((current) => (current === slug ? current : slug));
  }, []);

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="practices-heading">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <SectionHeading
              id="practices-heading"
              label={t("practices.label")}
              title={t("practices.title")}
              description={t("practices.description")}
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-ink-900/60">
              {t("practices.hint")}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 border-t border-ink-900/10 sm:mt-16">
          {allPractices.map((practice) => (
            <PracticeRow
              key={practice.slug}
              practice={practice}
              uid={uid}
              isOpen={openSlug === practice.slug}
              isPreviewed={hoveredSlug === practice.slug}
              services={services}
              onOpen={() => toggle(practice.slug)}
              onPreview={setHoveredSlug}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}

type PracticeRowProps = {
  practice: Practice;
  uid: string;
  isOpen: boolean;
  isPreviewed: boolean;
  services: ReturnType<typeof useServices>;
  onOpen: () => void;
  onPreview: (slug: string | null) => void;
};

function PracticeRow({
  practice,
  uid,
  isOpen,
  isPreviewed,
  services,
  onOpen,
  onPreview,
}: PracticeRowProps) {
  const t = useT();
  const panelId = `${uid}-practice-panel-${practice.slug}`;
  const buttonId = `${uid}-practice-button-${practice.slug}`;
  const Icon = iconMap[practice.icon];
  // The row reads as active when it is open, and lifts subtly when it is only
  // previewed, so a mouse move across the list is legible without opening anything.
  const emphasised = isOpen || isPreviewed;
  const related = practice.related
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .slice(0, 3);

  return (
    <li className="border-b border-ink-900/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onOpen}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") onPreview(practice.slug);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") onPreview(null);
          }}
          onFocus={() => onPreview(practice.slug)}
          className={cn(
            "group flex w-full items-center gap-4 py-6 text-start transition-colors duration-300 sm:gap-8 sm:py-8",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500",
          )}
        >
          <span
            className={cn(
              "num font-display text-xs font-semibold tracking-[0.2em] transition-colors duration-300 sm:text-sm",
              emphasised ? "text-brand-600" : "text-ink-400",
            )}
          >
            {practice.number}
          </span>

          <span
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-400 sm:h-13 sm:w-13",
              isOpen
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-ink-900/12 text-ink-700 group-hover:border-brand-400 group-hover:text-brand-700",
            )}
          >
            <Icon className="h-5 w-5" />
          </span>

          <span className="min-w-0 flex-1">
            <span
              className={cn(
                "block font-display text-xl font-semibold tracking-tight transition-[color,transform] duration-300 sm:text-3xl lg:text-4xl",
                isOpen
                  ? "text-ink-900"
                  : "text-ink-900/55 group-hover:translate-x-1 group-hover:text-ink-900",
              )}
            >
              {practice.title}
            </span>
            <span
              className={cn(
                "mt-1.5 block text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300",
                isOpen ? "text-brand-600" : "text-ink-400",
              )}
            >
              {practice.category}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={cn(
              "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:h-12 sm:w-12",
              isOpen
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-900/12 text-ink-700 group-hover:border-ink-900/40",
            )}
          >
            <Plus
              className={cn(
                "h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen && "rotate-135",
              )}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "grid gap-8 pb-10 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:pb-12 lg:grid-cols-[1.35fr_1fr] lg:gap-14",
              "ps-[3.25rem] sm:ps-[4.5rem] lg:ps-[5.5rem]",
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
              "motion-reduce:translate-y-0",
            )}
          >
            <div>
              <p className="max-w-2xl text-base leading-relaxed text-ink-900/80 sm:text-lg">
                {practice.summary}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-900/60 sm:text-base">
                {practice.detail}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="inline-flex items-baseline gap-2">
                  <span className="num font-display text-2xl font-semibold text-ink-900">
                    {practice.metric.value}
                  </span>
                  <span className="text-xs font-medium tracking-wide text-ink-500">
                    {practice.metric.label}
                  </span>
                </span>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
                  {t("practices.capabilities")}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {practice.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-3">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-600" />
                      <span className="text-sm leading-snug text-ink-900/75">
                        {capability}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
                  {t("practices.outcomes")}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {practice.outcomes.map((outcome) => (
                    <li key={outcome} className="text-sm leading-snug text-ink-900/75">
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 ? (
                <div className="sm:col-span-2 lg:col-span-1">
                  <p className="text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
                    {t("practices.related")}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {related.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={service.path}
                          className="group inline-flex items-center gap-1.5 rounded-full border border-ink-900/12 px-3.5 py-1.5 text-xs font-medium text-ink-700 transition-colors duration-300 hover:border-brand-500 hover:text-brand-700"
                        >
                          {service.name}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
