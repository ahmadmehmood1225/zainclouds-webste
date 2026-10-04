export type RegionId = "ksa" | "mea" | "pk";
export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

export type Region = {
  id: RegionId;
  code: string;
  name: string;
  nameAr: string;
  /** Copy language the region reads the site in. */
  locale: Locale;
  /** Language label shown in the region switcher. */
  language: string;
};

/**
 * Region drives both messaging and language:
 * KSA reads the site in Arabic (RTL), MEA and PK read it in English.
 * The choice is persisted locally so it survives navigation and refreshes.
 */
export const regions: Region[] = [
  {
    id: "ksa",
    code: "KSA",
    name: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    locale: "ar",
    language: "العربية",
  },
  {
    id: "mea",
    code: "MEA",
    name: "Middle East & Africa",
    nameAr: "الشرق الأوسط وأفريقيا",
    locale: "en",
    language: "English",
  },
  {
    id: "pk",
    code: "PK",
    name: "Pakistan",
    nameAr: "باكستان",
    locale: "en",
    language: "English",
  },
];

export const regionStorageKey = "zc-region";

/** Undecided visitors read the site in English, which keeps the default experience. */
export const defaultRegionId: RegionId = "mea";

export const localeForRegion = (id: RegionId | null | undefined): Locale =>
  regions.find((region) => region.id === id)?.locale ?? "en";

export const directionForLocale = (locale: Locale): Direction =>
  locale === "ar" ? "rtl" : "ltr";

export const getRegion = (id: RegionId | null | undefined): Region =>
  regions.find((region) => region.id === id) ?? regions[1];

/** Region name in the language the site is currently rendered in. */
export const regionName = (id: RegionId | null | undefined, locale: Locale): string => {
  const region = getRegion(id);
  return locale === "ar" ? region.nameAr : region.name;
};

/**
 * Runs before first paint so the document is already in the right language and
 * direction. Without this, an Arabic visitor sees a full width LTR layout for a
 * frame before React hydrates.
 */
export const localeBootstrapScript = `(function(){try{var r=localStorage.getItem(${JSON.stringify(
  regionStorageKey,
)})||${JSON.stringify(defaultRegionId)};var a=r==="ksa";var d=document.documentElement;d.setAttribute("lang",a?"ar":"en");d.setAttribute("dir",a?"rtl":"ltr");d.setAttribute("data-region",r);}catch(e){}})();`;
