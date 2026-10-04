import { useServiceSharedCopy, useServiceStory } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { VideoSection } from "@/components/motion/VideoSection";
import type { Service } from "@/data/services";

/**
 * ERPNext story: a modular system where each workflow step confirms before the
 * next one moves. The visual is a module board that reads like the config
 * exercise it really is.
 */
export function ErpNextStory({ service }: { service: Service }) {
  const story = useServiceStory("erpnext");
  const shared = useServiceSharedCopy();

  return (
    <>
      <section className="bg-white py-20 sm:py-28" aria-labelledby="erpnext-modules-heading">
        <Container>
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-navy-600 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {story.eyebrow}
            </p>
            <h2
              id="erpnext-modules-heading"
              className="max-w-3xl font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl"
            >
              {story.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4" role="list" aria-label={story.modulesAria}>
            {story.modules.map((mod, index) => (
              <Reveal key={mod} delay={index * 40} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-navy-900/10 bg-navy-50/40 p-5">
                  <span className="font-display text-xs font-semibold text-navy-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-8 font-display text-lg font-semibold tracking-tight text-navy-900">
                    {mod}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-navy-900/10 bg-white p-6">
              <span className="text-xs font-semibold tracking-widest text-navy-500 uppercase">
                {story.documentLabel}
              </span>
              <div className="flex flex-wrap items-center gap-4" aria-hidden="true">
                {story.documentFlow.map((f, i) => (
                  <span key={f} className="flex items-center gap-4">
                    <span className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-navy-500" />
                      <span className="text-sm font-medium text-navy-900/80">{f}</span>
                    </span>
                    {i < story.documentFlow.length - 1 ? <span className="h-px w-8 bg-navy-900/15" /> : null}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-navy-200 uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {story.setupEyebrow}
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {story.setupTitle}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-100/75 sm:text-lg">
                {service.solution}
              </p>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature, index) => (
                <Reveal as="li" key={feature} delay={index * 40}>
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-xs font-medium text-navy-100/85 ring-1 ring-white/10">
                    <span className="font-display font-semibold text-navy-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {feature}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="grid gap-6">
            <MediaReveal direction="right">
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <VideoSection
                  src={service.video}
                  poster={service.poster}
                  title={interpolate(shared.videoTitle, { name: service.name })}
                  transcript={story.videoTranscript}
                  priority
                />
              </div>
            </MediaReveal>
            <Reveal delay={80}>
              <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                <p className="text-xs font-semibold tracking-widest text-navy-200 uppercase">
                  {story.problemsLabel}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-navy-100/70">
                  {service.problems.map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-300" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}