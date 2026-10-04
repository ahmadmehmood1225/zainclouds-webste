"use client";

import { useEffect, useRef, type ComponentType, type ElementType } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { easing } from "@/lib/animations/easing";
import { prefersReducedMotion } from "@/lib/animations/motion";
import type { PolymorphicProps } from "@/components/motion/Reveal";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** delay in milliseconds */
  delay?: number;
  stagger?: number;
  /** trigger behaviour: scroll into view or immediately on mount */
  trigger?: "scroll" | "mount";
  start?: string;
};

/**
 * Masked, word-by-word text reveal. Each word slides up from behind an
 * overflow-hidden mask with a soft transition.
 */
export function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.055,
  trigger = "scroll",
  start = "top 88%",
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = Tag as unknown as ComponentType<PolymorphicProps>;
  const words = text.split(/\s+/);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const targets = node.querySelectorAll<HTMLElement>("[data-word]");
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 118, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: easing.hero,
          delay: delay / 1000,
          stagger,
          immediateRender: true,
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: node, start, once: true } }
            : {}),
        },
      );
    });

    return () => ctx.revert();
  }, [delay, stagger, trigger, start]);

  return (
    <Component ref={ref} className={cn("inline", className)} aria-label={text}>
      <span aria-hidden="true" className="block">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom"
          >
            <span data-word className="inline-block will-change-transform">
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Component>
  );
}

export type { PolymorphicProps };