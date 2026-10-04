"use client";

import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/brand/Logo";
import { useT } from "@/lib/use-copy";

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useT();

  return (
    <section className="flex min-h-[70vh] items-center bg-white py-20">
      <Container>
        <div className="max-w-xl">
          <LogoMark className="h-12 w-12" />
          <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
            {t("system.errorTitle")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-navy-900/70">
            {t("system.errorBody")}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-green-500 px-7 text-sm font-medium text-navy-950 transition-colors hover:bg-green-400"
          >
            {t("system.retry")}
          </button>
        </div>
      </Container>
    </section>
  );
}