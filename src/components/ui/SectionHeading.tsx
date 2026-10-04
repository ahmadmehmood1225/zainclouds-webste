import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  id?: string;
};

/**
 * The section header used across the site.
 *
 * `dark` is the only variant that exists. Rather than a scale of tones, the two
 * states are deliberate: paper sections use ink-900 on white, and inverted sections
 * use white on ink-950. Both are checked for contrast, and neither relies on a
 * translucent colour that might land on an unexpected background.
 */
export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  dark = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {label ? (
        <span
          className={cn(
            "mb-4 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.18em] uppercase",
            dark ? "text-brand-300" : "text-brand-600",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {label}
        </span>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-display font-semibold tracking-[-0.02em] text-balance",
          "text-3xl sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl leading-relaxed",
            dark ? "text-base text-white/65 sm:text-lg" : "text-base text-ink-900/60 sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
