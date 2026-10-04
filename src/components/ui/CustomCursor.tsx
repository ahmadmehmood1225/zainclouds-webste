"use client";

import { useEffect, useRef, useState } from "react";
import { prefersFinePointer, prefersReducedMotion } from "@/lib/animations/motion";

const INTERACTIVE = "a[href], button, [role='button'], summary, [data-cursor]";
const TEXT_ENTRY = "input:not([type='checkbox']):not([type='radio']), textarea, select";

/**
 * A minimal custom cursor: one crisp dot that tracks the pointer exactly, and one
 * small ring that trails it and expands over interactive elements. Optional labels
 * come from `data-cursor="View"` on an element.
 *
 * Rules this component holds to, because getting them wrong is what turns a cursor
 * into a source of runtime errors:
 *
 * - The two layers are rendered by React and are only ever moved with
 *   `style.transform`. Nothing is inserted, removed or re parented by script, so
 *   React stays the single owner of the document and there is no path to a
 *   `removeChild` failure.
 * - The native cursor is only hidden once the layers actually exist, and the class
 *   is removed on cleanup, so the page never ends up with an invisible cursor.
 * - `pointer-events: none` on both layers, so a click always lands on the element
 *   underneath and hit testing is unchanged.
 * - One `pointermove` listener, one animation frame, zero layout reads. The ring
 *   follows by interpolation on the compositor.
 * - Fully disabled for touch devices and under reduced motion, where a floating
 *   cursor has no meaning.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !prefersFinePointer()) return;
    // Mounted after paint so the first frame is never missing a cursor over content.
    const frame = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let visible = false;
    let lastLabel = "";

    const render = () => {
      frame = 0;
      // Snappier than the ring: the dot is the precise read, the ring is the
      // affordance. 0.22 settles in about two frames of movement.
      ringX += (pointerX - ringX) * 0.22;
      ringY += (pointerY - ringY) * 0.22;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      if (Math.abs(pointerX - ringX) > 0.1 || Math.abs(pointerY - ringY) > 0.1) {
        frame = requestAnimationFrame(render);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!visible) {
        visible = true;
        // Place both layers before revealing them, otherwise the cursor fades in
        // at the centre of the screen.
        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        ring.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      schedule();
    };

    // One delegated pointerover instead of a per element listener, and only the
    // small amount of work needed when the hovered element actually changed.
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      const interactive = target.closest<HTMLElement>(INTERACTIVE);
      const isText = target.closest(TEXT_ENTRY) !== null;
      const label = interactive?.dataset.cursor ?? "";

      ring.classList.toggle("is-active", Boolean(interactive) && !isText);
      ring.classList.toggle("is-text", isText);

      if (label !== lastLabel) {
        lastLabel = label;
        if (label) {
          ring.style.setProperty("--cursor-label", JSON.stringify(label));
          ring.classList.add("has-label");
        } else {
          ring.classList.remove("has-label");
          ring.style.removeProperty("--cursor-label");
        }
      }
    };

    const hide = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="zc-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="zc-cursor-ring" aria-hidden="true" />
    </>
  );
}
