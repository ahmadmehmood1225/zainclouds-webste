export type ServiceAccent = "green" | "pink" | "yellow" | "navy";

export type ServiceFaq = { question: string; answer: string };

export type ServiceSpotlight = {
  eyebrow: string;
  headline: string;
  body: string;
  points: string[];
};

export type Service = {
  slug: string;
  number: string;
  name: string;
  path: string;
  tagline: string;
  heroTitle: string;
  intro: string;
  problems: string[];
  solution: string;
  features: string[];
  benefits: string[];
  integrations: string[];
  faqs: ServiceFaq[];
  accent: ServiceAccent;
  category: string;
  video: string;
  poster: string;
  spotlight: ServiceSpotlight;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const services: Service[] = [
  {
    slug: "ecommerce",
    number: "01",
    name: "Ecommerce",
    path: "/services/ecommerce",
    tagline:
      "Build online stores that connect products, customers, payments and operations in one system.",
    heroTitle: "Ecommerce Software For Growing Businesses",
    intro:
      "We build online stores that work as part of the wider business, not as a separate website. Products, customers, orders, payments, inventory and reporting are connected in one system, so the store supports the rest of the operation instead of creating more disconnected tools.",
    problems: [
      "A store that is not connected to inventory, so stock levels go out of date.",
      "Orders handled in email threads and spreadsheets instead of a single system.",
      "Payments and shipping tracked across different platforms with no central view.",
      "A store that slows down or becomes difficult to maintain as it grows.",
    ],
    solution:
      "We design and build ecommerce platforms around the way your products and customers actually move. The storefront, admin, payment processing, inventory and reporting are built as one system, and we integrate it with the tools your team already relies on.",
    features: [
      "Store development",
      "Product management with variants, categories and pricing",
      "Customer accounts and order history",
      "Order management and fulfilment workflows",
      "Payment gateway integration",
      "Inventory integration across channels",
      "Sales and marketing analytics",
      "Third party integrations",
    ],
    benefits: [
      "One source of truth for products, stock and orders",
      "Orders reaching fulfilment without manual rekeying",
      "Inventory that reflects what is actually being sold",
      "Reporting that shows clear sales and margin data",
    ],
    integrations: [
      "Payment gateways",
      "Accounting software",
      "Inventory systems",
      "Shipping and courier services",
      "CRMs and marketing tools",
    ],
    faqs: [
      {
        question: "Do you build on existing platforms or from scratch?",
        answer:
          "Both. If an existing platform fits the business, we implement and extend it. When the workflow needs it, we build custom storefronts and admin systems. We recommend the approach that fits the requirement.",
      },
      {
        question: "Can the store connect to our current inventory and accounting systems?",
        answer:
          "Yes. Inventory, accounting and shipping integrations are a standard part of our ecommerce work. We map the integration before development starts.",
      },
      {
        question: "Will the store handle Arabic and English content?",
        answer:
          "Yes. We build stores with proper language and direction support, including RTL layouts, for the Saudi Arabian and wider Gulf market.",
      },
    ],
    accent: "green",
    category: "Commerce",
    video: "/media/videos/ecommerce.mp4",
    poster: "/media/posters/ecommerce.webp",
    spotlight: {
      eyebrow: "Ecommerce",
      headline: "From catalog layers to a living storefront",
      body: "Products, prices, customers, payments and fulfilment handled as one connected system instead of a website that floats next to the business.",
      points: [
        "Product catalog, pricing and variants in one place",
        "Orders flowing into fulfilment without rekeying",
        "Inventory that stays in step across every channel",
      ],
    },
    seo: {
      title: "Ecommerce Development Company | Zain Clouds",
      description:
        "Zain Clouds builds ecommerce platforms with product management, payments, inventory and reporting in one connected system for businesses across Saudi Arabia, Pakistan and the Gulf.",
      keywords: [
        "ecommerce development",
        "online store development",
        "ecommerce Saudi Arabia",
        "ecommerce UAE",
      ],
    },
  },
  {
    slug: "crm",
    number: "02",
    name: "CRM",
    path: "/services/crm",
    tagline:
      "Manage customer relationships, sales activity, follow ups and business information from one place.",
    heroTitle: "CRM Software That Organises Sales And Customers",
    intro:
      "Customer information loses its value when it lives across inboxes, spreadsheets and personal notes. We build CRM systems that bring leads, customers, sales activity and follow ups into one place, so the team always knows where every opportunity stands.",
    problems: [
      "Leads and customer notes scattered across emails, calls and spreadsheets.",
      "Follow ups missed because there is no clear view of pipeline activity.",
      "Sales staff leaving with customer knowledge that was only in their heads.",
      "No reliable data on which deals are moving and where things get stuck.",
    ],
    solution:
      "We build CRM solutions around the sales process your team already follows, then add the structure to make it repeatable. Leads, accounts, contacts, pipelines, activities and reporting are connected, with roles that match how your team actually works.",
    features: [
      "Lead and contact management",
      "Customer account records",
      "Sales pipeline and stage tracking",
      "Follow up scheduling and reminders",
      "Communication history and notes",
      "Sales reporting and dashboards",
      "User roles and permissions",
    ],
    benefits: [
      "A clear view of every customer and pipeline",
      "Follow ups that happen on schedule instead of by memory",
      "Consistent sales process that new staff can pick up",
      "Reporting that shows real pipeline and performance",
    ],
    integrations: [
      "Email and communication platforms",
      "Accounting systems",
      "Ecommerce platforms",
      "Marketing and automation tools",
    ],
    faqs: [
      {
        question: "Can the CRM match our current sales process?",
        answer:
          "Yes. We start by understanding your sales stages and workflows, then configure the CRM around them rather than forcing your team into a fixed layout.",
      },
      {
        question: "Is it suitable for small teams?",
        answer:
          "Yes. We structure the CRM so it is simple for small teams to use and can grow as the team and pipeline grow.",
      },
    ],
    accent: "pink",
    category: "Sales and Customers",
    video: "/media/videos/crm.mp4",
    poster: "/media/posters/crm.webp",
    spotlight: {
      eyebrow: "CRM",
      headline: "Every customer journey, drawn as one timeline",
      body: "Leads, conversations and follow ups stop living in inboxes and spreadsheets. The team sees the full relationship, the pipeline and the next action.",
      points: [
        "Leads and accounts with complete history",
        "Pipeline stages the team actually uses",
        "Follow ups and reporting that run on schedule",
      ],
    },
    seo: {
      title: "CRM Software Development | Zain Clouds",
      description:
        "Zain Clouds develops CRM software for leads, customers, sales pipelines and follow ups, built for businesses across Saudi Arabia, Pakistan and the Gulf region.",
      keywords: [
        "CRM software",
        "CRM development",
        "customer relationship management",
        "CRM Saudi Arabia",
      ],
    },
  },
  {
    slug: "erp",
    number: "03",
    name: "ERP",
    path: "/services/erp",
    tagline:
      "Connect finance, inventory, purchasing, sales and business operations through a central platform.",
    heroTitle: "ERP Solutions That Connect The Whole Business",
    intro:
      "When finance, inventory and operations run in separate tools, decisions lag behind the numbers. We implement and build ERP solutions that connect finance, inventory, purchasing, sales and reporting on a central platform, so managers work from the same data.",
    problems: [
      "Finance, inventory and sales running on separate systems that do not talk to each other.",
      "Stock and cost data that never quite matches across departments.",
      "Purchasing and procurement managed manually and late.",
      "Reporting that takes days to assemble instead of minutes.",
    ],
    solution:
      "We connect the core parts of the business into one platform, with finance, inventory, purchasing, sales and operations working from the same records. The ERP is configured around the actual departments and approvals, not a generic template.",
    features: [
      "Finance and accounting modules",
      "Inventory and warehouse management",
      "Purchasing and procurement",
      "Sales and customer records",
      "Operations workflows",
      "Reporting and dashboards",
      "User management and permissions",
    ],
    benefits: [
      "Finance, inventory and sales working from the same data",
      "Stock and cost records that stay in step",
      "Procurement that runs on clear approval flows",
      "Reports built from live business data",
    ],
    integrations: [
      "Bank feeds",
      "Ecommerce platforms",
      "POS systems",
      "HR and payroll tools",
      "Third party logistics",
    ],
    faqs: [
      {
        question: "Is an ERP right for our size of business?",
        answer:
          "ERP makes sense when separate systems are creating extra manual work and the numbers do not line up across departments. We help you decide before you commit.",
      },
      {
        question: "Do you handle the implementation?",
        answer:
          "Yes. We manage configuration, data migration, integration, training and go live, with support after launch.",
      },
    ],
    accent: "yellow",
    category: "Business Operations",
    video: "/media/videos/erp.mp4",
    poster: "/media/posters/erp.webp",
    spotlight: {
      eyebrow: "ERP",
      headline: "Modules that connect into one system",
      body: "Finance, inventory, purchasing and sales stop running in parallel silos. Reports are built from the same live records everyone works on.",
      points: [
        "Finance and stock records that stay in step",
        "Purchasing running on clear approval flows",
        "Live dashboards instead of days of assembly",
      ],
    },
    seo: {
      title: "ERP Solutions | Zain Clouds",
      description:
        "Zain Clouds implements ERP solutions connecting finance, inventory, purchasing, sales and reporting for businesses in Saudi Arabia, Pakistan and the Gulf.",
      keywords: [
        "ERP solutions",
        "ERP implementation",
        "enterprise resource planning",
        "ERP Saudi Arabia",
      ],
    },
  },
  {
    slug: "erpnext",
    number: "04",
    name: "ERPNext",
    path: "/services/erpnext",
    tagline:
      "Implement and customize ERPNext around the way your business actually operates.",
    heroTitle: "ERPNext Implementation Services",
    intro:
      "ERPNext is a strong open source ERP, but it only works well when it is set up around the business using it. We implement, configure and customize ERPNext to match your workflows, migrate your data and support your team through the transition.",
    problems: [
      "An ERPNext install that was never configured for how the business works.",
      "Data from the old system that did not make it across cleanly.",
      "No internal team available to customise modules and forms.",
      "Users finding the system difficult because training was skipped.",
    ],
    solution:
      "We take ERPNext from default setup to a working system. We handle the implementation plan, module configuration, customisation, data migration, integrations, training and ongoing support, so the system matches the business rather than the other way around.",
    features: [
      "ERPNext implementation planning",
      "Customisation of modules and forms",
      "Module configuration to match workflows",
      "Data migration from existing systems",
      "Integrations with other business tools",
      "User training and documentation",
      "Ongoing support and maintenance",
    ],
    benefits: [
      "An ERP configured around your real workflows",
      "Clean data migration without losing history",
      "Team members trained on the system they will use",
      "Support available after go live",
    ],
    integrations: [
      "Banking and accounting feeds",
      "Ecommerce platforms",
      "Inventory and logistics tools",
      "HR and payroll",
    ],
    faqs: [
      {
        question: "Can you customise ERPNext for our specific workflow?",
        answer:
          "Yes. We develop custom dashboards, forms and automation on top of ERPNext where the standard modules do not cover the workflow.",
      },
      {
        question: "Do you provide training?",
        answer:
          "Yes. Training is part of every ERPNext implementation we run, with documentation for the modules your team will use daily.",
      },
    ],
    accent: "navy",
    category: "ERP",
    video: "/media/videos/erpnext.mp4",
    poster: "/media/posters/erpnext.webp",
    spotlight: {
      eyebrow: "ERPNext",
      headline: "A modular workflow, configured around you",
      body: "ERPNext is powerful out of the box and only delivers when it is set up, customized and migrated around the business that will use it.",
      points: [
        "Modules and forms tuned to real workflows",
        "Data migrated cleanly with history intact",
        "Teams trained and supported after go live",
      ],
    },
    seo: {
      title: "ERPNext Implementation Services | Zain Clouds",
      description:
        "Zain Clouds implements, customizes and supports ERPNext for businesses across Saudi Arabia, Pakistan and the Gulf. Configuration, data migration, training and support.",
      keywords: [
        "ERPNext implementation",
        "ERPNext customization",
        "ERPNext Saudi Arabia",
        "ERPNext developers",
      ],
    },
  },
  {
    slug: "pos",
    number: "05",
    name: "POS",
    path: "/services/pos",
    tagline:
      "Create reliable point of sale systems connected with inventory, customers and reporting.",
    heroTitle: "POS Software For Real Retail Environments",
    intro:
      "A point of sale system has to be fast at the counter and accurate behind it. We build POS solutions that handle sales, returns, payments and customers while staying connected to inventory and reporting, including support for multiple branches.",
    problems: [
      "Sales at the counter not reflected in inventory in real time.",
      "End of day reconciliation that takes too long.",
      "No central view across multiple branches or outlets.",
      "Payments and returns handled with too many manual steps.",
    ],
    solution:
      "We build POS systems where the sale updates inventory, customer records and reports at the same time. The system is designed to be quick for staff, reliable through busy periods and clear when reconciling cash and payments at the end of the day.",
    features: [
      "Point of sale operations",
      "Inventory and stock tracking",
      "Customer records at the counter",
      "Product search and pricing",
      "Sales, returns and refunds",
      "Payment processing",
      "Sales reports and daily reconciliation",
      "Multi branch support",
    ],
    benefits: [
      "Stock updated with every sale",
      "Faster checkout for staff and customers",
      "One view of sales across branches",
      "Clean daily reports and reconciliation",
    ],
    integrations: [
      "Payment terminals",
      "Accounting systems",
      "Inventory systems",
      "Ecommerce platforms",
    ],
    faqs: [
      {
        question: "Does the POS work offline?",
        answer:
          "We can build systems that continue to take sales during brief connection issues and synchronise once the connection returns, depending on the requirement.",
      },
      {
        question: "Can it support multiple branches?",
        answer:
          "Yes. Multi branch support covers separate inventories, pricing and reporting within one system.",
      },
    ],
    accent: "green",
    category: "Retail",
    video: "/media/videos/pos.mp4",
    poster: "/media/posters/pos.webp",
    spotlight: {
      eyebrow: "POS",
      headline: "Fast at the counter, accurate behind it",
      body: "A point of sale that updates inventory, customer records and reports with every sale, and stays quick through the busiest period.",
      points: [
        "Stock updated with every transaction",
        "Daily reconciliation that takes minutes",
        "One clear view across branches",
      ],
    },
    seo: {
      title: "POS Software Solutions | Zain Clouds",
      description:
        "Zain Clouds builds POS software connected to inventory, customers, payments and reporting for retail businesses in Saudi Arabia, Pakistan and the Gulf.",
      keywords: [
        "POS software",
        "point of sale system",
        "POS Saudi Arabia",
        "POS Dubai",
      ],
    },
  },
  {
    slug: "custom-software",
    number: "06",
    name: "Custom Software",
    path: "/services/custom-software",
    tagline:
      "Build software for workflows that existing products cannot handle properly.",
    heroTitle: "Custom Software Development",
    intro:
      "Some workflows do not fit any off the shelf product. When generic software forces your business to change how it works, we build software around the requirement instead. From business analysis to deployment, we take the process from problem to working system.",
    problems: [
      "Off the shelf software that cannot handle a specific workflow.",
      "Workarounds and manual steps that are adding risk and cost.",
      "Existing systems that are outdated, unsupported or expensive to maintain.",
      "Internal processes digitised only in part, with data still moving by hand.",
    ],
    solution:
      "We develop software around real business requirements. The process starts with business analysis so the system is defined against the actual workflow, then moves through interface design, development, API and database work, cloud deployment and maintenance.",
    features: [
      "Business analysis and requirements",
      "UI and UX design",
      "Backend development",
      "API development",
      "Database design",
      "Cloud deployment and hosting",
      "Maintenance and improvements",
    ],
    benefits: [
      "Software matched to the actual workflow",
      "No forced changes to how staff already work",
      "A system your team can extend as requirements change",
      "One accountable team from analysis to support",
    ],
    integrations: [
      "Existing business systems",
      "Payment and billing platforms",
      "External APIs",
      "Cloud infrastructure",
    ],
    faqs: [
      {
        question: "What size of custom project do you take on?",
        answer:
          "We take on projects where a clear business problem exists, from single module tools to complete platforms. We start with the analysis and scope before proposing a build.",
      },
      {
        question: "Will we own the source code?",
        answer:
          "Yes. The source code and all project assets belong to your company once the project is delivered and paid for.",
      },
    ],
    accent: "pink",
    category: "Development",
    video: "/media/videos/custom-software.mp4",
    poster: "/media/posters/custom-software.webp",
    spotlight: {
      eyebrow: "Custom Software",
      headline: "Layers of architecture assembled into one platform",
      body: "When no existing product fits the workflow, we define the requirement, design the system and build it end to end around the way your work actually happens.",
      points: [
        "Requirements scoped against the real workflow",
        "UI, services, APIs and data built as one system",
        "Cloud deployed and supported after launch",
      ],
    },
    seo: {
      title: "Custom Software Development | Zain Clouds",
      description:
        "Zain Clouds develops custom software around specific business workflows for companies in Saudi Arabia, Pakistan and the Gulf. Analysis, build, APIs, cloud and support.",
      keywords: [
        "custom software development",
        "bespoke software",
        "software development Saudi Arabia",
        "custom software Dubai",
      ],
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const relatedOrder: Record<string, string[]> = {
  ecommerce: ["crm", "erp", "pos"],
  crm: ["ecommerce", "erpnext", "pos"],
  erp: ["erpnext", "custom-software", "pos"],
  erpnext: ["erp", "ecommerce", "custom-software"],
  pos: ["ecommerce", "erp", "crm"],
  "custom-software": ["erp", "ecommerce", "crm"],
};

export function getRelatedServices(slug: string, limit = 3) {
  const order = relatedOrder[slug] ?? [];
  const related = order.map((id) => getService(id)).filter((s): s is Service => Boolean(s));
  if (related.length < limit) {
    const rest = services.filter(
      (s) => s.slug !== slug && !related.some((r) => r.slug === s.slug),
    );
    return [...related, ...rest].slice(0, limit);
  }
  return related.slice(0, limit);
}