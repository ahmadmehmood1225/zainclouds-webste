"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useTeamDisciplines } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

/**
 * How the team is organised. Deliberately no invented names, photos or titles:
 * the company describes the disciplines that deliver the work.
 */
export function TeamSection() {
  const t = useT();
  const teamDisciplines = useTeamDisciplines();

  return (
    <section className="bg-navy-50/60 py-20 sm:py-28" aria-labelledby="team-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="team-heading"
            label={t("team.label")}
            title={t("team.title")}
            description={t("team.description")}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {teamDisciplines.map((discipline, index) => (
            <Reveal key={discipline.name} delay={index * 60}>
              <div className="flex h-full flex-col rounded-2xl border border-navy-900/10 bg-white p-7 transition-colors duration-300 hover:border-teal-300 sm:p-8">
                <span className="num font-display text-sm font-semibold text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-navy-900">
                  {discipline.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-900/65">
                  {discipline.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}