import type { Metadata } from "next";
import { LegalPageView } from "@/components/sections/LegalPageView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Zain Clouds",
  description:
    "Privacy policy for Zain Clouds. How we handle the information you share through our website and business software engagements.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPageView document="privacy" />;
}
