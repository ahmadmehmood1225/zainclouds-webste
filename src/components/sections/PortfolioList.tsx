"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { useProjects } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

/** Portfolio index grid, reading the localized project records. */
export function PortfolioList() {
  const t = useT();
  const projects = useProjects();

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="portfolio-list">
      <Container>
        <Reveal>
          <SectionHeading
            id="portfolio-list"
            title={t("page.portfolio.listTitle")}
            description={t("page.portfolio.listDescription")}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
