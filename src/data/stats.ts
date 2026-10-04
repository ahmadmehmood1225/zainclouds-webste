export type StatItem = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail?: string;
  placeholder?: boolean;
};

// NOTE FOR CONTENT: `placeholder: true` items carry draft numbers that must be
// replaced with verified figures before launch. Swap `value`/`suffix` and set
// `placeholder: false` as each figure is confirmed.
export const stats: StatItem[] = [
  {
    id: "years",
    value: 10,
    suffix: "+",
    label: "Years of Continual Excellence",
    detail: "Shaping and reworking business software since the start.",
    placeholder: true,
  },
  {
    id: "team",
    value: 400,
    suffix: "+",
    label: "Change Makers Driving Resolution",
    detail: "Engineers, consultants and designers behind every delivery.",
    placeholder: true,
  },
  {
    id: "clients",
    value: 400,
    suffix: "+",
    label: "Active Clients Across the Globe",
    detail: "Growing businesses in Saudi Arabia, the region and beyond.",
    placeholder: true,
  },
  {
    id: "regions",
    value: 3,
    suffix: "",
    label: "Offices & Delivery Regions",
    detail: "Saudi Arabia · Pakistan · UAE",
  },
];