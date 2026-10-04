"use client";

import { useT } from "@/lib/use-copy";

/**
 * Localized skip link. The layout itself stays a Server Component, so the copy
 * resolves on hydration the same way as the rest of the chrome.
 */
export function SkipLink() {
  const t = useT();

  return (
    <a
      href="#main-content"
      className="sr-only rounded-full bg-navy-900 px-5 py-3 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[60]"
    >
      {t("system.skipToContent")}
    </a>
  );
}
