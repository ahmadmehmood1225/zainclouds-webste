"use client";

import { LogoMark } from "@/components/brand/Logo";
import { useT } from "@/lib/use-copy";

/** Localized route loading state. */
export function LoadingView() {
  const t = useT();

  return (
    <div
      className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-white"
      role="status"
      aria-label={t("system.loading")}
    >
      <LogoMark className="h-12 w-12 animate-pulse" />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-navy-100">
        <span className="block h-full w-1/2 animate-marquee rounded-full bg-teal-500" />
      </div>
      <span className="sr-only">{t("system.loading")}</span>
    </div>
  );
}
