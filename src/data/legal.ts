import type { Locale } from "@/data/regions";

export type LegalSection = {
  heading: string;
  body: string[];
};

export type LegalDocument = {
  label: string;
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

type LegalDocumentSet = Record<Locale, LegalDocument>;

const privacy: LegalDocumentSet = {
  en: {
    label: "Legal",
    title: "Privacy Policy",
    description:
      "This policy explains how {company} treats the information you share with us.",
    intro:
      "{company} (\"Zain Clouds\", \"we\", \"us\") respects your privacy. This page describes the information we collect through this website and how we handle it.",
    sections: [
      {
        heading: "1. Information We Collect",
        body: [
          "Through the website we collect information you submit voluntarily, such as the details entered into the contact form or information sent by email.",
          "When you work with us on a project, we collect the business information needed to deliver the engagement, under the terms of that engagement.",
        ],
      },
      {
        heading: "2. How We Use Information",
        body: [
          "We use the information you provide to respond to enquiries, prepare proposals, deliver software projects and provide ongoing support.",
          "We do not sell personal information to third parties.",
        ],
      },
      {
        heading: "3. Data Retention",
        body: [
          "We keep contact information for as long as it is needed to respond to your enquiry or support the relationship you have with us.",
          "Project data is retained according to the terms agreed in the specific engagement.",
        ],
      },
      {
        heading: "4. Data Security",
        body: [
          "We apply reasonable technical and organisational measures to protect the information we hold.",
          "Where we use third party services to process data, we work with providers that apply appropriate safeguards.",
        ],
      },
      {
        heading: "5. Your Rights",
        body: [
          "You may request a copy of the personal information we hold about you, ask for corrections, or ask us to delete information where the law permits.",
          "To make such a request, contact us using the details below.",
        ],
      },
      {
        heading: "6. Contact",
        body: [
          "For questions about this privacy policy, contact Zain Clouds at the email address on this site or through the contact page.",
        ],
      },
    ],
  },
  ar: {
    label: "قانوني",
    title: "سياسة الخصوصية",
    description: "توضّح هذه السياسة كيفية تعامل {company} مع المعلومات التي تشاركها معنا.",
    intro:
      "تحترم {company} (\"زين كلاودز\"، \"نحن\") خصوصيتك. توضح هذه الصفحة المعلومات التي نجمعها عبر هذا الموقع وكيف نتعامل معها.",
    sections: [
      {
        heading: "1. المعلومات التي نجمعها",
        body: [
          "نجمع عبر الموقع المعلومات التي ترسلها طوعاً، مثل البيانات التي تدخلها في نموذج التواصل أو المعلومات المرسلة عبر البريد الإلكتروني.",
          "وعند العمل معنا على مشروع، نجمع المعلومات التجارية اللازمة لتنفيذ المشروع وفق شروط ذلك المشروع.",
        ],
      },
      {
        heading: "2. كيف نستخدم المعلومات",
        body: [
          "نستخدم المعلومات التي تقدمها للرد على الاستفسارات، وإعداد العروض، وتنفيذ مشاريع البرمجيات، وتقديم الدعم المستمر.",
          "لا نبيع المعلومات الشخصية إلى أطراف ثالثة.",
        ],
      },
      {
        heading: "3. الاحتفاظ بالبيانات",
        body: [
          "نحتفظ بمعلومات التواصل طالما كانت لازمة للرد على استفسارك أو لدعم العلاقة التي تربطنا بك.",
          "تُحفظ بيانات المشروع وفق الشروط المتفق عليها في المشروع المعني.",
        ],
      },
      {
        heading: "4. أمن البيانات",
        body: [
          "نطبّق إجراءات تقنية وتنظيمية معقولة لحماية المعلومات التي نحتفظ بها.",
          "وحيث نستخدم خدمات أطراف ثانية لمعالجة البيانات، نتعامل مع مزودين يطبّقون ضوابط حماية مناسبة.",
        ],
      },
      {
        heading: "5. حقوقك",
        body: [
          "يمكنك طلب نسخة من المعلومات الشخصية المحفوظة عنك، أو طلب تصحيحها، أو طلب حذفها متى سمح القانون بذلك.",
          "ولتقديم مثل هذا الطلب، تواصل معنا عبر البيانات الموضحة أدناه.",
        ],
      },
      {
        heading: "6. التواصل",
        body: [
          "للاستفسار عن سياسة الخصوصية هذه، تواصل مع زين كلاودز عبر البريد الإلكتروني المذكور في هذا الموقع أو من صفحة التواصل.",
        ],
      },
    ],
  },
};

const terms: LegalDocumentSet = {
  en: {
    label: "Legal",
    title: "Terms and Conditions",
    description:
      "Applicable to the use of the {company} website and, where relevant, to software services engagements.",
    intro:
      "These terms and conditions apply between {company} (\"Zain Clouds\", \"we\", \"us\") and visitors to this website, and govern software services engagements as described below.",
    sections: [
      {
        heading: "1. Use of This Website",
        body: [
          "This website is provided for information about Zain Clouds and its services. You may use it for legitimate business purposes.",
          "Content on this site may change without notice. We do not guarantee that the site will always be available or that information is error free.",
        ],
      },
      {
        heading: "2. Our Services",
        body: [
          "Software engagements are governed by a written proposal and agreement agreed before work begins. The engagement documents describe the scope, delivery, payment and support terms.",
          "Nothing on this website constitutes a contract or offer to supply services.",
        ],
      },
      {
        heading: "3. Intellectual Property",
        body: [
          "The Zain Clouds name, logo and website content belong to Zain Clouds.",
          "Software we develop for clients is owned by the client once delivered and paid for, unless the engagement documents state otherwise.",
        ],
      },
      {
        heading: "4. Limitation of Liability",
        body: [
          "To the extent permitted by law, Zain Clouds is not liable for indirect or consequential losses arising from use of this website.",
          "This clause does not affect rights that cannot be excluded under applicable law.",
        ],
      },
      {
        heading: "5. Governing Law",
        body: [
          "These terms are governed by the law of the jurisdiction in which the relevant engagement is performed, or where no engagement exists, the law of the Kingdom of Saudi Arabia.",
        ],
      },
      {
        heading: "6. Contact",
        body: [
          "Questions about these terms can be directed to Zain Clouds through the contact page or the email address on this website.",
        ],
      },
    ],
  },
  ar: {
    label: "قانوني",
    title: "الشروط والأحكام",
    description: "تنطبق على استخدام موقع {company}، وعند الانطباق، على مشاريع خدمات البرمجيات.",
    intro:
      "تنطبق هذه الشروط والأحكام بين {company} (\"زين كلاودز\"، \"نحن\") وزوار هذا الموقع، وتحكم مشاريع خدمات البرمجيات الموضحة أدناه.",
    sections: [
      {
        heading: "1. استخدام هذا الموقع",
        body: [
          "يُقدَّم هذا الموقع للتعريف بزين كلاودز وخدماتها، ويمكنك استخدامه لأغراض عمل مشروعة.",
          "قد يتغير المحتوى في هذا الموقع دون إشعار مسبق، ولا نضمن أن الموقع متاح دائماً أو أن المعلومات خالية من الأخطاء.",
        ],
      },
      {
        heading: "2. خدماتنا",
        body: [
          "تخضع مشاريع البرمجيات لمقترح واتفاقية مكتوبين يتم الاتفاق عليهما قبل بدء العمل، وتوضح مستندات المشروع نطاق العمل والتسليم والدفع والدعم.",
          "لا يشكل أي محتوى على هذا الموقع عقداً أو عرضاً لتقديم الخدمات.",
        ],
      },
      {
        heading: "3. الملكية الفكرية",
        body: [
          "اسم زين كلاودز وشعارها ومحتوى موقعها تعود ملكيتها إلى زين كلاودز.",
          "البرمجيات التي نطورها للعملاء تعود ملكيتها للعميل بعد التسليم والسداد، ما لم تنص مستندات المشروع على خلاف ذلك.",
        ],
      },
      {
        heading: "4. حدود المسؤولية",
        body: [
          "في الحدود التي يسمح بها القانون، لا تتحمل زين كلاودز مسؤولية الخسائر غير المباشرة أو التبعية الناتجة عن استخدام هذا الموقع.",
          "لا يؤثر هذا البند على الحقوق التي لا يجوز استبعادها بموجب القانون المطبق.",
        ],
      },
      {
        heading: "5. القانون الحاكم",
        body: [
          "تخضع هذه الشروط لقانون محل تنفيذ المشروع المعني، أو، في غياب مشروع قائم، لقانون المملكة العربية السعودية.",
        ],
      },
      {
        heading: "6. التواصل",
        body: [
          "يمكن توجيه الأسئلة حول هذه الشروط إلى زين كلاودز عبر صفحة التواصل أو البريد الإلكتروني المذكور في هذا الموقع.",
        ],
      },
    ],
  },
};

export const legalDocuments: Record<"privacy" | "terms", LegalDocumentSet> = {
  privacy,
  terms,
};
