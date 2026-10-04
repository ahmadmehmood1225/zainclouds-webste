"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/LogoLink";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { useFooterLinks, useOffices } from "@/lib/use-content";
import { useT } from "@/lib/use-copy";
import {
  ArrowRight,
  Mail,
  MapPin,
  Globe,
  LinkedIn,
  Twitter,
  Instagram,
  Github,
} from "@/components/ui/icons";

// Placeholder socials — fill these with live profile URLs before launch.
const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedIn },
  { label: "Twitter", href: siteConfig.social.twitter, Icon: Twitter },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
  { label: "GitHub", href: siteConfig.social.github, Icon: Github },
];

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  const offices = useOffices();
  const { services, industries, company, legal } = useFooterLinks();
  const overviewLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("footer.allServices"), href: "/services" },
    { label: t("footer.allIndustries"), href: "/industries" },
    { label: t("footer.sitemap"), href: "/sitemap.xml" },
  ];

  return (
    <footer className="bg-navy-950 text-navy-100">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between sm:py-20">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-widest text-teal-300 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {t("footer.ctaEyebrow")}
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              {t("footer.ctaHeadlineLead")}
              <br className="hidden sm:block" /> {t("footer.ctaHeadlineTail")}
            </h2>
          </div>
          <Button href="/contact" variant="outline-light" size="lg" className="shrink-0">
            {t("footer.ctaButton")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Button>
        </Container>
      </div>

      {/* Main grid */}
      <Container className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200/70">
              {t("footer.about")}
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-navy-200/80 transition-colors hover:text-teal-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-teal-400 hover:text-teal-300"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    key={label}
                    title={t("footer.linkComingSoon", { label })}
                    aria-label={t("footer.linkComingSoon", { label })}
                    className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-white/10 text-white/35"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title={t("footer.services")}>
              {services.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title={t("footer.industries")}>
              {industries.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title={t("footer.company")}>
              {company.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title={t("footer.resources")}>
              {overviewLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-14 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
          {offices.map((office, index) => (
            <div key={office.id} className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <MapPin className="h-4 w-4 text-teal-400" aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium text-white">{office.title}</p>
                <p className="text-sm text-navy-200/60">{office.area}</p>
                <p className="mt-1 text-xs leading-relaxed text-navy-200/45">
                  {office.description}
                </p>
              </div>
              <span className="num ms-auto font-display text-xs font-semibold tracking-widest text-white/25">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none overflow-hidden"
        >
          <p className="font-display text-[13vw] leading-[0.85] font-bold tracking-tight text-white/[0.045] lg:text-[11rem]">
            ZAIN CLOUDS
          </p>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-navy-200/50 sm:flex-row sm:items-center">
          <p>{t("footer.rights", { year: String(year), company: siteConfig.legalName })}</p>
          <div className="flex flex-wrap gap-4">
            {legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-teal-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            {t("nav.regionsServed")}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-navy-200/70 transition-colors hover:text-teal-300">
        {children}
      </Link>
    </li>
  );
}