import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Open_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ScrollTriggerRefresh } from "@/components/providers/ScrollTriggerRefresh";
import { siteConfig } from "@/lib/site";
import { localeBootstrapScript } from "@/data/regions";
import {
  organizationStructuredData,
  websiteStructuredData,
  professionalServiceStructuredData,
} from "@/lib/jsonld";

/**
 * Type roles.
 *
 * Urbanist carries display, navigation, buttons, labels, numbers and project
 * titles. Open Sans carries body copy and supporting text. Both are exposed as CSS
 * variables so globals.css can wire them into the theme tokens without a second
 * font stack, and both use `swap` so text is readable on the first paint.
 */
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-stack",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  applicationName: "Zain Clouds",
  keywords: [
    "software company",
    "ecommerce solutions",
    "CRM software",
    "ERP solutions",
    "ERPNext implementation",
    "POS systems",
    "custom software",
    "Saudi Arabia software company",
    "Dubai software company",
  ],
  category: "technology",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    siteName: "Zain Clouds",
    url: siteConfig.url,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    locale: "en_US",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Zain Clouds - Software Solutions for Growing Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [`${siteConfig.url}/opengraph-image`],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`h-full antialiased ${urbanist.variable} ${openSans.variable} ${arabic.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");${localeBootstrapScript}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <ScrollProgress />
        <ScrollTriggerRefresh />
        <JsonLd data={organizationStructuredData()} />
        <JsonLd data={websiteStructuredData()} />
        <JsonLd data={professionalServiceStructuredData()} />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}