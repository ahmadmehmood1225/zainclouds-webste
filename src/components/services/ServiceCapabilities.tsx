import { useServiceSharedCopy } from "@/lib/use-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { serviceTheme } from "@/lib/service-theme";
import type { Service } from "@/data/services";

type ServiceCapabilitiesProps = { service: Service };

/**
 * The concrete capabilities of a service, presented as numbered rows so the
 * section reads like a tight spec rather than marketing bullets.
 */
export function ServiceCapabilities({ service }: ServiceCapabilitiesProps) {
  const theme = serviceTheme(service.accent);
  const copy = useServiceSharedCopy();

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="capabilities-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="capabilities-heading"
              label={copy.capabilitiesLabel}
              title={copy.capabilitiesTitle}
              description={copy.capabilitiesBody}
            />
          </Reveal>
          <ol className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {service.features.map((feature, index) => (
              <Reveal as="li" key={feature} delay={index * 30}>
                <div className="flex items-baseline gap-5 py-4">
                  <span className={`font-display text-sm font-bold ${theme.text}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-navy-900/80 sm:text-base">
                    {feature}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}