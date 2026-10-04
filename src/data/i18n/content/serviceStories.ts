import type { Locale } from "@/data/regions";

/**
 * Copy for the six service stories and the shared service page sections.
 *
 * The stories are deliberately bespoke components rather than one template, so
 * their wording lives here instead of inside JSX. English is the source of
 * truth; the Arabic record is type checked against it so a missing or renamed
 * field fails the build instead of leaking English onto a service page.
 */

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

const en = {
  shared: {
    videoTitle: "{name} overview",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "Written as a spec, because that is what this is",
    capabilitiesBody:
      "The scope we plan around before a project starts. Each item becomes a concrete work package, not a promise.",
    valueLabel: "Business value",
    valueTitle: "What changes when {service} works properly",
    valueCta: "Talk about a {service} project",
    integrationsLabel: "Integrations",
    integrationsAria: "{service} integrations",
    heroChips: ["Saudi Arabia", "Gulf region", "In-house delivery"],
    conceptLabel: "Concept",
    chromePlatform: "Platform",
  },
  ecommerce: {
    eyebrow: "The system behind the store",
    title: "A store is a stack of layers. They only work when they stay in step.",
    body: "The storefront is the visible layer. Behind it sit product data, pricing, payment, inventory and fulfilment, and when any of those drift apart the customer is the first to notice. We build them as one system with a single source of truth.",
    layers: ["Products", "Commerce logic", "Storefront", "Operations"],
    chromeLabel: "Storefront",
    videoTranscript:
      "Product tiles assemble into a storefront, a product opens, it is added to a cart and the order is confirmed.",
    breakEyebrow: "Where the stack breaks",
    breakTitle: "Each layer can quietly go out of sync with the others.",
    fixLabel: "The fix",
    fixTitle: "One connected system, not a website next to the business",
    fixBody: "The store becomes an operating asset: product data, stock, orders and reporting all live in the same records the rest of the business works from.",
  },
  crm: {
    aria: "Customer journey timeline",
    eyebrow: "The journey",
    title: "One deal is a journey. A business is hundreds of them.",
    body: "A CRM is only useful if the stages match the way the team already sells. We draw the customer journey as a set of clear steps, then build the system around it.",
    stages: [
      { label: "Lead", note: "Every enquiry lands in one place with its source." },
      { label: "Qualified", note: "Needs and fit are recorded against the contact." },
      { label: "Proposal", note: "Offers are tracked with history, not email trails." },
      { label: "Won", note: "Won deals close the loop into the wider business." },
      { label: "Retain", note: "Confirmed clients stay visible for follow up work." },
    ],
    closingTitle: "And the journey never stops at won.",
    closingBody:
      "Existing customers stay in the same timeline, so retention, renewals and repeat work are tracked with the same clarity as new deals.",
    beforeEyebrow: "Before and after",
    beforeTitle: "Scattered customer knowledge, or a timeline the whole team reads",
    resultLabel: "The result",
    videoTranscript:
      "A customer deal moves between pipeline stages while a relationship timeline draws underneath.",
  },
  erp: {
    eyebrow: "One system, many departments",
    title: "An ERP is a hub. Departments only work together when they share the same connection to it.",
    departments: [
      {
        title: "Finance",
        body: "General ledger, receivables and payables hold the cash records the rest of the business reports against.",
      },
      {
        title: "Inventory",
        body: "Stock and warehouses record movement centrally, so purchasing and sales read the same quantities.",
      },
      {
        title: "Purchasing",
        body: "Procurement enters the same system, with approvals that follow the company's own approval rules.",
      },
      {
        title: "Sales",
        body: "Sales and customer records close the loop, so every department reports from one version of the numbers.",
      },
    ],
    changeEyebrow: "What changes",
    changeTitle: "Reports stop being a weekly puzzle",
    changeBody:
      "The same records feed finance, stock, purchasing and sales, so a number means the same thing in every department. Approvals follow the company's own rules, and reports are produced from live data instead of assembled by hand.",
    problemsLabel: "The problems it removes",
    videoTranscript:
      "Finance, inventory, purchasing, sales and reporting connect into a central system and confirm as synced.",
  },
  erpnext: {
    eyebrow: "The module board",
    title: "ERPNext ships powerful default modules. The work is turning them into your workflow.",
    modulesAria: "ERPNext modules",
    modules: [
      "Accounting",
      "Stock",
      "Purchase",
      "Sales",
      "HR",
      "CRM",
      "Projects",
      "Custom",
    ],
    documentLabel: "A document, step by step",
    documentFlow: ["Created", "Approved", "Posted"],
    setupEyebrow: "From default install to working system",
    setupTitle:
      "Implementation is configuration, migration, training and support, not installing software",
    problemsLabel: "When it goes wrong",
    videoTranscript:
      "A sales order moves through created, approved and posted workflow steps while modules and dashboards update alongside.",
  },
  pos: {
    eyebrow: "One transaction",
    title: "Every sale is a signal the rest of the business has to hear.",
    flowAria: "Sale flow steps",
    flow: ["Sale", "Payment", "Stock", "Receipt", "Report"],
    totalLabel: "Total",
    body: "When a sale updates inventory, customer records and reporting at the same moment, the counter stays fast and the back office trusts the numbers. Returns and refunds run through the same flow, so one staff member can close a busy day without a pile of manual paperwork.",
    videoTranscript:
      "A retail register adds items, charges a card, updates stock and prints a receipt.",
    problemsEyebrow: "The hidden cost of a slow counter",
    problemsTitle: "The problems surface after closing time",
  },
  customSoftware: {
    eyebrow: "The architecture",
    title: "Custom software is layers of decisions, built one at a time",
    layers: [
      {
        step: "01",
        name: "Interfaces",
        note: "Screens designed around the people who use them daily, in the language and direction they will be used in.",
      },
      {
        step: "02",
        name: "Services",
        note: "Business logic that carries the rules and workflow the system exists to enforce, decoupled from the screens.",
      },
      {
        step: "03",
        name: "APIs",
        note: "Contracts that let internal modules talk and existing systems connect without fragile integrations.",
      },
      {
        step: "04",
        name: "Data",
        note: "The records underneath, structured and migrated carefully because the system is only as good as its data.",
      },
    ],
    buildEyebrow: "When to build",
    buildTitle: "Generic software starts to cost more than it saves",
    videoTranscript:
      "Interface, services, APIs and data layers slide together into one platform with connected systems around it.",
    outlivesTitle: "The system outlives the launch",
    outlivesBody:
      "Building, API work, data, cloud deployment and support are in scope from the start. Source code belongs to you, and the team that built it stays available to improve it as requirements change.",
  },
} as const;

const ar: Widen<typeof en> = {
  shared: {
    videoTitle: "نظرة عامة على {name}",
    capabilitiesLabel: "القدرات",
    capabilitiesTitle: "مكتوب كمواصفة، لأن هذا هو ما نتعامل معه",
    capabilitiesBody:
      "النطاق الذي نخطط حوله قبل بدء المشروع. كل بند يتحول إلى حزمة عمل ملموسة، لا إلى وعد.",
    valueLabel: "القيمة التجارية",
    valueTitle: "ما الذي يتغير عندما يعمل {service} على الوجه الصحيح",
    valueCta: "تحدّث عن مشروع {service}",
    integrationsLabel: "التكاملات",
    integrationsAria: "تكاملات {service}",
    heroChips: ["السعودية", "منطقة الخليج", "تنفيذ داخلي"],
    conceptLabel: "مخطط توضيحي",
    chromePlatform: "المنصة",
  },
  ecommerce: {
    eyebrow: "النظام خلف المتجر",
    title: "المتجر طبقات متراكمة، ولا تعمل إلا حين تبقى متزامنة.",
    body: "واجهة المتجر هي الطبقة الظاهرة، وخلفها تقع بيانات المنتجات والتسعير والدفع والمخزون والتنفيذ، وحين يختلف أي منها عن الآخر يكون العميل أول من يلاحظ ذلك. نبنيها كنظام واحد له مصدر حقيقة واحد.",
    layers: ["المنتجات", "منطق التجارة", "واجهة المتجر", "العمليات"],
    chromeLabel: "المتجر",
    videoTranscript:
      "تتجمع بطاقات المنتجات في واجهة متجر، ثم يُفتح أحد المنتجات ويُضاف إلى سلة التسوق ويؤكد الطلب.",
    breakEyebrow: "حيث تنكسر الطبقات",
    breakTitle: "كل طبقة قد تخرج عن التزامن مع أختها من غير أن يلاحظ أحد.",
    fixLabel: "الحل",
    fixTitle: "نظام واحد متصل، لا موقعاً بجانب العمل",
    fixBody:
      "يصبح المتجر أصلاً تشغيلياً: بيانات المنتجات والمخزون والطلبات والتقارير كلها في السجلات نفسها التي يعمل بها بقية العمل.",
  },
  crm: {
    aria: "خط زمني لرحلة العميل",
    eyebrow: "الرحلة",
    title: "الصفقة الواحدة رحلة، والعمل التجاري مئات الرحلات.",
    body: "لا يفيد نظام إدارة العملاء إلا إذا طابقت مراحله الطريقة التي يبيع بها الفريق أصلاً. نرسم رحلة العميل كمجموعة خطوات واضحة، ثم نبني النظام حولها.",
    stages: [
      { label: "عميل محتمل", note: "كل استفسار يصل إلى مكان واحد مع مصدره." },
      { label: "عميل مؤهل", note: "تُسجَّل الاحتياجات والملاءمة لدى جهة الاتصال." },
      { label: "عرض سعر", note: "تُتابَع العروض بسجلها، لا عبر سلاسل رسائل البريد." },
      { label: "صفقة مغلقة", note: "الصفقات المكتسبة تغلق الدورة وتغذّي بقية العمل." },
      { label: "علاقة مستمرة", note: "يبقى العملاء المؤكدون ظاهرين لأعمال المتابعة." },
    ],
    closingTitle: "والرحلة لا تتوقف عند الصفقة المغلقة.",
    closingBody:
      "يبقى العملاء الحاليون في الخط الزمني نفسه، فتُتابَع عملية الاحتفاظ والتجديد والأعمال المتكررة بالوضوح نفسه الذي تُتابَع به الصفقات الجديدة.",
    beforeEyebrow: "قبل وبعد",
    beforeTitle: "معرفة عملاء متفرقة، أو خط زمني يقرأه الفريق كله",
    resultLabel: "النتيجة",
    videoTranscript:
      "تنتقل صفقة العميل بين مراحل خط المبيعات، بينما يُرسَم تحتها خط زمني لعلاقة العميل بالشركة.",
  },
  erp: {
    eyebrow: "نظام واحد، وإدارات كثيرة",
    title: "نظام تخطيط الموارد مركز تتصل به الإدارات، ولا تعمل هذه الإدارات معاً إلا حين تتشارك الاتصال نفسه به.",
    departments: [
      {
        title: "المالية",
        body: "دفتر الأستاذ والذمم المدينة والدائنة تحتفظ بسجلات النقد التي تعتمد عليها تقارير بقية العمل.",
      },
      {
        title: "المخزون",
        body: "تسجّل المخازن والمستودعات الحركة في مكان واحد، فتقرأ المشتريات والمبيعات الكميات نفسها.",
      },
      {
        title: "المشتريات",
        body: "يدخل المشتريات النظام نفسه، باعتمادات تتبع قواعد الاعتماد المعتمدة في الشركة.",
      },
      {
        title: "المبيعات",
        body: "تغلق المبيعات وسجلات العملاء الدورة، فتُقدّم كل إدارة تقاريرها من نسخة واحدة من الأرقام.",
      },
    ],
    changeEyebrow: "ما الذي يتغير",
    changeTitle: "تتوقف التقارير عن كونها لغزاً أسبوعياً",
    changeBody:
      "تغذّي السجلات نفسها المالية والمخزون والمشتريات والمبيعات، فيحمل الرقم نفسه المعنى في كل إدارة. تتبع الاعتمادات قواعد الشركة، وتُنتَج التقارير من بيانات حية بدلاً من تجميعها يدوياً.",
    problemsLabel: "المشكلات التي يزيلها",
    videoTranscript:
      "تتصل المالية والمخزون والمشتريات والمبيعات والتقارير بنظام مركزي مع تأكيد اكتمال المزامنة.",
  },
  erpnext: {
    eyebrow: "لوحة الوحدات",
    title: "يأتي ERPNext بوحدات افتراضية قوية، والعمل هو تحويلها إلى سير عملك.",
    modulesAria: "وحدات ERPNext",
    modules: [
      "المحاسبة",
      "المخزون",
      "المشتريات",
      "المبيعات",
      "الموارد البشرية",
      "إدارة العملاء",
      "المشاريع",
      "تخصيص",
    ],
    documentLabel: "مستند، خطوة بخطوة",
    documentFlow: ["منشأ", "معتمد", "مرحّل"],
    setupEyebrow: "من التثبيت الافتراضي إلى نظام يعمل",
    setupTitle: "التنفيذ هو إعداد وترحيل وتدريب ودعم، لا مجرد تثبيت برمجيات",
    problemsLabel: "حين تسوء الأمور",
    videoTranscript:
      "يتحرك أمر بيع عبر خطوات الإنشاء والاعتماد والترحيل، بينما تتحدث الوحدات ولوحات المعلومات في الوقت نفسه.",
  },
  pos: {
    eyebrow: "عملية واحدة",
    title: "كل عملية بيع إشارة يجب أن تصل إلى بقية أجزاء العمل.",
    flowAria: "خطوات عملية البيع",
    flow: ["بيع", "دفع", "مخزون", "إيصال", "تقرير"],
    totalLabel: "الإجمالي",
    body: "عندما تحدّث عملية البيع المخزون وسجلات العملاء والتقارير في اللحظة نفسها، يبقى الكاشير سريعاً وتثق الإدارة في الأرقام. تمرّ المرتجعات والاستردادات عبر المسار نفسه، فيستطيع موظف واحد إنهاء يوم مزدحم دون تراكم أوراق يدوية.",
    videoTranscript:
      "كاشير متجر يضيف الأصناف، ويخصم البطاقة، ويحدّث المخزون، ويطبع الإيصال.",
    problemsEyebrow: "التكلفة الخفية لبطء الكاشير",
    problemsTitle: "المشكلات تظهر بعد موعد الإغلاق",
  },
  customSoftware: {
    eyebrow: "البنية",
    title: "البرمجيات المخصصة طبقات من القرارات، تُبنى واحدة تلو الأخرى",
    layers: [
      {
        step: "01",
        name: "الواجهات",
        note: "شاشات مصممة حول من يستخدمونها يومياً، وباللغة والاتجاه الذي ستُستخدم به.",
      },
      {
        step: "02",
        name: "الخدمات",
        note: "منطق عمل يحمل القواعد وسير العمل التي وُجد النظام لتطبيقها، منفصلاً عن الشاشات.",
      },
      {
        step: "03",
        name: "واجهات البرمجة",
        note: "عقود تتيح للوحدات الداخلية التواصل ولأنظمة قائمة الاتصال دون تكاملات هشّة.",
      },
      {
        step: "04",
        name: "البيانات",
        note: "السجلات الأساسية، مهيكلة ومُرحَّلة بعناية، لأن جودة النظام لا تتجاوز جودة بياناته.",
      },
    ],
    buildEyebrow: "متى تبني نظاماً خاصاً",
    buildTitle: "البرمجيات الجاهزة تبدأ في تكلفتها أكثر مما توفره",
    videoTranscript:
      "تنزلق طبقات الواجهة والخدمات وواجهات البرمجة والبيانات معاً لتكوّن منصة واحدة تتصل بها أنظمة أخرى.",
    outlivesTitle: "النظام يبقى بعد الإطلاق",
    outlivesBody:
      "البناء والعمل على واجهات البرمجة والبيانات والنشر السحابي والدعم جميعها ضمن النطاق منذ البداية. الكود المصدري ملك لك، ويظل الفريق الذي بناه متاحاً لتطويره مع تغيّر المتطلبات.",
  },
};

export type ServiceStoryCopy = Widen<typeof en>;

/** Per-service story records, excluding the shared service page sections. */
export type ServiceStoryKey = Exclude<keyof ServiceStoryCopy, "shared">;

export type ServiceStoryText<K extends ServiceStoryKey> = ServiceStoryCopy[K];

export const serviceStoryCopy: Record<Locale, ServiceStoryCopy> = { en, ar };
