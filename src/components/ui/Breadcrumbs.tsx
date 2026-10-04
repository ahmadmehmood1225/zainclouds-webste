"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useT } from "@/lib/use-copy";
import { useNavigation } from "@/lib/use-content";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const t = useT();
  const navigation = useNavigation();

  // Interior pages are Server Components, so they pass the English name. The
  // navigation labels are already localized per href, so prefer those.
  const labels = new Map<string, string>();
  for (const link of navigation) {
    labels.set(link.href, link.label);
    for (const child of link.children ?? []) {
      if (child.href) labels.set(child.href, child.label);
    }
  }

  const items = [
    { name: t("nav.home"), path: "/" },
    ...crumbs.map((crumb) => ({ ...crumb, name: labels.get(crumb.path) ?? crumb.name })),
  ];

  return (
    <div className="border-b border-navy-900/10 bg-white py-5 sm:py-6">
      <Container>
        <nav aria-label={t("nav.breadcrumb")}>
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy-600">
            {items.map((crumb, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-navy-200/35">
                      /
                    </span>
                  ) : null}
                  {isLast ? (
                    <span aria-current="page" className="text-brand-700">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-brand-600">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}