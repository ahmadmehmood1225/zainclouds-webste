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
  "your-ears": {
    category: "الرعاية الصحية",
    name: "يور إيرز",
    description:
      "منصة حجز مواعيد الأطباء: يجد المريض التخصص المناسب، ويطّلع على الأوقات المتاحة، ويؤكد الموعد في خطوات قليلة، بينما تدير العيادات الجداول والتذكيرات وسجلات المرضى من لوحة واحدة.",
    region: "السعودية",
    result: "الحجوزات والتذكيرات وجداول العيادات تعمل من نظام واحد",
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
  pos: {
    category: "نقاط البيع",
    name: "نقاط البيع POS",
    description:
      "نظام نقاط البيع الخاص بزين كلاودز لصالات البيع: دفع سريع، ومسح الباركود، ومزامنة المخزون، وإدارة الموظفين والفروع، وتقارير إغلاق اليوم بمطابقة كاملة.",
    region: "السعودية",
    result: "الدفع والمخزون وتقارير الفروع من نظام واحد",
  },
};
