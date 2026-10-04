"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "@/components/ui/icons";
import { regions, regionName, type RegionId } from "@/data/regions";
import { setRegion } from "@/lib/use-region";
import { useLocale } from "@/lib/use-copy";
import { cn } from "@/lib/cn";

/**
 * Region preference switcher (KSA / MEA / PK).
 *
 * The choice is persisted immediately, so every localized section on the site
 * reads the same region and the choice survives navigation and refreshes. The
 * document language and direction are already correct before paint, so switching
 * never shows a full width English layout first.
 */
export function RegionSwitcher({ light }: { light: boolean }) {
  const [open, setOpen] = useState(false);
  const { region, locale, t } = useLocale();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const active = regions.find((item) => item.id === region) ?? regions[1];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (id: RegionId) => {
    setRegion(id);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("nav.regionAction", {
          region: regionName(region, locale),
        })}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors",
          light
            ? "border-white/25 text-white hover:bg-white/10"
            : "border-navy-900/15 text-navy-900 hover:border-navy-900/35 hover:bg-navy-50",
        )}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span>{active.code}</span>
      </button>

      <div
        className={cn(
          "absolute end-0 top-full z-50 w-64 pt-3 transition-opacity duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        role="menu"
      >
        <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-2 shadow-2xl">
          <p className="px-4 pb-1 pt-2 text-[11px] font-semibold tracking-widest text-navy-900/40 uppercase">
            {t("nav.selectRegion")}
          </p>
          {regions.map((item) => {
            const isActive = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => select(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-start transition-colors",
                  isActive ? "bg-green-50" : "hover:bg-navy-50",
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-medium text-navy-900">{item.code}</span>
                  <span className="truncate text-xs text-navy-900/55">
                    {locale === "ar" ? item.nameAr : item.name}
                  </span>
                  <span className="text-[11px] text-navy-900/40">{item.language}</span>
                </span>
                {isActive ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-4 w-4 shrink-0 text-green-600"
                  >
                    <path
                      d="M3 8.5 6.5 12 13 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </button>
            );
          })}
          <p className="px-4 pt-2 pb-1 text-[11px] text-navy-900/40">
            {t("nav.regionLanguage", { language: active.language })}
          </p>
        </div>
      </div>
    </div>
  );
}
