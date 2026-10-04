export const siteConfig = {
  name: "Zain Clouds",
  legalName: "Zain Clouds Private Limited",
  tagline: "Software Solutions for Growing Businesses",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zainclouds.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@zainclouds.com",
  defaultTitle: "Zain Clouds | Ecommerce, ERP, CRM and Custom Software Solutions",
  defaultDescription:
    "Zain Clouds builds ecommerce, CRM, ERP, ERPNext, POS and custom software solutions for businesses across Saudi Arabia, Pakistan and the Gulf region.",
  twitterHandle: "@zainclouds",
  locales: ["en_US"],
  ogImagePath: "/opengraph-image",
  backgroundColor: "#0a1e3c",
  themeColor: "#0a1e3c",
  social: {
    linkedin: "",
    twitter: "",
    instagram: "",
    github: "",
  },
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export function absoluteMediaUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path}`;
}