import { useServiceSharedCopy } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";
import { serviceTheme } from "@/lib/service-theme";
import type { Service } from "@/data/services";

type ServiceValueProps = { service: Service };

/**
 * The business value of the service, stated plainly on a dark band with one
 * clear next action.
 */
export function ServiceValue({ service }: ServiceValueProps) {
  const theme = serviceTheme(service.accent);
  const copy = useServiceSharedCopy();

  return (
    <section className="bg-navy-950 py-20 text-white sm:py-28" aria-labelledby="value-heading">
      <Container className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
        <Reveal>
          <div>
            <p className={`mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase ${theme.softText}`}>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {copy.valueLabel}
            </p>
            <h2
              id="value-heading"
              className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {interpolate(copy.valueTitle, { service: service.name })}
            </h2>
          </div>
        </Reveal>
        <div>
          <ul className="space-y-4">
            {service.benefits.map((benefit, index) => (
              <Reveal as="li" key={benefit} delay={index * 50}>
                <div className="flex items-start gap-4 border-b border-white/10 pb-4">
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${theme.solid} ${theme.onSolid}`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-navy-100/85 sm:text-base">
                    {benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/contact" variant={service.accent === "navy" ? "light" : "outline-light"} size="lg">
              {interpolate(copy.valueCta, { service: service.name })}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}