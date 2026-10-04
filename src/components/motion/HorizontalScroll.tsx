"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { prefersFinePointer, prefersReducedMotion } from "@/lib/animations/motion";

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  minimumDesktopWidth?: number;
};

/**
 * Editorial horizontal sequence driven by vertical scroll.
 *
 * Desktop (fine pointer, no reduced motion): the viewport height row is held in
 * place with CSS `position: sticky` and the track is translated by a scrubbed
 * tween, so the sequence reads as horizontal travel driven by the real scrollbar.
 *
 * Sticky rather than a GSAP pin on purpose. A pin wraps the element in a generated
 * spacer and reparents it, which pulls the node out from under React and turns the
 * next route change into
 * `NotFoundError: Failed to execute 'removeChild' on 'Node'`. Sticky never touches
 * the DOM tree, so React and the scroll effect can never disagree.
 *
 * Everything else renders the same track as a native horizontal scroll-snap rail, so
 * the content stays reachable with touch, a trackpad and the keyboard.
 */
export function HorizontalScroll({
  children,
  className,
  trackClassName,
  minimumDesktopWidth = 1024,
}: HorizontalScrollProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minimumDesktopWidth}px)`);
    const update = () =>
      setDesktop(mq.matches && prefersFinePointer() && !prefersReducedMotion());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minimumDesktopWidth]);

  useEffect(() => {
    if (!desktop) return;
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + getDist(),
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [desktop]);

  if (desktop) {
    return (
      <section ref={rootRef} className={cn("relative bg-navy-950", className)}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            ref={trackRef}
            className={cn(
              "flex w-max items-stretch gap-8 will-change-transform",
              trackClassName,
            )}
          >
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:gap-6 sm:px-8 lg:px-10",
          trackClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
