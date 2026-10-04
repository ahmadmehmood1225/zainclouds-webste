"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { prefersFinePointer, prefersReducedMotion } from "@/lib/animations/motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** fraction of the distance to the cursor that the element covers */
  strength?: number;
};

/**
 * Slightly pulls a button toward the cursor. Desktop only, disabled under
 * reduced motion. Purely decorative — relied on nowhere for usability.
 */
export function MagneticButton({ children, className, strength = 0.16 }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !prefersFinePointer()) return;

    let raf = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const tick = () => {
      raf = 0;
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = (event.clientX - (rect.left + rect.width / 2)) * strength;
      targetY = (event.clientY - (rect.top + rect.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}