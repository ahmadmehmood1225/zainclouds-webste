import type { Office } from "@/data/locations";

/** Arabic copy per office id. City and country names stay in Latin script. */
export const arOffices: Record<
  string,
  Partial<Pick<Office, "title" | "area" | "description">>
> = {
  "saudi-arabia": {
    title: "المكتب السعودي",
    area:
      "Salma Commercial Center – 2nd Floor – Room No – 240, Street – AbuBakkar, Ash Sharafiyah District, 2350, Jeddah 23216, Madina Road",
    description:
      "قيادة إقليمية وتنفيذ قريب من احتياجات السوق السعودي، مع دعم كامل للعملاء الناطقين بالعربية.",
  },
  pakistan: {
    title: "مكتب باكستان",
    area: "ZainClouds Office, Khanewal Road, Chowk Rasheedabad Flyover, Multan, Pakistan",
    description: "فرق الهندسة والتصميم والتسليم التي تبني البرمجيات خلف كل منتج نصدره.",
  },
  dubai: {
    title: "مكتب دبي",
    area: "دبي، الإمارات العربية المتحدة",
    description:
      "تنسيق وتسليم لمشاريع العملاء في الإمارات ودول مجلس التعاون الخليجي عموماً.",
  },
};
