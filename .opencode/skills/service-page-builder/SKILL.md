---
name: service-page-builder
description: Use when creating or changing a service page or service section in the Zain Clouds website, including /services, /services/[slug], the services accordion, service data in src/data/services.ts, or anything under src/components/services. Use ONLY for service pages and service content, not for industry, portfolio or company pages.
---

# Service pages

Zain Clouds sells six services, each with its own page:

- `/services/ecommerce`
- `/services/crm`
- `/services/erp`
- `/services/erpnext`
- `/services/pos`
- `/services/custom-software`

Read `docs/06-zain-clouds-build-prompt.md` for the build intent and load the
`zain-clouds-frontend` skill for tokens, components and the architecture rules.

## Two different things, do not confuse them

**Practices** are how the company delivers, five of them, shown as the accordion on
`/services`:

- `01 AI & Data Innovation`
- `02 Custom Software Development`
- `03 Strategy & Consultation`
- `04 Cloud & DevOps`
- `05 QA & Audits`

They live in `src/data/practices.ts`, render through
`src/components/sections/ServicesAccordion.tsx`, and each one names the service
pages it covers in its `related` array.

**Services** are what the client buys, six of them, listed as the index below the
accordion and each with a detail page. They live in `src/data/services.ts`.

A practice is not a service and must not get a page. A service is not a practice
and must not appear in the accordion.

## The Service type

`src/data/services.ts` is the single source for a service page. Every field is
required, so a new service cannot be added half finished.

```ts
{
  slug, number, name, path, tagline, heroTitle, intro,
  problems: string[],   // what is broken today
  solution,             // the approach in one paragraph
  features: string[],   // main capabilities
  benefits: string[],   // outcomes and business value
  integrations: string[],
  faqs: ServiceFaq[],
  accent,               // "green" | "pink" | "yellow" | "navy"
  category, video, poster,
  spotlight: ServiceSpotlight,
  seo: { title, description, keywords: string[] },
}
```

`ServicePageView` reads all of it. Change the data, not the view, unless a genuinely
new section is required for every service.

## Required structure

1. Hero, `LocalizedPageHero`
2. Service overview, the `intro` and the problem it solves
3. Main capabilities, `features`
4. Product or UI visual, `VideoSection` with the service `video` and `poster`
5. Short video where it earns its place
6. How the problem is solved, `problems` against `solution`
7. Technology and integrations
8. Process, the shared process section
9. Outcomes, `benefits`
10. Related services, from `ui.relatedTitle` and the service graph
11. CTA

## Rules

- Every page feels distinct in composition, identical in system. Change layout and
  rhythm, never the tokens.
- **Do not invent customer results, statistics, testimonials or numbers.** If a
  figure is not in the data, it does not go on the page. This is a hard rule.
- Video is lazy. `VideoSection` never puts a `<source>` in the markup before the
  frame is near the viewport.
- `accent` picks the identity colour for cards and rules. Keep it to the four
  defined values and keep pink and yellow small.
- Every page emits `serviceStructuredData`, `breadcrumbStructuredData` and
  `faqStructuredData` from `src/lib/jsonld.ts`. Structured data and canonical
  metadata stay the English original.
- `generateStaticParams` returns every service, and `generateMetadata` reads
  `service.seo`. Neither is optional.
- `notFound()` for an unknown slug. Never render an empty page.
- Arabic is a partial override in `src/data/i18n/content/services.ar.ts`, merged per
  slug. The `seo` object is deliberately not translated.

## Adding a service

1. Add the record to `src/data/services.ts`, all fields, with a real `video` and
   `poster` under `public/media/`.
2. Add the Arabic override for the prose fields in
   `src/data/i18n/content/services.ar.ts`.
3. Add the path to `src/data/navigation.ts` and the footer service links.
4. Point at least one practice at it in `src/data/practices.ts` `related`.
5. Run `npm run typecheck` and `npm run build`, then load the page and check
   overflow at 375, 768, 1024 and 1440.

## Checklist

- The page is reachable from `/services`, the header and the footer.
- No invented numbers anywhere.
- Arabic renders RTL correctly, including directional icons and any asymmetric
  spacing.
- Video does not request its source before it is needed.
- Keyboard traversal reaches the CTA, and focus is visible on every stop.
- Key content is present with JavaScript disabled.
