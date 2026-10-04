"use client";

import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { useCapabilities } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

const partnerLogos = [
  { name: "Captain Chef", logo: "/partnership/captain-chef.png" },
  { name: "SMLE Guide", logo: "/partnership/smle-guide.webp" },
  { name: "Code Canyon", logo: "/partnership/code-canyon.png" },
];

/**
 * Thin, honest capability strip. It lists the work the company does - no
 * invented client logos, no fabricated results.
 */
export function CapabilityStrip() {
  const t = useT();
  const capabilities = useCapabilities();

  return (
    <section
      className="border-b border-navy-900/10 bg-white py-12 sm:py-14"
      aria-label={t("capabilities.aria")}
    >
      <Container>
        <p className="text-center text-xs font-semibold tracking-widest text-navy-900/45 uppercase">
          {t("capabilities.label")}
        </p>
        <div className="marquee-mask mt-8 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10 pe-10">
            {[...capabilities, ...capabilities].map((capability, index) => (
              <span
                key={`${capability}-${index}`}
                aria-hidden={index >= capabilities.length}
                className="flex shrink-0 items-center gap-3 whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
                <span className="font-display text-xl font-medium tracking-tight text-navy-900/60 sm:text-2xl">
                  {capability}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-mask mt-8 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-5 pe-5">
            {[...partnerLogos, ...partnerLogos].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                aria-hidden={index >= partnerLogos.length}
                className="flex h-20 w-52 shrink-0 items-center justify-center gap-4 border border-navy-900/10 bg-white px-5"
              >
                <Image
                  src={partner.logo}
                  alt=""
                  width={120}
                  height={60}
                  sizes="120px"
                  className="h-12 w-24 object-contain"
                />
                <span className="font-display text-sm font-semibold tracking-tight text-navy-900">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
