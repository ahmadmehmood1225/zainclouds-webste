"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";

type ParallaxMode = "image" | "background" | "foreground";

/** Relative travel per depth plane, so a stack of layers reads as depth. */
const modeWeight: Record<ParallaxMode, number> = {
  background: 0.5,
  image: 1,
  foreground: 1.6,
};

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** vertical travel in % of element height, before the depth weight */
  strength?: number;
  /** which depth plane this layer sits on */
  mode?: ParallaxMode;
  /** holds a scale while travelling so the mask never exposes an edge */
  scale?: number;
  start?: string;
  end?: string;
};

/**
 * Subtle scroll-linked vertical movement.
 *
 * One transform tween driven by ScrollTrigger, so it costs a single composite per
 * frame and no layout work. Travel is cut on anything that is not a desktop, fine
 * pointer, full motion browser, and the tween is not created at all under reduced
 * motion, which leaves the static composition exactly as authored.
 *
 * The wrapper must visually cover the bleed: put the oversized child inside an
 * `overflow-hidden` parent, or use `ParallaxImage` which does that for you.
 */
export function Parallax({
  children,
  className,
  strength = 7,
  mode = "image",
  scale = 1,
  start = "top bottom",
  end = "bottom top",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    // A phone gets a hint of depth, a desktop gets the full travel.
    const travel = strength * modeWeight[mode] * (wide && fine ? 1 : 0.45);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { yPercent: -travel, scale },
        {
          yPercent: travel,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: node.parentElement ?? node,
            start,
            end,
            scrub: true,
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, [strength, mode, scale, start, end]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

type ParallaxImageProps = {
  children: ReactNode;
  className?: string;
  /** how much of the element travels, in % */
  strength?: number;
  /** extra height on each side, as a percentage, so the travel stays covered */
  bleed?: number;
};

/**
 * Image that stays visually anchored while the surrounding content moves.
 *
 * The media is rendered `bleed` taller than the mask on both sides, so the box keeps
 * its authored size and the travel never exposes an edge. The result reads as a still
 * frame in a moving page rather than a picture sliding past the reader.
 */
export function ParallaxImage({
  children,
  className,
  strength = 8,
  bleed = 12,
}: ParallaxImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Parallax strength={strength} className="absolute inset-0" scale={1}>
        <div className="absolute inset-x-0" style={{ top: `${-bleed}%`, bottom: `${-bleed}%` }}>
          {children}
        </div>
      </Parallax>
    </div>
  );
}
