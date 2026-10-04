"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";

type StickyStoryProps = {
  children: ReactNode;
  /** the layer that stays put while the other column scrolls */
  sticky: ReactNode;
  className?: string;
  stickyClassName?: string;
  /** how long the sticky column stays pinned, in viewport heights */
  hold?: number;
  /** gentle scale applied to the pinned media across its hold */
  scaleTo?: number;
  reverse?: boolean;
};

/**
 * A sticky image panel beside scrolling copy.
 *
 * This is deliberately CSS `position: sticky` rather than a GSAP pin. A GSAP pin
 * inserts its own spacer element and moves the pinned node into it, which takes that
 * node away from React: when the route changes and React removes the node from the
 * parent it still believes owns it, the browser throws
 * `NotFoundError: Failed to execute 'removeChild' on 'Node'`. Sticky composes with
 * native scrolling, needs no DOM surgery, costs nothing to set up, and cannot
 * desynchronise from React at all.
 *
 * The pinned media also drifts a few percent in scale while it holds, which gives the
 * hold a sense of duration without moving the surrounding layout.
 */
export function StickyStory({
  children,
  sticky,
  className,
  stickyClassName,
  hold = 1.6,
  scaleTo = 1.04,
  reverse = false,
}: StickyStoryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { scale: 1 },
        {
          scale: scaleTo,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * hold)}`,
            scrub: 0.8,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [hold, scaleTo]);

  return (
    <div ref={rootRef} className={cn("grid gap-10 lg:grid-cols-2 lg:gap-16", className)}>
      <div
        className={cn(
          "relative order-2 lg:order-none",
          stickyClassName ?? "lg:sticky lg:top-28 lg:h-fit",
        )}
      >
        <div ref={mediaRef} className="relative overflow-hidden rounded-2xl will-change-transform">
          {sticky}
        </div>
      </div>
      <div className={cn("order-1 lg:order-none", reverse && "lg:col-start-1")}>{children}</div>
    </div>
  );
}
