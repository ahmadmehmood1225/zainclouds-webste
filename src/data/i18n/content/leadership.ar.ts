import type { Leader } from "@/data/leadership";

/**
 * Arabic leadership copy, same order as `leadership` in src/data/leadership.ts.
 *
 * Names and titles are left as `undefined` where they are proper nouns: transliterating
 * a person's name produces a worse result than letting the English name stand, and the
 * company supplies the authoritative spelling in both regions anyway.
 */
export const arLeadership: (Partial<Leader> | undefined)[] = [
  { role: "الرئيس التنفيذي" },
  { role: "الشريك المؤسس والعضو المنتدب" },
  { role: "الرئيس التقني" },
  { role: "الرئيس التنفيذي للعمليات" },
];
