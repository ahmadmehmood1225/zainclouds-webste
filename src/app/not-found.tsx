import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found | Zain Clouds",
  description: "The page you are looking for does not exist or may have moved.",
  path: "/not-found",
  noIndex: true,
});

export default function NotFound() {
  return <NotFoundView />;
}
