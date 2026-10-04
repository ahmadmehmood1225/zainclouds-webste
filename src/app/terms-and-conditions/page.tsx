import type { Metadata } from "next";
import { LegalPageView } from "@/components/sections/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions | Zain Clouds",
  description:
    "Terms and conditions for the Zain Clouds website and for software services engagements across Saudi Arabia, Pakistan and the Gulf.",
  path: "/terms-and-conditions",
});

export default function TermsConditionsPage() {
  return <LegalPageView document="terms" />;
}
