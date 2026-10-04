"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  /**
   * Mobile browsers resize the viewport when the URL bar collapses. A refresh on
   * every one of those resizes re measures every trigger mid scroll, which is the
   * single biggest source of scroll jank on phones.
   */
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  /**
   * `overwrite: "auto"` is the correct default for a page built out of many small
   * scroll driven tweens: a re triggered reveal kills the previous tween on the same
   * target instead of letting two tweens fight over `transform`. The previous global
   * default was `overwrite: false`, which is what made repeated reveals flicker.
   *
   * Nothing else is set globally on purpose. `force3D` used to be set here and it
   * logged `Invalid property force3D set to true Missing plugin?` on every page,
   * because plugin backed properties are not valid values for `gsap.defaults`.
   * GSAP already promotes transform tweens to 3D on its own, so the setting bought
   * nothing and cost a console warning per mount.
   */
  gsap.defaults({ overwrite: "auto" });
}

/**
 * Wipe every ScrollTrigger and tween GSAP is holding.
 *
 * Only used as a recovery path for a full client side page swap, where React has
 * already torn the tree down and the per component contexts had nothing left to
 * revert. Every component still owns its own context; this is the safety net that
 * guarantees no orphaned trigger survives a route change.
 */
export function resetScrollTriggers() {
  if (typeof window === "undefined") return;
  for (const trigger of ScrollTrigger.getAll()) trigger.kill(true);
  ScrollTrigger.clearScrollMemory();
}

/** Re-measure after the DOM has settled (route change, region change, resize). */
export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
