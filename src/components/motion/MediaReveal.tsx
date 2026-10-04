"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { easing } from "@/lib/animations/easing";
import { prefersReducedMotion } from "@/lib/animations/motion";

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  /** reveal direction of the mask */
  direction?: "up" | "left" | "right";
  scale?: number;
  delay?: number;
  once?: boolean;
};

/**
 * Clip-path media reveal used for product shots and videos: the frame opens
 * like a curtain while the media settles to natural scale. Pure overlay media
 * stays visible in reduced motion because the static frame is the actual
 * poster.
 */
export function MediaReveal({
  children,
  className,
  direction = "up",
  scale = 1.08,
  delay = 0,
  once = true,
}: MediaRevealProps) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      gsap.set(node, { clearProps: "all" });
      return;
    }

    const fromInset =
      direction === "up"
        ? "inset(100% 0% 0% 0%)"
        : direction === "left"
          ? "inset(0% 100% 0% 0%)"
          : "inset(0% 0% 0% 100%)";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { clipPath: fromInset, scale },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: easing.steady,
          delay: delay / 1000,
          scrollTrigger: { trigger: node, start: "top 82%", once },
        },
      );
    });

    return () => ctx.revert();
  }, [direction, scale, delay, once]);

  return (
    <div ref={nodeRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}