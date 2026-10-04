# Motion, Parallax and Scroll Standards

## Core principle

The site should feel cinematic and smooth, but never like a motion demo.

Use motion to guide attention and explain relationships.

Target:
- 20% motion
- 80% stable content

## Preferred stack

Primary:
- GSAP
- ScrollTrigger

Smooth scrolling:
- Lenis, only when it improves the experience

3D:
- React Three Fiber
- Three.js

UI micro interactions:
- CSS transitions
- Framer Motion only when it is a better fit than GSAP

Do not use several animation systems for the same interaction.

## Animation layers

### Layer 1 — CSS

Use CSS for:
- hover states
- opacity transitions
- transforms
- button states
- simple reveals

### Layer 2 — GSAP

Use GSAP for:
- scroll driven text
- pinned sections
- image scale
- horizontal storytelling
- layered parallax
- timeline sequences
- section transitions

### Layer 3 — R3F

Use React Three Fiber only for meaningful 3D:
- hero ecosystem
- abstract cloud/data architecture
- interactive product object
- technology visualization

Do not create a heavy 3D scene just because 3D is possible.

## Hero animation

Hero should have a strong first impression.

Possible composition:
- oversized headline
- short supporting statement
- CTA
- large visual object or video
- subtle depth layers

Animation sequence:
1. page enters
2. headline reveals
3. supporting copy follows
4. CTA follows
5. visual establishes depth
6. scrolling begins the next transformation

Do not delay useful content behind a long intro animation.

## Parallax rules

Use multiple depth layers:

- background: 0.1x
- secondary visual: 0.25x
- main object: 0.45x
- foreground detail: 0.6x

These are starting points, not fixed requirements.

Keep movement subtle enough that the page still feels stable.

Never move important text independently in a way that causes reading difficulty.

## Scroll storytelling

Good patterns:

### Pinned story
A visual stays pinned while content changes beside it.

### Scale transition
A media block grows from contained to full bleed.

### Depth transition
Foreground and background layers move at different rates.

### Horizontal gallery
A horizontal sequence progresses based on vertical scroll.

### Clip reveal
A large image/video reveals through a clean mask.

Use no more than one dominant scroll mechanism per section.

## Micro interactions

Buttons:
- subtle movement
- fast response
- clear hover/focus state

Cards:
- slight image movement
- slight elevation
- no excessive bouncing

Navigation:
- smooth open/close
- focus management
- ESC support
- body scroll lock when required

## GSAP implementation rules

- Use `gsap.context()` or an equivalent cleanup pattern.
- Scope selectors to the component.
- Kill/revert timelines on unmount.
- Prefer transform and opacity.
- Avoid animating layout properties such as width, height, top, left when transform can do the job.
- Use `will-change` sparingly.
- Avoid hundreds of simultaneous ScrollTriggers.
- Avoid scroll event listeners when ScrollTrigger can handle the behavior.
- Respect `prefers-reduced-motion`.

## Reduced motion

When reduced motion is enabled:
- disable parallax
- disable pinned cinematic sequences where needed
- remove large scale movement
- keep simple opacity transitions if comfortable
- never hide content because animation is disabled

## Mobile

Mobile is not a smaller desktop animation.

For mobile:
- reduce travel distance
- remove expensive 3D where necessary
- avoid large pinned scenes that make scrolling awkward
- use simpler reveals
- prioritize readability and touch targets

## Performance

Measure before adding complexity.

Watch:
- initial JavaScript
- WebGL cost
- video size
- image decode cost
- layout shifts
- long main thread tasks
- scroll jank

If an animation causes jank, simplify the animation rather than adding more optimization hacks.
