"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const prefersFinePointer = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const isLowPowerDevice = (): boolean => {
  if (typeof navigator === "undefined") return true;
  if (navigator.hardwareConcurrency === undefined) return false;
  return navigator.hardwareConcurrency <= 4;
};

type MediaQueryStore = {
  subscribe: (callback: () => void) => () => void;
  query: string;
};

/**
 * A single reusable media query subscription.
 *
 * `useSyncExternalStore` keeps the server snapshot stable, so a component can read
 * a breakpoint without ever producing a hydration mismatch or tearing on a
 * breakpoint change.
 */
export function createMediaQueryStore(query: string): MediaQueryStore {
  return {
    query,
    subscribe(callback) {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
  };
}

const reducedMotionStore = createMediaQueryStore("(prefers-reduced-motion: reduce)");
const finePointerStore = createMediaQueryStore("(hover: hover) and (pointer: fine)");

function makeSnapshot(query: string) {
  return () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);
}

const readReducedMotion = makeSnapshot(reducedMotionStore.query);
const readFinePointer = makeSnapshot(finePointerStore.query);

export function useReducedMotion() {
  return useSyncExternalStore(reducedMotionStore.subscribe, readReducedMotion, () => false);
}

export function useFinePointer() {
  return useSyncExternalStore(finePointerStore.subscribe, readFinePointer, () => false);
}

export type ViewportTier = "mobile" | "tablet" | "desktop";

const tierStores: Record<ViewportTier, MediaQueryStore> = {
  mobile: createMediaQueryStore("(max-width: 767px)"),
  tablet: createMediaQueryStore("(min-width: 768px) and (max-width: 1023px)"),
  desktop: createMediaQueryStore("(min-width: 1024px)"),
};

function readTier(): ViewportTier {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(tierStores.mobile.query).matches) return "mobile";
  if (window.matchMedia(tierStores.tablet.query).matches) return "tablet";
  return "desktop";
}

/**
 * Current viewport tier. The server snapshot is `desktop` so the first paint always
 * matches the markup the server produced; the real value lands on hydration.
 */
export function useViewportTier(): ViewportTier {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const unsubscribes = (Object.values(tierStores) as MediaQueryStore[]).map((store) =>
        store.subscribe(callback),
      );
      window.addEventListener("resize", callback, { passive: true });
      return () => {
        unsubscribes.forEach((off) => off());
        window.removeEventListener("resize", callback);
      };
    },
    readTier,
    () => "desktop" as ViewportTier,
  );
}

/**
 * Desktop pointer + hardware + motion preferences used by WebGL and
 * animation-heavy components.
 */
export function useCapabilities() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const [low, setLow] = useState(isLowPowerDevice);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const frame = requestAnimationFrame(() => setLow(isLowPowerDevice()));
    return () => cancelAnimationFrame(frame);
  }, []);

  return { reduced, finePointer, low };
}

/**
 * The single answer to "should this component move?".
 *
 * Parallax, pinning and scrubbed sequences are desktop, fine pointer, full motion
 * only. Reveals and micro transitions stay on everywhere, because they are cheap
 * and they carry hierarchy rather than spectacle.
 */
export function useMotionLevel() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const tier = useViewportTier();

  return {
    reduced,
    finePointer,
    tier,
    /** large scroll choreography: parallax, pinning, horizontal scrub */
    rich: !reduced && finePointer && tier === "desktop",
    /** cheap scroll linked movement, safe on tablets */
    light: !reduced && tier !== "mobile",
    /** simple one shot reveals */
    reveal: !reduced,
  } as const;
}
