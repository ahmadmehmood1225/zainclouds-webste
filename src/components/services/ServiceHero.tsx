import { useServiceSharedCopy } from "@/lib/use-content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroConcept } from "@/components/services/HeroConcept";
import { serviceTheme } from "@/lib/service-theme";
import type { Service } from "@/data/services";

type ServiceHeroProps = { service: Service };

/**
 * Service page hero. Dark, editorial, with a unique schematic panel per
 * service rather than a shared visual. Deliberately light on motion so the
 * product stories below carry the animation weight.
 */
export function ServiceHero({ service }: ServiceHeroProps) {
  const theme = serviceTheme(service.accent);
  const copy = useServiceSharedCopy();
  const chips = [service.category, ...copy.heroChips];

  return (
    // The header is fixed at h-20 (80px) and sm:h-24 (96px). This hero previously used
    // pt-16 and sm:pt-24, which put the label underneath the header on a phone and
    // flush against its lower edge on a desktop. The top padding now clears the header
    // and still leaves a gap, matching PageHero so every interior page opens the same
    // way. The side glow is offset to match.
    <section className="relative overflow-hidden bg-brand-700 pt-32 pb-28 text-white sm:pt-40 sm:pb-36">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: theme.glow }}
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-widest uppercase">
              <span className={`inline-block h-2 w-2 rounded-full ${theme.bar}`} aria-hidden="true" />
              <span className="text-white/55">
                {service.number} / 06 · {service.name}
              </span>
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {service.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100/80 sm:text-lg">
              {service.intro}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {chips.map((tag) => (
                <li
                  key={tag}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${theme.chip}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div
            className={`relative aspect-[3/2] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] ${theme.ring}`}
          >
            <HeroConcept slug={service.slug} accent={theme.bar} />
            <span
              aria-hidden="true"
              className={`absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase ${theme.softText}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${theme.bar}`} />
              {copy.conceptLabel}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}