"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollScale } from "@/components/motion/ScrollScale";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { VideoSection } from "@/components/motion/VideoSection";
import { ArrowUpRight } from "@/components/ui/icons";
import { useServiceSharedCopy, useServiceStory, useServices } from "@/lib/use-content";
import { useLocale, useT, type Translator } from "@/lib/use-copy";
import type { CopyKey } from "@/data/i18n";
import type { Service } from "@/data/services";
import { cn } from "@/lib/cn";

const accentTokens = {
  green: {
    text: "text-brand-700",
    dot: "bg-brand-500",
    ring: "ring-brand-400/40",
  },
  pink: {
    text: "text-brand-700",
    dot: "bg-brand-500",
    ring: "ring-brand-400/40",
  },
  yellow: {
    text: "text-brand-700",
    dot: "bg-brand-500",
    ring: "ring-brand-400/40",
  },
  navy: {
    text: "text-brand-700",
    dot: "bg-brand-500",
    ring: "ring-brand-400/40",
  },
} as const;

const transcriptKeys = {
  ecommerce: "spotlight.transcript.ecommerce",
  crm: "spotlight.transcript.crm",
  erp: "spotlight.transcript.erp",
  erpnext: "spotlight.transcript.erpnext",
  pos: "spotlight.transcript.pos",
  "custom-software": "spotlight.transcript.custom-software",
} as const satisfies Record<string, CopyKey>;

function transcriptFor(service: Service, t: Translator): string {
  const key = transcriptKeys[service.slug as keyof typeof transcriptKeys];
  return key ? t(key) : t("spotlight.transcript.custom-software");
}

function SpotlightMedia({
  service,
  otherService,
}: {
  service: Service;
  otherService?: Service;
}) {
  const t = useT();
  const { list } = useLocale();
  const storefrontLabel = useServiceStory("ecommerce").chromeLabel;
  const platformLabel = useServiceSharedCopy().chromePlatform;
  const isCombined = Boolean(otherService);
  const transcript = transcriptFor(service, t);
  const secondTranscript = otherService ? transcriptFor(otherService, t) : "";

  if (isCombined) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <MediaReveal direction="left">
          <VideoSection
            src={service.video}
            poster={service.poster}
            title={service.name}
            transcript={transcript}
          />
        </MediaReveal>
        {otherService ? (
          <MediaReveal direction="right" delay={120}>
            <VideoSection
              src={otherService.video}
              poster={otherService.poster}
              title={otherService.name}
              transcript={secondTranscript}
              priority
            />
          </MediaReveal>
        ) : null}
      </div>
    );
  }

  switch (service.slug) {
    case "ecommerce":
      return (
        <ScrollScale className="aspect-[4/3] rounded-2xl">
          <VideoSection
            src={service.video}
            poster={service.poster}
            title={service.name}
            transcript={transcript}
            chrome="browser"
            chromeLabel={storefrontLabel}
            priority
          />
        </ScrollScale>
      );
    case "crm":
      return (
        <div className="relative">
          <MediaReveal>
            <VideoSection
              src={service.video}
              poster={service.poster}
              title={service.name}
              transcript={transcript}
              priority
            />
          </MediaReveal>
          {/* The stage strip is decorative metadata under the frame. It wraps rather
              than overflowing, and the connector rules are dropped once the row is
              narrow enough to stack, because a rule that survives a line break points
              at nothing. */}
          <div
            aria-hidden="true"
            className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2"
          >
            {list("spotlight.crmStages").map((stage, i) => (
              <span key={stage} className="flex items-center gap-2 text-[11px] font-medium tracking-wider text-navy-900/55 uppercase">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", accentTokens[service.accent].dot)} />
                {stage}
                {i < 4 ? <span className="hidden h-px w-5 shrink-0 bg-navy-900/15 sm:block" /> : null}
              </span>
            ))}
          </div>
        </div>
      );
    case "pos":
      return (
        <div className="relative">
          <MediaReveal direction="left">
            <VideoSection
              src={service.video}
              poster={service.poster}
              title={service.name}
              transcript={transcript}
              priority
            />
          </MediaReveal>
          <div aria-hidden="true" className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[11px] font-medium tracking-wider text-navy-900/55 uppercase">
            {list("spotlight.posStages").map((stage, i) => (
              <span key={stage} className="flex items-center gap-2">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", accentTokens[service.accent].dot)} />
                {stage}
                {i < 3 ? <span className="hidden h-px w-5 shrink-0 bg-navy-900/15 sm:block" /> : null}
              </span>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <MediaReveal direction="left">
          <VideoSection
            src={service.video}
            poster={service.poster}
            title={service.name}
            transcript={transcript}
            chrome="terminal"
            chromeLabel={platformLabel}
            priority
          />
        </MediaReveal>
      );
  }
}

type ServiceSpotlightProps = {
  /** Slug keeps the server page free to pass data; the section resolves the
      localized copy for the active region. */
  slug: string;
  reverse?: boolean;
  otherSlug?: string;
};

/**
 * Homepage service module. Each service keeps the same structural rhythm but a
 * different framing and motion concept, so the homepage reads as a set of
 * distinct product stories rather than a repeated card template.
 */
export function ServiceSpotlight({ slug, reverse, otherSlug }: ServiceSpotlightProps) {
  const t = useT();
  const services = useServices();
  const service = services.find((item) => item.slug === slug);
  const otherService = otherSlug ? services.find((item) => item.slug === otherSlug) : undefined;

  if (!service) return null;

  const accent = accentTokens[service.accent];
  const heading = otherService
    ? t("spotlight.erpHeadline")
    : service.spotlight.headline;
  const body = otherService ? otherService.spotlight.body : service.spotlight.body;
  const points = otherService
    ? [...service.spotlight.points, ...otherService.spotlight.points].slice(0, 4)
    : service.spotlight.points;
  const primaryHref = otherService?.path ?? service.path;
  const label = otherService ? t("spotlight.erpLabel") : service.spotlight.eyebrow;

  return (
    <section
      className={cn("bg-white py-20 sm:py-28", reverse && "bg-navy-50/40")}
      aria-labelledby={`spotlight-${service.slug}`}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={cn(reverse && "lg:order-2")}>
            <SpotlightMedia service={service} otherService={otherService} />
          </div>

          <Reveal delay={80} className={cn(reverse && "lg:order-1")}>
            <span className={cn("mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase", accent.text)}>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {label}
            </span>
            <h3
              id={`spotlight-${service.slug}`}
              className="font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h3>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-900/70 sm:text-lg">
              {body}
            </p>
            <ul className="mt-7 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-navy-900/80 sm:text-base">
                  <span aria-hidden="true" className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", accent.dot)} />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={primaryHref}
                className="group inline-flex min-h-12 items-center gap-3 rounded-none bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:bg-brand-600 hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {t("spotlight.explore", { service: service.name })}
                <span
                  aria-hidden="true"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-none bg-white/15 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-90 motion-reduce:transition-none"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
              {otherService ? (
                <Link
                  href={otherService.path}
                  className="group inline-flex min-h-12 items-center gap-3 rounded-none bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:bg-brand-600 hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {t("spotlight.orExplore", { service: otherService.name })}
                  <span aria-hidden="true" className="inline-flex h-7 w-7 items-center justify-center rounded-none bg-white/15 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-90 motion-reduce:transition-none">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}