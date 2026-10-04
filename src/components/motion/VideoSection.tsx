"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/animations/motion";
import { PlayIcon } from "@/components/ui/icons";

type VideoSectionProps = {
  src: string;
  poster: string;
  title?: string;
  transcript?: string;
  className?: string;
  ratioClassName?: string;
  /** eager-load the source instead of waiting for the viewport */
  priority?: boolean;
  /** browser-chrome style overlay drawn around the frame */
  chrome?: "browser" | "terminal" | "none";
  chromeLabel?: string;
};

/**
 * Accessible ambient product video.
 *
 * - Lazy: the source is only requested when the frame nears the viewport.
 * - Only autoplays muted, playsInline, with a poster showing first.
 * - Pauses when it leaves the viewport.
 * - Respects prefers-reduced-motion: no autoplay; a poster with an explicit
 *   play control is shown instead.
 * - Falls back to the poster image if the video fails to load.
 */
export function VideoSection({
  src,
  poster,
  title,
  transcript,
  className,
  ratioClassName = "aspect-video",
  priority = false,
  chrome = "none",
  chromeLabel,
}: VideoSectionProps) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [near, setNear] = useState(
    () => priority || (typeof window !== "undefined" && !("IntersectionObserver" in window)),
  );
  /**
   * `inView` is a two way latch, unlike `near`. Once a video has been near enough to
   * fetch, it keeps its source so returning to it is instant, but it only plays while
   * the frame is actually on screen. Without that distinction every video on the page
   * kept decoding after the reader scrolled past it, which is exactly the sort of
   * thing that makes a long page feel heavy.
   */
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [userPlayed, setUserPlayed] = useState(false);

  const shouldLoad = priority || near || userPlayed;

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    // The observer runs even for a `priority` frame. `priority` controls when the
    // source is fetched, not whether the video plays, and an early return here meant
    // a priority frame had `inView` stuck at false and therefore never played at all.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setNear(true);
          setInView(entry.isIntersecting);
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || failed) return;
    /**
     * Readiness is read from the element, not only from the `canplay` event.
     *
     * A video that was preloaded in the HTML head can reach `HAVE_ENOUGH_DATA`
     * before React attaches its delegated media handlers, in which case `canplay`
     * has already fired and will not fire again. Trusting the event alone left the
     * video permanently unstarted: present in the DOM, `readyState` 4, paused
     * forever. Checking `readyState` directly closes that race.
     */
    const canPlay = ready || video.readyState >= 3;
    if (!canPlay) return;
    // Reduced motion means no autoplay at all. A reader who pressed play has asked
    // for it explicitly, so that is still honoured.
    if (reduced && !userPlayed) {
      video.pause();
      return;
    }
    if (userPlayed || inView) {
      video.play().catch(() => setFailed(true));
      return;
    }
    video.pause();
  }, [inView, ready, shouldLoad, reduced, userPlayed, failed]);

  // Tab visibility is as strong a signal as scrolling: a background tab should never
  // be decoding video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [shouldLoad]);

  const handleUserPlay = () => {
    setUserPlayed(true);
  };

  return (
    <figure className={cn("group relative h-full w-full", className)}>
      <div
        ref={wrapRef}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-ink-950 ring-1 ring-white/10",
          ratioClassName,
        )}
      >
        {chrome === "browser" ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-10 items-center gap-1.5 border-b border-white/10 bg-ink-900/60 px-4 backdrop-blur"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            {chromeLabel ? (
              <span className="ml-4 truncate rounded-full bg-white/10 px-3 py-0.5 font-mono text-[11px] text-white/60">
                {chromeLabel}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* poster */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            ready && !failed ? "opacity-0" : "opacity-100",
          )}
        />

        {shouldLoad && !failed ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            onLoadedMetadata={() => setReady(true)}
            onCanPlay={() => setReady(true)}
            onError={() => setFailed(true)}
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              ready && !reduced ? "opacity-100" : "opacity-0",
            )}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : null}

        {/* reduced-motion / failed: explicit play affordance */}
        {(!shouldLoad || reduced || failed) && !userPlayed ? (
          <button
            type="button"
            onClick={handleUserPlay}
            className="absolute inset-0 z-30 flex items-center justify-center text-white outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            aria-label={title ? `Play ${title} overview` : "Play video"}
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <PlayIcon className="h-6 w-6" />
            </span>
          </button>
        ) : null}
      </div>

      {(title || transcript) && (
        <figcaption className="sr-only">
          {title ? <span>{title}.</span> : null}{" "}
          {transcript ? <span>{transcript}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}