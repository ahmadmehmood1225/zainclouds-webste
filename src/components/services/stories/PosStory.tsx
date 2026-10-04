import { useServiceSharedCopy, useServiceStory } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { VideoSection } from "@/components/motion/VideoSection";
import type { Service } from "@/data/services";

/**
 * POS story: one transaction drawn as a flow that keeps every system in step,
 * finished with an honest problems and outcomes pairing.
 */
export function PosStory({ service }: { service: Service }) {
  const story = useServiceStory("pos");
  const shared = useServiceSharedCopy();

  return (
    <>
      <section className="bg-white py-20 sm:py-28" aria-labelledby="pos-flow-heading">
        <Container>
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-green-600 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {story.eyebrow}
            </p>
            <h2
              id="pos-flow-heading"
              className="max-w-3xl font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl"
            >
              {story.title}
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center gap-y-4" role="list" aria-label={story.flowAria}>
            {story.flow.map((step, index) => (
              <Reveal
                as="li"
                key={step}
                delay={index * 60}
                className="flex items-center gap-4"
              >
                <span className="flex items-center gap-3 rounded-full border border-green-600/25 bg-green-400/5 px-5 py-2.5">
                  <span className="font-display text-sm font-bold text-green-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-navy-900/80">{step}</span>
                </span>
                {index < story.flow.length - 1 ? (
                  <span aria-hidden="true" className="h-px w-8 bg-green-600/30 sm:w-12" />
                ) : null}
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <MediaReveal direction="left">
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
                  {story.body}
                </p>
              </Reveal>
              <ul className="mt-8 space-y-3">
                {service.benefits.map((benefit, index) => (
                  <Reveal as="li" key={benefit} delay={index * 50}>
                    <div className="flex items-start gap-3 rounded-xl border border-navy-900/10 bg-navy-50/40 p-4 text-sm text-navy-900/75">
                      <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      {benefit}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-20 sm:py-28" aria-labelledby="pos-problems-heading">
        <Container>
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-green-600 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {story.problemsEyebrow}
            </p>
            <h2
              id="pos-problems-heading"
              className="max-w-3xl font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
            >
              {story.problemsTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.problems.map((problem, index) => (
              <Reveal key={problem} delay={index * 60} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-navy-900/10 bg-white p-6">
                  <span className="font-display text-sm font-semibold text-green-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-navy-900/70">{problem}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy-900/70 sm:text-lg">
              {service.solution}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}