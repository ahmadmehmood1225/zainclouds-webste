export const siteConfig = {
  name: "Zain Clouds",
  legalName: "Zain Clouds Private Limited",
  tagline: "Software Solutions for Growing Businesses",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zainclouds.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@zainclouds.com",
  phone: "+92-339-2003974",
  defaultTitle: "Zain Clouds | Ecommerce, ERP, CRM and Custom Software Solutions",
  defaultDescription:
    "Zain Clouds builds ecommerce, CRM, ERP, ERPNext, POS and custom software solutions for businesses across Saudi Arabia, Pakistan and the Gulf region.",
  twitterHandle: "@zainclouds",
  locales: ["en_US"],
  ogImagePath: "/opengraph-image",
  backgroundColor: "#0a1e3c",
  themeColor: "#0a1e3c",
  social: {
    facebook: "https://www.facebook.com/ZainClouds3/",
    instagram: "https://www.instagram.com/zainclouds1/",
    linkedin: "https://www.linkedin.com/company/zainclouds/posts/?feedView=all",
    tiktok: "https://www.tiktok.com/@zainclouds",
  },
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export function absoluteMediaUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path}`;
}