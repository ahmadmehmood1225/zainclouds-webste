"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Users, Code, Grid, Sparkle, Refresh, Check } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/use-copy";

/** Icon per team, kept structural so the mapping stays stable. */
const iconComponents = [Code, Grid, Sparkle, Check, Refresh, Users];

/**
 * Careers body. The team list lives in the copy layer as parallel arrays so the
 * structure (icon, order) stays in code and the wording follows the region.
 */
export function CareersView() {
  const { t, list } = useLocale();
  const titles = list("careers.teamTitles");
  const notes = list("careers.teamNotes");

  return (
    <>
      <section className="bg-white py-20 sm:py-28" aria-labelledby="careers-teams">
        <Container>
          <Reveal>
            <SectionHeading
              id="careers-teams"
              label={t("page.careers.teamsLabel")}
              title={t("page.careers.teamsTitle")}
              description={t("page.careers.teamsDescription")}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {titles.map((title, index) => {
              const Icon = iconComponents[index];
              if (!Icon) return null;
              return (
                <Reveal key={title} delay={index * 50}>
                  <div className="h-full rounded-2xl border border-navy-900/10 p-7 transition-colors duration-300 hover:border-teal-300 sm:p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-teal-300">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight text-navy-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                      {notes[index]}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-navy-900/10 bg-teal-50 py-20 sm:py-24" aria-labelledby="careers-apply">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2
                  id="careers-apply"
                  className="font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl"
                >
                  {t("careers.openTitle")}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-900/70">
                  {t("careers.openBody")}
                </p>
              </div>
              <Button
                href={`mailto:${siteConfig.email}?subject=Application%20to%20Zain%20Clouds`}
                variant="dark"
                size="lg"
                className="shrink-0"
              >
                {t("careers.sendCv")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
