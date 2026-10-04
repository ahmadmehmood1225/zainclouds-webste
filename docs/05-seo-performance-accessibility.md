# SEO, Performance and Accessibility Standards

## SEO

The website is a company website and service lead generation site.

Implement:
- unique metadata for every page
- canonical URLs
- Open Graph
- social metadata
- sitemap.xml
- robots.txt
- semantic HTML
- one clear H1 per page
- logical H2/H3 hierarchy
- descriptive URLs
- internal linking
- service page cross linking
- Organization structured data
- WebSite structured data
- BreadcrumbList where useful
- Service structured data where appropriate

Do not generate fake reviews, ratings, awards, clients, statistics or certifications.

## Content

Search optimized content must still sound human.

Use real service terms:
- Ecommerce
- CRM
- ERP
- ERPNext
- POS
- Custom Software Solutions

Do not stuff keywords.

## Performance

Target excellent Core Web Vitals.

Prioritize:
- small initial JavaScript
- server rendering
- optimized fonts
- optimized images
- lazy media
- lightweight animation
- no unnecessary WebGL
- no layout shift
- no giant hero video download before needed

Do not sacrifice visual quality unnecessarily. Instead, load heavy media intelligently.

## Accessibility

Required:
- keyboard navigation
- visible focus
- semantic landmarks
- descriptive buttons
- accessible navigation
- proper labels
- reduced motion
- captions/transcripts for meaningful video
- decorative media hidden from assistive technology where appropriate

## Responsive testing

Check:
- 1440px+
- 1280px
- 1024px
- 768px
- 390px
- 360px

Do not simply scale desktop down. Redesign animation behavior for mobile.

## Production verification

Before completion:
- `npm run lint` or repository equivalent
- `npm run build`
- typecheck if configured
- inspect important routes
- inspect console
- inspect network/media loading
- test keyboard navigation
- test reduced motion
- test mobile
