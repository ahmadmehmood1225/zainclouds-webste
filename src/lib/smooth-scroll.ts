"use client";

import type Lenis from "lenis";

/**
 * Shared handle on the smooth scroll instance.
 *
 * Anything that locks the page (mobile menu, modal) has to pause Lenis as well
 * as the document, otherwise the wheel keeps scrolling the page underneath the
 * overlay. Locks are reference counted so nested overlays behave.
 */
let instance: Lenis | null = null;
let locks = 0;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function lockScroll() {
  locks += 1;
  instance?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) instance?.start();
}
