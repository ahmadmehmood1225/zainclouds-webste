import type { CopyDictionary, CopyValue } from "./types";
import type { Locale, RegionId } from "@/data/regions";
import { chrome as chromeEn } from "./copy/chrome.en";
import { home as homeEn } from "./copy/home.en";
import { faq as faqEn } from "./copy/faq.en";
import { services as servicesEn } from "./copy/services.en";
import { industries as industriesEn } from "./copy/industries.en";
import { company as companyEn } from "./copy/company.en";
import { meaOverrides } from "./mea";
import { chrome as chromeAr } from "./copy/chrome.ar";
import { home as homeAr } from "./copy/home.ar";
import { faq as faqAr } from "./copy/faq.ar";
import { services as servicesAr } from "./copy/services.ar";
import { industries as industriesAr } from "./copy/industries.ar";
import { company as companyAr } from "./copy/company.ar";

/**
 * English is the base dictionary and the source of truth for every key.
 * Keep the literal object shape: the key union below is what the Arabic mirror
 * and every `t()` call site are checked against.
 */
export const en = {
  ...chromeEn,
  ...homeEn,
  ...faqEn,
  ...servicesEn,
  ...industriesEn,
  ...companyEn,
};

/** Arabic dictionary. Must cover every English key. */
const arParts = {
  ...chromeAr,
  ...homeAr,
  ...faqAr,
  ...servicesAr,
  ...industriesAr,
  ...companyAr,
};

export const ar = { ...arParts };

export type CopyKey = keyof typeof en;

/**
 * Compile time guard: any English key without an Arabic entry is a type error,
 * so an untranslated string can never reach the Arabic site silently.
 */
type MissingArabicKeys = Exclude<CopyKey, keyof typeof arParts>;
const _arabicCoverage: MissingArabicKeys extends never
  ? true
  : ["Missing Arabic copy for:", MissingArabicKeys] = true;
void _arabicCoverage;

/** English never falls back to a missing key silently in development. */
function withFallback(dictionary: CopyDictionary): CopyDictionary {
  return { ...en, ...dictionary };
}

const cache = new Map<string, CopyDictionary>();

/**
 * Region drives copy: KSA reads Arabic, MEA reads English with regional
 * messaging, PK reads the standard English experience.
 */
export function getDictionary(locale: Locale, region?: RegionId): CopyDictionary {
  if (locale === "ar") {
    if (!cache.has("ar")) cache.set("ar", withFallback(ar));
    return cache.get("ar") as CopyDictionary;
  }

  if (region === "mea") {
    if (!cache.has("mea")) cache.set("mea", withFallback(meaOverrides));
    return cache.get("mea") as CopyDictionary;
  }

  if (!cache.has("en")) cache.set("en", withFallback({}));
  return cache.get("en") as CopyDictionary;
}

export type { CopyDictionary, CopyValue };
