import type { StatItem } from "@/data/stats";

/**
 * Arabic stat copy. Same order as `stats` in src/data/stats.ts, and numbers,
 * prefixes, suffixes and the `placeholder` flag stay untouched: only the
 * wording is translated.
 */
export const arStats: (Partial<Pick<StatItem, "label" | "detail">> | undefined)[] = [
  {
    label: "سنوات من التميز المتواصل",
    detail: "نطوّر برمجيات الأعمال ونعيد بناءها منذ البداية.",
  },
  {
    label: "خبراء التغيير والحلول",
    detail: "مهندسون ومستشارون ومصممون يقفون خلف كل عملية تسليم.",
  },
  {
    label: "عميل نشط حول العالم",
    detail: "شركات ناشئة في السعودية والمنطقة وخارجها.",
  },
  {
    label: "مكاتب ومناطق تسليم",
    detail: "السعودية · باكستان · الإمارات",
  },
];
