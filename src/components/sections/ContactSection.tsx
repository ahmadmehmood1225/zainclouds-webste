"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { MapPin, Mail } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import { useOffices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";

function NetworkPattern() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-60">
        <defs>
          <pattern id="zc-connect" width="150" height="150" patternUnits="userSpaceOnUse">
            <path d="M-75 75 L225 75 M75 -75 L75 225" stroke="#0a1e3c" strokeOpacity="0.06" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#0a1e3c" fillOpacity="0.1" />
            <circle cx="150" cy="150" r="2" fill="#0a1e3c" fillOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zc-connect)" />
      </svg>
    </div>
  );
}

export function ContactSection() {
  const t = useT();
  const offices = useOffices();

  return (
    <section
      className="relative overflow-hidden border-b border-navy-900/10 bg-teal-50 py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <Parallax strength={3} className="absolute inset-0">
        <NetworkPattern />
      </Parallax>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-900/20 to-transparent"
      />
      <Container className="relative">
        <Reveal className="mb-12 rounded-2xl border border-brand-500/15 bg-white/85 p-6 shadow-[0_18px_50px_-42px_rgba(7,85,233,0.45)] sm:p-8">
          <h2 className="font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
            {t("contact.prepTitle")}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              t("contact.prepWorkflow"),
              t("contact.prepTools"),
              t("contact.prepPriority"),
            ].map((item, index) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-navy-700">
                <span className="num inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-50 text-xs font-semibold text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal variant="left" distance={34} className="lg:col-span-2">
            <SectionHeading
              id="contact-heading"
              label={t("contact.label")}
              title={t("contact.title")}
              description={t("contact.description")}
            />

            <div className="mt-10 space-y-6">
              {offices.map((office) => (
                <div key={office.id} className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-teal-300">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium text-navy-900">{office.title}</p>
                    <p className="text-sm text-navy-900/60">{office.area}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-teal-300">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium text-navy-900">{t("contact.emailLabel")}</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-navy-900/60 hover:text-teal-700"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" distance={34} delay={80} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}