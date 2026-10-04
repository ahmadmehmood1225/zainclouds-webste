"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PauseIcon, PlayIcon, VolumeOff, VolumeOn } from "@/components/ui/icons";
import { useTestimonials } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import { prefersReducedMotion } from "@/lib/animations/motion";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/cn";

/**
 * "We Let Them Talk. Here's What They Said."
 *
 * The clips are short, vertical and recorded on a phone, and that single fact decides
 * most of the design here.
 *
 * - **Portrait, not cropped.** Every clip is 9:16, so the media frame keeps that ratio.
 *   Putting a vertical recording in a 16:9 frame crops the speaker's head off, which is
 *   the one thing a testimonial clip cannot do.
 * - **Four across, not two.** Two wide cards forced a 16:9 frame that no longer suited
 *   the footage. Four narrow portrait cards suit it and keep the section one line.
 * - **Hover previews muted and loops.** Each clip has an audio track and browsers block
 *   unmuted autoplay, so hovering starts a silent looping preview and sound is opt in
 *   through the speaker control. A cursor crossing the grid can therefore never make
 *   noise. Only the hovered card plays, so a sweep costs one clip, not four.
 * - **Touch has no hover**, so the play button is the real control there, and it is the
 *   only way to get sound, because an explicit press is a user gesture.
 * - **Reduced motion gets no autoplay at all.** The button still works.
 * - **Nothing is fetched speculatively.** The four clips are about 10 MB together, so a
 *   card only attaches its clip once it is near the viewport, and shows a poster frame
 *   until then. Cost for an untouched section is four small JPEGs.
 */
export function TestimonialsSection() {
  const t = useT();
  const testimonials = useTestimonials();

  return (
    <section
      className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <SectionHeading
              id="testimonials-heading"
              label={t("testimonials.label")}
              title={t("testimonials.title")}
              description={t("testimonials.description")}
              dark
            />
          </Reveal>
          <Reveal delay={120} distance={20}>
            <p className="max-w-xs text-sm leading-relaxed text-white/45">
              {t("testimonials.hoverToPlay")}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:mt-16 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.slug} delay={Math.min(index, 3) * 80} distance={20}>
              <li className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * Sticky flag: the clip's `src` is attached on the first sign of intent and then left
   * alone, so a second hover replays from cache instead of refetching.
   *
   * It is deliberately NOT armed by an IntersectionObserver. These recordings were
   * exported straight off a phone, so the `moov` atom sits at the end of the file and the
   * browser has to pull the whole thing just to read the duration. With
   * `preload="metadata"` an untouched section still cost about 9 MB. Nothing is
   * attached until the reader hovers or presses play, and an untouched section costs
   * four small poster frames.
   */
  const [loaded, setLoaded] = useState(false);
  /** True between pointer entering and leaving, on a fine pointer only. */
  const [hovering, setHovering] = useState(false);
  /** The reader pressed play. Survives pointer leave, unlike a hover preview. */
  const [engaged, setEngaged] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const hasVideo = Boolean(testimonial.video);
  /** Hover is a preview. It must never start on its own under reduced motion. */
  const hoverActive = hasVideo && hovering;
  const shouldPlay = engaged || hoverActive;

  // Play and pause follow `shouldPlay`, and sound follows `muted`.
  //
  // `loaded` is read here because attaching the clip changes what this effect has to
  // act on, and that is a state change rather than a render time fact. It is set from
  // the handlers below instead of from an effect, because a setState in an effect that
  // only mirrors a boolean is a render pass with no work in it.
  useEffect(() => {
    const node = videoRef.current;
    if (!node || !hasVideo) return;
    node.muted = muted;
    if (shouldPlay) {
      // A hover preview is silent. Reduced motion also refuses the preview outright,
      // which is why this check is here and not in render: reading the media query
      // during render is false on the server and true on the client, which is a
      // hydration mismatch.
      const preview = !engaged && hovering;
      if (preview && prefersReducedMotion()) {
        // Reduced motion can be switched on mid hover, so make sure nothing is left
        // running rather than simply never starting.
        node.pause();
        return;
      }
      // Fire and forget. A rejected play leaves the poster and the button in place.
      void node.play().catch(() => {});
    } else {
      node.pause();
      // Rewind a hover preview so the next hover starts from the first frame.
      if (!engaged) node.currentTime = 0;
    }
  }, [shouldPlay, muted, engaged, hovering, hasVideo, loaded]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    node.addEventListener("play", onPlay);
    node.addEventListener("pause", onPause);
    return () => {
      node.removeEventListener("play", onPlay);
      node.removeEventListener("pause", onPause);
    };
  }, []);

  /**
   * Pressing play is intent, so this is also where the clip is attached. Hover does the
   * same in `onPointerEnter`. Attaching from the handlers rather than from an effect is
   * what keeps the untouched section at four poster frames and nothing else.
   */
  const toggleEngaged = useCallback(() => {
    setLoaded(true);
    setEngaged((prev) => !prev);
  }, []);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-400",
        playing ? "border-brand-400/60 bg-ink-900" : "border-white/10 bg-ink-900/50",
      )}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        if (hasVideo) setLoaded(true);
        setHovering(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovering(false);
      }}
      data-cursor={hasVideo ? "Play" : undefined}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-ink-950">
        {/* The poster is a frame from the clip, so the card has an image from the
            first paint without pulling a single byte of video. */}
        {testimonial.poster ? (
          <Image
            src={testimonial.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(65,125,85,0.32),transparent_60%)]"
          />
        )}

        {hasVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={loaded ? testimonial.video : undefined}
            poster={testimonial.poster}
            // Only ever attached at the moment the reader asks for it, so `auto` is the
            // right hint: the clip is wanted the moment it is attached.
            preload="auto"
            muted={muted}
            playsInline
            // Hover preview and press to play both need it to run past the end.
            loop
            controls={engaged}
            aria-label={`${testimonial.company}: ${testimonial.role}`}
          />
        ) : null}

        {/* A soft scrim keeps the badge and the controls readable over any frame. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-ink-950/35"
        />

        {!playing ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid place-items-center"
          >
            <span
              className={cn(
                "inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ink-900",
                "transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                // Reduced motion is handled in CSS rather than by branching in render.
                // `prefersReducedMotion()` is false on the server and true on the client,
                // so using it to pick a class would produce different markup for the
                // same component and trip hydration.
                "motion-safe:group-hover:scale-105",
              )}
            >
              <PlayIcon className="ms-0.5 h-5 w-5" />
            </span>
          </span>
        ) : null}

        {testimonial.duration ? (
          <span className="num pointer-events-none absolute end-4 top-4 rounded-full bg-ink-950/75 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-white/80 backdrop-blur-sm">
            {testimonial.duration}
          </span>
        ) : null}

        {playing && hasVideo ? (
          <span className="pointer-events-none absolute start-4 top-4">
            <span className="flex items-center gap-1.5 rounded-full bg-ink-950/75 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-white/80 uppercase backdrop-blur-sm">
              <span className="flex items-end gap-[2px]" aria-hidden="true">
                <span className="w-[2px] animate-pulse bg-current motion-reduce:animate-none" style={{ height: "6px" }} />
                <span className="w-[2px] animate-pulse bg-current motion-reduce:animate-none" style={{ height: "10px", animationDelay: "120ms" }} />
                <span className="w-[2px] animate-pulse bg-current motion-reduce:animate-none" style={{ height: "7px", animationDelay: "240ms" }} />
              </span>
              {engaged && !muted ? t("testimonials.mute") : t("ui.play")}
            </span>
          </span>
        ) : null}

        {hasVideo ? (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={toggleEngaged}
              aria-pressed={engaged}
              className="inline-flex items-center gap-2 rounded-full bg-ink-950/80 px-3.5 py-2 font-display text-[11px] font-semibold tracking-[0.1em] text-white/90 uppercase backdrop-blur-sm transition-colors duration-300 hover:bg-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
              data-cursor={engaged ? "Close" : "Play"}
            >
              {engaged ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
              {engaged ? t("testimonials.pause") : t("testimonials.resume")}
            </button>

            <button
              type="button"
              onClick={() => {
                // Turning sound on is also a request to keep it playing.
                setLoaded(true);
                setMuted((prev) => !prev);
                setEngaged(true);
              }}
              aria-pressed={!muted}
              aria-label={muted ? t("testimonials.unmute") : t("testimonials.mute")}
              title={muted ? t("testimonials.unmute") : t("testimonials.mute")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/80 text-white/90 backdrop-blur-sm transition-colors duration-300 hover:bg-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              {muted ? <VolumeOff className="h-4 w-4" /> : <VolumeOn className="h-4 w-4" />}
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <blockquote className="text-[0.95rem] leading-relaxed text-white/80">
          <span aria-hidden="true" className="text-brand-400">
            &ldquo;
          </span>
          {testimonial.quote}
        </blockquote>

        <footer className="mt-auto pt-6">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <cite className="font-display text-sm font-semibold not-italic text-white">
              {testimonial.name}
            </cite>
            <span className="text-xs text-white/50">{testimonial.role}</span>
          </div>
          <p className="mt-1 text-sm text-brand-300">{testimonial.company}</p>
          {!hasVideo ? (
            <p className="mt-4 text-xs font-semibold tracking-[0.1em] text-white/40 uppercase">
              {t("testimonials.onRequest")}
            </p>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
