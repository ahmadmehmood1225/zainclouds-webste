# Zain Clouds Design System

## Goal

Create a premium software development organization website that feels established, technical, modern, and trustworthy.

The uploaded visual reference should be treated as inspiration for composition and motion, not as a template to copy.

## Visual language

Use a combination of:

- oversized editorial headlines
- compact supporting copy
- strong contrast
- large visual blocks
- full bleed photography or product footage
- carefully layered media
- geometric framing
- asymmetric layouts
- generous whitespace
- crisp cards
- subtle borders
- strong section transitions

The site should feel closer to a premium technology company presentation than a conventional agency template.

## Brand palette

Use Zain Clouds blue `#0755E9` as the primary brand color. White is the
default page surface; deep blue ink carries readable text and occasional
high-contrast sections. Use lighter and darker shades of the primary blue for
hover, focus, and supporting states rather than introducing unrelated accent
colors.

Keep most sections white or near-white. Reserve solid blue backgrounds for
distinctive moments such as the hero, partnership feature, selected cards, and
calls to action. Do not invent additional colors.

## Typography

Display:
`ABC Favorit Trial`, sans-serif

Body:
`Suisse Int'l`, sans-serif

Typography rules:

- Hero headlines should be large and confident.
- Use responsive `clamp()` sizing.
- Do not use extremely small body text.
- Keep line lengths readable.
- Use font weight and spacing to establish hierarchy.
- Avoid decorative typography that reduces readability.
- Avoid all caps for long sentences.

Example hierarchy:

```css
.hero-title {
  font-size: clamp(3.5rem, 8vw, 9rem);
  line-height: 0.92;
  letter-spacing: -0.055em;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.045em;
}
```

Adjust values to the actual font metrics and design.

## Layout

Use a responsive container with large desktop margins and sensible mobile gutters.

Prefer:
- 12 column desktop grids
- 6 to 8 column tablet logic where useful
- single column mobile layouts
- asymmetric media/text splits
- full bleed visual moments
- sticky storytelling sections when useful

Avoid:
- every section looking like a centered 1200px card
- excessive boxed cards
- repeated identical two column sections

## Header

Header should be minimal and premium.

Suggested structure:

- Zain Clouds logo
- Services
- Solutions / Work
- Company
- Insights
- Contact
- compact CTA

On mobile use a clean animated menu.

The header may become visually lighter or more compact after scrolling, but it must remain usable and accessible.

## Homepage narrative

Suggested narrative:

1. Hero
2. Trust / capability statement
3. Service ecosystem
4. What we build
5. How we work
6. Selected work / case studies
7. Technology and delivery capability
8. Company / trust section
9. CTA
10. Footer

Do not make every section animated. Give major sections one memorable visual idea.

## Copy style

Write like a real software organization.

Good:
- specific
- direct
- confident
- measurable where real data exists
- human
- simple

Avoid:
- “revolutionize”
- “unleash the power”
- “cutting edge solutions”
- “next generation”
- generic AI language
- fake statistics
- fake client logos
- fake certifications
- fake awards

Do not use hyphens in marketing copy unless they are technically required by a proper noun or standard term.

## Service identity

Each service must have its own visual identity while remaining part of the same design system.

Services:
- Ecommerce
- CRM
- ERP
- ERPNext
- POS
- Custom Software Solutions

Each service page should include:
- unique hero
- service promise
- capabilities
- process
- relevant visual or short video
- integrations / technology where appropriate
- outcomes
- related services
- CTA
