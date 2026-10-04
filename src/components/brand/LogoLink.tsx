"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/use-copy";
import { LogoMark } from "@/components/brand/Logo";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const t = useT();

  return (
    <Link
      href="/"
      aria-label={`Zain Clouds — ${t("nav.home")}`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoMark />
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight",
          variant === "light" ? "text-white" : "text-navy-900",
        )}
      >
        Zain{" "}
        <span className={variant === "light" ? "text-green-300" : "text-green-600"}>Clouds</span>
      </span>
    </Link>
  );
}