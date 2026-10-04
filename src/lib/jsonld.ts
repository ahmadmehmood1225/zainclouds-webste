import { absoluteUrl, siteConfig } from "@/lib/site";

type BreadcrumbItem = { name: string; path: string };

export function organizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: absoluteUrl("/brand/logo.svg"),
    description: siteConfig.defaultDescription,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      areaServed: ["SA", "PK", "AE", "Gulf region"],
      availableLanguage: ["English", "Arabic", "Urdu"],
    },
    knowsAbout: [
      "Ecommerce",
      "CRM",
      "ERP",
      "ERPNext",
      "POS Systems",
      "Custom Software Development",
    ],
  };
}

export function websiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
  };
}

export function breadcrumbStructuredData(items: BreadcrumbItem[]) {
  const crumbs = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs,
  };
}

export function serviceStructuredData(payload: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: payload.name,
    serviceType: payload.serviceType,
    description: payload.description,
    url: absoluteUrl(payload.path),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["SA", "PK", "AE"],
  };
}

export function faqStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function professionalServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: absoluteUrl("/brand/logo.svg"),
    description: siteConfig.defaultDescription,
    areaServed: ["Saudi Arabia", "Pakistan", "United Arab Emirates"],
  };
}