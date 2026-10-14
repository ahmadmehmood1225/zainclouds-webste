"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale, useT } from "@/lib/use-copy";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** Horizontal gap between cards, in px. Kept here because the carousel math needs it. */
const GAP = 24;

/**
 * The people behind the work.
 *
 * Portraits are phone shaped, so a card reads the way a team member is actually
 * seen on a handset. The row is full bleed and moved with the arrow controls
 * rather than the page scrollbar, so a growing roster never turns into a very
 * tall grid.
 *
 * Names and titles are supplied by the company. Keep the spelling exactly as it
 * is written here, and keep every image inside `public/images/team`.
 */
const team = [
  {
    name: "Zain Ul Abideen",
    role: "Chief Executive Officer",
    image: "/images/team/zain-ul-abideen-zain-clouds.jpeg",
  },
  {
    name: "Wajahat Ali",
    role: "Chief Technical Officer",
    image: "/images/team/wajahat-ali-zain-clouds.png",
  },
  {
    name: "Makki Ijaz",
    role: "Chief Operating Officer",
    image: "/images/team/makki-ijaz-zain-clouds.png",
  },
  {
    name: "Hafiz Umer",
    role: "Backend Engineer",
    image: "/images/team/hafiz-umar-zainclouds.JPG",
  },
  {
    name: "Muhammad Hassan",
    role: "Mobile Application Developer",
    image: "/images/team/muhammad-hassan-zain-clouds.jpeg",
  },
  {
    name: "Ahmad Mehmood",
    role: "Senior Software Engineer",
    image: "/images/team/ahmad-mehmood-zain-clouds.png",
  },
  {
    name: "Waleed Ejaz",
    role: "Mobile Application Developer",
    image: "/images/team/waleed-ejaz-zain-clouds.png",
  },
  {
    name: "Shahzaib Aslam",
    role: "UI/UX Designer",
    image: "/images/team/shahzaib-aslam-zain-clouds.jpeg",
  },
];

export function TeamSection() {
  const t = useT();
  const { isRTL } = useLocale();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState({ step: 0, maxTranslate: 0, maxIndex: 0 });

  /**
   * Measure the card step and how far the row can travel. Everything is read from
   * the live DOM, so a resize or a late loading image can never leave the arrows
   * pointing past the end of the row.
   */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const style = window.getComputedStyle(viewport);
    const padStart = parseFloat(style.paddingInlineStart || style.paddingLeft) || 0;
    const padEnd = parseFloat(style.paddingInlineEnd || style.paddingRight) || 0;
    const first = track.firstElementChild as HTMLElement | null;
    const cardWidth = first ? first.getBoundingClientRect().width : 0;
    const step = cardWidth + GAP;
    const visible = Math.max(0, viewport.clientWidth - padStart - padEnd);
    const maxTranslate = Math.max(0, track.scrollWidth - visible);
    // Cards are sized in fractions of the row, so the travel is a whole number of
    // steps; round rather than ceil so a sub-pixel remainder cannot add an empty step.
    const maxIndex = step > 0 ? Math.round(maxTranslate / step) : 0;

    setMetrics({ step, maxTranslate, maxIndex });
    setIndex((current) => Math.min(current, maxIndex));
  }, []);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Snap to the end exactly, so the last card always lands flush with the edge.
  const offset = index >= metrics.maxIndex ? metrics.maxTranslate : index * metrics.step;
  // In an RTL row the cards hang off the other edge, so the row travels the other way.
  const translate = (isRTL ? 1 : -1) * offset;
  const atStart = index <= 0;
  const atEnd = index >= metrics.maxIndex;

  return (
    <section className="w-full overflow-hidden bg-white" aria-labelledby="team-heading">
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 md:pt-24 lg:px-8">
        <Reveal>
          <SectionHeading
            id="team-heading"
            label={t("leadership.label")}
            title={t("leadership.title")}
            description={t("leadership.description")}
          />
        </Reveal>
      </div>

      <Reveal className="mt-12 sm:mt-16" delay={80}>
        <div ref={viewportRef} className="overflow-hidden px-4 sm:px-6 lg:px-8">
          <ul
            ref={trackRef}
            className="flex gap-6 will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translate3d(${translate}px, 0, 0)` }}
          >
            {team.map((member) => (
              <li
                key={member.name}
                className="group relative aspect-[9/16] w-[calc((100%_-_1.5rem)/2)] shrink-0 overflow-hidden rounded-2xl bg-ink-100 transition-transform duration-300 motion-safe:hover:-translate-y-1 sm:w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_6rem)/5)]"
              >
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} of Zain Clouds`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                />
                <div className="absolute bottom-4 start-4 end-4 rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-white/80">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mx-auto mt-8 flex w-full max-w-7xl items-center justify-end gap-3 px-4 sm:px-6 md:mt-10 lg:px-8">
        <button
          type="button"
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          disabled={atStart}
          aria-label={t("leadership.previous")}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 text-ink-900",
            "transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600 hover:text-white",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((current) => Math.min(metrics.maxIndex, current + 1))}
          disabled={atEnd}
          aria-label={t("leadership.next")}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 text-ink-900",
            "transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600 hover:text-white",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ArrowRight className="h-5 w-5 rtl:rotate-180" />
        </button>
      </div>
    </section>
  );
}
