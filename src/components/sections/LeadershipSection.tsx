"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { useLeadership } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import type { Leader } from "@/data/leadership";
import { cn } from "@/lib/cn";

/**
 * Leadership.
 *
 * The same photo-ready leadership cards appear on the home and company pages.
 * Approved bios and locations can be added to the company page when available.
 *
 * The visual rules come from the same place as the rest of the site:
 *
 * - A leader without a portrait gets a typographic monogram, never a stock face or a
 *   generated avatar. A wrong face on a leadership card is a credibility problem the
 *   layout cannot fix.
 * - The portrait is portrait-shaped and `object-cover` from the top, so a headshot is
 *   cropped at the shoulders rather than through the face.
 * - Motion is a staggered reveal with a slight portrait scale on hover. No parallax,
 *   because the reader is looking at a person, not a product shot.
 * - Names render at display sizes because they are the point of the section.
 */
export function LeadershipSection({
  variant = "full",
  className,
}: {
  variant?: "full" | "teaser";
  className?: string;
}) {
  const t = useT();
  const leaders = useLeadership();
  const teaser = variant === "teaser";

  if (leaders.length === 0) return null;

  return (
    <section
      className={cn("relative overflow-hidden", teaser ? "bg-brand-900 py-20 text-white sm:py-24" : "bg-ink-50 py-20 sm:py-28", className)}
      aria-labelledby="leadership-heading"
    >
      {teaser ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 start-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-500/20 blur-3xl"
        />
      ) : null}

      <Container className="relative">
        <div
          className={cn(
            "flex flex-col justify-between gap-8",
            teaser ? "lg:flex-row lg:items-end" : "lg:flex-row lg:items-end",
          )}
        >
          <Reveal className={teaser ? "max-w-2xl" : "max-w-3xl"}>
            <SectionHeading
              id="leadership-heading"
              label={t("leadership.label")}
              title={t("leadership.title")}
              description={t("leadership.description")}
              dark={teaser}
            />
          </Reveal>

          {teaser ? (
            <Reveal delay={120} distance={20}>
              <Link
                href="/about"
                className="group/link inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-display text-xs font-semibold tracking-[0.1em] text-white/85 uppercase transition-colors duration-300 hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
              >
                {t("leadership.more")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
              </Link>
            </Reveal>
          ) : null}
        </div>

        <ul
          className={cn(
            "mt-12 grid gap-5 sm:mt-16",
            teaser
              ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
          )}
        >
          {leaders.map((leader, index) => (
            <Reveal
              as="li"
              key={leader.slug}
              className="h-full"
              delay={Math.min(index, 4) * 80}
              distance={teaser ? 16 : 24}
            >
              <FullCard leader={leader} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Monogram({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-display grid place-items-center bg-brand-800 text-white/75",
        className,
      )}
    >
      <span className="font-display text-4xl font-semibold tracking-tight">{initials || "—"}</span>
    </span>
  );
}

function FullCard({ leader }: { leader: Leader }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/10 bg-white transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand-500/35 hover:shadow-[0_28px_70px_-38px_rgba(7,85,233,0.3)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-900">
        {leader.image ? (
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 46vw, 92vw"
            // Anchored high so a portrait crop lands on the face, not the middle of the torso.
            className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.035]"
          />
        ) : (
          <Monogram name={leader.name} className="h-full w-full" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
          {leader.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-brand-700">{leader.role}</p>
        {leader.bio ? (
          <p className="mt-4 text-sm leading-relaxed text-ink-900/65">{leader.bio}</p>
        ) : null}
        {leader.location ? (
          <p className="mt-auto pt-6 text-xs font-medium tracking-wide text-ink-400">
            {leader.location}
          </p>
        ) : null}
      </div>
    </article>
  );
}
