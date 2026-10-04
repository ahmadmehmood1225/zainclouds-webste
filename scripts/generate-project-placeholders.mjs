/**
 * Generates placeholder artwork for project cards that do not have final artwork yet.
 *
 * Real client screenshots take priority. A project that already has a `.webp`, `.jpg`,
 * `.jpeg`, `.avif` or `.png` is skipped, so running this never produces a stray SVG
 * sitting next to genuine artwork waiting to be mis-wired into `src/data/projects.ts`.
 *
 * Everything else gets an abstract composition in the current brand palette instead of
 * a grey box or a stock illustration. The compositions are deliberately structural
 * rather than pictorial: a grid, a flow, a pipeline. They read as "a system", which is
 * what the work actually is, and they will not look out of place beside real
 * screenshots once those arrive.
 *
 * Usage: node scripts/generate-project-placeholders.mjs
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public/images/projects");

const W = 1200;
const H = 750;

/* Warm charcoal and one restrained green, matching src/app/globals.css. */
const C = {
  ink: "#1b1a18",
  inkSoft: "#232220",
  inkLine: "#33312d",
  brand: "#417d55",
  brandBright: "#5f9570",
  brandDim: "#2a513a",
  paper: "#f7f6f3",
  paperDim: "#c8c4bb",
};

/** Projects, kept in step with src/data/projects.ts. */
const PROJECTS = [
  { slug: "captain-chef", motif: "commerce" },
  { slug: "smle-guide", motif: "system" },
  { slug: "baba-foods", motif: "modules" },
  { slug: "umrah-online", motif: "commerce" },
  { slug: "drs-lounge", motif: "retain" },
  { slug: "mellot", motif: "pipeline" },
  { slug: "salon-zc", motif: "retain" },
];

/* Deterministic pseudo random so regenerating produces byte identical files. */
function seeded(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function seedFrom(slug) {
  let total = 0;
  for (let i = 0; i < slug.length; i += 1) total = (total + slug.charCodeAt(i) * (i + 7)) % 99991;
  return total;
}

/** Background: charcoal field, one soft brand light source, a faint measuring grid. */
function backdrop(random) {
  const grid = [];
  for (let x = 0; x <= W; x += 60) {
    grid.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${C.inkLine}" stroke-width="1" stroke-opacity="0.5"/>`,
    );
  }
  for (let y = 0; y <= H; y += 60) {
    grid.push(
      `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${C.inkLine}" stroke-width="1" stroke-opacity="0.5"/>`,
    );
  }

  const light = Array.from({ length: 3 }, () => ({
    cx: Math.round(random() * W),
    cy: Math.round(random() * H),
    r: Math.round(260 + random() * 240),
  }))
    .map(
      (l) =>
        `<circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#soft)"/>`,
    )
    .join("");

  return { defs: grid.join(""), light };
}

/** Commerce: a product grid draining into a single order line. */
function commerce() {
  const parts = [];
  const cols = 4;
  const rows = 3;
  const cell = 132;
  const gap = 26;
  const startX = 120;
  const startY = 150;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = startX + c * (cell + gap);
      const y = startY + r * (cell + gap * 0.6);
      const active = (r + c) % 3 === 0;
      parts.push(
        `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="10" fill="${C.inkSoft}" stroke="${active ? C.brand : C.inkLine}" stroke-width="${active ? 2 : 1}"/>`,
        `<rect x="${x + 22}" y="${y + 22}" width="${cell - 44}" height="${cell - 66}" rx="6" fill="${active ? C.brandDim : C.inkLine}"/>`,
        `<rect x="${x + 22}" y="${y + cell - 34}" width="${Math.round((cell - 44) * 0.6)}" height="10" rx="5" fill="${active ? C.brandBright : C.inkLine}"/>`,
      );
    }
  }

  // Order line running out of the grid.
  const y = 620;
  parts.push(`<line x1="120" y1="${y}" x2="900" y2="${y}" stroke="${C.brand}" stroke-width="2"/>`);
  for (let i = 0; i <= 5; i += 1) {
    const x = 120 + i * 156;
    parts.push(
      `<circle cx="${x}" cy="${y}" r="9" fill="${i === 5 ? C.brandBright : C.ink}"/>`,
    );
  }
  parts.push(
    `<rect x="900" y="${y - 34}" width="180" height="68" rx="34" fill="${C.brand}"/>`,
    `<rect x="936" y="${y - 7}" width="108" height="14" rx="7" fill="${C.paper}" fill-opacity="0.85"/>`,
  );
  return parts.join("");
}

/** System: stacked layers, the top one held apart. */
function system() {
  const parts = [];
  const layers = [
    { y: 190, w: 640, op: 0.35 },
    { y: 300, w: 720, op: 0.6 },
    { y: 410, w: 800, op: 1 },
  ];
  for (const layer of layers) {
    parts.push(
      `<rect x="${(W - layer.w) / 2}" y="${layer.y}" width="${layer.w}" height="80" rx="12" fill="${C.inkSoft}" stroke="${C.inkLine}" stroke-width="1" stroke-opacity="${layer.op}"/>`,
    );
  }
  parts.push(
    `<rect x="${(W - 800) / 2}" y="410" width="800" height="80" rx="12" fill="none" stroke="${C.brand}" stroke-width="2"/>`,
  );
  for (let i = 0; i < 4; i += 1) {
    const x = (W - 800) / 2 + 40 + i * 190;
    parts.push(
      `<rect x="${x}" y="437" width="120" height="26" rx="13" fill="${C.brandDim}"/>`,
    );
  }
  for (let i = 0; i < 3; i += 1) {
    const x = (W - 640) / 2 + 40 + i * 200;
    parts.push(`<rect x="${x}" y="237" width="120" height="22" rx="11" fill="${C.inkLine}"/>`);
  }
  return parts.join("");
}

/** Modules: a hub with spokes, the ERP shape. */
function modules() {
  const parts = [];
  const cx = W / 2;
  const cy = H / 2;
  const ring = 210;
  const spokes = 6;

  for (let i = 0; i < spokes; i += 1) {
    const angle = (i / spokes) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * ring;
    const y = cy + Math.sin(angle) * ring;
    parts.push(
      `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${C.inkLine}" stroke-width="2"/>`,
      `<rect x="${(x - 74).toFixed(1)}" y="${(y - 34).toFixed(1)}" width="148" height="68" rx="10" fill="${C.inkSoft}" stroke="${C.brand}" stroke-width="1.5"/>`,
      `<rect x="${(x - 44).toFixed(1)}" y="${(y - 7).toFixed(1)}" width="88" height="14" rx="7" fill="${C.inkLine}"/>`,
    );
  }
  parts.push(
    `<circle cx="${cx}" cy="${cy}" r="96" fill="${C.brandDim}" stroke="${C.brand}" stroke-width="2"/>`,
    `<rect x="${cx - 52}" y="${cy - 8}" width="104" height="16" rx="8" fill="${C.paper}" fill-opacity="0.8"/>`,
  );
  return parts.join("");
}

/** Retail: a receipt with line items, next to a card. */
function retain() {
  const parts = [];
  const x = 200;
  const y = 130;
  parts.push(
    `<path d="M${x} ${y} h300 v470 l-25 -18 l-25 18 l-25 -18 l-25 18 l-25 -18 l-25 18 l-25 -18 l-25 18 l-25 -18 l-25 18 l-25 -18 l-25 18 v-470 z" fill="${C.inkSoft}" stroke="${C.inkLine}" stroke-width="1.5"/>`,
  );
  parts.push(`<rect x="${x + 36}" y="${y + 44}" width="150" height="18" rx="9" fill="${C.brand}"/>`);
  for (let i = 0; i < 6; i += 1) {
    const ly = y + 100 + i * 52;
    const wide = i % 2 === 0 ? 200 : 140;
    parts.push(
      `<rect x="${x + 36}" y="${ly}" width="${wide}" height="12" rx="6" fill="${C.inkLine}"/>`,
      `<rect x="${x + 36}" y="${ly + 24}" width="60" height="12" rx="6" fill="${C.inkLine}" fill-opacity="0.6"/>`,
    );
  }
  parts.push(
    `<line x1="${x + 36}" y1="${y + 424}" x2="${x + 264}" y2="${y + 424}" stroke="${C.brand}" stroke-width="1.5"/>`,
    `<rect x="${x + 36}" y="${y + 440}" width="120" height="18" rx="9" fill="${C.brandBright}"/>`,
  );

  const cardX = 640;
  parts.push(
    `<rect x="${cardX}" y="${y + 120}" width="380" height="230" rx="18" fill="${C.inkSoft}" stroke="${C.inkLine}" stroke-width="1.5"/>`,
    `<rect x="${cardX + 36}" y="${y + 160}" width="60" height="46" rx="8" fill="${C.brandDim}"/>`,
    `<rect x="${cardX + 36}" y="${y + 240}" width="240" height="16" rx="8" fill="${C.inkLine}"/>`,
    `<rect x="${cardX + 36}" y="${y + 276}" width="140" height="16" rx="8" fill="${C.inkLine}" fill-opacity="0.6"/>`,
    `<circle cx="${cardX + 330}" cy="${y + 170}" r="22" fill="${C.brand}"/>`,
    `<rect x="${cardX + 316}" y="${y + 164}" width="28" height="4" rx="2" fill="${C.paper}" fill-opacity="0.8"/>`,
  );
  return parts.join("");
}

/** Pipeline: four columns with cards at different depths. */
function pipeline() {
  const parts = [];
  const columns = 4;
  const colW = 220;
  const gap = 30;
  const totalW = columns * colW + (columns - 1) * gap;
  const startX = (W - totalW) / 2;

  for (let c = 0; c < columns; c += 1) {
    const x = startX + c * (colW + gap);
    parts.push(
      `<rect x="${x}" y="150" width="${colW}" height="450" rx="14" fill="${C.inkSoft}" stroke="${C.inkLine}" stroke-width="1"/>`,
    );
    const cards = c + 1;
    for (let i = 0; i < cards; i += 1) {
      const cy = 190 + i * 96;
      const active = i === 0 && c > 0;
      parts.push(
        `<rect x="${x + 18}" y="${cy}" width="${colW - 36}" height="76" rx="10" fill="${C.ink}" stroke="${active ? C.brand : C.inkLine}" stroke-width="${active ? 2 : 1}"/>`,
        `<circle cx="${x + 46}" cy="${cy + 30}" r="12" fill="${active ? C.brand : C.inkLine}"/>`,
        `<rect x="${x + 68}" y="${cy + 24}" width="${colW - 110}" height="12" rx="6" fill="${C.inkLine}"/>`,
        `<rect x="${x + 18}" y="${cy + 50}" width="${Math.round((colW - 36) * 0.55)}" height="10" rx="5" fill="${C.inkLine}" fill-opacity="0.6"/>`,
      );
    }
  }
  return parts.join("");
}

const MOTIFS = { commerce, system, modules, retain, pipeline };

function svgFor(project) {
  const random = seeded(seedFrom(project.slug));
  const { defs, light } = backdrop(random);
  const motif = MOTIFS[project.motif](random);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>
    <radialGradient id="soft" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${C.brandDim}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${C.brandDim}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.ink}"/>
  <g>${defs}</g>
  <g>${light}</g>
  <g>${motif}</g>
  <rect width="${W}" height="${H}" fill="none" stroke="${C.inkLine}" stroke-width="2"/>
</svg>
`;
}

/** True when any of the given paths exists. */
async function firstExisting(paths) {
  for (const candidate of paths) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* try the next extension */
    }
  }
  return null;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let written = 0;
  const skipped = [];
  for (const project of PROJECTS) {
    const artwork = await firstExisting(
      ["webp", "jpg", "jpeg", "avif", "png"].map((ext) =>
        path.join(OUT_DIR, `${project.slug}.${ext}`),
      ),
    );
    if (artwork) {
      skipped.push(project.slug);
      continue;
    }
    await writeFile(path.join(OUT_DIR, `${project.slug}.svg`), svgFor(project), "utf8");
    process.stdout.write(`${project.slug}.svg `);
    written += 1;
  }
  console.log(
    `\n${written} project placeholders written to public/images/projects` +
      (skipped.length ? `, skipped (already has artwork): ${skipped.join(", ")}` : ""),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
