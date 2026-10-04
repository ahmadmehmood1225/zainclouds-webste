export type Office = {
  id: string;
  country: string;
  city: string;
  title: string;
  area: string;
  description: string;
};

export const offices: Office[] = [
  {
    id: "saudi-arabia",
    country: "Saudi Arabia",
    city: "Riyadh",
    title: "Saudi Arabia Office",
    area: "Riyadh, Saudi Arabia",
    description:
      "Regional leadership and deployment close to KSA business needs, with support for Arabic-speaking clients.",
  },
  {
    id: "pakistan",
    country: "Pakistan",
    city: "Lahore",
    title: "Pakistan Office",
    area: "Lahore, Pakistan",
    description:
      "Engineering, design and delivery teams building the software behind the products we ship.",
  },
  {
    id: "dubai",
    country: "UAE",
    city: "Dubai",
    title: "Dubai Office",
    area: "Dubai, UAE",
    description:
      "Gulf region coordination and delivery for clients across the UAE and the wider GCC market.",
  },
];

export const regions = ["Saudi Arabia", "Pakistan", "Dubai", "Gulf region"] as const;