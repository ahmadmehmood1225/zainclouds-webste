# Zain Clouds — Main OpenCode Build Prompt

Build and refine the Zain Clouds company website in this existing Next.js repository.

First inspect the repository, package.json, existing routes, components, styles, assets, fonts and configuration. Do not replace working infrastructure without a reason.

Read these project documents before implementation:
- docs/01-zain-clouds-design-system.md
- docs/02-motion-parallax-standards.md
- docs/03-video-media-standards.md
- docs/04-nextjs-architecture.md
- docs/05-seo-performance-accessibility.md

Also load the relevant OpenCode skills for frontend, parallax motion and service pages.

## Company

Zain Clouds is a Saudi Arabia based private limited software company registered across Gulf countries, with offices in Saudi Arabia, Pakistan and Dubai.

Services:
- Ecommerce
- CRM
- ERP
- ERPNext
- POS
- Custom Software Solutions

## Visual target

Use the supplied reference screenshot as a visual benchmark for:
- premium editorial typography
- large visual sections
- strong whitespace
- layered media
- scroll storytelling
- parallax depth
- large statement sections
- full width visual moments
- professional B2B presentation

Do not copy its exact layout, text, assets, branding or proprietary design.

The result must feel like a high end software organization website, not a generic agency template.

## Typography

Use:
- ABC Favorit Trial for headings/display
- Suisse Int'l for body text

Create responsive large typography using clamp.

## Branding

Use Zain Clouds blue `#0755E9` as the primary color, with white as the
predominant page background and deep blue for text. Keep the palette disciplined
and use blue tints for supporting and interactive states.

## Homepage

Create a strong homepage narrative:

1. Minimal premium header
2. Hero with oversized headline, supporting copy, CTA and an impressive visual
3. Hero visual should use either a lightweight 3D software/data ecosystem or a short high quality product video
4. Trust/capability statement
5. Services ecosystem
6. Ecommerce, CRM, ERP, ERPNext, POS and Custom Software cards or visual modules
7. Scroll driven “how we build” process
8. Technology / delivery capability
9. Selected work / case study storytelling
10. Company credibility section
11. Strong final CTA
12. Large premium footer

## Hero

Make the hero memorable.

Use:
- oversized headline
- short copy
- primary CTA
- secondary CTA if useful
- large visual
- subtle depth
- controlled parallax

Use GSAP and ScrollTrigger for the hero's scroll choreography.

If 3D is used:
- keep it lightweight
- lazy load it
- provide a non WebGL fallback
- reduce or remove it on low powered mobile devices
- respect reduced motion

## Scroll experience

Create professional scroll transitions such as:

- text reveal
- image scale
- image clip reveal
- background depth
- pinned visual storytelling
- subtle horizontal movement
- media transition from contained to full bleed
- layered parallax

Do not animate everything.

Each major section should have one clear motion concept.

Avoid:
- excessive bouncing
- exaggerated zoom
- constant floating
- random rotation
- scroll hijacking
- animations that make text difficult to read

## Short videos

Use short videos to explain:
- product UI
- ecommerce experience
- CRM workflow
- ERP workflow
- ERPNext workflow
- POS flow
- custom software
- process / delivery

Videos must:
- be muted when autoplaying
- use `playsInline`
- have posters
- be optimized
- lazy load below the fold
- pause when not visible where appropriate
- have image fallback
- respect reduced motion

Do not make essential content depend on video.

## Service pages

Create a separate page for every service:

- `/services/ecommerce`
- `/services/crm`
- `/services/erp`
- `/services/erpnext`
- `/services/pos`
- `/services/custom-software`

Every page must feel unique while sharing the same design system.

Each service page needs:

1. Hero
2. Service overview
3. Main capabilities
4. Product / UI visual
5. Short video where useful
6. How we solve the problem
7. Technology / integrations
8. Process
9. Outcomes or business value
10. Related services
11. CTA

Do not invent customer results or statistics.

## Animation architecture

Create reusable animation components instead of one off animation code.

Recommended primitives:
- Reveal
- Parallax
- ScrollScale
- PinnedStory
- MediaReveal
- HorizontalScroll
- MagneticButton
- VideoSection
- ThreeScene

Use GSAP context cleanup.

Do not use global query selectors.

Keep animation logic isolated in client components.

## Responsive behavior

Desktop:
- cinematic scroll
- larger parallax distances
- pinned storytelling where useful
- 3D where justified

Tablet:
- reduce motion distance
- simplify complex compositions

Mobile:
- remove heavy 3D if needed
- reduce parallax
- avoid awkward pinned sections
- prioritize fast content access
- maintain visual quality

## SEO

Implement complete on page SEO:
- metadata
- canonical
- Open Graph
- sitemap
- robots.txt
- semantic headings
- structured data
- breadcrumbs where useful
- internal links
- unique service metadata

## Accessibility

Implement:
- keyboard navigation
- visible focus
- semantic HTML
- proper labels
- accessible mobile menu
- reduced motion
- good contrast
- descriptive image alt text
- captions/transcripts for meaningful video

## Content style

Use simple, confident professional English.

Do not use:
- robotic wording
- generic AI marketing phrases
- fake claims
- fake statistics
- fake client logos
- excessive buzzwords
- hyphenated marketing copy

## Final quality bar

The finished website should feel:
- premium
- modern
- technically strong
- calm
- confident
- visually memorable
- smooth
- fast
- accessible
- SEO ready

Before finishing, run lint, typecheck if configured, build, and inspect the major routes on desktop and mobile. Fix errors instead of merely reporting them.
