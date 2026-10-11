"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/use-copy";

const team = [
  { name: "Zain Ul Abideen", role: "CEO", image: "/images/team/zain-ul-abideen-zain-clouds.jpeg" },
  { name: "Wajahat Ali", role: "CTO", image: "/images/team/wajahat-ali-zain-clouds.png" },
  {
    name: "Waleed Ejaz",
    role: "Mobile Application Developer",
    image: "/images/team/waleed-ejaz-zain-clouds.png",
  },
  {
    name: "Shahzaib Aslam",
    role: "UI/UX Designer",
    image: "/images/team/shahzaib-aslam-zain-clouds.jpeg",
  },
];

export function TeamSection() {
  const t = useT();

  return (
    <section className="w-full bg-white" aria-labelledby="team-heading">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            id="team-heading"
            label={t("leadership.label")}
            title={t("leadership.title")}
            description={t("leadership.description")}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 60}>
              <article className="group relative aspect-[9/16] overflow-hidden rounded-2xl transition-transform duration-300 motion-safe:hover:-translate-y-1">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} of Zain Clouds`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-white/80">{member.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}