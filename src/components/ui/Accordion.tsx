"use client";

import { useId, useState } from "react";
import { Plus } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * FAQ accordion.
 *
 * Animation rules:
 * - The panel height animates with `grid-template-rows: 0fr -> 1fr`. Nothing is
 *   measured, nothing is written to `style.height`, and there is no JavaScript
 *   running during the transition, so an answer can be any length without the open
 *   and close ever snapping.
 * - The answer fades and rises as the box opens, slightly behind the box itself.
 * - The plus glyph is one icon that rotates a quarter turn so its two arms cross
 *   into a minus. Open and closed therefore share a single transition instead of
 *   swapping two different elements.
 * - Panels are never unmounted. Only their grid row and opacity change, so opening
 *   one question cannot produce a node removal for React to clean up.
 * - Under reduced motion the transition is dropped entirely and the state change is
 *   instant, which is the only honest way to honour the preference.
 */
export function Accordion({ items, allowMultiple = false }: { items: AccordionItem[]; allowMultiple?: boolean }) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const uid = useId().replace(/:/g, "");

  const toggle = (index: number) => {
    setOpenIndexes((current) => {
      if (current.includes(index)) {
        // The first question stays openable, but there is always at least one open
        // row so the list never collapses into a wall of closed headers.
        if (current.length === 1 && current[0] === 0) return current;
        return current.filter((value) => value !== index);
      }
      return allowMultiple ? [...current, index] : [index];
    });
  };

  return (
    <div className="border-y border-ink-900/10">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={item.question} className="group relative border-b border-ink-900/10 last:border-b-0">
            <h3>
              <button
                type="button"
                id={`${uid}-button-${index}`}
                className="flex w-full items-center justify-between gap-5 py-5 text-start transition-colors duration-300 hover:bg-ink-50/70 sm:py-6"
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${index}`}
                onClick={() => toggle(index)}
              >
                <span
                  className={cn(
                    "font-display text-base font-semibold tracking-tight transition-colors duration-300 sm:text-lg",
                    isOpen ? "text-ink-900" : "text-ink-900/70 group-hover:text-ink-900",
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:h-10 sm:w-10",
                    isOpen
                      ? "border-ink-900 bg-ink-900 text-white"
                      : "border-ink-900/15 text-ink-700 group-hover:border-ink-900/40",
                  )}
                  aria-hidden="true"
                >
                  <Plus
                    className={cn(
                      "h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen && "rotate-135",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${uid}-panel-${index}`}
              role="region"
              aria-labelledby={`${uid}-button-${index}`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "max-w-3xl pb-6 text-sm leading-relaxed text-ink-900/65 transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0",
                    "motion-reduce:translate-y-0",
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
