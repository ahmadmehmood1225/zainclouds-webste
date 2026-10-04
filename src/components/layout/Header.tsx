"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/LogoLink";
import { Button } from "@/components/ui/Button";
import { Menu, Close, ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { RegionSwitcher } from "@/components/layout/RegionSwitcher";
import { useNavigation } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/data/navigation";

export function Header() {
  const navigation = useNavigation();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Away from the home hero the header always sits on a light page, so it
  // renders as a solid bar with dark content instead of a transparent overlay.
  const solid = scrolled || mobileOpen || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const firstFrame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(firstFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname) {
      const frame = requestAnimationFrame(() => setMobileOpen(false));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname]);

  return (
    <>
      <header
        data-hero-nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-navy-900/10 bg-white/95 shadow-sm backdrop-blur"
            : "border-b border-white/15 bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-10">
          <Logo variant={solid ? "dark" : "light"} />

          <nav
            aria-label={t("nav.main")}
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                active={pathname.startsWith(link.href)}
                light={!solid}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <RegionSwitcher light={!solid} />
            <Button
              href="/contact"
              variant={solid ? "dark" : "outline-light"}
              size="sm"
            >
              {t("nav.contactUs")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-navy-900 hover:bg-navy-50" : "text-white hover:bg-white/10",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavItem({
  link,
  active,
  light,
}: {
  link: NavLink;
  active: boolean;
  light: boolean;
}) {
  const textColor = `${
    light ? "text-white/85 hover:text-white" : "text-navy-900/75 hover:text-navy-900"
  }`;
  const underline = light ? "bg-white" : "bg-teal-600";

  if (!link.children) {
    return (
      <a
        href={link.href}
        className={cn(
          "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
          textColor,
          active && (light ? "text-white" : "text-navy-900"),
        )}
      >
        {link.label}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-4 -bottom-px h-0.5 origin-[center] scale-x-0 rounded-full transition-transform duration-200",
            underline,
            "hover:scale-x-100",
            active && "scale-x-100",
          )}
        />
      </a>
    );
  }

  return (
    <div className="group relative">
      <a
        href={link.href}
        aria-haspopup="true"
        className={cn(
          "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
          textColor,
          active && (light ? "text-white" : "text-navy-900"),
        )}
      >
        {link.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          fill="none"
          className="h-2 w-2.5 opacity-60 transition-transform duration-200 group-hover:rotate-180"
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <div
        className={cn(
          "absolute start-1/2 top-full z-50 hidden w-[24rem] -translate-x-1/2 pt-3 lg:group-hover:block lg:group-focus-within:block",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-2 shadow-2xl">
          {link.children.map((child) =>
            child.heading ? (
              <p
                key={child.label}
                className="px-4 pb-1 pt-3 text-[11px] font-semibold tracking-widest text-navy-900/40 uppercase"
              >
                {child.label}
              </p>
            ) : child.cta ? (
              <a
                key={child.href}
                href={child.href}
                className={cn(
                  "group/cta mt-2 flex items-center justify-between rounded-xl border border-navy-900/10 bg-navy-50/70 px-4 py-3 transition-colors hover:border-teal-600 hover:bg-teal-600 hover:text-navy-950",
                  child.description && "flex-col items-start gap-0.5",
                )}
              >
                <span className="text-sm font-semibold text-navy-900 group-hover/cta:text-navy-950">
                  {child.label}
                </span>
                {child.description ? (
                  <span className="text-xs text-navy-900/60 group-hover/cta:text-navy-950/75">
                    {child.description}
                  </span>
                ) : null}
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            ) : (
              <a
                key={child.href}
                href={child.href}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-green-50"
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-medium text-navy-900">{child.label}</span>
                  {child.description ? (
                    <span className="mt-0.5 text-xs text-navy-900/55">
                      {child.description}
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-navy-900/35 transition-colors group-hover:text-teal-600" />
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
}