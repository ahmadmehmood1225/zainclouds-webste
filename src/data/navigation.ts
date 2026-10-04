export type NavChild = {
  label: string;
  description?: string;
  href?: string;
  heading?: boolean;
  cta?: boolean;
};

export type NavLink = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navigation: NavLink[] = [
  {
    label: "What We Do",
    href: "/services",
    children: [
      {
        label: "Ecommerce",
        description: "Online stores, payments and operations in one system.",
        href: "/services/ecommerce",
      },
      {
        label: "CRM",
        description: "Customer relationships and sales activity in one place.",
        href: "/services/crm",
      },
      {
        label: "ERP",
        description: "Finance, inventory and operations on a central platform.",
        href: "/services/erp",
      },
      {
        label: "ERPNext",
        description: "ERPNext implemented around how your business operates.",
        href: "/services/erpnext",
      },
      {
        label: "POS",
        description: "Point of sale connected with inventory and reporting.",
        href: "/services/pos",
      },
      {
        label: "Custom Software",
        description: "Software built for workflows existing products cannot handle.",
        href: "/services/custom-software",
      },
      { label: "Everything we build", heading: true },
      {
        label: "View all services",
        description: "Compare the six service lines side by side.",
        href: "/services",
        cta: true,
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        label: "Retail",
        description: "POS, inventory and ecommerce for the shop floor.",
        href: "/industries/retail",
      },
      {
        label: "Healthcare",
        description: "Patient records, appointments and clinic operations.",
        href: "/industries/healthcare",
      },
      {
        label: "Manufacturing",
        description: "Production, purchasing and cost control in one system.",
        href: "/industries/manufacturing",
      },
      {
        label: "Distribution",
        description: "Warehouse, orders and delivery built for volume.",
        href: "/industries/distribution",
      },
      {
        label: "Hospitality",
        description: "Booking, POS and operations for busy venues.",
        href: "/industries/hospitality",
      },
      {
        label: "Ecommerce",
        description: "Online sales built on clear product and order data.",
        href: "/industries/ecommerce",
      },
      {
        label: "View all industries",
        description: "See every industry and the systems we build for it.",
        href: "/industries",
        cta: true,
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      {
        label: "About",
        description: "A software company across Saudi Arabia, Pakistan and Dubai.",
        href: "/about",
      },
      {
        label: "Portfolio",
        description: "A representative range of the systems we build.",
        href: "/portfolio",
      },
      {
        label: "Careers",
        description: "Roles across leadership, engineering, product and design.",
        href: "/careers",
      },
      {
        label: "Contact",
        description: "Talk to the team about the system you need to build.",
        href: "/contact",
        cta: true,
      },
    ],
  },
];

export const footerServiceLinks = [
  { label: "Ecommerce", href: "/services/ecommerce" },
  { label: "CRM", href: "/services/crm" },
  { label: "ERP", href: "/services/erp" },
  { label: "ERPNext", href: "/services/erpnext" },
  { label: "POS", href: "/services/pos" },
  { label: "Custom Software", href: "/services/custom-software" },
];

export const footerIndustryLinks = [
  { label: "Retail", href: "/industries/retail" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Distribution", href: "/industries/distribution" },
  { label: "Hospitality", href: "/industries/hospitality" },
  { label: "Ecommerce", href: "/industries/ecommerce" },
];

export const footerCompanyLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];