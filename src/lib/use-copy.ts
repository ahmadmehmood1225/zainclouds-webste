"use client";

import { useMemo } from "react";
import { localeForRegion, type Locale, type RegionId } from "@/data/regions";
import { useRegion } from "@/lib/use-region";
import { getDictionary, type CopyKey, type CopyDictionary } from "@/data/i18n";

export type CopyValues = Record<string, string | number>;

export function interpolate(template: string, values?: CopyValues): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, token: string) =>
    token in values ? String(values[token]) : match,
  );
}

export type Translator = (key: CopyKey, values?: CopyValues) => string;

export function createTranslator(dictionary: CopyDictionary): Translator {
  return (key, values) => {
    const entry = dictionary[key];
    const text = typeof entry === "string" ? entry : Array.isArray(entry) ? entry.join(" ") : key;
    return interpolate(text, values);
  };
}

export function createListReader(dictionary: CopyDictionary) {
  return (key: CopyKey): string[] => {
    const entry = dictionary[key];
    if (Array.isArray(entry)) return entry;
    if (typeof entry === "string") return [entry];
    return [];
  };
}

export type LocaleState = {
  region: RegionId;
  locale: Locale;
  isRTL: boolean;
  dictionary: CopyDictionary;
  t: Translator;
  list: (key: CopyKey) => string[];
};

function buildState(region: RegionId): LocaleState {
  const locale = localeForRegion(region);
  const dictionary = getDictionary(locale, region);
  return {
    region,
    locale,
    isRTL: locale === "ar",
    dictionary,
    t: createTranslator(dictionary),
    list: createListReader(dictionary),
  };
}

/**
 * Single entry point for region aware copy. The server snapshot is the default
 * English region, so markup is prerendered in English and swaps to the stored
 * region on hydration. Direction and language are set on <html> before paint by
 * the bootstrap script, so the layout itself never flashes.
 */
export function useLocale(): LocaleState {
  const region = useRegion();
  return useMemo(() => buildState(region), [region]);
}

/** Convenience hook when only the translation function is needed. */
export function useT(): Translator {
  return useLocale().t;
}

export function useCopyList() {
  return useLocale().list;
}

export type { CopyKey };
