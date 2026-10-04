---
name: parallax-motion
description: Use when the task is about animation, parallax, scroll choreography, GSAP, ScrollTrigger, Lenis, sticky sections, horizontal scroll, reveal or transition polish in the Zain Clouds website. Use ONLY for motion work, not for layout, copy or data changes.
---

# Parallax and motion

Target roughly 20% motion and 80% visual stability. Animation has to earn its place
by communicating hierarchy, product capability, scale, process, interaction or
depth. If a section already reads clearly when still, leave it still.

Read `docs/02-motion-parallax-standards.md` and `docs/03-video-media-standards.md`
first. Also load the `zain-clouds-frontend` skill for the token and component rules.

## The rule that causes the most bugs

**Never use `pin: true` on an element React owns.**

GSAP implements pinning by moving the element into a generated wrapper:

```js
pin.parentNode.insertBefore(spacer, pin);
spacer.appendChild(pin);
```

From that moment React's reference and the real parent disagree. When React later
tries to remove the element it calls `removeChild` on a parent that is not the one
holding it, and the page throws
`NotFoundError: Failed to execute 'removeChild' on 'Node'`. The stack points at a
React internals function, so it reads like a React bug and gets "fixed" by
retrying the removal, which hides the real cause and leaves broken DOM.

Do not suppress it. Do not wrap the removal. Do not catch the error. Replace the
pin.

## Sticky instead of pin

A pinned section is a sticky section plus a scrubbed transform. That is nearly all
of what the pin was doing, and `position: sticky` keeps the node where React put it.

```tsx
<section className="relative">
  <div className="sticky top-0 h-screen overflow-hidden">
    {/* header stays put, track moves */}
  </div>
</section>
```

Then scrub the moving part:

```ts
const ctx = gsap.context(() => {
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${track.scrollWidth - window.innerWidth}`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}, section);

return () => ctx.revert();
```

`invalidateOnRefresh: true` matters: a function based value is recalculated on
refresh, so a resize does not leave the track half translated.

Working references in this repo:

- `src/components/motion/StickyStory.tsx` — sticky media, scrubbed scale
- `src/components/motion/HorizontalScroll.tsx` — sticky horizontal track on desktop,
  native scroll snap rail on mobile and tablet
- `src/components/sections/PortfolioSection.tsx` — sticky section with a grid
  fallback for narrow viewports and reduced motion

## Parallax budget

| Element | Travel | Notes |
| --- | --- | --- |
| Background image | 6 to 10% of its height | Below the fold, never behind text |
| Foreground accent | 3 to 5% | Opposite direction from the background |
| Sticky media scale | 1 to 1.08 | Slow, `scrub: true` |
| Section heading | 0 to 24px rise | `Reveal`, fires once |

- Desktop and tablet get the full range. Mobile gets roughly 40% of it, and
  background parallax is dropped entirely below 768px.
- Reduced motion gets no travel at all. Not "shorter travel", none.
- One scrubbed tween per section. Stacking three scrubs on the same viewport makes
  a page feel unstable and drains the frame budget on mid range phones.

## Reveal defaults

`src/components/motion/Reveal.tsx` is scoped and cleaned up. Use it rather than
writing new scroll entry animations.

- `variant="up"`, `distance` around 24, `duration` 0.7, `once` true.
- `Stagger` handles lists. Put `data-stagger-item` on the children.
- `immediateRender` stays `true` so a reveal is never visible before its tween runs.
- Resolve items with `root.querySelectorAll(selector)`. `gsap.utils.toArray` is not
  scoped by a context and will happily pick up elements from another component.

## Video

`src/components/motion/VideoSection.tsx` is the only video player. Its contract:

- No `<source>` in the markup until the frame is near the viewport.
- `muted`, `playsInline`, `loop`, `preload="metadata"`, poster shown first.
- Play only while intersecting, pause when it leaves. A one way "has been seen"
  latch means every video on the page decodes forever.
- Read readiness from `video.readyState`, not only from the `canplay` event. A
  preloaded video can reach `HAVE_ENOUGH_DATA` before React attaches its handler,
  and the event then never fires again.
- Reduced motion: no autoplay, an explicit play control instead.
- Fall back to the poster on `onError`.
- Long form client video, 20 minutes and up, belongs in the testimonials grid. A
  card renders a real `<video>` only after the reader asks for one, and a card with
  no published file requests nothing at all.

## Smooth scroll

`src/components/providers/SmoothScroll.tsx`. Lenis `lerp: 0.16`,
`syncTouch: false`, `autoRaf: false`, driven by the GSAP ticker so there is one
`requestAnimationFrame` for the whole page.

Refresh ScrollTrigger after the DOM settles: on load, on resize, and on a route or
region change. `ScrollTrigger.config({ ignoreMobileResize: true })` is already set
globally, which is what stops the mobile URL bar from re-measuring every trigger on
every scroll.

## Checklist

- Context scoped to the component root, `ctx.revert()` on cleanup.
- No `pin: true` anywhere.
- Only `transform` and `opacity` in scrubbed work.
- Function based values where the value depends on layout, with
  `invalidateOnRefresh: true`.
- A reduced motion path that is a real alternative, not a faster version of the
  same animation.
- A narrow viewport path that is a real alternative, not a squashed desktop.
- Zero console warnings, including GSAP's own.
