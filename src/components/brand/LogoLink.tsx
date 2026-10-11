"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/use-copy";

const logoByVariant = {
  dark: "/brand/zain-clouds-logo-dark.png",
  light: "/brand/zain-clouds-logo-light.png",
} as const;

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
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={logoByVariant[variant]}
        alt="Zain Clouds"
        width={496}
        height={223}
        priority
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}
