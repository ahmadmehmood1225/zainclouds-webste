import { useServiceSharedCopy, useServiceStory } from "@/lib/use-content";
import { interpolate } from "@/lib/use-copy";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PinnedStory } from "@/components/motion/PinnedStory";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { VideoSection } from "@/components/motion/VideoSection";
import type { Service } from "@/data/services";

function HubDiagram({
  active,
  accent,
  nodes,
}: {
  active: number;
  accent: string;
  nodes: readonly string[];
}) {
  const positions = [
    { x: 180, y: 32 },
    { x: 268, y: 118 },
    { x: 180, y: 204 },
    { x: 92, y: 118 },
  ];
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" role="presentation" aria-hidden="true">
      <circle cx={180} cy={118} r={34} fill={accent} opacity={0.14} />
      <circle cx={180} cy={118} r={34} fill="none" stroke={accent} strokeWidth={2} />
      <text x={180} y={124} textAnchor="middle" fill={accent} fontSize={12} fontWeight={700}>
        ERP
      </text>
      {positions.map((position, i) => (
        <g key={nodes[i]}>
          <line x1={180} y1={118} x2={position.x} y2={position.y} stroke={accent} strokeWidth={i === active ? 2 : 1} opacity={i === active ? 0.9 : 0.34} />
          <circle cx={position.x} cy={position.y} r={22} fill={i === active ? accent : "none"} opacity={i === active ? 0.22 : 1} stroke={accent} strokeWidth={i === active ? 2 : 1} />
          <text x={position.x} y={position.y + 4} textAnchor="middle" fill={i === active ? "#0a1e3c" : accent} fontSize={9} fontWeight={i === active ? 700 : 500}>
            {nodes[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * ERP story: separate departments wiring into one connected hub. Uses a pinned
 * media story so the model is conveyed one system at a time.
 */
export function ErpStory({ service }: { service: Service }) {
  const story = useServiceStory("erp");
  const shared = useServiceSharedCopy();
  const accent = "#f7c743";
  const steps = [...story.departments];
  const hubNodes = story.departments.map((department) => department.title);
  const media = story.departments.map((_, index) => (
    <HubDiagram key={index} active={index} accent={accent} nodes={hubNodes} />
  ));

  return (
    <>
      <section className="bg-white py-20 sm:py-28" aria-labelledby="erp-hub-heading">
        <Container>
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-yellow-600 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {story.eyebrow}
            </p>
            <h2
              id="erp-hub-heading"
              className="max-w-3xl font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl"
            >
              {story.title}
            </h2>
          </Reveal>

          <div className="mt-14">
            <PinnedStory
              steps={steps}
              media={media}
              mediaClassName="h-[16rem] sm:h-[20rem]"
            />
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-20 sm:py-28" aria-labelledby="erp-changes-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-yellow-600 uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {story.changeEyebrow}
              </p>
              <h2
                id="erp-changes-heading"
                className="font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
              >
                {story.changeTitle}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-900/70 sm:text-lg">
                {story.changeBody}
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {service.benefits.map((benefit, index) => (
                <Reveal as="li" key={benefit} delay={index * 50}>
                  <div className="flex items-start gap-3 rounded-xl border border-navy-900/10 bg-white p-4 text-sm text-navy-900/75">
                    <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" />
                    {benefit}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="grid gap-6">
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
            <Reveal delay={80}>
              <div className="rounded-2xl bg-navy-950 p-7 text-white">
                <p className="text-xs font-semibold tracking-widest text-yellow-300 uppercase">
                  {story.problemsLabel}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-navy-100/75">
                  {service.problems.map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
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