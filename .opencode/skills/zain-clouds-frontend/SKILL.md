---
name: zain-clouds-frontend
description: Use when working on the Zain Clouds website frontend, including any change under src/app, src/components, src/lib, src/data, Tailwind classes, layout, typography, colour, or design tokens. Encodes the project's palette, Urbanist/Open Sans type roles, component conventions, bilingual EN/AR content rules and the quality gate every change must pass.
---

# Zain Clouds frontend

The production website for Zain Clouds, a software company with offices in Saudi
Arabia, Pakistan and Dubai. Next.js App Router, React 19, TypeScript, Tailwind v4,
GSAP + ScrollTrigger, Lenis. One animation library only. No Motion, no Framer Motion.

## Read the docs first

These are requirements, not suggestions. Read the ones that match the task before
proposing or writing frontend code:

- `docs/01-zain-clouds-design-system.md`
- `docs/02-motion-parallax-standards.md`
- `docs/03-video-media-standards.md`
- `docs/04-nextjs-architecture.md`
- `docs/05-seo-performance-accessibility.md`
- `docs/06-zain-clouds-build-prompt.md` for the main site build or a redesign

## Colour

Warm, quiet, corporate. Defined as Tailwind v4 tokens in `src/app/globals.css`.

| Role | Token | Value |
| --- | --- | --- |
| Paper | `ink-50` | `#f7f6f3` |
| Surface | `ink-100` | `#f0eee9` |
| Border | `ink-200` / `ink-300` | `#e2dfd8` / `#c8c4bb` |
| Muted text | `ink-500` | `#78746c` |
| Body text | `ink-900` | `#1b1a18` |
| Inverted bg | `ink-950` | `#111110` |
| Brand accent | `brand-600` / `brand-700` | `#336546` / `#2a513a` |

The legacy `navy-*`, `teal-*` and `green-*` scales are aliases of `ink-*` and
`brand-*` and still resolve, so old class names keep working. Prefer writing new
markup with `ink-*` and `brand-*`; do not add new colours outside these ramps.
`pink-*` and `yellow-*` are small desaturated service accents only.

Contrast pairs that are already verified: white on `brand-700` is 8.9:1, white on
`ink-900` is 17:1, `brand-600` is a safe focus ring on both white and `ink-950`.

Never use: neon, glow, drop-shadow stacks, gradient text, glassmorphism, or a
gradient behind body copy.

## Typography

Urbanist for display, navigation, buttons, labels, numbers and project titles.
Open Sans for body copy. IBM Plex Sans Arabic for Arabic, wired through
`--font-arabic-stack` and applied by the `[dir="rtl"]` rules in `globals.css`.

- `font-display` resolves to Urbanist, `font-sans` to Open Sans.
- `text-balance` on headings, `text-pretty` on paragraphs. Already global.
- Never go below `text-xs`, and `text-xs` is reserved for labels and meta.
- Numbers, order ids and currency get the `num` class so they stay LTR inside
  Arabic text.

## Components

Reuse before writing. The existing set:

- Layout: `Container`, `SectionHeading`, `Button`, `Breadcrumbs`
- Content: `ServiceCard`, `ProjectCard`, `Accordion`
- Motion: `Reveal`, `Stagger`, `Parallax`, `ParallaxImage`, `TextReveal`,
  `MediaReveal`, `ImageReveal`, `ScrollScale`, `MagneticButton`, `StickyStory`,
  `HorizontalScroll`, `PinnedStory`, `VideoSection`, `ScrollProgress`
- Chrome: `CustomCursor`, `Header`, `Footer`, `SmoothScroll`

`SectionHeading` has exactly one variant, `dark`. Do not add tones.

`Button` variants are `primary`, `dark`, `outline-light`, `outline-dark`, `light`,
`ghost`. Adding a variant means editing `variantClasses` and checking contrast.

## Architecture rules

- Server Components by default. `"use client"` only for interaction or browser APIs.
- Animation code stays out of content and data files.
- Services, practices, projects, industries and testimonials are data driven. Add a
  record, do not write a parallel component.
- `gsap.context(fn, root)` scoped to the component's own root, cleaned with
  `ctx.revert()`. Never a module level tween.
- Selectors inside a scoped context must be resolved with
  `root.querySelectorAll(...)`, not `gsap.utils.toArray(...)`.
- **Never `pin: true` on a React owned element.** GSAP moves the node into a
  generated `.pin-spacer` div, which breaks React's ownership of the document and
  produces `NotFoundError: Failed to execute 'removeChild' on 'Node'`. Use CSS
  `position: sticky` and scrub a transform. See `StickyStory` and
  `HorizontalScroll`.
- Never insert, remove or reparent a DOM node from script. Move with
  `style.transform` only. If something needs to be inserted, it is React's job.
- Import `gsap` and `ScrollTrigger` from `@/lib/animations/gsap`. Do not import from
  `"gsap"` directly, or the plugin registration is bypassed.
- Only `transform` and `opacity` in scroll driven work. Avoid `width`, `height`,
  `top`, `left` and `filter` in anything scrubbed.
- Reduced motion is not optional. `prefersReducedMotion()` for imperative work,
  `useReducedMotion()` for React, `motion-reduce:` for CSS.
- Lenis: `lerp` around 0.16, `syncTouch: false`, driven by the GSAP ticker. No heavy
  scroll hijacking, no scroll snapping on desktop.

## Bilingual content

English is the source of truth. Arabic is a typed partial override merged per slug
or id, so a missing translation can never break a page.

- Copy dictionary: `src/data/i18n/copy/*.en.ts` and the matching `.ar.ts`. The
  Arabic mirror is checked against the English key union at compile time, so a new
  key must be added to both files or the build fails.
- Prose: `src/data/<name>.ts` for English, `src/data/i18n/content/<name>.ar.ts` for
  the override, read through a `use<Name>()` hook in `src/lib/use-content.ts`.
- Every list needs an RTL check. Directional icons take `rtl:rotate-180`, and
  asymmetric padding uses logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`).
- Structured data and canonical metadata stay the English original.

## Quality gate

Run before calling a change done:

1. `npm run typecheck` and `npm run lint`
2. `npm run build`
3. Every changed page in a browser: no console errors, no hydration warnings
4. `document.documentElement.scrollWidth === clientWidth` at 375, 768, 1024 and 1440
5. Reduced motion: load the page with the preference forced on and confirm content
   is fully readable with no animation
6. Keyboard: tab through the change, focus is always visible
7. Confirm key content is present with JavaScript disabled

Never leave the tree in a state that does not typecheck.
