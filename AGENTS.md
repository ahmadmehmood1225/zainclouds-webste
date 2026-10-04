# Zain Clouds Website — OpenCode Project Instructions

This repository is the production website for Zain Clouds, a Saudi Arabia based private limited software company with offices in Saudi Arabia, Pakistan, and Dubai.

## Mandatory instruction loading

Before making or proposing frontend changes, read these project documents:

- `docs/01-zain-clouds-design-system.md`
- `docs/02-motion-parallax-standards.md`
- `docs/03-video-media-standards.md`
- `docs/04-nextjs-architecture.md`
- `docs/05-seo-performance-accessibility.md`

For the main website build or a major redesign, also read:

- `docs/06-zain-clouds-build-prompt.md`

When a task is specifically about animation, parallax, scrolling, or 3D, load the `parallax-motion` skill.

When a task is specifically about service pages, load the `service-page-builder` skill.

When working on the general site, load the `zain-clouds-frontend` skill.

Treat these documents as project requirements, not optional suggestions.

## Product direction

Build a premium B2B software development organization website.

The visual reference supplied by the user is a design direction only. Use its principles:
- large editorial typography
- strong visual storytelling
- full width media sections
- layered images and video
- smooth scroll driven transitions
- restrained parallax
- generous white space
- large statements
- premium corporate presentation
- sections that visually transform while scrolling

Do not copy the reference site's branding, text, proprietary assets, exact layout, or distinctive content.

## Brand

Company: Zain Clouds

Services:
- Ecommerce
- CRM
- ERP
- ERPNext
- POS
- Custom Software Solutions

Typography:
- Headings / display: `ABC Favorit Trial`, sans-serif
- Default body: `Suisse Int'l`, sans-serif

Brand palette:
- dark blue
- pink
- yellow
- green
- light green
- white

Avoid:
- robot imagery
- generic AI generated looking illustrations
- excessive gradients
- excessive glassmorphism
- tiny typography
- random animations
- animation on every element
- visual clutter
- hyphenated marketing copy
- robotic or generic marketing language

## Animation philosophy

Target approximately 20% motion and 80% visual stability.

Animation must communicate:
- hierarchy
- product capability
- scale
- process
- interaction
- depth

Animation must never make the website difficult to read or navigate.

Use GSAP + ScrollTrigger for complex scroll choreography and Lenis only where smooth scrolling materially improves the experience. Use React Three Fiber only for meaningful 3D hero or product scenes.

Every animation must have:
- mobile behavior
- reduced motion behavior
- cleanup on unmount
- no unnecessary layout thrashing
- no hydration problems

## Engineering rules

- Use Next.js App Router and TypeScript.
- Prefer Server Components.
- Add `"use client"` only where interaction or browser APIs require it.
- Keep animation code isolated from content and data.
- Create reusable components instead of copying section markup.
- Keep services data driven.
- Use semantic HTML.
- Keep pages accessible.
- Optimize images and videos.
- Do not introduce a library when a small local implementation is sufficient.
- Do not rewrite working project infrastructure without a reason.
- Inspect the existing repository before creating or replacing architecture.

## Quality gate

Before considering a major frontend task complete:
1. Run the project's lint/typecheck/build commands.
2. Test desktop and mobile layouts.
3. Test reduced motion.
4. Check console for errors.
5. Check that animations do not cause horizontal overflow.
6. Check video autoplay/fallback behavior.
7. Check metadata and canonical URLs for changed pages.
8. Verify that important content is present without JavaScript animation.
