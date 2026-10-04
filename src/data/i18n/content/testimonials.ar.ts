import type { Testimonial } from "@/data/testimonials";

/**
 * Arabic testimonial overrides, keyed by slug. `name` is a role rather than a person
 * in the English source, so it translates as a role. Missing entries fall back to the
 * English text field by field.
 */
export type TestimonialOverrides = Partial<
  Pick<Testimonial, "quote" | "name" | "role" | "company" | "duration">
>;

export const arTestimonials: Record<string, TestimonialOverrides> = {
  "baba-foods": {
    quote:
      "كان لدينا أربعة أنظمة، كل واحد يملك جزءاً من الحقيقة. جمع Zain Clouds هذه الأنظمة، ورحل بالبيانات القائمة، ودرب فريق العمل في ثلاثة أسابيع. أول إقفال شهري لم نضطر فيه إلى مطابقة أي شيء يدوياً، ولم يتغيّر ذلك منذ ذلك الحين.",
    name: "مدير العمليات",
    role: "تصنيع الأغذية",
    company: "بابا فودز",
    duration: "24 دقيقة",
  },
  "captain-chef": {
    quote:
      "كانت الذروة تعني شخصاً يقف أمام شاشة يراقب الطلبات. الآن تأتي شاشة المطبخ وتتبع السائق والدفع من مكان واحد، فنتلقّى الطلب دون أن نسأل أحداً عن حالته.",
    name: "المؤسس",
    role: "توصيل الطعام",
    company: "كابتن شيف",
    duration: "21 دقيقة",
  },
  mellot: {
    quote:
      "كتبوا المواصفة معنا قبل أن يكتبوا أي كود، واعترضوا على أمرين طلبناهما لأنهما ما كانا ل يصمدا في الاستخدام الفعلي. تلك المداقشة هي سبب استخدام الفريق للمسار فعلاً.",
    name: "رئيس المبيعات",
    role: "خدمات مهنية",
    company: "ميلوت",
    duration: "27 دقيقة",
  },
  "drs-lounge": {
    quote:
      "كان الحجز وسجل الخدمات ومطابقة إغلاق اليوم ثلاث أمور منفصلة عند الإغلاق. صارت شاشة واحدة وتستغرق جزءاً من الزمن. عملاؤنا يلاحظون السرعة.",
    name: "مدير الصالون",
    role: "التجميل والعناية",
    company: "دكتورز لانج",
    duration: "22 دقيقة",
  },
};
