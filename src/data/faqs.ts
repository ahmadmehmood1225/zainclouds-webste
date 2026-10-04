export type Faq = { question: string; answer: string };

/**
 * Homepage FAQ. The questions come from the calls we actually have with retail,
 * distribution and services businesses, so the answers stay specific rather
 * than generic agency copy. Service pages keep their own questions.
 */
export const homeFaqs: Faq[] = [
  {
    question: "How long does an ecommerce project take?",
    answer:
      "A focused storefront with products, payments, order management and inventory usually runs six to ten weeks. Adding custom integrations, ERP connectivity or a large catalogue extends that. We give you a dated plan with milestones before development starts, so you know what lands in each phase.",
  },
  {
    question: "Can you connect our POS, our store and our ERP so data moves between them?",
    answer:
      "Yes, and that is usually the point. A sale at the counter updates stock, the customer record and the ledger in one system. An order placed online reserves stock against the branch that will fulfil it. We map the data flow between your systems before we build, so nothing is left to reconcile by hand later.",
  },
  {
    question: "Is ERPNext a realistic option for a company without a technical team?",
    answer:
      "It is, provided it is implemented properly. ERPNext is powerful out of the box but only useful once the modules, forms and approvals match how your people work. We handle configuration, data migration, training and support, and we give your team the documentation for the screens they will use daily.",
  },
  {
    question: "Will inventory stay accurate across our branches and our online store?",
    answer:
      "That depends on treating stock as one shared record rather than a number each channel keeps separately. We set up central stock with branch level visibility, low stock alerts, transfers between locations and automatic reservation for online orders, then reconcile the counts at go live.",
  },
  {
    question: "Do we have to replace our current accounting software?",
    answer:
      "Not always. If the current package can post the transactions your operation produces, we integrate with it. If the gaps are costing you manual work every month, we tell you early, with the cost of staying and the cost of moving, and let you decide.",
  },
  {
    question: "Can the CRM record the conversations our team already has?",
    answer:
      "Yes. Leads, accounts, calls, emails and messages are attached to the customer record, so whoever picks up the enquiry can see the history instead of starting from zero. Follow ups are scheduled rather than remembered, and pipeline reporting shows where deals actually stand.",
  },
  {
    question: "What does an ERP implementation involve, and how disruptive is it?",
    answer:
      "The sequence is usually: process review, configuration, data migration, integrations, user testing, training and go live. We run it department by department so the business keeps trading throughout, and the old process stays available until the new one is proven.",
  },
  {
    question: "Our current software cannot handle one specific part of our workflow. Is custom software worth it?",
    answer:
      "Sometimes. If a single gap is being worked around with spreadsheets and manual copying, a small custom module is often cheaper than the ongoing cost of the workaround. If the workflow is standard, we say so and recommend a configured product instead. You get a straight answer before you commit.",
  },
  {
    question: "How do you handle a business with several branches and different pricing?",
    answer:
      "Each branch gets its own stock, pricing rules and user permissions inside one system, with group level reporting on top. Staff see only what they need, managers see every branch, and you can compare performance between locations without exporting anything to a spreadsheet.",
  },
  {
    question: "Can the system accept the payment methods our customers actually use?",
    answer:
      "We integrate the gateways and payment methods relevant to your market, including card, wallet, bank transfer and cash on delivery, and we handle the settlement and reconciliation for each one. Where a business needs instalment payments, those are configured on the checkout rather than handled by hand.",
  },
  {
    question: "Will the system work in Arabic with a full right to left layout?",
    answer:
      "Yes. Arabic is not an afterthought here: navigation, tables, forms, printouts and reports are all built with proper RTL layout and Arabic typography, which matters for finance and retail teams in Saudi Arabia and across the Gulf.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project ends with handover, documentation and a support arrangement sized to the system: monitoring, bug fixes, small improvements and scheduled check ins. If you later need a change of scope, a new branch or a new channel, we extend the same system rather than starting again.",
  },
];
