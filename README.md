# Zain Clouds OpenCode Website Kit

This kit contains:

- `AGENTS.md` — persistent OpenCode project instructions
- `docs/` — detailed design, animation, media, architecture, SEO and build guidance
- `.opencode/skills/` — reusable OpenCode skills
- `opencode.jsonc` — skill permissions
- `docs/06-zain-clouds-build-prompt.md` — main implementation prompt

## Install into an existing Next.js project

Copy the contents of this kit into the root of your Next.js project.

Expected result:

```text
your-nextjs-project/
├── AGENTS.md
├── opencode.jsonc
├── docs/
│   ├── 01-zain-clouds-design-system.md
│   ├── 02-motion-parallax-standards.md
│   ├── 03-video-media-standards.md
│   ├── 04-nextjs-architecture.md
│   ├── 05-seo-performance-accessibility.md
│   └── 06-zain-clouds-build-prompt.md
└── .opencode/
    └── skills/
        ├── zain-clouds-frontend/
        │   └── SKILL.md
        ├── parallax-motion/
        │   └── SKILL.md
        └── service-page-builder/
            └── SKILL.md
```

OpenCode discovers project skills from `.opencode/skills`, and project instructions from `AGENTS.md`.

Start OpenCode from the project root.

Then paste the contents of:

`docs/06-zain-clouds-build-prompt.md`

as the first major implementation prompt.

The reference screenshot supplied with the project is a visual benchmark only. Do not copy its proprietary assets, text or exact layout.
