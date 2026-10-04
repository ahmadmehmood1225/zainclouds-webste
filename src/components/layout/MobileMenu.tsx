"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Globe } from "@/components/ui/icons";
import { regions, defaultRegionId, regionName } from "@/data/regions";
import { useRegion, setRegion } from "@/lib/use-region";
import { useNavigation } from "@/lib/use-content";
import { useLocale, useT } from "@/lib/use-copy";
import { cn } from "@/lib/cn";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const activeId = useRegion();
  const navigation = useNavigation();
  const t = useT();
  const { locale } = useLocale();

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
    const menu = menuRef.current;
    if (!menu) return;

    const focusables = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    const first = focusables[0];
    (first ?? menu).focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && active === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const frame = requestAnimationFrame(() => {
        lastFocusedRef.current?.focus();
        lastFocusedRef.current = null;
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      tabIndex={-1}
      inert={!open}
      className={cn(
        "fixed inset-0 top-20 z-40 flex flex-col bg-navy-950/98 transition-opacity duration-300 lg:hidden sm:top-24",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <nav
        aria-label={t("nav.mobile")}
        className="flex-1 overflow-y-auto px-5 py-8 sm:px-8"
      >
        <ul className="space-y-1">
          {navigation.map((link) => (
            <li key={link.href}>
              <div
                className={cn(
                  "py-1 transition-all duration-300",
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  className="block py-2 font-display text-2xl font-semibold text-white transition-colors hover:text-teal-300"
                >
                  {link.label}
                </a>
              </div>
              {link.children ? (
                <ul className="mb-3 mt-1 space-y-1 border-s border-white/10 ps-4">
                  {link.children
                    .filter((child) => !child.heading)
                    .map((child) =>
                      child.cta ? (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            onClick={onClose}
                            className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-teal-300 transition-colors hover:bg-teal-400/10"
                          >
                            {child.label}
                            <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" />
                          </a>
                        </li>
                      ) : (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            onClick={onClose}
                            className="block py-1.5 text-sm text-white/70 transition-colors hover:text-teal-300"
                          >
                            {child.label}
                          </a>
                        </li>
                      ),
                    )}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/contact" variant="primary" size="lg" className="w-full">
            {t("nav.contactUs")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </nav>
      <div className="border-t border-white/10 px-5 py-5 sm:px-8">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-white/60">
          <Globe className="h-4 w-4" aria-hidden="true" />
          {t("nav.selectRegion")}
        </p>
        <div className="flex gap-2" role="group" aria-label={t("nav.regionLabel")}>
          {regions.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => setRegion(region.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                region.id === (activeId ?? defaultRegionId)
                  ? "border-teal-400 bg-teal-400/15 text-teal-300"
                  : "border-white/15 text-white/60 hover:border-white/35 hover:text-white",
              )}
            >
              {regionName(region.id, locale)}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-white/50">{t("nav.regionsServed")}</p>
      </div>
    </div>
  );
}