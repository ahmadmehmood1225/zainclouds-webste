"use client";

import { useMemo } from "react";
import { useLocale } from "@/lib/use-copy";
import {
  capabilities as capabilitiesEn,
  processSteps as processStepsEn,
  technologyGroups as technologyGroupsEn,
  credibilityFacts as credibilityFactsEn,
  type ProcessStep,
  type TechnologyGroup,
  type CredibilityFact,
} from "@/data/home-content";
import {
  arCapabilities,
  arProcessSteps,
  arTechnologyGroups,
  arCredibilityFacts,
} from "@/data/i18n/content/home.ar";
import { services, type Service } from "@/data/services";
import { arServices } from "@/data/i18n/content/services.ar";
import { practices, type Practice } from "@/data/practices";
import { arPractices } from "@/data/i18n/content/practices.ar";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { arTestimonials } from "@/data/i18n/content/testimonials.ar";
import { industries, type Industry } from "@/data/industries";
import { arIndustries } from "@/data/i18n/content/industries.ar";
import { projects, type Project } from "@/data/projects";
import { arProjects } from "@/data/i18n/content/projects.ar";
import { teamDisciplines, type TeamDiscipline } from "@/data/team";
import { leadership, type Leader } from "@/data/leadership";
import { arLeadership } from "@/data/i18n/content/leadership.ar";
import { arTeam } from "@/data/i18n/content/team.ar";
import { stats, type StatItem } from "@/data/stats";
import { arStats } from "@/data/i18n/content/stats.ar";
import { offices, type Office } from "@/data/locations";
import { arOffices } from "@/data/i18n/content/locations.ar";
import { navigation, footerServiceLinks, footerIndustryLinks, footerCompanyLinks, footerLegalLinks, type NavLink } from "@/data/navigation";
import { arNavigation } from "@/data/i18n/content/navigation.ar";
import { homeFaqs, type Faq } from "@/data/faqs";
import { arHomeFaqs } from "@/data/i18n/content/faqs.ar";
import {
  serviceStoryCopy,
  type ServiceStoryCopy,
  type ServiceStoryKey,
  type ServiceStoryText,
} from "@/data/i18n/content/serviceStories";

/**
 * Localized content hooks.
 *
 * English stays in the existing data files as the source of truth; each Arabic
 * module is a typed partial override keyed by slug or id, so a missing
 * translation can never break a page and no English text is duplicated.
 */

export type ServiceOverrides = Partial<
  Pick<
    Service,
    | "name"
    | "tagline"
    | "heroTitle"
    | "intro"
    | "problems"
    | "solution"
    | "features"
    | "benefits"
    | "integrations"
    | "faqs"
    | "category"
    | "spotlight"
  >
>;

function mergeBySlug<T extends { slug: string }>(
  source: T[],
  overrides: Record<string, Partial<T>>,
): T[] {
  return source.map((item) => {
    const override = overrides[item.slug] as Partial<T> | undefined;
    return override ? ({ ...item, ...override } as T) : item;
  });
}

function mergeById<T extends { id: string }>(
  source: T[],
  overrides: Record<string, Partial<T>>,
): T[] {
  return source.map((item) => {
    const override = overrides[item.id] as Partial<T> | undefined;
    return override ? ({ ...item, ...override } as T) : item;
  });
}

function mergeOrdered<T>(source: T[], overrides: (Partial<T> | undefined)[]): T[] {
  return source.map((item, index) => {
    const override = overrides[index];
    return override ? ({ ...item, ...override } as T) : item;
  });
}

/**
 * Client testimonials, with Arabic text merged in per entry.
 */
export function useTestimonials(): Testimonial[] {
  const { locale } = useLocale();
  return useMemo(
    () =>
      locale === "ar"
        ? mergeBySlug<Testimonial>(
            testimonials,
            arTestimonials as Record<string, Partial<Testimonial>>,
          )
        : testimonials,
    [locale],
  );
}

/**
 * The five delivery practices, with Arabic text merged in per practice.
 * Structural fields are shared, so switching region changes only the prose.
 */
export function usePractices(): Practice[] {
  const { locale } = useLocale();
  return useMemo(
    () =>
      locale === "ar"
        ? mergeBySlug<Practice>(practices, arPractices as Record<string, Partial<Practice>>)
        : practices,
    [locale],
  );
}

export function useServices(): Service[] {
  const { locale } = useLocale();  return useMemo(
    () =>
      locale === "ar"
        ? mergeBySlug<Service>(services, arServices as Record<string, Partial<Service>>)
        : services,
    [locale],
  );
}

export function useService(slug: string): Service | undefined {
  const all = useServices();
  return all.find((service) => service.slug === slug);
}

export function useIndustries(): Industry[] {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ar" ? mergeBySlug<Industry>(industries, arIndustries) : industries),
    [locale],
  );
}

export function useProjects(): Project[] {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ar" ? mergeBySlug<Project>(projects, arProjects) : projects),
    [locale],
  );
}

export function useTeamDisciplines(): TeamDiscipline[] {
  const { locale } = useLocale();
  return useMemo(
    () =>
      locale === "ar" ? mergeOrdered<TeamDiscipline>(teamDisciplines, arTeam) : teamDisciplines,
    [locale],
  );
}

export function useLeadership(): Leader[] {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ar" ? mergeOrdered<Leader>(leadership, arLeadership) : leadership),
    [locale],
  );
}

export function useStats(): StatItem[] {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ar" ? mergeOrdered<StatItem>(stats, arStats) : stats),
    [locale],
  );
}

export function useOffices(): Office[] {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ar" ? mergeById<Office>(offices, arOffices) : offices),
    [locale],
  );
}

export function useHomeFaqs(): Faq[] {
  const { locale } = useLocale();
  return useMemo(
    () =>
      locale === "ar" ? mergeOrdered<Faq>(homeFaqs, arHomeFaqs) : homeFaqs,
    [locale],
  );
}

export function useCapabilities(): string[] {
  const { locale } = useLocale();
  return useMemo(() => (locale === "ar" ? arCapabilities : capabilitiesEn), [locale]);
}

export function useProcessSteps(): ProcessStep[] {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ar" ? mergeOrdered<ProcessStep>(processStepsEn, arProcessSteps) : processStepsEn),
    [locale],
  );
}

export function useTechnologyGroups(): TechnologyGroup[] {
  const { locale } = useLocale();
  return useMemo(
    () =>
      locale === "ar"
        ? mergeOrdered<TechnologyGroup>(technologyGroupsEn, arTechnologyGroups)
        : technologyGroupsEn,
    [locale],
  );
}

export function useCredibilityFacts(): CredibilityFact[] {
  const { locale } = useLocale();
  return useMemo(
    () =>
      locale === "ar"
        ? mergeOrdered<CredibilityFact>(credibilityFactsEn, arCredibilityFacts)
        : credibilityFactsEn,
    [locale],
  );
}

type LocalizedNavLink = Omit<NavLink, "label" | "children"> & {
  label: string;
  children?: { label: string; description?: string; href?: string; heading?: boolean; cta?: boolean }[];
};

function localizeLinks(
  links: { label: string; href: string }[],
  overrides: Record<string, { label: string; description?: string }>,
): { label: string; href: string }[] {
  return links.map((link) => ({ ...link, ...overrides[link.href] }));
}

export function useNavigation(): LocalizedNavLink[] {
  const { locale } = useLocale();
  return useMemo(() => {
    if (locale !== "ar") return navigation;
    const ar = arNavigation;
    return navigation.map((link) => ({
      ...link,
      label: ar[link.href]?.label ?? link.label,
      children: link.children?.map((child) => {
        // Headings have no href, so they are keyed by their English label.
        const override = child.href ? ar[child.href] : ar[child.label];
        return {
          ...child,
          label: override?.label ?? child.label,
          description: override?.description ?? child.description,
        };
      }),
    }));
  }, [locale]);
}

export function useFooterLinks() {
  const { locale } = useLocale();
  return useMemo(() => {
    if (locale !== "ar") {
      return {
        services: footerServiceLinks,
        industries: footerIndustryLinks,
        company: footerCompanyLinks,
        legal: footerLegalLinks,
      };
    }
    const ar = arNavigation;
    return {
      services: localizeLinks(footerServiceLinks, ar),
      industries: localizeLinks(footerIndustryLinks, ar),
      company: localizeLinks(footerCompanyLinks, ar),
      legal: localizeLinks(footerLegalLinks, ar),
    };
  }, [locale]);
}

/**
 * Copy for the bespoke service stories. Each story owns its own framing and
 * motion concept, so the record is looked up by service slug.
 */
export function useServiceStory<K extends ServiceStoryKey>(key: K): ServiceStoryText<K> {
  const { locale } = useLocale();
  return useMemo(() => serviceStoryCopy[locale][key] as ServiceStoryText<K>, [locale, key]);
}

/** Copy shared by every service page, regardless of the story. */
export function useServiceSharedCopy(): ServiceStoryCopy["shared"] {
  const { locale } = useLocale();
  return useMemo(() => serviceStoryCopy[locale].shared, [locale]);
}
