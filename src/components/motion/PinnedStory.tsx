"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";

const reducedMotionStore = {
  subscribe(callback: () => void) {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  },
  getSnapshot() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },
  getServerSnapshot() {
    return false;
  },
};

type PinnedStoryStep = { title: string; body: string };

type PinnedStoryProps = {
  steps: PinnedStoryStep[];
  /** one visual layer per step; visual[0] must match layers after its step */
  media: ReactNode[];
  className?: string;
  mediaClassName?: string;
};

/**
 * A visual stays pinned while step content changes beside it. Each step's text
 * activates the matching media layer (crossfade) as it reaches the top of the
 * viewport. With reduced motion the media collapses to a single static panel
 * above the steps so all content stays readable.
 */
export function PinnedStory({
  steps,
  media,
  className,
  mediaClassName,
}: PinnedStoryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const reduced = useSyncExternalStore(
    reducedMotionStore.subscribe,
    reducedMotionStore.getSnapshot,
    reducedMotionStore.getServerSnapshot,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const stepEls = Array.from(root.querySelectorAll<HTMLElement>("[data-story-step]"));
    if (stepEls.length === 0) return;

    const ctx = gsap.context(() => {
      stepEls.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive && index !== activeRef.current) {
              activeRef.current = index;
              setActive(index);
            }
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  if (reduced) {
    return (
      <div ref={rootRef} className={cn("grid gap-10 lg:grid-cols-2 lg:items-center", className)}>
        <div className={cn("relative overflow-hidden rounded-2xl", mediaClassName)}>
          {media[0] ?? null}
        </div>
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="border-s border-ink-900/12 ps-6">
              <span className="font-display text-sm font-semibold text-brand-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("lg:grid lg:grid-cols-2 lg:gap-16", className)}>
      <div className="relative order-2 mt-10 lg:order-none lg:mt-0">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-ink-950 ring-1 ring-white/10 lg:sticky lg:top-28",
            mediaClassName ?? "h-[22rem] lg:h-[32rem]",
          )}
        >
          {media.map((layer, index) => (
            <div
              key={index}
              aria-hidden={index !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                index === active ? "opacity-100" : "opacity-0",
              )}
            >
              {layer}
            </div>
          ))}
        </div>
      </div>

      <ol className="order-1 lg:order-none">
        {steps.map((step, index) => (
          <li
            key={step.title}
            data-story-step
            className={cn(
              "flex min-h-[45vh] items-start border-s border-ink-900/10 ps-8 lg:min-h-[55vh]",
              index === steps.length - 1 && "min-h-0",
            )}
          >
            <div className="max-w-md">
              <span
                className={cn(
                  "font-display text-sm font-semibold transition-colors duration-300",
                  index === active ? "text-brand-700" : "text-ink-300",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={cn(
                  "mt-3 text-2xl font-semibold tracking-tight transition-colors duration-300",
                  index === active ? "text-ink-900" : "text-ink-900/45",
                )}
              >
                {step.title}
              </h3>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed transition-colors duration-300 sm:text-base",
                  index === active ? "text-ink-900/70" : "text-ink-900/35",
                )}
              >
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}