export type Industry = {
  slug: string;
  name: string;
  path: string;
  short: string;
  description: string;
  solutions: string[];
  challenges: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const industries: Industry[] = [
  {
    slug: "retail",
    name: "Retail",
    path: "/industries/retail",
    short:
      "POS, inventory and ecommerce that keep the shop floor and the stock room in step.",
    description:
      "Retail businesses depend on the counter, the stock room and the online store working from the same information. We build POS systems, inventory management and online stores that share data in real time, so pricing, stock and reporting stay consistent across every channel.",
    solutions: [
      "Point of sale systems for single and multi branch retail",
      "Inventory management and stock alerts",
      "Online stores connected to store inventory",
      "Customer records and loyalty at the counter",
      "Daily sales and reconciliation reporting",
    ],
    challenges: [
      "Stock drifting out of line between the shelf and the system",
      "End of day reconciliation taking too long",
      "Multi branch operations without a central view",
    ],
    seo: {
      title: "Retail Software Solutions | Zain Clouds",
      description:
        "POS, inventory and ecommerce software for retail businesses in Saudi Arabia, Pakistan and the Gulf. Multi branch support and real time stock.",
      keywords: ["retail software", "POS retail", "retail Saudi Arabia"],
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    path: "/industries/healthcare",
    short:
      "Patient, appointment and operations systems that focus on accuracy and privacy.",
    description:
      "Healthcare operations carry responsibilities that standard business software is not designed for. We build patient records, appointment management and operational systems with careful attention to data accuracy, privacy and audit trails, so the software supports clinical and administrative work.",
    solutions: [
      "Patient records and registration",
      "Appointment scheduling and reminders",
      "Clinic and practice management",
      "Prescription and billing workflows",
      "Secure access and audit logs",
    ],
    challenges: [
      "Patient information spread across paper and disconnected systems",
      "Appointments and billing handled with high manual effort",
      "No clear audit trail for sensitive records",
    ],
    seo: {
      title: "Healthcare Software Solutions | Zain Clouds",
      description:
        "Patient records, appointment and clinic management software for healthcare providers across Saudi Arabia, Pakistan and the Gulf.",
      keywords: ["healthcare software", "clinic management", "healthcare Saudi Arabia"],
    },
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    path: "/industries/manufacturing",
    short:
      "Production, inventory, purchasing and cost control connected in one system.",
    description:
      "Manufacturing businesses need to see what materials are available, what is being produced and what it costs. We build and implement systems that connect purchasing, production, inventory and costing, so managers can track work in progress and control costs without chasing between departments.",
    solutions: [
      "ERP implementation for manufacturing",
      "Bill of materials and production tracking",
      "Raw material and finished goods inventory",
      "Purchasing and supplier records",
      "Production cost reporting",
    ],
    challenges: [
      "Material and cost data held in separate systems",
      "Production progress only visible by walking the floor and asking",
      "Purchasing decisions made without stock visibility",
    ],
    seo: {
      title: "Manufacturing Software Solutions | Zain Clouds",
      description:
        "ERP and production software for manufacturers in Saudi Arabia, Pakistan and the Gulf, covering inventory, purchasing, production and cost control.",
      keywords: ["manufacturing ERP", "production software", "ERP manufacturing"],
    },
  },
  {
    slug: "distribution",
    name: "Distribution",
    path: "/industries/distribution",
    short:
      "Warehouse, orders and delivery systems built for volume and speed.",
    description:
      "Distribution businesses live and die by clear stock positions and fast order handling. We build solutions that connect warehousing, order entry, picking, dispatch and delivery status, giving the team one place to run daily operations from.",
    solutions: [
      "Warehouse and stock control",
      "Order entry and fulfilment",
      "Picking and dispatch workflows",
      "Delivery status and tracking",
      "Client and supplier records",
    ],
    challenges: [
      "Orders rekeyed between sales, warehouse and accounts",
      "Stock accuracy that depends on manual counts",
      "No visibility of delivery status from order to receipt",
    ],
    seo: {
      title: "Distribution Software Solutions | Zain Clouds",
      description:
        "Warehouse, order and delivery management software for distribution businesses in Saudi Arabia, Pakistan and the Gulf.",
      keywords: ["distribution software", "warehouse management", "order management"],
    },
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    path: "/industries/hospitality",
    short:
      "Bookings, customer service and operations software for busy venues.",
    description:
      "Hospitality runs on service and pace. We build booking, POS and operations software that keeps the front of house fast while giving management clear numbers on tables, sales and repeat business.",
    solutions: [
      "Reservation and booking management",
      "Restaurant and outlet POS",
      "Customer records and preferences",
      "Daily sales and shift reporting",
      "Inventory for kitchen and bar",
    ],
    challenges: [
      "Bookings and walk ins tracked across separate notes",
      "Sales and stock numbers not reconciling at close",
      "No useful picture of repeat customers",
    ],
    seo: {
      title: "Hospitality Software Solutions | Zain Clouds",
      description:
        "Booking, POS and hospitality operations software for restaurants and venues in Saudi Arabia, Pakistan and the Gulf.",
      keywords: ["hospitality software", "restaurant POS", "booking software"],
    },
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    path: "/industries/ecommerce",
    short:
      "Online sales platforms built on clear product, order and payment data.",
    description:
      "Online commerce works when products, orders and payments are all handled in one connected platform. We build ecommerce systems that keep the website, the order process and the operational side of the business on the same information.",
    solutions: [
      "Online store development",
      "Order management and fulfilment",
      "Payment gateway integration",
      "Inventory synchronisation",
      "Customer accounts and order history",
    ],
    challenges: [
      "Website and operations running on separate, unsynced systems",
      "Order errors creeping in through manual processing",
      "No reliable view of sales by product and channel",
    ],
    seo: {
      title: "Ecommerce Industry Solutions | Zain Clouds",
      description:
        "Ecommerce platforms with order management, payments and inventory for online businesses in Saudi Arabia, Pakistan and the Gulf.",
      keywords: ["ecommerce solutions", "online store", "ecommerce software"],
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export const industryGrid = [
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Distribution",
  "Hospitality",
  "Education",
  "Professional Services",
  "Ecommerce",
];