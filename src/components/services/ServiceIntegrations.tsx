import { useServiceSharedCopy } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { serviceTheme } from "@/lib/service-theme";
import type { Service } from "@/data/services";

type ServiceIntegrationsProps = { service: Service };

/**
 * The systems a service connects into. Framed as engineering work rather than
 * a logo wall, so we never imply certified partnerships we do not hold.
 */
export function ServiceIntegrations({ service }: ServiceIntegrationsProps) {
  const theme = serviceTheme(service.accent);
  const copy = useServiceSharedCopy();

  return (
    <section className="bg-navy-50/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <div>
            <p className={`mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase ${theme.text}`}>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {copy.integrationsLabel}
            </p>
            <h2 className="max-w-md font-display text-2xl font-bold tracking-tight text-balance text-navy-900">
              {service.tagline}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ul className="flex max-w-2xl flex-wrap gap-2.5" aria-label={interpolate(copy.integrationsAria, { service: service.name })}>
            {service.integrations.map((integration) => (
              <li
                key={integration}
                className={`rounded-full px-4 py-2 text-sm font-medium ${theme.chip} bg-navy-900/5 text-navy-900/75 ring-1 ring-navy-900/10`}
              >
                {integration}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}