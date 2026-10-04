"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { serviceTheme } from "@/lib/service-theme";
import { useServices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import { relatedOrder, type Service } from "@/data/services";

type RelatedServicesProps = { service: Service };

/**
 * Related service paths for a service page, chosen by editorial relevance
 * rather than a generic loop.
 */
export function RelatedServices({ service }: RelatedServicesProps) {
  const t = useT();
  const services = useServices();
  const order = relatedOrder[service.slug] ?? [];
  const picked = order
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is Service => Boolean(item));
  const related = (
    picked.length < 3
      ? [
          ...picked,
          ...services.filter(
            (item) => item.slug !== service.slug && !picked.some((r) => r.slug === item.slug),
          ),
        ]
      : picked
  ).slice(0, 3);

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="related-heading">
      <Container>
        <Reveal>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-teal-700 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {t("ui.relatedLabel")}
          </p>
          <h2
            id="related-heading"
            className="font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
          >
            {t("ui.relatedTitle", { service: service.name })}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => {
            const theme = serviceTheme(item.accent);
            return (
              <Reveal key={item.slug} delay={index * 60} className="h-full">
                <Link
                  href={item.path}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-navy-900/10 bg-navy-50/40 p-7 transition-colors duration-300 hover:border-navy-900/25"
                >
                  <div>
                    <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
                      <span className={`inline-block h-2 w-2 rounded-full ${theme.bar}`} aria-hidden="true" />
                      {item.name}
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-navy-900/70">{item.tagline}</p>
                  </div>
                  <span
                    className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${theme.text}`}
                  >
                    {t("spotlight.explore", { service: item.name })}
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-90"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}