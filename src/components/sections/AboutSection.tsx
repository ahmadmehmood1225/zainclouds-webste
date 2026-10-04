"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Check } from "@/components/ui/icons";
import { useOffices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

/** Images are language independent; the alt text comes from the copy layer. */
const officeImages = [
  { src: "/images/about/office-saudi.svg", delay: 0, offset: "sm:translate-y-8", span: "" },
  { src: "/images/about/office-pakistan.svg", delay: 90, offset: "sm:translate-y-14", span: "" },
  { src: "/images/about/office-dubai.svg", delay: 180, offset: "", span: "sm:col-span-2" },
];

const pointKeys = [
  "about.points.0",
  "about.points.1",
  "about.points.2",
  "about.points.3",
] as const;

const altKeys = ["about.officeAlt.0", "about.officeAlt.1", "about.officeAlt.2"] as const;

function OfficeCard({
  image,
  alt,
  office,
}: {
  image: (typeof officeImages)[number];
  alt: string;
  office: { title: string; area: string };
}) {
  return (
    <ImageReveal
      delay={image.delay}
      className={`rounded-2xl overflow-hidden ${image.offset} ${image.span}`}
    >
      <div className="border border-navy-900/10 bg-navy-100">
        <div className="relative h-48 overflow-hidden sm:h-56">
          <Parallax strength={6} className="relative -mt-[8%] h-[116%] w-full">
            <Image
              src={image.src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
        <div className="p-5">
          <p className="font-display font-semibold text-navy-900">{office.title}</p>
          <p className="mt-1 text-sm text-navy-900/55">{office.area}</p>
        </div>
      </div>
    </ImageReveal>
  );
}

export function AboutSection() {
  const t = useT();
  const offices = useOffices();

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="about-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="about-heading"
              label={t("about.label")}
              title={<TextReveal text={t("about.title")} />}
              description={t("about.description")}
            />
            <ul className="mt-8 space-y-3">
              {pointKeys.map((key) => { const point = t(key); return (
                <li key={point} className="flex items-start gap-3 text-sm text-navy-900/75 sm:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ); })}
            </ul>
            <div className="mt-9">
              <Button href="/about" variant="dark">
                {t("about.more")}
              </Button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {officeImages.map((image, index) => {
              const office = offices[index];
              if (!office) return null;
              return (
                <OfficeCard
                  key={image.src}
                  image={image}
                  alt={t(altKeys[index])}
                  office={office}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}