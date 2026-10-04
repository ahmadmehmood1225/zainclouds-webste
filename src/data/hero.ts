import type { RegionId } from "./regions";

export type HeroModule = {
  id: string;
  /** Language neutral badge used in the console header. */
  code: string;
  label: string;
  detail: string;
};

export type HeroMetric = {
  id: string;
  label: string;
  value: number;
  delta: string;
  tone?: "up" | "warn";
};

export type HeroOrderStatus = "paid" | "picking" | "ready";

export type HeroOrder = {
  id: string;
  channel: string;
  customer: string;
  place: string;
  total: string;
  status: HeroOrderStatus;
};

export type HeroPosLine = {
  name: string;
  qty: number;
  amount: string;
};

export type HeroPosRecord = {
  id: string;
  customer: string;
  lines: HeroPosLine[];
  total: string;
};

export type HeroStockLine = {
  sku: string;
  name: string;
  onHand: number;
  capacity: number;
  unit: string;
};

export type HeroLedgerLine = {
  ref: string;
  label: string;
  amount: string;
  state: "posted" | "pending";
};

export type HeroEcosystem = {
  workspace: string;
  consoleLabel: string;
  currency: string;
  syncedLabel: string;
  modules: HeroModule[];
  metrics: HeroMetric[];
  ordersLabel: string;
  orders: HeroOrder[];
  posLabel: string;
  posPaid: string;
  posRecords: [HeroPosRecord, ...HeroPosRecord[]];
  totalLabel: string;
  statusLabels: Record<HeroOrderStatus, string>;
  inventoryLabel: string;
  stock: HeroStockLine[];
  ledgerLabel: string;
  ledger: HeroLedgerLine[];
  compliance: string;
  branches: number;
};

export type HeroContent = {
  eyebrow: string;
  headline: [string, string, string];
  accentLine: 0 | 1 | 2;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  locations: string[];
  marketNote: string;
  /** Screen reader description of the console visual. */
  summary: string;
  ecosystem: HeroEcosystem;
};

/**
 * Home hero copy and console data per region.
 *
 * English covers Dubai and the wider Gulf market, English with local operating
 * context covers Pakistan, and Arabic covers the Kingdom. The structure of the
 * console never changes, only the records inside it.
 */
const heroByRegion: Record<RegionId, HeroContent> = {
  mea: {
    eyebrow: "Enterprise software, delivered",
    headline: ["Commerce, operations", "and finance on", "one system"],
    accentLine: 2,
    description:
      "Zain Clouds builds ecommerce, POS, CRM and ERP platforms that operate as a single system. Your teams work from the same stock, the same customers and the same numbers, in every branch and every market.",
    primaryCta: "Start a conversation",
    secondaryCta: "Explore services",
    locations: ["Dubai", "Riyadh", "Abu Dhabi", "Doha", "Kuwait City"],
    marketNote: "English interface with regional language, tax and payment support",
    summary:
      "Operations console showing six connected modules: a live order queue, a point of sale terminal, stock levels per branch, and a finance ledger, all reading from the same records.",
    ecosystem: {
      workspace: "Dubai Flagship",
      consoleLabel: "Operations console",
      currency: "AED",
      syncedLabel: "Synced",
      branches: 6,
      compliance: "E invoicing ready · multi-currency · UAE VAT",
      modules: [
        { id: "storefront", code: "ST", label: "Storefront", detail: "Catalog and checkout" },
        { id: "orders", code: "OR", label: "Orders", detail: "One order queue" },
        { id: "inventory", code: "IN", label: "Inventory", detail: "Stock by branch" },
        { id: "pos", code: "PO", label: "POS", detail: "Counter and terminals" },
        { id: "erp", code: "ER", label: "ERP", detail: "Finance and purchasing" },
        { id: "crm", code: "CR", label: "CRM", detail: "Accounts and follow ups" },
      ],
      metrics: [
        { id: "revenue", label: "Sales today", value: 96540, delta: "+9.1%" },
        { id: "orders", label: "Orders", value: 388, delta: "+21" },
        { id: "aov", label: "Average order", value: 249, delta: "+2.6%" },
        { id: "alerts", label: "Stock alerts", value: 4, delta: "2 critical", tone: "warn" },
      ],
      ordersLabel: "Order queue",
      orders: [
        {
          id: "SO-9281",
          channel: "Online",
          customer: "Mariam Haddad",
          place: "Jumeirah, Dubai",
          total: "1,860 AED",
          status: "paid",
        },
        {
          id: "SO-9282",
          channel: "POS",
          customer: "Bluewave Caf\u00e9",
          place: "Business Bay, Dubai",
          total: "4,220 AED",
          status: "picking",
        },
        {
          id: "SO-9283",
          channel: "Online",
          customer: "Omar Al Suwaidi",
          place: "Al Majaz, Sharjah",
          total: "640 AED",
          status: "ready",
        },
        {
          id: "SO-9284",
          channel: "Wholesale",
          customer: "Al Bayan Trading",
          place: "Deira, Dubai",
          total: "26,400 AED",
          status: "paid",
        },
      ],
      posLabel: "Counter terminal",
      posPaid: "Paid",
      posRecords: [
        {
          id: "POS-0041",
          customer: "Walk-in customer",
          lines: [
            { name: "Cold brew case", qty: 2, amount: "420 AED" },
            { name: "Ceramic mugs", qty: 6, amount: "195 AED" },
            { name: "Still water", qty: 12, amount: "45 AED" },
            { name: "Gift cards", qty: 3, amount: "90 AED" },
          ],
          total: "750 AED",
        },
        {
          id: "POS-0042",
          customer: "Mariam Haddad",
          lines: [
            { name: "Coffee beans 250g", qty: 1, amount: "135 AED" },
            { name: "Ceramic mug", qty: 2, amount: "60 AED" },
            { name: "Still water", qty: 2, amount: "20 AED" },
          ],
          total: "215 AED",
        },
      ],
      totalLabel: "Total",
      statusLabels: { paid: "Paid", picking: "Picking", ready: "Ready" },
      inventoryLabel: "Stock by branch",
      stock: [
        { sku: "SKU-4471", name: "Signature roast 250g", onHand: 42, capacity: 80, unit: "cases" },
        { sku: "SKU-1180", name: "Paper cup 12oz", onHand: 18, capacity: 120, unit: "packs" },
        { sku: "SKU-9022", name: "Insulated carry bag", onHand: 96, capacity: 100, unit: "units" },
      ],
      ledgerLabel: "Finance and purchasing",
      ledger: [
        { ref: "INV-2026-1188", label: "Sales invoice", amount: "42,300 AED", state: "posted" },
        {
          ref: "PO-4471",
          label: "Supplier purchase order",
          amount: "18,750 AED",
          state: "pending",
        },
        {
          ref: "FX-0912",
          label: "Multi-currency settlement",
          amount: "USD 6,000",
          state: "posted",
        },
      ],
    },
  },

  pk: {
    eyebrow: "Software built for how you operate",
    headline: ["One system for", "retail, trading", "and accounts"],
    accentLine: 2,
    description:
      "Zain Clouds builds ecommerce, POS, CRM and ERP platforms for businesses that cannot afford split systems. Stock, sales and finance stay in one place, in local currency, with the reporting your accountant asks for.",
    primaryCta: "Start a conversation",
    secondaryCta: "Explore services",
    locations: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Dubai"],
    marketNote: "Local payment methods, PKR pricing, and teams working in Urdu or English",
    summary:
      "Operations console showing six connected modules: a live order queue, a point of sale terminal, stock levels per branch, and a finance ledger, all reading from the same records.",
    ecosystem: {
      workspace: "Karachi Main Branch",
      consoleLabel: "Operations console",
      currency: "PKR",
      syncedLabel: "Synced",
      branches: 9,
      compliance: "Branching stock ledger · local payments · daily close",
      modules: [
        { id: "storefront", code: "ST", label: "Storefront", detail: "Catalog and checkout" },
        { id: "orders", code: "OR", label: "Orders", detail: "One order queue" },
        { id: "inventory", code: "IN", label: "Inventory", detail: "Stock by branch" },
        { id: "pos", code: "PO", label: "POS", detail: "Counter and terminals" },
        { id: "erp", code: "ER", label: "ERP", detail: "Finance and purchasing" },
        { id: "crm", code: "CR", label: "CRM", detail: "Accounts and follow ups" },
      ],
      metrics: [
        { id: "revenue", label: "Sales today", value: 4182500, delta: "+14.2%" },
        { id: "orders", label: "Orders", value: 1046, delta: "+74" },
        { id: "aov", label: "Average order", value: 3998, delta: "+5.6%" },
        { id: "alerts", label: "Stock alerts", value: 11, delta: "5 critical", tone: "warn" },
      ],
      ordersLabel: "Order queue",
      orders: [
        {
          id: "SO-3312",
          channel: "Online",
          customer: "Bilal Ahmed",
          place: "Gulberg, Lahore",
          total: "PKR 18,400",
          status: "paid",
        },
        {
          id: "SO-3313",
          channel: "POS",
          customer: "Sindh Traders",
          place: "Saddar, Karachi",
          total: "PKR 246,000",
          status: "picking",
        },
        {
          id: "SO-3314",
          channel: "Online",
          customer: "Ayesha Khan",
          place: "F-10, Islamabad",
          total: "PKR 9,750",
          status: "ready",
        },
        {
          id: "SO-3315",
          channel: "Wholesale",
          customer: "Indus Retail Group",
          place: "Korangi, Karachi",
          total: "PKR 1,180,000",
          status: "paid",
        },
      ],
      posLabel: "Counter terminal",
      posPaid: "Paid",
      posRecords: [
        {
          id: "POS-7811",
          customer: "Walk-in customer",
          lines: [
            { name: "Tea carton", qty: 3, amount: "4,950 PKR" },
            { name: "Glass storage jar", qty: 8, amount: "2,400 PKR" },
            { name: "Still water", qty: 12, amount: "1,200 PKR" },
            { name: "Carry bag", qty: 20, amount: "1,600 PKR" },
          ],
          total: "10,150 PKR",
        },
        {
          id: "POS-7812",
          customer: "Ayesha Khan",
          lines: [
            { name: "Tea carton", qty: 1, amount: "1,650 PKR" },
            { name: "Glass storage jar", qty: 2, amount: "600 PKR" },
          ],
          total: "2,250 PKR",
        },
      ],
      totalLabel: "Total",
      statusLabels: { paid: "Paid", picking: "Picking", ready: "Ready" },
      inventoryLabel: "Stock by branch",
      stock: [
        { sku: "SKU-2041", name: "Black tea 950g", onHand: 64, capacity: 90, unit: "cartons" },
        { sku: "SKU-7720", name: "Storage jar 1L", onHand: 22, capacity: 110, unit: "units" },
        { sku: "SKU-3315", name: "Carry bag large", onHand: 88, capacity: 100, unit: "units" },
      ],
      ledgerLabel: "Finance and purchasing",
      ledger: [
        {
          ref: "INV-2026-2204",
          label: "Sales invoice",
          amount: "PKR 1,240,000",
          state: "posted",
        },
        {
          ref: "PO-1188",
          label: "Supplier purchase order",
          amount: "PKR 860,000",
          state: "pending",
        },
        {
          ref: "BANK-0331",
          label: "Bank settlement",
          amount: "PKR 3,100,000",
          state: "posted",
        },
      ],
    },
  },

  ksa: {
    eyebrow: "برمجيات مؤسسية مُنفّذة بالكامل",
    headline: ["متجرك وأنظمتك", "على نظام", "واحد متكامل"],
    accentLine: 2,
    description:
      "تبني زين كلاودز منصات للتجارة الإلكترونية ونقاط البيع وإدارة العملاء وتخطيط الموارد تعمل كنظام واحد. فريقك يتعامل مع المخزون نفسه والعملاء نفسها والأرقام نفسها، في كل فرع وكل سوق.",
    primaryCta: "ابدأ الحديث",
    secondaryCta: "تعرّف على خدماتنا",
    locations: ["الرياض", "جدة", "الدمام", "مكة المكرمة"],
    marketNote: "واجهة عربية بالكامل، وفوترة متوافقة مع هيئة الزكاة والضريبة والجمارك، وقنوات دفع محلية",
    summary:
      "لوحة عمليات تعرض ست وحدات مترابطة: قائمة طلبات حية، ونقطة بيع، ومستويات المخزون لكل فرع، وسجل مالي، جميعها تقرأ من السجلات نفسها.",
    ecosystem: {
      workspace: "متجر الرياض",
      consoleLabel: "وحدة العمليات",
      currency: "SAR",
      syncedLabel: "متزامن",
      branches: 4,
      compliance: "فوترة إلكترونية · توافق مع هيئة الزكاة والضريبة والجمارك · متجر نون",
      modules: [
        { id: "storefront", code: "ST", label: "المتجر الإلكتروني", detail: "الكتالوج والدفع" },
        { id: "orders", code: "OR", label: "الطلبات", detail: "قائمة طلبات واحدة" },
        { id: "inventory", code: "IN", label: "المخزون", detail: "الكمية لكل فرع" },
        { id: "pos", code: "PO", label: "نقاط البيع", detail: "الكاشير والأجهزة" },
        { id: "erp", code: "ER", label: "تخطيط الموارد", detail: "المالية والمشتريات" },
        { id: "crm", code: "CR", label: "إدارة العملاء", detail: "الحسابات والمتابعة" },
      ],
      metrics: [
        { id: "revenue", label: "مبيعات اليوم", value: 184320, delta: "+12.4%" },
        { id: "orders", label: "الطلبات", value: 612, delta: "+38" },
        { id: "aov", label: "متوسط الطلب", value: 301, delta: "+4.1%" },
        { id: "alerts", label: "تنبيهات المخزون", value: 7, delta: "3 حرجة", tone: "warn" },
      ],
      ordersLabel: "قائمة الطلبات",
      orders: [
        {
          id: "SO-4821",
          channel: "المتجر",
          customer: "خالد المنصور",
          place: "حي الياسمين، الرياض",
          total: "1,240 SAR",
          status: "paid",
        },
        {
          id: "SO-4822",
          channel: "نقطة بيع",
          customer: "متجر الشروق",
          place: "الدمام",
          total: "3,180 SAR",
          status: "picking",
        },
        {
          id: "SO-4823",
          channel: "المتجر",
          customer: "نورة العتيبي",
          place: "الروضة، جدة",
          total: "760 SAR",
          status: "ready",
        },
        {
          id: "SO-4824",
          channel: "جملة",
          customer: "شركة الأفق للتجارة",
          place: "العليا، الرياض",
          total: "12,400 SAR",
          status: "paid",
        },
      ],
      posLabel: "نقطة البيع",
      posPaid: "تم الدفع",
      posRecords: [
        {
          id: "POS-4824",
          customer: "عميل مباشر",
          lines: [
            { name: "قهوة مختصة 250 جم", qty: 4, amount: "380 SAR" },
            { name: "أكواب ورقية", qty: 12, amount: "96 SAR" },
            { name: "ماء معدني", qty: 6, amount: "30 SAR" },
            { name: "أكياس توصيل", qty: 8, amount: "64 SAR" },
          ],
          total: "570 SAR",
        },
        {
          id: "POS-4825",
          customer: "نورة العتيبي",
          lines: [
            { name: "قهوة مختصة", qty: 2, amount: "180 SAR" },
            { name: "ماء معدني", qty: 3, amount: "30 SAR" },
            { name: "حقيبة قماش", qty: 1, amount: "25 SAR" },
          ],
          total: "235 SAR",
        },
      ],
      totalLabel: "الإجمالي",
      statusLabels: { paid: "مدفوع", picking: "قيد التجهيز", ready: "جاهز" },
      inventoryLabel: "المخزون لكل فرع",
      stock: [
        { sku: "SKU-4471", name: "قهوة مختصة 250 جم", onHand: 42, capacity: 80, unit: "عبوة" },
        { sku: "SKU-1180", name: "كوب ورق 12 أونصة", onHand: 18, capacity: 120, unit: "عبوة" },
        { sku: "SKU-9022", name: "كيس توصيل معزول", onHand: 96, capacity: 100, unit: "كيس" },
      ],
      ledgerLabel: "المالية والمشتريات",
      ledger: [
        { ref: "INV-2026-0418", label: "فاتورة مبيعات", amount: "12,400 SAR", state: "posted" },
        { ref: "PO-3312", label: "أمر شراء لمورد", amount: "8,900 SAR", state: "pending" },
        { ref: "VAT-0418", label: "ضريبة القيمة المضافة", amount: "1,240 SAR", state: "posted" },
      ],
    },
  },
};

export const heroFallback: HeroContent = heroByRegion.mea;

export function getHeroContent(region: RegionId | null | undefined): HeroContent {
  if (!region) return heroFallback;
  return heroByRegion[region] ?? heroFallback;
}
