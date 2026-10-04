import type { Project } from "@/data/projects";

/**
 * Arabic project copy per slug. Technologies stay in Latin script because they
 * are product names, and images are structural. A slug without an entry simply
 * keeps its English text, so a missing translation can never blank a card.
 */
export type ProjectOverrides = Partial<
  Pick<Project, "category" | "name" | "description" | "region" | "result">
>;

export const arProjects: Record<string, ProjectOverrides> = {
  "captain-chef": {
    category: "التجارة الإلكترونية",
    name: "كابتن شيف",
    description:
      "منصة طلب طعام مصممة لاستقبال الذروة: قائمة الطعام والدفع وشاشة المطبخ وتتبع التوصيل في مسار طلب واحد.",
    region: "السعودية",
    result: "مسار الطلب يستقبل ذروة الطلبات دون تدخل يدوي",
  },
  "smle-guide": {
    category: "برمجيات مخصصة",
    name: "دليل SMLE",
    description:
      "رفيق دراسي لمرشحي الترخيص الطبي: بنوك أسئلة، وتدريب مؤقّت، وتحليل للأداء، وجدولة مراجعة.",
    region: "السعودية",
    result: "تحليل الأداء حوّل نقاط الضعف إلى خطة مراجعة مُتتبَّعة",
  },
  "baba-foods": {
    category: "تخطيط الموارد",
    name: "بابا فودز",
    description:
      "تطبيق تخطيط موارد يغطي المشتريات والمخزون والإنتاج والتوزيع، مع ترحيل البيانات التاريخية وتدريب الموظفين.",
    region: "السعودية",
    result: "حقيقة واحدة للمخزون بين المشتريات والمخزن والشحن",
  },
  "umrah-online": {
    category: "التجارة الإلكترونية",
    name: "أونلاين للعمرة",
    description:
      "منصة تجارة إلكترونية وتشغيل لخدمات العمرة: حجز الباقات، وسجلات العملاء، والمدفوعات، وتقارير الشركاء.",
    region: "السعودية",
    result: "الحجوزات والمدفوعات وتقارير الشركاء في نظام واحد",
  },
  "drs-lounge": {
    category: "نقاط البيع",
    name: "دكتورز لانج",
    description:
      "نظام نقاط بيع وسجلات عملاء لصالون تجميل: الحجز، وسجل الخدمات، وجدولة الموظفين، ومطابقة إغلاق اليوم.",
    region: "دبي، الإمارات",
    result: "الحجوزات والمبيعات وساعات الموظفين تُطابَق يومياً",
  },
  mellot: {
    category: "إدارة علاقات العملاء",
    name: "ميلوت",
    description:
      "منصة علاقات عملاء مبنية على طريقة البيع الفعلية في الفريق: المسار، وجدولة المتابعة، وتقارير الأداء.",
    region: "منطقة الخليج",
    result: "المسار والمتابعات مرئية لفريق المبيعات بأكمله",
  },
  "salon-zc": {
    category: "نقاط البيع",
    name: "صالون ZC",
    description:
      "نظام إدارة صالون يجمع نقاط البيع والمخزون وعمولات الموظفين وتقارير الفروع المتعددة.",
    region: "السعودية",
    result: "تقارير الفروع المتعددة من مصدر بيانات واحد",
  },
};
