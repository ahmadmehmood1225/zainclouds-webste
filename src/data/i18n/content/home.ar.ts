import type { ProcessStep, TechnologyGroup, CredibilityFact } from "@/data/home-content";

/**
 * Arabic homepage collections. Same order as the English source and the same
 * shape. `id`, `number`, `tone` and technology names are structural and stay in
 * English / Latin script.
 */
export const arCapabilities: string[] = [
  "التجارة الإلكترونية",
  "إدارة علاقات العملاء",
  "تخطيط الموارد",
  "ERPNext",
  "نقاط البيع",
  "برمجيات مخصصة",
  "تصميم واجهات البرمجة",
  "تكاملات",
  "عرض من اليمين إلى اليسار",
  "النشر على السحابة",
  "ترحيل البيانات",
  "تحليل الأعمال",
];

export const arProcessSteps: (Partial<ProcessStep> | undefined)[] = [
  {
    title: "نفهم",
    description:
      "نتعرّف على كيف تعمل شركتك، وما الذي يبطئها، وما الذي تحلّه البرمجيات.",
  },
  {
    title: "نخطّط",
    description:
      "نحدّد بنية النظام، ومسارات المستخدم، والتكاملات، وخطة التنفيذ.",
  },
  {
    title: "نبني",
    description:
      "فريقنا يطوّر ويختبر ويربط الحل وفق متطلباتك.",
  },
  {
    title: "ندعم",
    description: "نستمر في تحسين النظام ودعمه بعد الإطلاق.",
  },
];

export const arTechnologyGroups: (Partial<Omit<TechnologyGroup, "id" | "tone">> | undefined)[] = [
  { title: "واجهات المستخدم" },
  { title: "الواجهات الخلفية وواجهات البرمجة" },
  { title: "البيانات والتخزين" },
  { title: "أنظمة تخطيط الموارد" },
  { title: "السحابة والتسليم" },
  { title: "منظومة التجارة" },
];

export const arCredibilityFacts: (Partial<CredibilityFact> | undefined)[] = [
  {
    title: "شركة ذات مسؤولية محدودة",
    body: "زين كلاودز شركة برمجيات ذات مسؤولية محدودة، مسجَّلة في المملكة العربية السعودية.",
  },
  {
    title: "ثلاثة مواقع",
    body: "مكاتب في الرياض ولاهور ودبي، مع فرق تتحدث العربية والأردية والإنجليزية.",
  },
  {
    title: "تسليم داخلي",
    body: "هندسة وتصميم وتنفيذ داخل فريق واحد مسؤول، وليس طبقة وساطة أو إعادة بيع.",
  },
  {
    title: "ادعاءات علنية صادقة",
    body: "لن تجد عندنا شعارات عملاء مختلقة أو أرقاماً مبالغاً فيها. كل ما ننشره سيكون حقيقياً.",
  },
];
