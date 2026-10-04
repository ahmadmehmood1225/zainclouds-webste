import type { Office } from "@/data/locations";

/** Arabic copy per office id. City and country names stay in Latin script. */
export const arOffices: Record<
  string,
  Partial<Pick<Office, "title" | "area" | "description">>
> = {
  "saudi-arabia": {
    title: "المكتب السعودي",
    area: "الرياض، المملكة العربية السعودية",
    description:
      "قيادة إقليمية وتنفيذ قريب من احتياجات السوق السعودي، مع دعم كامل للعملاء الناطقين بالعربية.",
  },
  pakistan: {
    title: "مكتب باكستان",
    area: "لاهور، باكستان",
    description: "فرق الهندسة والتصميم والتسليم التي تبني البرمجيات خلف كل منتج نصدره.",
  },
  dubai: {
    title: "مكتب دبي",
    area: "دبي، الإمارات العربية المتحدة",
    description:
      "تنسيق وتسليم لمشاريع العملاء في الإمارات ودول مجلس التعاون الخليجي عموماً.",
  },
};
