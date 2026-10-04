"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/use-copy";

const partners = [
  { name: "Captain Chef", logo: "/partnership/captain-chef.png" },
  { name: "SMLE Guide", logo: "/partnership/smle-guide.webp" },
  { name: "Code Canyon", logo: "/partnership/code-canyon.png" },
];

export function PartnershipsSection() {
  const t = useT();

  return (
    <section
      className="relative overflow-hidden bg-brand-500 py-20 text-white sm:py-28"
      aria-labelledby="partnerships-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 -top-48 h-[32rem] w-[32rem] rounded-full border border-white/10"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-3 text-sm font-medium tracking-widest text-white/75 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {t("partnerships.label")}
            <span aria-hidden="true" className="h-px w-8 bg-current" />
          </p>
          <h2
            id="partnerships-heading"
            className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t("partnerships.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t("partnerships.description")}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3">
          {partners.map((partner, index) => (
            <li key={partner.name} className="min-w-0">
              <Reveal delay={index * 80} className="h-full">
                <div className="flex h-full min-h-48 flex-col items-center justify-center gap-5 border border-white/20 px-6 py-7 text-center transition-colors duration-300 hover:bg-white/10">
                  <div className="flex h-24 w-full items-center justify-center bg-white px-5 py-3">
                    <Image
                      src={partner.logo}
                      alt=""
                      width={200}
                      height={100}
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 80vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {partner.name}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
