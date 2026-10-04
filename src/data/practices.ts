import type { IconName } from "@/components/ui/icons";

/**
 * The five practices Zain Clouds is organised around.
 *
 * These are delivery capabilities, not product pages. Each one names the real service
 * pages it covers (`related`), so the accordion can route a reader into the detailed
 * ecommerce, CRM, ERP, ERPNext, POS or custom software work without duplicating it.
 */
export type Practice = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
  capabilities: string[];
  outcomes: string[];
  icon: IconName;
  /** service page slugs this practice covers */
  related: string[];
  metric: { value: string; label: string };
};

export const practices: Practice[] = [
  {
    slug: "ai-data",
    number: "01",
    title: "AI & Data Innovation",
    category: "Intelligence",
    summary:
      "Turn the data your business already produces into decisions people can act on, and put practical automation in the day to day work.",
    detail:
      "We start from the reports, spreadsheets and systems you already run, then build the data layer, dashboards and targeted automation on top of them. Every model is measured against a decision your team actually has to make, so the work earns its place in the process instead of becoming a demonstration.",
    capabilities: [
      "Data warehousing and reporting pipelines",
      "Forecasting, demand and revenue models",
      "Document and text extraction",
      "Internal assistants and workflow automation",
    ],
    outcomes: [
      "Reporting that assembles itself instead of being rebuilt by hand",
      "A single version of the numbers used by every department",
    ],
    icon: "grid",
    related: ["erp", "erpnext", "crm"],
    metric: { value: "2 wks", label: "Typical first data review" },
  },
  {
    slug: "custom-software",
    number: "02",
    title: "Custom Software Development",
    category: "Engineering",
    summary:
      "Build the system the business needs, not a configuration of a system built for someone else.",
    detail:
      "When off the shelf software cannot carry the process, we design and build it. Requirements are written with your team, the system is delivered in working increments, and the code is handed over with the documentation and deployment setup needed to keep running it.",
    capabilities: [
      "Web platforms, portals and internal tools",
      "Ecommerce, CRM, ERP and POS implementations",
      "Mobile and tablet applications",
      "API and third party integrations",
    ],
    outcomes: [
      "One system instead of five tools that disagree with each other",
      "Software your own team can extend without calling us first",
    ],
    icon: "custom-software",
    related: ["ecommerce", "crm", "erp", "pos", "custom-software"],
    metric: { value: "6", label: "Services delivered end to end" },
  },
  {
    slug: "strategy",
    number: "03",
    title: "Strategy & Consultation",
    category: "Advisory",
    summary:
      "Work out what should be built, in what order, and what is genuinely worth the budget.",
    detail:
      "Most projects do not fail on the code. They fail on the sequence. We map the current process, identify the constraint that is actually costing money, and produce a written plan with scope, phases and honest trade offs, so the first release already proves something.",
    capabilities: [
      "Process mapping and systems audit",
      "Requirements and technical specification",
      "Build versus buy assessment",
      "Roadmaps, phasing and budget planning",
    ],
    outcomes: [
      "A scope that can be signed off before a line of code is written",
      "A roadmap the whole company can see and plan around",
    ],
    icon: "professional-services",
    related: ["erp", "erpnext"],
    metric: { value: "3", label: "Offices across the region" },
  },
  {
    slug: "cloud-devops",
    number: "04",
    title: "Cloud & DevOps",
    category: "Infrastructure",
    summary:
      "Get the software to production, keep it running, and make every release boring.",
    detail:
      "We set up the infrastructure, the deployment pipeline and the monitoring that tells you something is wrong before a customer reports it. Releases become small, reversible and repeatable, and the environments match what production looks like.",
    capabilities: [
      "Cloud infrastructure and environments",
      "CI/CD pipelines and automated releases",
      "Containerisation and orchestration",
      "Monitoring, backups and recovery planning",
    ],
    outcomes: [
      "Deployments that take minutes instead of a maintenance window",
      "A clear answer to what is running, where and on which version",
    ],
    icon: "erp",
    related: ["custom-software", "ecommerce"],
    metric: { value: "24/7", label: "Monitoring after launch" },
  },
  {
    slug: "qa-audits",
    number: "05",
    title: "QA & Audits",
    category: "Assurance",
    summary:
      "Find the problems before your customers do, and prove the system works the way it was specified.",
    detail:
      "We test against the written requirement, not against the build that happened to be delivered. Functionality, permissions, data handling, performance and the mobile experience are all covered, and you receive the findings in writing with a severity and a recommendation, not a score.",
    capabilities: [
      "Functional and regression testing",
      "Security and permission review",
      "Performance and load testing",
      "User acceptance testing with your team",
    ],
    outcomes: [
      "A tested release rather than a hopeful one",
      "A written record of what was checked and what was found",
    ],
    icon: "shield",
    related: ["erp", "custom-software"],
    metric: { value: "100%", label: "Findings documented in writing" },
  },
];

export const practiceBySlug = new Map(practices.map((practice) => [practice.slug, practice]));
