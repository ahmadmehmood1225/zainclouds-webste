/**
 * Generates short product-demo videos and poster images for the site.
 *
 * Each scene is drawn as SVG frames (parameterised by t in [0,1]),
 * rasterised with sharp and encoded to H.264 MP4 with ffmpeg.
 *
 * Usage: npm run media:generate
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const ffmpegPath = require("ffmpeg-static");

const W = 1280;
const H = 720;
const FPS = 24;
const DURATION = 8;
const FRAMES = FPS * DURATION;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VIDEO_DIR = path.join(ROOT, "public/media/videos");
const POSTER_DIR = path.join(ROOT, "public/media/posters");

/* ------------------------------------------------------------------ */
/* math helpers                                                        */
/* ------------------------------------------------------------------ */
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const seg = (t, a, b) => clamp01((t - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t) => {
  const c = 1.2;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

/* ------------------------------------------------------------------ */
/* palette + drawing helpers                                           */
/* ------------------------------------------------------------------ */
const C = {
  bg: "#061324",
  panel: "#0a1e3c",
  white: "#ffffff",
  paper: "#f3f6fb",
  ink: "#0a1e3c",
  inkSoft: "#31518a",
  line: "rgba(255,255,255,0.10)",
  green: "#4cb585",
  greenDeep: "#229c68",
  pink: "#ef5790",
  yellow: "#ffc743",
  blue: "#6d8ec1",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const rect = (x, y, w, h, fill, rx = 0, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;

const text = (x, y, str, size, fill, opts = {}) => {
  const {
    weight = 500,
    anchor = "start",
    family = "Helvetica Neue, Helvetica, Arial, sans-serif",
    spacing = 0,
    opacity = 1,
  } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}" opacity="${opacity}">${esc(str)}</text>`;
};

const circle = (cx, cy, r, fill, extra = "") =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;

const line = (x1, y1, x2, y2, stroke, width = 2, extra = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;

/** rising dots path between two points with a sag amount */
const connector = (x1, y1, x2, y2, progress, stroke, width = 2) => {
  const px = lerp(x1, x2, progress);
  const py = lerp(y1, y2, progress);
  return line(x1, y1, px, py, stroke, width, 'stroke-linecap="round"');
};

function baseSvg(accent, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="0.82" cy="0.16" r="0.75">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.20"/>
      <stop offset="55%" stop-color="${accent}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#061324" stop-opacity="0"/>
      <stop offset="100%" stop-color="#061324" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  ${rect(0, 0, W, H, C.bg)}
  ${rect(0, 0, W, H, "url(#grid)")}
  ${rect(0, 0, W, H, "url(#glow)")}
  ${inner}
</svg>`;
}

/** browser chrome window frame with title bar */
function browserFrame(x, y, w, h, urlLabel, accent, draw = 1) {
  const r = 16;
  const parts = [];
  parts.push(rect(x, y, w, h, C.panel, r, `stroke="rgba(255,255,255,0.14)" stroke-width="1.5"`));
  parts.push(
    `<path d="M${x} ${y + r}a${r} ${r} 0 0 1 ${r}-${r}h${w - r * 2}a${r} ${r} 0 0 1 ${r} ${r}v36H${x}z" fill="rgba(255,255,255,0.05)"/>`,
  );
  parts.push(line(x, y + 44, x + w, y + 44, "rgba(255,255,255,0.10)", 1));
  [0, 1, 2].forEach((i) => {
    parts.push(circle(x + 24 + i * 20, y + 22, 5, i === 0 ? "#ef5790" : i === 1 ? "#ffc743" : "#4cb585"));
  });
  const urlW = Math.min(420, w - 260);
  parts.push(rect(x + 100, y + 11, urlW, 22, "rgba(255,255,255,0.08)", 11));
  parts.push(text(x + 116, y + 27, urlLabel, 13, "rgba(255,255,255,0.55)"));
  if (draw < 1) {
    const per = 2 * (w + h);
    return `<g opacity="1"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="${per}" stroke-dashoffset="${per * (1 - draw)}"/>${parts.join("")}</g>`;
  }
  return parts.join("");
}

function checkBadge(cx, cy, r, on) {
  const col = on ? C.green : "rgba(255,255,255,0.18)";
  const mark = on
    ? `<path d="M${cx - r * 0.42} ${cy}l${r * 0.3} ${r * 0.32} ${r * 0.55}-${r * 0.58}" fill="none" stroke="${C.bg}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`
    : "";
  return circle(cx, cy, r, col) + mark;
}

/* ------------------------------------------------------------------ */
/* scenes                                                              */
/* ------------------------------------------------------------------ */

/** Ecommerce: scattered catalog tiles assemble into a storefront, then checkout. */
function ecommerce(t) {
  const accent = C.green;
  const win = { x: 170, y: 96, w: 940, h: 528 };
  const parts = [];

  const frameDraw = seg(t, 0.04, 0.22);
  parts.push(browserFrame(win.x, win.y, win.w, win.h, "store.example.com", accent, easeInOut(frameDraw)));

  // catalog tiles assemble into a grid inside the window
  const cols = 3;
  const tileW = 250;
  const tileH = 158;
  const gapX = 34;
  const gapY = 30;
  const gridX = win.x + 70;
  const gridY = win.y + 108;
  const scatter = [
    [-260, -150, -8],
    [300, -190, 6],
    [-320, 120, 5],
    [280, 170, -7],
    [-180, 260, 9],
    [340, 60, -5],
  ];
  const tiles = [];
  for (let i = 0; i < 6; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const tx = gridX + col * (tileW + gapX);
    const ty = gridY + row * (tileH + gapY);
    const st = seg(t, 0.06 + i * 0.03, 0.3 + i * 0.03);
    const e = easeOut(st);
    const [ox, oy, rot] = scatter[i];
    const x = lerp(tx + ox, tx, e);
    const y = lerp(ty + oy, ty, e);
    const rr = lerp(rot, 0, e);
    tiles.push({ x: y === ty ? tx : x, y, tx, ty, rot: rr, i, appear: e });
  }

  // product detail panel takes over the right half late in the clip
  const detail = seg(t, 0.4, 0.58);
  const detailE = easeOut(detail);
  const cart = seg(t, 0.58, 0.74);
  const cartE = easeOut(cart);
  const checkout = seg(t, 0.74, 0.9);
  const confirm = seg(t, 0.86, 1);

  const detailW = 380;
  const detailX = win.x + win.w - detailW - 36;
  const detailY = win.y + 84;

  // grid shrinks to 2 columns when the detail panel opens
  tiles.forEach((tile) => {
    const hiddenByDetail = tile.i % 3 === 2 && detailE > 0.4;
    const scale = tile.i === 4 ? lerp(1, 1 - detailE * 0.0, 1) : 1;
    const alpha = hiddenByDetail ? 1 - detailE : 1;
    if (alpha <= 0.01) return;
    const w = tileW * scale;
    const h = tileH * scale;
    parts.push(
      `<g transform="translate(${tile.x + w / 2} ${tile.y + h / 2}) rotate(${tile.rot}) translate(${-w / 2} ${-h / 2})" opacity="${alpha * Math.min(1, tile.appear * 2)}">`,
      rect(0, 0, w, h, "rgba(255,255,255,0.06)", 12, 'stroke="rgba(255,255,255,0.10)"'),
      rect(0, 0, w, h * 0.62, tile.i % 2 ? "rgba(76,181,133,0.16)" : "rgba(109,142,193,0.16)", 12),
      rect(16, h * 0.62 + 14, w * 0.55, 10, "rgba(255,255,255,0.35)", 5),
      rect(16, h * 0.62 + 34, w * 0.32, 8, "rgba(255,255,255,0.18)", 4),
      rect(w - 74, h * 0.62 + 26, 58, 14, "rgba(76,181,133,0.35)", 7),
      `</g>`,
    );
  });

  // selected tile highlight ring before it opens
  const ring = seg(t, 0.34, 0.44);
  if (ring > 0 && detailE < 0.6) {
    const tile = tiles[4];
    parts.push(
      rect(tile.tx - 6, tile.ty - 6, tileW + 12, tileH + 12, "none", 16, `stroke="${accent}" stroke-width="2.5" opacity="${1 - detailE}"`),
    );
  }

  // product detail panel
  if (detailE > 0) {
    const dx = detailX;
    const dy = detailY + lerp(40, 0, detailE);
    const dw = detailW;
    const dh = 372;
    parts.push(
      `<g opacity="${detailE}">`,
      rect(dx, dy, dw, dh, C.paper, 14),
      rect(dx, dy, dw, 176, "#d9f1e4", 14),
      rect(dx, dy + 162, dw, 14, "#d9f1e4"),
      circle(dx + dw / 2, dy + 86, 40, "rgba(34,156,104,0.25)"),
      `<path d="M${dx + dw / 2 - 16} ${dy + 86}l12 13 22-26" fill="none" stroke="${C.greenDeep}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="${seg(t, 0.5, 0.62)}"/>`,
      rect(dx + 24, dy + 202, dw * 0.6, 14, "rgba(10,30,60,0.85)", 7),
      rect(dx + 24, dy + 228, dw * 0.42, 10, "rgba(10,30,60,0.30)", 5),
      rect(dx + 24, dy + 254, 74, 18, "rgba(10,30,60,0.12)", 9),
      text(dx + 61, dy + 267, "SAR 000", 12, C.inkSoft, { anchor: "middle", weight: 700 }),
      rect(
        dx + 24,
        dy + 300,
        dw - 48,
        44,
        lerp("rgba(34,156,104,0.25)", C.greenDeep, seg(t, 0.56, 0.66)),
        22,
      ),
      text(dx + dw / 2, dy + 328, "Add to cart", 16, seg(t, 0.56, 0.66) > 0.5 ? C.white : C.greenDeep, {
        anchor: "middle",
        weight: 700,
      }),
      `</g>`,
    );
  }

  // cart drawer slides in
  if (cartE > 0) {
    const cw = 300;
    const cx = win.x + win.w - cw;
    const cy = win.y + 44;
    const ch = win.h - 44;
    const x = win.x + win.w - cw * cartE;
    parts.push(
      `<g>`,
      rect(x, cy, cw, ch, "#0d2444", 0, 'stroke="rgba(255,255,255,0.10)"'),
      text(x + 24, cy + 44, "Your cart", 18, C.white, { weight: 700 }),
      line(x + 24, cy + 62, x + cw - 24, cy + 62, "rgba(255,255,255,0.12)", 1),
    );
    for (let i = 0; i < 2; i++) {
      const rowIn = seg(t, 0.62 + i * 0.05, 0.72 + i * 0.05);
      if (rowIn <= 0) continue;
      const ry = cy + 88 + i * 74;
      parts.push(
        `<g opacity="${easeOut(rowIn)}" transform="translate(${lerp(40, 0, easeOut(rowIn))} 0)">`,
        rect(x + 20, ry, 52, 52, "rgba(76,181,133,0.20)", 10),
        rect(x + 84, ry + 8, 140, 10, "rgba(255,255,255,0.5)", 5),
        rect(x + 84, ry + 28, 90, 8, "rgba(255,255,255,0.22)", 4),
        rect(x + 84, ry + 44, 54, 8, "rgba(76,181,133,0.6)", 4),
        `</g>`,
      );
    }
    const sub = seg(t, 0.68, 0.82);
    if (sub > 0) {
      const total = Math.round(lerp(0, 1240, easeOut(sub)));
      parts.push(
        line(x + 24, cy + ch - 132, x + cw - 24, cy + ch - 132, "rgba(255,255,255,0.12)", 1),
        text(x + 24, cy + ch - 96, "Subtotal", 14, "rgba(255,255,255,0.55)"),
        text(x + cw - 24, cy + ch - 96, `SAR ${total}`, 18, C.white, { anchor: "end", weight: 700 }),
        rect(x + 24, cy + ch - 72, cw - 48, 40, C.greenDeep, 20),
        text(x + cw / 2, cy + ch - 46, "Checkout", 15, C.white, { anchor: "middle", weight: 700 }),
      );
    }
    parts.push(`</g>`);
  }

  // confirmation chip
  if (confirm > 0) {
    const e = easeOutBack(clamp01(confirm * 1.4));
    const cw = 340;
    const cx = W / 2 - cw / 2;
    const cy = H / 2 + 150;
    parts.push(
      `<g transform="translate(${W / 2} ${cy}) scale(${e}) translate(${-W / 2} ${-cy})" opacity="${clamp01(confirm * 2)}">`,
      rect(cx, cy, cw, 72, C.white, 36, 'filter="drop-shadow(0 12px 30px rgba(0,0,0,0.45))"'),
      checkBadge(cx + 44, cy + 36, 16, true),
      text(cx + 76, cy + 42, "Order confirmed", 20, C.ink, { weight: 700 }),
      `</g>`,
    );
  }

  void checkout;
  void line;
  return baseSvg(accent, parts.join(""));
}

/** CRM: deal cards move across a pipeline while a relationship timeline fills. */
function crm(t) {
  const accent = C.pink;
  const parts = [];
  const cols = ["Lead", "Qualified", "Proposal", "Won"];
  const colW = 236;
  const gap = 24;
  const startX = 216;
  const boardY = 128;
  const boardH = 400;

  // sidebar: contact record
  const sideIn = easeOut(seg(t, 0.02, 0.16));
  parts.push(
    `<g opacity="${sideIn}" transform="translate(${lerp(-40, 0, sideIn)} 0)">`,
    rect(56, 96, 140, 540, "rgba(255,255,255,0.04)", 14, 'stroke="rgba(255,255,255,0.10)"'),
    circle(126, 156, 28, "rgba(239,87,144,0.30)"),
    text(126, 162, "AK", 20, "#fbc2d6", { anchor: "middle", weight: 700 }),
    rect(86, 200, 80, 10, "rgba(255,255,255,0.45)", 5),
    rect(96, 220, 60, 8, "rgba(255,255,255,0.20)", 4),
    rect(76, 264, 100, 34, "rgba(239,87,144,0.18)", 17),
    text(126, 286, "Follow up", 12, "#fbc2d6", { anchor: "middle", weight: 600 }),
    ...[0, 1, 2, 3].map((i) => {
      const dotIn = seg(t, 0.3 + i * 0.12, 0.4 + i * 0.12);
      const y = 340 + i * 62;
      return (
        line(126, y, 126, y + 62, "rgba(255,255,255,0.14)", 2) +
        circle(126, y, 7, dotIn > 0.5 ? accent : "rgba(255,255,255,0.25)") +
        rect(76, y + 14, 100, 8, "rgba(255,255,255,0.16)", 4) +
        rect(76, y + 30, 70, 6, "rgba(255,255,255,0.10)", 3)
      );
    }),
    `</g>`,
  );

  // columns
  cols.forEach((name, i) => {
    const x = startX + i * (colW + gap);
    parts.push(
      rect(x, boardY, colW, boardH, "rgba(255,255,255,0.035)", 14, 'stroke="rgba(255,255,255,0.08)"'),
      text(x + 20, boardY + 36, name.toUpperCase(), 12, "rgba(255,255,255,0.5)", { weight: 700, spacing: 2 }),
      rect(x + 20, boardY + 52, 44, 4, i === 3 ? accent : "rgba(255,255,255,0.15)", 2),
    );
  });

  // deal cards travelling between columns
  const cardMoves = [
    { from: 0, to: 1, start: 0.16, end: 0.38, row: 0, label: "Gulf Retail" },
    { from: 1, to: 2, start: 0.4, end: 0.6, row: 1, label: "Clinic Group" },
    { from: 2, to: 3, start: 0.62, end: 0.82, row: 0, label: "Logistics Co" },
  ];
  cardMoves.forEach((m, idx) => {
    const p = easeInOut(seg(t, m.start, m.end));
    const fromX = startX + m.from * (colW + gap) + 16;
    const toX = startX + m.to * (colW + gap) + 16;
    const x = lerp(fromX, toX, p);
    const y = boardY + 80 + m.row * 96;
    const lift = Math.sin(p * Math.PI) * 10;
    const settled = p >= 1 || (idx === 0 && t < m.start);
    const appear = idx === 0 ? 1 : seg(t, m.start - 0.14, m.start);
    if (appear <= 0) return;
    parts.push(
      `<g opacity="${clamp01(appear * 3)}" transform="translate(${x} ${y - lift})" filter="drop-shadow(0 ${8 + lift}px ${16 + lift}px rgba(0,0,0,0.35))">`,
      rect(0, 0, colW - 32, 80, C.paper, 12),
      rect(14, 16, 34, 34, "rgba(224,47,115,0.18)", 10),
      text(31, 38, m.label.slice(0, 1), 16, "#c4155d", { anchor: "middle", weight: 700 }),
      rect(60, 18, 110, 10, "rgba(10,30,60,0.85)", 5),
      rect(60, 38, 76, 8, "rgba(10,30,60,0.28)", 4),
      rect(14, 58, 96, 8, settled ? "rgba(34,156,104,0.55)" : "rgba(10,30,60,0.18)", 4),
      `</g>`,
    );
  });

  // timeline rail under the board
  const railY = 596;
  const railX0 = startX;
  const railX1 = startX + 4 * colW + 3 * gap - 40;
  parts.push(line(railX0, railY, railX1, railY, "rgba(255,255,255,0.14)", 3, 'stroke-linecap="round"'));
  const railP = easeInOut(seg(t, 0.2, 0.92));
  parts.push(
    line(railX0, railY, lerp(railX0, railX1, railP), railY, accent, 3, 'stroke-linecap="round"'),
  );
  for (let i = 0; i < 5; i++) {
    const x = lerp(railX0, railX1, i / 4);
    const on = railP >= i / 4 - 0.02;
    parts.push(circle(x, railY, on ? 9 : 7, on ? accent : "rgba(255,255,255,0.25)"));
    if (on) parts.push(circle(x, railY, 15, "none", `stroke="${accent}" stroke-width="1.5" opacity="0.5"`));
  }

  // summary chip
  const done = seg(t, 0.86, 0.96);
  if (done > 0) {
    parts.push(
      `<g opacity="${done}">`,
      rect(940, 560, 268, 54, "rgba(239,87,144,0.16)", 27, 'stroke="rgba(239,87,144,0.5)"'),
      text(1074, 594, "Pipeline up to date", 16, "#fbc2d6", { anchor: "middle", weight: 700 }),
      `</g>`,
    );
  }
  return baseSvg(accent, parts.join(""));
}

/** ERP: business modules connect into one central system. */
function erp(t) {
  const accent = C.yellow;
  const parts = [];
  const hub = { x: 640, y: 348, r: 96 };
  const modules = [
    { label: "Finance", x: 210, y: 132 },
    { label: "Inventory", x: 870, y: 132 },
    { label: "Purchasing", x: 120, y: 330 },
    { label: "Sales", x: 960, y: 330 },
    { label: "Accounting", x: 210, y: 528 },
    { label: "Reporting", x: 870, y: 528 },
  ];
  const mw = 200;
  const mh = 76;

  modules.forEach((m, i) => {
    const start = 0.08 + i * 0.09;
    const p = easeInOut(seg(t, start, start + 0.16));
    const mx = m.x + mw / 2;
    const my = m.y + mh / 2;
    // connector to hub
    const dx = hub.x - mx;
    const dy = hub.y - my;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const x1 = mx + ux * (mw / 2 - 6);
    const y1 = my + uy * 30;
    const x2 = hub.x - ux * (hub.r + 10);
    const y2 = hub.y - uy * (hub.r + 10);
    if (p > 0) {
      parts.push(connector(x1, y1, x2, y2, p, "rgba(255,199,67,0.7)", 2.5));
      if (p >= 1) {
        const packet = (seg(t, start + 0.18, start + 0.5) + i * 0.13) % 1;
        const px = lerp(x1, x2, packet);
        const py = lerp(y1, y2, packet);
        parts.push(circle(px, py, 5, C.yellow, 'opacity="0.95"'));
      }
    }
    // module chip
    const appear = easeOut(seg(t, start - 0.06, start + 0.06));
    if (appear > 0) {
      parts.push(
        `<g opacity="${appear}">`,
        rect(m.x, m.y, mw, mh, "rgba(255,255,255,0.05)", 12, 'stroke="rgba(255,255,255,0.16)"'),
        rect(m.x + 18, m.y + 22, 32, 32, "rgba(255,199,67,0.18)", 8),
        text(m.x + 34, m.y + 44, m.label.slice(0, 1), 16, accent, { anchor: "middle", weight: 700 }),
        text(m.x + 64, m.y + 46, m.label, 17, C.white, { weight: 600 }),
        `</g>`,
      );
    }
    // sync badge once connected
    const badge = seg(t, start + 0.2, start + 0.3);
    if (badge > 0.5) {
      parts.push(checkBadge(m.x + mw - 18, m.y + 18, 11, true));
    }
  });

  // hub
  const hubIn = easeOut(seg(t, 0, 0.14));
  const pulse = 1 + Math.sin(t * Math.PI * 4) * 0.03 * seg(t, 0.5, 0.6);
  const synced = seg(t, 0.7, 0.8) > 0.5;
  parts.push(
    `<g transform="translate(${hub.x} ${hub.y}) scale(${hubIn * pulse}) translate(${-hub.x} ${-hub.y})">`,
    circle(hub.x, hub.y, hub.r + 22, "rgba(255,199,67,0.08)"),
    circle(hub.x, hub.y, hub.r, C.panel, `stroke="rgba(255,199,67,0.65)" stroke-width="2"`),
    text(hub.x, hub.y - 6, synced ? "Synced" : "One system", synced ? 26 : 22, C.white, {
      anchor: "middle",
      weight: 700,
    }),
    text(hub.x, hub.y + 26, synced ? "All modules live" : "Connecting…", 13, "rgba(255,255,255,0.55)", {
      anchor: "middle",
    }),
    `</g>`,
  );
  if (synced) parts.push(checkBadge(hub.x, hub.y + 58, 14, true));

  return baseSvg(accent, parts.join(""));
}

/** ERPNext: modular enterprise workflow — document moves through approvals. */
function erpnext(t) {
  const accent = C.blue;
  const parts = [];

  // left module rail
  const mods = ["Stock", "Accounts", "Selling", "Buying", "People"];
  const railX = 72;
  parts.push(
    rect(railX, 96, 220, 528, "rgba(255,255,255,0.04)", 14, 'stroke="rgba(255,255,255,0.10)"'),
    text(railX + 24, 140, "MODULES", 12, "rgba(255,255,255,0.45)", { weight: 700, spacing: 2 }),
  );
  mods.forEach((m, i) => {
    const on = seg(t, 0.08 + i * 0.1, 0.16 + i * 0.1) > 0.5;
    const y = 168 + i * 66;
    parts.push(
      rect(railX + 16, y, 188, 50, on ? "rgba(109,142,193,0.20)" : "rgba(255,255,255,0.03)", 10,
        on ? 'stroke="rgba(109,142,193,0.55)"' : ""),
      circle(railX + 42, y + 25, 8, on ? accent : "rgba(255,255,255,0.22)"),
      text(railX + 62, y + 31, m, 16, on ? C.white : "rgba(255,255,255,0.55)", { weight: on ? 700 : 500 }),
    );
  });

  // centre document with workflow steps
  const docX = 336;
  const docW = 600;
  parts.push(
    browserFrame(docX, 96, docW, 372, "erpnext · sales order", accent, 1),
    text(docX + 32, 176, "Sales Order #0042", 24, C.white, { weight: 700 }),
    rect(docX + 32, 200, 240, 10, "rgba(255,255,255,0.28)", 5),
    rect(docX + 32, 222, 170, 8, "rgba(255,255,255,0.16)", 4),
  );
  // form rows fill in
  for (let i = 0; i < 3; i++) {
    const rowIn = easeOut(seg(t, 0.1 + i * 0.07, 0.22 + i * 0.07));
    if (rowIn <= 0) continue;
    const y = 256 + i * 40;
    parts.push(
      `<g opacity="${rowIn}">`,
      rect(docX + 32, y, docW - 64, 30, "rgba(255,255,255,0.05)", 6),
      rect(docX + 46, y + 11, 120, 8, "rgba(255,255,255,0.30)", 4),
      rect(docX + docW - 150, y + 10, 90, 10, "rgba(255,199,67,0.5)", 5),
      `</g>`,
    );
  }
  // workflow steps
  const steps = ["Created", "Approved", "Posted"];
  const stepY = 420;
  steps.forEach((s, i) => {
    const x = docX + 90 + i * 210;
    const active = seg(t, 0.34 + i * 0.18, 0.44 + i * 0.18) > 0.4;
    if (i > 0) {
      const lineOn = seg(t, 0.44 + (i - 1) * 0.18, 0.54 + (i - 1) * 0.18);
      parts.push(connector(x - 130, stepY, x - 50, stepY, easeInOut(lineOn), active || lineOn > 0 ? "rgba(76,181,133,0.8)" : "rgba(255,255,255,0.2)", 3));
    }
    parts.push(
      circle(x - 50, stepY, 16, active ? C.green : "rgba(255,255,255,0.12)", active ? "" : `stroke="rgba(255,255,255,0.3)"`),
      active ? `<path d="M${x - 57} ${stepY}l5 6 11-12" fill="none" stroke="${C.bg}" stroke-width="3" stroke-linecap="round"/>` : text(x - 50, stepY + 5, String(i + 1), 14, "rgba(255,255,255,0.6)", { anchor: "middle", weight: 700 }),
      text(x - 50, stepY + 42, s, 14, active ? C.white : "rgba(255,255,255,0.5)", { anchor: "middle", weight: 600 }),
    );
  });

  // right dashboard
  const dashX = 976;
  parts.push(
    rect(dashX, 96, 232, 528, "rgba(255,255,255,0.04)", 14, 'stroke="rgba(255,255,255,0.10)"'),
    text(dashX + 24, 140, "THIS MONTH", 12, "rgba(255,255,255,0.45)", { weight: 700, spacing: 2 }),
  );
  const bars = [0.55, 0.8, 0.42, 0.92];
  bars.forEach((h, i) => {
    const grow = easeOut(seg(t, 0.5 + i * 0.08, 0.72 + i * 0.08));
    const bh = 150 * h * grow;
    const x = dashX + 34 + i * 48;
    parts.push(
      rect(x, 320 - 150, 30, 150, "rgba(255,255,255,0.06)", 6),
      rect(x, 320 - bh, 30, bh, i === 3 ? accent : "rgba(109,142,193,0.55)", 6),
    );
  });
  const kpi = seg(t, 0.66, 0.88);
  if (kpi > 0) {
    parts.push(
      rect(dashX + 24, 360, 184, 90, "rgba(109,142,193,0.14)", 10),
      text(dashX + 44, 400, `${Math.round(lerp(0, 96, easeOut(kpi)))}%`, 34, C.white, { weight: 700 }),
      text(dashX + 44, 428, "Orders on schedule", 13, "rgba(255,255,255,0.6)"),
      rect(dashX + 24, 470, 184, 90, "rgba(76,181,133,0.12)", 10),
      text(dashX + 44, 510, "Live", 26, "#7ecea9", { weight: 700 }),
      text(dashX + 44, 538, "Modules connected", 13, "rgba(255,255,255,0.6)"),
    );
  }
  return baseSvg(accent, parts.join(""));
}

/** POS: counter transaction updates stock and prints a receipt. */
function pos(t) {
  const accent = C.green;
  const parts = [];
  const term = { x: 148, y: 84, w: 984, h: 552 };

  parts.push(browserFrame(term.x, term.y, term.w, term.h, "pos · register 02", accent, 1));

  // item grid (left)
  const items = [
    ["Item", "SAR 00"],
    ["Item", "SAR 00"],
    ["Item", "SAR 00"],
    ["Item", "SAR 00"],
    ["Item", "SAR 00"],
    ["Item", "SAR 00"],
  ];
  const gx = term.x + 36;
  const gy = term.y + 84;
  items.forEach((it, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = gx + col * 216;
    const y = gy + row * 150;
    const tap = i < 3 ? seg(t, 0.12 + i * 0.1, 0.2 + i * 0.1) : 0;
    parts.push(
      rect(x, y, 196, 126, tap > 0.5 ? "rgba(76,181,133,0.16)" : "rgba(255,255,255,0.05)", 12,
        tap > 0.5 ? `stroke="${accent}" stroke-width="2"` : 'stroke="rgba(255,255,255,0.10)"'),
      rect(x + 16, y + 16, 164, 54, "rgba(255,255,255,0.08)", 8),
      rect(x + 16, y + 84, 96, 10, "rgba(255,255,255,0.35)", 5),
      rect(x + 16, y + 102, 56, 8, "rgba(76,181,133,0.55)", 4),
    );
  });

  // cart (right)
  const cx = term.x + 660;
  const cw = 288;
  parts.push(
    rect(cx, term.y + 60, cw, 340, C.paper, 12),
    text(cx + 22, term.y + 96, "Current sale", 17, C.ink, { weight: 700 }),
    line(cx + 22, term.y + 112, cx + cw - 22, term.y + 112, "rgba(10,30,60,0.12)", 1),
  );
  for (let i = 0; i < 3; i++) {
    const rowIn = easeOut(seg(t, 0.2 + i * 0.1, 0.32 + i * 0.1));
    if (rowIn <= 0) continue;
    const y = term.y + 132 + i * 52;
    parts.push(
      `<g opacity="${rowIn}" transform="translate(${lerp(24, 0, rowIn)} 0)">`,
      rect(cx + 22, y, 34, 34, "rgba(34,156,104,0.16)", 8),
      rect(cx + 66, y + 6, 110, 9, "rgba(10,30,60,0.75)", 4),
      rect(cx + 66, y + 22, 70, 7, "rgba(10,30,60,0.25)", 3),
      text(cx + cw - 28, y + 24, `SAR 0${i}`, 13, C.inkSoft, { anchor: "end", weight: 700 }),
      `</g>`,
    );
  }
  const totalP = easeOut(seg(t, 0.42, 0.56));
  const total = Math.round(lerp(0, 348, totalP));
  parts.push(
    line(cx + 22, term.y + 300, cx + cw - 22, term.y + 300, "rgba(10,30,60,0.12)", 1),
    text(cx + 22, term.y + 336, "Total", 15, "rgba(10,30,60,0.6)"),
    text(cx + cw - 22, term.y + 336, `SAR ${total}`, 26, C.ink, { anchor: "end", weight: 700 }),
    rect(cx + 22, term.y + 352, cw - 44, 36, C.greenDeep, 18),
    text(cx + cw / 2, term.y + 376, "Charge", 15, C.white, { anchor: "middle", weight: 700 }),
  );

  // payment tap
  const pay = seg(t, 0.56, 0.74);
  if (pay > 0) {
    const px = cx + cw / 2;
    const py = term.y + 460;
    const rings = [0, 1, 2].map((i) => {
      const rp = (seg(t, 0.58 + i * 0.07, 0.78 + i * 0.07) + 0) % 1;
      return `<circle cx="${px}" cy="${py}" r="${18 + rp * 44}" fill="none" stroke="${accent}" stroke-width="2.5" opacity="${(1 - rp) * 0.9}"/>`;
    });
    parts.push(
      rect(cx, term.y + 424, cw, 76, "rgba(10,30,60,0.92)", 12),
      text(cx + 22, term.y + 452, pay < 0.75 ? "Tap card to pay" : "Payment approved", 15, C.white, { weight: 700 }),
      text(cx + 22, term.y + 476, "Terminal connected", 12, "rgba(255,255,255,0.5)"),
      ...rings,
      circle(cx + cw - 44, term.y + 462, 16, pay > 0.75 ? accent : "rgba(255,255,255,0.2)"),
      pay > 0.75 ? `<path d="M${cx + cw - 51} ${term.y + 462}l5 6 11-12" fill="none" stroke="${C.bg}" stroke-width="3" stroke-linecap="round"/>` : "",
    );
  }

  // stock badge
  const stockP = seg(t, 0.74, 0.84);
  if (stockP > 0) {
    const from = 24;
    const val = stockP < 1 ? from : from - 1;
    parts.push(
      `<g opacity="${stockP}">`,
      rect(term.x + 36, term.y + 456, 300, 64, "rgba(255,255,255,0.06)", 12, 'stroke="rgba(255,255,255,0.14)"'),
      text(term.x + 56, term.y + 484, "INVENTORY", 11, "rgba(255,255,255,0.45)", { weight: 700, spacing: 2 }),
      text(term.x + 56, term.y + 508, stockP >= 1 ? "Stock updated: 23" : "Stock updated: 24", 17, stockP >= 1 ? "#7ecea9" : C.white, { weight: 700 }),
      `</g>`,
    );
  }

  // receipt slides up
  const rec = easeOut(seg(t, 0.8, 0.94));
  if (rec > 0) {
    const rw = 240;
    const rh = 300;
    const rx = W / 2 - rw / 2;
    const ry = lerp(H + 40, H - rh - 24, rec);
    parts.push(
      `<g opacity="${clamp01(rec * 2)}">`,
      rect(rx, ry, rw, rh, C.white, 6),
      text(rx + rw / 2, ry + 44, "RECEIPT", 14, C.ink, { anchor: "middle", weight: 700, spacing: 3 }),
      line(rx + 24, ry + 60, rx + rw - 24, ry + 60, "rgba(10,30,60,0.2)", 1),
      ...[0, 1, 2, 3].map((i) => rect(rx + 24, ry + 84 + i * 26, i % 2 ? 100 : 150, 8, "rgba(10,30,60,0.2)", 4)),
      circle(rx + rw / 2, ry + 224, 26, "rgba(34,156,104,0.15)"),
      `<path d="M${rx + rw / 2 - 11} ${ry + 224}l8 9 15-17" fill="none" stroke="${C.greenDeep}" stroke-width="4" stroke-linecap="round"/>`,
      text(rx + rw / 2, ry + 272, "Paid in full", 15, C.ink, { anchor: "middle", weight: 700 }),
      `</g>`,
    );
  }
  return baseSvg(accent, parts.join(""));
}

/** Custom software: architecture layers assemble into one platform. */
function customSoftware(t) {
  const accent = C.pink;
  const parts = [];
  const layers = [
    { label: "Interface", note: "Web and mobile", from: -1, fill: "rgba(239,87,144,0.16)", stroke: "rgba(239,87,144,0.55)" },
    { label: "Services", note: "Business logic", from: 1, fill: "rgba(76,181,133,0.14)", stroke: "rgba(76,181,133,0.5)" },
    { label: "APIs", note: "System contracts", from: -1, fill: "rgba(255,199,67,0.13)", stroke: "rgba(255,199,67,0.5)" },
    { label: "Data", note: "Models and storage", from: 1, fill: "rgba(109,142,193,0.16)", stroke: "rgba(109,142,193,0.55)" },
  ];
  const lw = 560;
  const lh = 92;
  const lx = 360;
  const y0 = 148;
  const gap = 24;

  layers.forEach((layer, i) => {
    const start = 0.06 + i * 0.13;
    const p = easeOut(seg(t, start, start + 0.22));
    const y = y0 + i * (lh + gap);
    const x = lerp(lx + layer.from * 720, lx, p);
    parts.push(
      `<g opacity="${clamp01(p * 2.4)}" transform="translate(${x} ${y})" filter="drop-shadow(0 10px 24px rgba(0,0,0,0.35))">`,
      rect(0, 0, lw, lh, layer.fill, 14, `stroke="${layer.stroke}" stroke-width="1.5"`),
      rect(22, 24, 44, 44, layer.stroke, 10, 'fill-opacity="0.25"'),
      text(44, 52, String(i + 1), 18, C.white, { anchor: "middle", weight: 700 }),
      text(84, 44, layer.label, 22, C.white, { weight: 700 }),
      text(84, 68, layer.note, 14, "rgba(255,255,255,0.55)"),
      rect(lw - 66, 34, 44, 24, layer.stroke, 12, 'fill-opacity="0.35"'),
      `</g>`,
    );
    // link between stacked layers
    if (i > 0) {
      const linkP = seg(t, start + 0.1, start + 0.26);
      const py = y0 + (i - 1) * (lh + gap) + lh;
      parts.push(line(lx + lw / 2, py, lx + lw / 2, y, "rgba(255,255,255,0.4)", 2, `stroke-dasharray="6 8" opacity="${linkP}"`));
    }
  });

  // platform bracket once assembled
  const bracket = easeInOut(seg(t, 0.56, 0.74));
  if (bracket > 0) {
    const bx = lx - 40;
    const by = y0 - 40;
    const bw = lw + 80;
    const bh = layers.length * (lh + gap) - gap + 80;
    const per = 2 * (bw + bh);
    parts.push(
      `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="24" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2" stroke-dasharray="${per}" stroke-dashoffset="${per * (1 - bracket)}"/>`,
    );
  }

  // side nodes: existing systems connecting in
  const nodes = [
    { label: "Payments", x: 150, y: 200 },
    { label: "Existing ERP", x: 150, y: 360 },
    { label: "Cloud", x: 1060, y: 280 },
    { label: "Mobile", x: 1060, y: 440 },
  ];
  nodes.forEach((n, i) => {
    const p = easeOut(seg(t, 0.62 + i * 0.06, 0.78 + i * 0.06));
    if (p <= 0) return;
    const targetX = n.x < 640 ? 320 : 960;
    const targetY = 360;
    parts.push(
      `<g opacity="${p}">`,
      rect(n.x - 78, n.y - 26, 156, 52, "rgba(255,255,255,0.06)", 26, 'stroke="rgba(255,255,255,0.22)"'),
      text(n.x, n.y + 6, n.label, 15, "rgba(255,255,255,0.85)", { anchor: "middle", weight: 600 }),
      connector(n.x, n.y, targetX, targetY, p, "rgba(239,87,144,0.45)", 2),
      `</g>`,
    );
  });

  // deployed chip
  const dep = seg(t, 0.84, 0.94);
  if (dep > 0) {
    const e = easeOutBack(clamp01(dep * 1.3));
    parts.push(
      `<g transform="translate(640 664) scale(${e}) translate(-640 -664)" opacity="${clamp01(dep * 2)}">`,
      rect(640 - 130, 640, 260, 48, C.greenDeep, 24),
      text(640, 670, "Platform deployed", 17, C.white, { anchor: "middle", weight: 700 }),
      `</g>`,
    );
  }
  void circle;
  void connector;
  return baseSvg(accent, parts.join(""));
}

/* ------------------------------------------------------------------ */
/* encoding                                                            */
/* ------------------------------------------------------------------ */
const SCENES = [
  { id: "ecommerce", draw: ecommerce, posterT: 0.5 },
  { id: "crm", draw: crm, posterT: 0.55 },
  { id: "erp", draw: erp, posterT: 0.62 },
  { id: "erpnext", draw: erpnext, posterT: 0.55 },
  { id: "pos", draw: pos, posterT: 0.46 },
  { id: "custom-software", draw: customSoftware, posterT: 0.5 },
];

function encode(id, frameIterator) {
  return new Promise((resolve, reject) => {
    const out = path.join(VIDEO_DIR, `${id}.mp4`);
    const ff = spawn(
      ffmpegPath,
      [
        "-y",
        "-f", "image2pipe",
        "-framerate", String(FPS),
        "-i", "-",
        "-an",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "27",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        out,
      ],
      { stdio: ["pipe", "ignore", "pipe"] },
    );
    let err = "";
    ff.stderr.on("data", (d) => {
      err += d.toString();
    });
    ff.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code} for ${id}\n${err.slice(-1200)}`));
    });

    (async () => {
      for await (const png of frameIterator) {
        if (!ff.stdin.write(png)) {
          await new Promise((r) => ff.stdin.once("drain", r));
        }
      }
      ff.stdin.end();
    })().catch((e) => {
      ff.stdin.destroy();
      reject(e);
    });
  });
}

async function* frameGenerator(draw) {
  for (let f = 0; f < FRAMES; f++) {
    const t = f / (FRAMES - 1);
    const svg = draw(t);
    yield await sharp(Buffer.from(svg)).png({ compressionLevel: 3 }).toBuffer();
  }
}

async function main() {
  await mkdir(VIDEO_DIR, { recursive: true });
  await mkdir(POSTER_DIR, { recursive: true });

  for (const scene of SCENES) {
    process.stdout.write(`encoding ${scene.id}.mp4 … `);
    const started = Date.now();
    await encode(scene.id, frameGenerator(scene.draw));
    const posterSvg = scene.draw(scene.posterT);
    const posterPath = path.join(POSTER_DIR, `${scene.id}.webp`);
    await sharp(Buffer.from(posterSvg)).webp({ quality: 82 }).toFile(posterPath);
    // small blurred placeholder for instant paint
    await sharp(Buffer.from(posterSvg))
      .resize(32, 18)
      .webp({ quality: 40 })
      .toFile(path.join(POSTER_DIR, `${scene.id}-lqip.webp`));
    console.log(`done in ${((Date.now() - started) / 1000).toFixed(1)}s`);
  }
  console.log("all media generated");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
