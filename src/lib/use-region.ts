"use client";

import { useSyncExternalStore } from "react";
import {
  regionStorageKey,
  defaultRegionId,
  localeForRegion,
  directionForLocale,
  type RegionId,
} from "@/data/regions";

const isRegionId = (value: string | null): value is RegionId =>
  value === "ksa" || value === "mea" || value === "pk";

function readRegion(): RegionId {
  try {
    const stored = window.localStorage.getItem(regionStorageKey);
    if (isRegionId(stored)) return stored;
  } catch {
    /* private mode or blocked storage: fall back to the default region */
  }
  return defaultRegionId;
}

let cached: RegionId | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): RegionId {
  if (cached === null) cached = readRegion();
  return cached;
}

function getServerSnapshot(): RegionId {
  return defaultRegionId;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function applyDocumentLocale(id: RegionId) {
  const locale = localeForRegion(id);
  const root = document.documentElement;
  root.setAttribute("lang", locale);
  root.setAttribute("dir", directionForLocale(locale));
  root.setAttribute("data-region", id);
}

export function setRegion(id: RegionId) {
  try {
    window.localStorage.setItem(regionStorageKey, id);
  } catch {
    /* ignore write failures, the in memory value still applies */
  }
  cached = id;
  applyDocumentLocale(id);
  listeners.forEach((listener) => listener());
}

/** Imperative read for non React code (scroll handling, analytics). */
export function currentRegion(): RegionId {
  if (typeof window === "undefined") return defaultRegionId;
  return getSnapshot();
}

export function useRegion(): RegionId {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Keeps multiple tabs in sync. */
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== regionStorageKey) return;
    const next = isRegionId(event.newValue) ? event.newValue : defaultRegionId;
    if (next === cached) return;
    cached = next;
    applyDocumentLocale(next);
    listeners.forEach((listener) => listener());
  });
}
