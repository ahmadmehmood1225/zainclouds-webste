"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { easing } from "@/lib/animations/easing";
import { prefersReducedMotion } from "@/lib/animations/motion";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** delay in milliseconds */
  delay?: number;
  direction?: "up" | "left";
  start?: string;
};

/**
 * Clips an image open like a curtain when it scrolls into view. Works as a
 * mask container: add an inner `Parallax` for layered depth.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  start = "top 85%",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      gsap.set(node, { clearProps: "all" });
      return;
    }

    const from =
      direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { clipPath: from },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.05,
          ease: easing.smooth,
          delay: delay / 1000,
          immediateRender: true,
          scrollTrigger: { trigger: node, start, once: true },
        },
      );
    });

    return () => ctx.revert();
  }, [delay, direction, start]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)} style={{ willChange: "clip-path" }}>
      {children}
    </div>
  );
}