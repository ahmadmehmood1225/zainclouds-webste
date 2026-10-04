/**
 * Arabic navigation copy keyed by href, which is stable across languages.
 * Mega menu headings (entries without an href) are keyed by their English
 * label, matching how the English source is written.
 */
export type NavOverride = { label: string; description?: string };

export const arNavigation: Record<string, NavOverride> = {
  // Primary
  // Doubles as the "View all services" CTA label, which shares the href.
  "/services": {
    label: "ماذا نقدم",
    description: "قارن خطوط الخدمة الست جنباً إلى جنب.",
  },
  "/services/ecommerce": {
    label: "التجارة الإلكترونية",
    description: "متاجر إلكترونية ومدفوعات وعمليات في نظام واحد.",
  },
  "/services/crm": {
    label: "إدارة علاقات العملاء",
    description: "علاقات العملاء ونشاط المبيعات في مكان واحد.",
  },
  "/services/erp": {
    label: "تخطيط الموارد",
    description: "المالية والمخزون والعمليات على منصة موحدة.",
  },
  "/services/erpnext": {
    label: "ERPNext",
    description: "ننفّذ ERPNext حول طريقة عمل شركتك.",
  },
  "/services/pos": {
    label: "نقاط البيع",
    description: "نظام نقاط بيع متصل بالمخزون والتقارير.",
  },
  "/services/custom-software": {
    label: "برمجيات مخصصة",
    description: "برمجيات تُبنى لسير عمل لا تتعامل معه المنتجات الجاهزة.",
  },
  "Everything we build": {
    label: "كل ما نبنيه",
  },
  "/industries": {
    label: "القطاعات",
  },
  "/industries/retail": {
    label: "التجزئة",
    description: "نقاط بيع ومخزون وتجارة إلكترونية لبيئة البيع.",
  },
  "/industries/healthcare": {
    label: "الرعاية الصحية",
    description: "سجلات المرضى والمواعيد وعمليات العيادات.",
  },
  "/industries/manufacturing": {
    label: "التصنيع",
    description: "الإنتاج والمشتريات وضبط التكاليف في نظام واحد.",
  },
  "/industries/distribution": {
    label: "التوزيع",
    description: "مستودعات وطلبات وتوصيل مصممة للكميات الكبيرة.",
  },
  "/industries/hospitality": {
    label: "الضيافة",
    description: "حجز ونقاط بيع وعمليات للمنشآت المزدحمة.",
  },
  "/industries/ecommerce": {
    label: "التجارة الإلكترونية",
    description: "مبيعات إلكترونية مبنية على بيانات منتجات وطلبات واضحة.",
  },
  "View all industries": {
    label: "عرض جميع القطاعات",
  },
  "/about": {
    label: "من نحن",
    description: "شركة برمجيات في السعودية وباكستان ودبي.",
  },
  "/portfolio": {
    label: "أعمالنا",
    description: "نماذج من مختلف الأنظمة التي نبنيها.",
  },
  "/careers": {
    label: "الوظائف",
    description: "وظائف في القيادة والهندسة والمنتج والتصميم.",
  },
  "/contact": {
    label: "تواصل معنا",
    description: "تحدّث مع الفريق عن النظام الذي تحتاج إلى بنائه.",
  },
};
