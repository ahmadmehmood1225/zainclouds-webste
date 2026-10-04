"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { refreshScrollTriggers } from "@/lib/animations/gsap";
import { useRegion } from "@/lib/use-region";

export function ScrollTriggerRefresh() {
  const region = useRegion();
  const pathname = usePathname();

  useEffect(() => {
    const id = window.setTimeout(() => {
      refreshScrollTriggers();
    }, 60);
    return () => window.clearTimeout(id);
  }, [pathname, region]);

  return null;
}
