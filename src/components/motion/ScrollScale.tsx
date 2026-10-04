"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";

type ScrollScaleProps = {
  children: ReactNode;
  className?: string;
  /** the clip-path inset the media starts from, e.g. a contained block */
  fromClip?: string;
  scaleFrom?: number;
  /** exact scroll offsets, e.g. "top 90%" */
  start?: string;
  end?: string;
};

/**
 * Scroll-linked motion where a contained block of media expands to full width
 * (scale down while the clip mask opens). A single dominant transformation per
 * section: clip reveal + gentle scale.
 */
export function ScrollScale({
  children,
  className,
  fromClip = "inset(14% 10% 18% 10%)",
  scaleFrom = 1.14,
  start = "top 85%",
  end = "top 18%",
}: ScrollScaleProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const media = mediaRef.current;
    if (!wrap || !media) return;

    if (prefersReducedMotion()) {
      gsap.set(media, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { scale: scaleFrom },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start,
            end,
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        wrap,
        { clipPath: fromClip },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start,
            end,
            scrub: 0.6,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [fromClip, scaleFrom, start, end]);

  return (
    <div
      ref={wrapRef}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      className={cn("overflow-hidden", className)}
    >
      <div ref={mediaRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}