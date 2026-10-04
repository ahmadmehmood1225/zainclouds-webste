"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useT } from "@/lib/use-copy";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Project card.
 *
 * The card is a link, not a container with a click handler, so it behaves like a
 * real destination: middle click, cmd click, right click and "open in new tab" all
 * work, and the whole thing is reachable by keyboard with one tab stop.
 *
 * A project can have a second destination, its live site, which opens in a new tab.
 * That link must not be nested inside the card's own link, so the card is an
 * `<article>` and the card link is a stretched pseudo element behind everything.
 * The live link sits on its own layer above that overlay, which keeps the whole card
 * clickable while leaving two genuine, separately focusable links.
 *
 * The hover is deliberately restrained: the artwork scales a little, the arrow
 * travels, and the technologies are already visible without a hover. Nothing is
 * revealed on hover, because a card that hides its own content is a card that
 * screenshots badly and reads badly on a touch device.
 */
export function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
}) {
  const t = useT();

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden bg-white",
        "rounded-2xl border border-ink-900/10",
        "transition-[border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-ink-900/20",
        "hover:shadow-[0_24px_60px_-30px_rgba(27,26,24,0.4)]",
        "focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-brand-600",
      )}
      data-cursor="View"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent"
        />

        <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
          {project.category}
        </span>
        {typeof index === "number" ? (
          <span className="num absolute right-4 top-4 font-display text-xs font-semibold tracking-[0.2em] text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}

        <span
          aria-hidden="true"
          className="absolute bottom-4 left-4 inline-flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full bg-white text-ink-900 opacity-0 transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900 sm:text-xl">
            <Link
              href={`/services/${project.service}`}
              className="after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none"
            >
              {project.name}
            </Link>
          </h3>
          <span className="shrink-0 pt-0.5 text-xs font-medium text-ink-500">
            {project.region}
          </span>
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-ink-900/60">
          {project.description}
        </p>

        <p className="mt-4 flex items-start gap-2 text-sm leading-snug text-brand-700">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
          />
          {project.result}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-medium text-ink-600"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <span className="text-xs font-medium tracking-wide text-ink-400">
            {t("ui.caseStudyOnRequest")}
          </span>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className={cn(
                "relative z-10 inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 px-3 py-1.5",
                "text-xs font-semibold text-ink-900 transition-colors duration-300",
                "hover:border-brand-600 hover:text-brand-700",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
              )}
            >
              {t("ui.visitLiveSite")}
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span className="sr-only">
                {` (${project.name} ${t("ui.opensInNewTab")})`}
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
