"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TextReveal } from "@/components/motion/TextReveal";
import { Stagger } from "@/components/motion/Reveal";
import { useProjects } from "@/lib/use-content";
import { useLocale, useT } from "@/lib/use-copy";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { prefersFinePointer, prefersReducedMotion } from "@/lib/animations/motion";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** Trailing gap inside the track, in px, so the last panel clears the right edge. */
const TRACK_GUTTER = 80;

/**
 * Selected work.
 *
 * On a wide viewport the cards are laid out in one editorial row, and reading it is
 * a horizontal journey driven by the real scrollbar. The mechanics matter:
 *
 * - The row is held in place with CSS `position: sticky`, not a GSAP pin. A pin
 *   reparented the node into a generated spacer, which broke React's ownership of it
 *   and made the next route change throw
 *   `NotFoundError: Failed to execute 'removeChild' on 'Node'`.
 * - A sticky element only has travel if its **section is taller than the sticky
 *   element**. This section therefore has its height set to
 *   `100vh + horizontal travel`, which is the space the reader scrolls through while
 *   the row walks sideways. Without that extra height the section is exactly one
 *   viewport tall, the sticky child never sticks, the whole block scrolls off screen,
 *   and the horizontal tween finishes on an invisible section.
 * - The tween is anchored `start: "top top"` to `end: "bottom bottom"`, so it begins
 *   the moment the section reaches the top and releases exactly when the section's
 *   bottom reaches the viewport bottom. The vertical scroll range and the horizontal
 *   travel are therefore the same range, which is what makes it feel connected.
 * - Travel is a function value re-read on refresh, and a `ResizeObserver` on the track
 *   catches late loading images. Sizing the section and the tween from one measurement
 *   is what stops the row from stopping short of its last panel.
 *
 * Every other viewport gets the plain grid, which is the primary reading mode.
 */
export function PortfolioSection() {
  const { t, isRTL } = useLocale();
  const projects = useProjects();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [desktop, setDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setDesktop(mq.matches && prefersFinePointer() && !prefersReducedMotion());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let lastIndex = -1;
    let frame = 0;

    /** Horizontal travel needed to bring the last panel to the right edge. */
    const getTravel = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + TRACK_GUTTER);

    /**
     * The section has to be one viewport taller than the sticky child by exactly the
     * travel, so the reader scrolls that much while the row travels that much.
     * The style is set imperatively because React does not own it, and it is always
     * removed again on cleanup.
     */
    const sizeSection = () => {
      section.style.height = `${window.innerHeight + getTravel()}px`;
      return getTravel();
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        // In an RTL track the panels already hang off the left edge, so the row has to
        // be walked in the opposite direction to bring each one into view.
        x: () => (isRTL ? getTravel() : -getTravel()),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
          // Re-size before every measurement, so a resize or a late loading image can
          // never leave the section shorter than the row needs.
          onRefresh: sizeSection,
          onRefreshInit: sizeSection,
          onUpdate: (self) => {
            const count = projects.length;
            if (count === 0) return;
            const index = Math.min(
              count - 1,
              Math.max(0, Math.round(self.progress * (count - 1))),
            );
            if (index === lastIndex) return;
            lastIndex = index;
            setActiveIndex(index);
          },
        },
      });
    }, section);

    // Images settle after first paint and change `scrollWidth`, which is what decides
    // the section height. Observe the track rather than guessing with the window.
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(track);

    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      // Only clear the height when leaving the horizontal mode, otherwise every
      // resize would collapse the section and fight the tween.
      section.style.height = "";
      ctx.revert();
    };
  }, [desktop, projects.length, isRTL]);

  if (desktop) {
    return (
      <section
        ref={sectionRef}
        className="relative bg-brand-700 text-white"
        aria-labelledby="portfolio-heading"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-24">
          <Container className="flex flex-1 flex-col justify-between">
            <div className="flex items-end justify-between gap-8">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-widest text-brand-300 uppercase">
                  <span aria-hidden="true" className="h-px w-8 bg-current" />
                  {t("portfolio.label")}
                </span>
                <h2
                  id="portfolio-heading"
                  className="font-display max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl"
                >
                  <TextReveal text={t("portfolio.title")} />
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="border-b border-white/20 pb-1 text-xs font-medium tracking-widest text-white/50 uppercase">
                  {t("portfolio.keepScrolling")}
                </span>
                <span className="num font-display text-lg font-semibold tracking-tight text-brand-300">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div
              ref={trackRef}
              className="mt-10 flex w-max items-stretch gap-6 will-change-transform"
            >
              {projects.map((project, index) => (
                <PortfolioPanel
                  key={project.slug}
                  project={project}
                  index={index}
                  active={index === activeIndex}
                />
              ))}
              <div
                className="flex h-[56vh] w-[min(400px,60vw)] shrink-0 flex-col justify-end rounded-2xl border border-white/10 p-8"
                style={{ marginInlineEnd: `${TRACK_GUTTER}px` }}
              >
                <span className="font-display text-2xl font-semibold text-white">
                  {t("portfolio.placeholderTitle")}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {t("portfolio.placeholderBody")}
                </p>
                <Button href="/services" variant="light" className="mt-7 max-w-fit">
                  {t("portfolio.viewServices")}
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="portfolio-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="portfolio-heading"
            label={t("portfolio.label")}
            title={t("portfolio.title")}
            description={t("portfolio.description")}
          />
          <Button href="/portfolio" variant="outline-dark" size="sm" className="shrink-0">
            {t("portfolio.viewPortfolio")}
          </Button>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.slug} data-stagger-item>
              <ProjectCard project={project} />
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function PortfolioPanel({
  project,
  index,
  active,
}: {
  project: ReturnType<typeof useProjects>[number];
  index: number;
  active: boolean;
}) {
  const t = useT();

  return (
    <article
      data-cursor="view"
      aria-current={active ? "true" : undefined}
      className={cn(
        "group relative h-[56vh] w-[min(620px,74vw)] shrink-0 overflow-hidden rounded-2xl bg-ink-900",
        "transition-[box-shadow,transform] duration-500 ease-out",
        active ? "shadow-2xl" : "opacity-70",
      )}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/20"
      />
      <span className="absolute start-6 top-6 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white">
        {project.category}
      </span>
      <span className="num absolute end-6 top-6 font-display text-sm font-semibold tracking-widest text-white/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {project.name}
        </h3>
        <div className="mt-4 flex items-end justify-between gap-4">
          <span className="text-sm text-white/60">
            {project.region}
            <span className="mx-2 text-white/25" aria-hidden="true">
              ·
            </span>
            {project.technologies[0]}
          </span>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors duration-300 hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("ui.visitLiveSite")}
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span className="sr-only">
                {` (${project.name} ${t("ui.opensInNewTab")})`}
              </span>
            </a>
          ) : (
            <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/65">
              {t("ui.caseStudyOnRequest")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
