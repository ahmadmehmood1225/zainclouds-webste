import { useServiceSharedCopy, useServiceStory } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { VideoSection } from "@/components/motion/VideoSection";
import type { Service } from "@/data/services";

/**
 * Custom software story: the architecture assembled layer by layer, with each
 * layer revealed from its own direction to suggest depth.
 */
export function CustomSoftwareStory({ service }: { service: Service }) {
  const story = useServiceStory("customSoftware");
  const shared = useServiceSharedCopy();

  return (
    <>
      <section className="bg-white py-20 sm:py-28" aria-labelledby="custom-layers-heading">
        <Container>
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-pink-600 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {story.eyebrow}
            </p>
            <h2
              id="custom-layers-heading"
              className="max-w-3xl font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl"
            >
              {story.title}
            </h2>
          </Reveal>

          <div className="mt-14 space-y-6">
            {story.layers.map((layer, index) => (
              <MediaReveal
                key={layer.step}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index === 0 ? 0 : 40}
              >
                <div
                  className={`flex flex-col gap-4 rounded-2xl border border-navy-900/10 p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-8 ${
                    index === 0 ? "bg-pink-400/5" : "bg-navy-50/40"
                  }`}
                  style={{ marginLeft: `${index * 14}px` }}
                >
                  <span className="font-display text-sm font-bold text-pink-500">
                    {layer.step}
                  </span>
                  <h3 className="w-36 shrink-0 font-display text-xl font-semibold tracking-tight text-navy-900">
                    {layer.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-navy-900/70">{layer.note}</p>
                </div>
              </MediaReveal>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <MediaReveal direction="right">
              <div className="rounded-2xl ring-1 ring-navy-900/10">
                <VideoSection
                  src={service.video}
                  poster={service.poster}
                  title={interpolate(shared.videoTitle, { name: service.name })}
                  transcript={story.videoTranscript}
                  priority
                />
              </div>
            </MediaReveal>
            <div>
              <Reveal>
                <p className="text-sm leading-relaxed text-navy-900/70 sm:text-base">
                  {service.solution}
                </p>
              </Reveal>
              <ul className="mt-8 space-y-3">
                {service.benefits.map((benefit, index) => (
                  <Reveal as="li" key={benefit} delay={index * 50}>
                    <div className="flex items-start gap-3 rounded-xl border border-navy-900/10 bg-navy-50/40 p-4 text-sm text-navy-900/75">
                      <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500" />
                      {benefit}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28" aria-labelledby="custom-problems-heading">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-pink-300 uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {story.buildEyebrow}
              </p>
              <h2
                id="custom-problems-heading"
                className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
              >
                {story.buildTitle}
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-4 border-l border-white/10 pl-6">
              {service.problems.map((problem, index) => (
                <Reveal as="li" key={problem} delay={index * 50}>
                  <p className="text-sm leading-relaxed text-navy-100/75 sm:text-base">
                    <span className="mr-3 font-display text-sm font-semibold text-pink-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {problem}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:pt-10">
            <Reveal delay={80}>
              <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 sm:p-10">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {story.outlivesTitle}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-navy-100/75 sm:text-base">
                  {story.outlivesBody}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.integrations.map((integration) => (
                    <span
                      key={integration}
                      className="rounded-full bg-pink-400/10 px-3.5 py-1.5 text-xs font-medium text-pink-200 ring-1 ring-pink-400/25"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}