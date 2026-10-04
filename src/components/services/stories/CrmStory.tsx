import { useServiceSharedCopy, useServiceStory } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { VideoSection } from "@/components/motion/VideoSection";
import type { Service } from "@/data/services";

/**
 * CRM story: the customer journey drawn as a scrubbed horizontal timeline on
 * desktop and a snap rail on mobile. One dominant motion concept per service.
 */
export function CrmStory({ service }: { service: Service }) {
  const story = useServiceStory("crm");
  const shared = useServiceSharedCopy();
  const stages = story.stages;

  return (
    <>
      <section className="relative" id="crm-journey" aria-label={story.aria}>
        <HorizontalScroll className="bg-navy-950 text-white">
          <div className="flex w-[86vw] max-w-md shrink-0 snap-center flex-col justify-center px-2 sm:w-[30rem]">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-widest uppercase">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-pink-400" />
              <span className="text-white/50">The journey</span>
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              One deal is a journey. A business is hundreds of them.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-100/75 sm:text-base">
              A CRM is only useful if the stages match the way the team already
              sells. We draw the customer journey as a set of clear steps, then
              build the system around it.
            </p>
          </div>

          {stages.map((stage, index) => (
            <div
              key={stage.label}
              className="flex w-[72vw] max-w-xs shrink-0 snap-center flex-col justify-between px-2 sm:w-[24rem]"
            >
              <div>
                <span className="font-display text-sm font-semibold text-pink-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-400" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {stage.label}
                  </h3>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/75 sm:text-base">
                  {stage.note}
                </p>
              </div>
              <div
                aria-hidden="true"
                className="mt-16 flex items-center gap-1.5"
              >
                {stages.map((s, i) => (
                  <span
                    key={s.label}
                    className={`h-1 rounded-full ${
                      i === index ? "w-10 bg-pink-400" : "w-3 bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex w-[86vw] max-w-md shrink-0 snap-center flex-col justify-center px-2 sm:w-[30rem]">
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {story.closingTitle}
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-100/75 sm:text-base">
              {story.closingBody}
            </p>
          </div>
        </HorizontalScroll>
      </section>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="crm-pipeline-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-pink-600 uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {story.beforeEyebrow}
              </p>
              <h2
                id="crm-pipeline-heading"
                className="font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
              >
                {story.beforeTitle}
              </h2>
            </Reveal>
            <ul className="mt-8 divide-y divide-navy-900/10 border-y border-navy-900/10">
              {service.problems.map((problem, index) => (
                <Reveal as="li" key={problem} delay={index * 50}>
                  <p className="flex items-start gap-4 py-4 text-sm leading-relaxed text-navy-900/70 sm:text-base">
                    <span className="font-display text-sm font-semibold text-pink-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {problem}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal delay={100}>
              <MediaVideo service={service} shared={shared} transcript={story.videoTranscript} />
            </Reveal>
            <div className="mt-6 rounded-2xl bg-pink-400/5 p-7 ring-1 ring-pink-500/15">
              <p className="text-xs font-semibold tracking-widest text-pink-600 uppercase">
                {story.resultLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-900/75 sm:text-base">
                {service.solution}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function MediaVideo({
  service,
  shared,
  transcript,
}: {
  service: Service;
  shared: { videoTitle: string };
  transcript: string;
}) {
  return (
    <MediaReveal direction="right">
      <div className="rounded-2xl ring-1 ring-navy-900/10">
        <VideoSection
          src={service.video}
          poster={service.poster}
          title={interpolate(shared.videoTitle, { name: service.name })}
          transcript={transcript}
        />
      </div>
    </MediaReveal>
  );
}