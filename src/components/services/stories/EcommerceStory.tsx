import { useServiceSharedCopy, useServiceStory } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollScale } from "@/components/motion/ScrollScale";
import { VideoSection } from "@/components/motion/VideoSection";
import type { Service } from "@/data/services";

/**
 * Ecommerce story: the store as a stack of connected layers, with the catalog
 * visual built from the data rather than half-baked screen marketing.
 */
export function EcommerceStory({ service }: { service: Service }) {
  const story = useServiceStory("ecommerce");
  const shared = useServiceSharedCopy();

  return (
    <>
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-green-600 uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {story.eyebrow}
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl">
                {story.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-900/70 sm:text-lg">
                {story.body}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {story.layers.map((layer, index) => (
                  <li
                    key={layer}
                    className="flex items-center gap-2 rounded-full border border-green-600/20 bg-green-400/5 px-3.5 py-1.5 text-xs font-medium text-navy-900/75"
                  >
                    <span className="font-display font-semibold text-green-600">
                      {index + 1}
                    </span>
                    {layer}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ScrollScale className="aspect-[4/3] rounded-2xl">
            <VideoSection
              src={service.video}
              poster={service.poster}
              title={interpolate(shared.videoTitle, { name: service.name })}
              transcript={story.videoTranscript}
              chrome="browser"
              chromeLabel={story.chromeLabel}
              priority
            />
          </ScrollScale>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-20 sm:py-28" aria-labelledby="ecommerce-layers-heading">
        <Container>
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-green-600 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {story.breakEyebrow}
            </p>
            <h2
              id="ecommerce-layers-heading"
              className="max-w-3xl font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
            >
              {story.breakTitle}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <ol className="space-y-4">
              {service.problems.map((problem, index) => (
                <Reveal as="li" key={problem} delay={index * 60}>
                  <div
                    className="flex items-start gap-5 rounded-2xl border border-navy-900/10 bg-white p-6"
                    style={{ transform: `translateX(${index * 6}px)` }}
                  >
                    <span className="font-display text-sm font-semibold text-green-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-navy-900/70 sm:text-base">
                      {problem}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="flex items-start lg:pl-6">
              <Reveal delay={120}>
                <div className="rounded-3xl bg-navy-950 p-8 text-white sm:p-10">
                  <p className="text-xs font-semibold tracking-widest text-green-300 uppercase">
                    {story.fixLabel}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                    {story.fixTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-100/75 sm:text-base">
                    {service.solution}
                  </p>
                  <p className="mt-6 border-t border-white/10 pt-6 text-sm text-white/60">
                    {story.fixBody}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}