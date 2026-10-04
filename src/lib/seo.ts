import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
}: BuildMetadataArgs): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Zain Clouds",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Zain Clouds - Software Solutions for Growing Businesses",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
      creator: "@zainclouds",
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}