"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useTechnologyGroups } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import { cn } from "@/lib/cn";

/**
 * Delivery capability. Technology is chosen per requirement; this section
 * describes the environment we routinely work in rather than claiming
 * specific vendor certifications or invented stats.
 */
export function TechnologySection() {
  const t = useT();
  const groups = useTechnologyGroups();

  return (
    <section className="border-y border-white/5 bg-navy-950 py-20 text-white sm:py-28" aria-labelledby="technology-heading">
      <Container>
        <Reveal>
          <SectionHeading
            dark
            id="technology-heading"
            label={t("technology.label")}
            title={t("technology.title")}
            description={t("technology.description")}
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 50} className="h-full">
              <div className="flex h-full flex-col bg-navy-950 p-7 sm:p-8">
                <h3 className="flex items-center gap-3 text-sm font-semibold tracking-wider text-white/85 uppercase">
                  <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", group.tone)} />
                  {group.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-navy-100/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-navy-200/70">
          {t("technology.note")}
        </p>
      </Container>
    </section>
  );
}