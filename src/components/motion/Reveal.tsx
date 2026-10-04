"use client";

import {
  useEffect,
  useRef,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/animations/gsap";
import { easing } from "@/lib/animations/easing";
import { prefersReducedMotion } from "@/lib/animations/motion";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade" | "clip";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** delay in milliseconds */
  delay?: number;
  /** duration in seconds */
  duration?: number;
  variant?: RevealVariant;
  /** base distance in px for directional variants */
  distance?: number;
  as?: ElementType;
  once?: boolean;
  start?: string;
};

function fromState(variant: RevealVariant, distance: number) {
  switch (variant) {
    case "fade":
      return { autoAlpha: 0 };
    case "left":
      return { x: -distance, autoAlpha: 0 };
    case "right":
      return { x: distance, autoAlpha: 0 };
    case "scale":
      return { scale: 0.95, autoAlpha: 0 };
    case "clip":
      return { clipPath: "inset(0% 0% 100% 0%)" };
    case "down":
      return { y: -distance, autoAlpha: 0 };
    default:
      return { y: distance, autoAlpha: 0 };
  }
}

type PolymorphicProps = { className?: string; children?: ReactNode } & Record<
  string,
  unknown
>;

/**
 * Scroll-triggered reveal with configurable direction.
 *
 * The GSAP context is scoped to this element, so the tween and its ScrollTrigger are
 * always collected, reverted and killed together when the component unmounts. That
 * scoping is the difference between a clean unmount and an orphaned trigger that
 * keeps writing to a detached node.
 *
 * Under reduced motion the element is rendered in its natural state and the
 * context is never created, so no content is ever hidden by a disabled animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  variant = "up",
  distance = 24,
  as: Tag = "div",
  once = true,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = Tag as unknown as ComponentType<PolymorphicProps>;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { ...fromState(variant, distance) },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          ease: easing.steady,
          delay: delay / 1000,
          scrollTrigger: { trigger: node, start, once },
          immediateRender: true,
        },
      );
    }, node);

    return () => ctx.revert();
  }, [variant, delay, duration, distance, once, start]);

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** selector for the elements that enter in sequence, scoped to this root */
  selector?: string;
  /** seconds between each child */
  stagger?: number;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  start?: string;
};

/**
 * Staggered entrance for a group of siblings.
 *
 * Children are selected inside the component root, so the same component can be
 * mounted twice on a page without one instance animating the other. Every child is
 * animated once and never reanimated on scroll back, which keeps long pages cheap.
 */
export function Stagger({
  children,
  className,
  selector = "[data-stagger-item]",
  stagger = 0.08,
  delay = 0,
  duration = 0.75,
  distance = 22,
  once = true,
  start = "top 84%",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      if (!items.length) return;
      gsap.fromTo(
        items,
        { y: distance, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration,
          ease: easing.steady,
          delay: delay / 1000,
          stagger,
          scrollTrigger: { trigger: root, start, once },
          immediateRender: true,
        },
      );
    }, root);

    return () => ctx.revert();
  }, [selector, stagger, delay, duration, distance, once, start]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

export type { PolymorphicProps };
