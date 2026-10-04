"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useT } from "@/lib/use-copy";
import type { CopyKey } from "@/data/i18n";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  label: string;
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Page header for the interior pages. Copy arrives as dictionary keys rather
 * than literals so the header follows the active region, and the glow is a
 * single restrained wash instead of a decorative blur.
 */
export function PageHero({
  label,
  title,
  description,
  image,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        // The header is fixed, so the top padding clears it. The bottom padding is
        // deliberately larger than the top gap so the copy sits in the upper part of
        // the panel and reads as a header rather than as text crowding the edge.
        "relative overflow-hidden border-b border-navy-900/10 bg-white pt-32 pb-24 sm:pt-40 sm:pb-28",
        className,
      )}
    >
      {image ? (
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" aria-hidden />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 end-0 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
      />
      <Container className="relative z-10">
        <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-brand-700 uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {label}
        </span>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.05] font-bold tracking-tight text-balance text-navy-900 sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-700 sm:text-lg">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}

type LocalizedPageHeroProps = {
  labelKey: CopyKey;
  titleKey: CopyKey;
  descriptionKey?: CopyKey;
  image?: string;
  className?: string;
};

/** Convenience wrapper for Server Component pages that must stay server side. */
export function LocalizedPageHero({
  labelKey,
  titleKey,
  descriptionKey,
  image,
  className,
}: LocalizedPageHeroProps) {
  const t = useT();
  return (
    <PageHero
      label={t(labelKey)}
      title={t(titleKey)}
      description={descriptionKey ? t(descriptionKey) : undefined}
      image={image}
      className={className}
    />
  );
}
