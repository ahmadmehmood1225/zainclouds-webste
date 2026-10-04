"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryCard } from "@/components/ui/IndustryCard";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { useIndustries } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

export function IndustriesSection() {
  const t = useT();
  const industries = useIndustries();

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="industries-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label={t("industries.label")}
            title={t("industries.title")}
            description={t("industries.description")}
          />
          <Link
            href="/industries"
            data-cursor="explore"
            className="group shrink-0 text-sm font-medium text-teal-700 hover:text-teal-600"
          >
            {t("industries.exploreAll")}
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">
              →
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <ImageReveal key={industry.slug} delay={index * 70} className="rounded-2xl">
              <IndustryCard industry={industry} index={index} />
            </ImageReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}