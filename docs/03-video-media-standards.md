# Video and Media Standards

## Purpose

Short videos should add product detail and credibility.

They should not become decoration everywhere.

## Where to use video

Good locations:
- hero visual
- service hero
- product demonstration
- process section
- case study
- technology section
- portfolio preview

Do not autoplay multiple large videos in the viewport at the same time.

## Video behavior

For silent ambient videos:

```html
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/media/posters/example.webp"
>
  <source src="/media/example.webm" type="video/webm" />
  <source src="/media/example.mp4" type="video/mp4" />
</video>
```

Use a poster for every important video.

## Video rules

- Keep videos short.
- Prefer compressed WebM/AV1 or WebM/VP9 where practical, with MP4 fallback.
- Avoid huge 4K assets for normal page sections.
- Use responsive video dimensions.
- Lazy load videos that are below the fold.
- Use `IntersectionObserver` or a small reusable hook for below fold playback.
- Pause videos when far outside the viewport.
- Respect reduced motion.
- Provide an image fallback.
- Do not depend on video for essential information.

## Suggested video roles

Hero:
5 to 12 seconds, seamless loop, subtle movement.

Service:
6 to 20 seconds showing UI, product flow, dashboard, ecommerce, POS, CRM, ERP or architecture.

Case study:
10 to 30 seconds, focused on one result or workflow.

Background:
Very subtle movement and low visual noise.

## Image rules

Use Next.js Image for normal images.

Always define:
- meaningful alt text for informative images
- empty alt for decorative images
- correct aspect ratio
- appropriate sizes

Use high quality source images but serve responsive optimized versions.

Do not ship massive source files directly to the browser.

## Media directory suggestion

```text
public/
  media/
    images/
    videos/
    posters/
    icons/
```

Use descriptive filenames.

Examples:
- zain-clouds-ecommerce-platform.webp
- zain-clouds-crm-dashboard.webp
- zain-clouds-pos-demo.mp4
- zain-clouds-erp-poster.webp

## Creative direction

Prefer real:
- software interfaces
- product screens
- team footage
- office footage
- data visualizations
- ecommerce interactions
- POS interactions
- CRM workflows
- ERP workflows

Avoid:
- generic stock footage of people typing
- fake futuristic holograms
- robot imagery
- excessive AI visual clichés
