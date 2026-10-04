import { capabilities } from "@/data/logos";

/**
 * Structured homepage content. Keeping it in data (rather than inside the
 * components) means the Arabic site renders the same structure from a translated
 * copy of these collections.
 */
export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type TechnologyGroup = {
  id: string;
  title: string;
  items: string[];
  tone: string;
};

export type CredibilityFact = {
  id: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We learn how your business works, what is slowing it down and what the software needs to solve.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the system structure, user flows, integrations and implementation plan.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Our team develops, tests and integrates the solution around your requirements.",
  },
  {
    number: "04",
    title: "Support",
    description: "We continue to improve and support the system after launch.",
  },
];

export const technologyGroups: TechnologyGroup[] = [
  {
    id: "interfaces",
    title: "User Interfaces",
    items: ["Next.js", "React", "TypeScript", "Tailwind"],
    tone: "before:bg-teal-400",
  },
  {
    id: "backend",
    title: "Backend and APIs",
    items: ["Node.js", "Python", "REST APIs", "GraphQL"],
    tone: "before:bg-pink-400",
  },
  {
    id: "data",
    title: "Data and Storage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    tone: "before:bg-yellow-400",
  },
  {
    id: "erp",
    title: "Enterprise ERP",
    items: ["ERPNext", "Frappe Framework", "Custom Modules"],
    tone: "before:bg-navy-400",
  },
  {
    id: "cloud",
    title: "Cloud and Delivery",
    items: ["Docker", "CI/CD", "Managed Cloud", "Monitoring"],
    tone: "before:bg-teal-500",
  },
  {
    id: "commerce",
    title: "Commerce Ecosystems",
    items: ["Payment Gateways", "Courier APIs", "Marketplaces", "RTL Storefronts"],
    tone: "before:bg-pink-500",
  },
];

export const credibilityFacts: CredibilityFact[] = [
  {
    id: "company",
    title: "Private limited company",
    body: "Zain Clouds is a registered private limited software company headquartered in Saudi Arabia.",
  },
  {
    id: "locations",
    title: "Three locations",
    body: "Offices in Riyadh, Lahore and Dubai with Arabic, Urdu and English speaking teams.",
  },
  {
    id: "delivery",
    title: "In-house delivery",
    body: "Engineering, design and implementation inside one accountable team, not a reseller layer.",
  },
  {
    id: "claims",
    title: "Honest public claims",
    body: "You will not find invented client logos or inflated figures here. What we publish will be real.",
  },
];

export { capabilities };
