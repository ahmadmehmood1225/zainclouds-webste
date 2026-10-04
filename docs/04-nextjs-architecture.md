# Next.js Architecture

## Stack

Use:
- Next.js App Router
- TypeScript
- React
- Tailwind CSS or the project's existing styling system
- GSAP + ScrollTrigger for advanced motion
- Lenis only when justified
- React Three Fiber only for meaningful 3D
- next/image
- next/font where applicable

Inspect the existing project before adding dependencies.

## Component structure

Suggested structure:

```text
src/
  app/
    page.tsx
    services/
      page.tsx
      ecommerce/
        page.tsx
      crm/
        page.tsx
      erp/
        page.tsx
      erpnext/
        page.tsx
      pos/
        page.tsx
      custom-software/
        page.tsx
    work/
    company/
    contact/

  components/
    layout/
    navigation/
    sections/
    services/
    media/
    motion/
    ui/

  data/
    services.ts
    navigation.ts
    projects.ts

  lib/
    motion/
    seo/
    utils/
```

Adapt this to the actual repository.

## Server vs Client Components

Default to Server Components.

Client Components should be isolated around:
- GSAP
- browser APIs
- pointer interaction
- video controls
- WebGL
- interactive navigation

Do not turn an entire page into a Client Component just because one section is animated.

## Motion components

Prefer reusable primitives:

- `Reveal`
- `Parallax`
- `ScrollScale`
- `PinnedStory`
- `MediaReveal`
- `MagneticButton`
- `HorizontalScroll`
- `VideoSection`
- `ThreeScene`

Each component should have a clear purpose and safe defaults.

## Service data

Service pages should be driven by structured data where possible.

Example:

```ts
export const services = {
  ecommerce: {
    slug: "ecommerce",
    title: "Ecommerce",
    description: "...",
    capabilities: [],
    media: {},
  },
}
```

Avoid duplicating the same layout logic six times.

## Routing

Use clean URLs:

- `/services`
- `/services/ecommerce`
- `/services/crm`
- `/services/erp`
- `/services/erpnext`
- `/services/pos`
- `/services/custom-software`

## SEO

Every service page needs unique:
- title
- description
- canonical URL
- Open Graph metadata
- Twitter/X metadata where appropriate
- structured data
- heading hierarchy

Create sitemap and robots configuration using Next.js conventions.

## Accessibility

Must support:
- keyboard navigation
- visible focus
- semantic headings
- useful alt text
- accessible forms
- adequate contrast
- reduced motion
- touch friendly controls

Animation must never be required to understand content.

## Error handling

Add:
- not found page
- error boundary
- loading states where useful
- graceful media fallbacks

## Code quality

Avoid:
- giant page components
- duplicated animation code
- global DOM selectors
- arbitrary magic numbers everywhere
- unnecessary client rendering
- unoptimized media
- console errors
