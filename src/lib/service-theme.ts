import type { ServiceAccent } from "@/data/services";

export type ServiceTheme = {
  text: string;
  softText: string;
  chip: string;
  glow: string;
  bar: string;
  ring: string;
  solid: string;
  onSolid: string;
  line: string;
};

export const serviceThemes: Record<ServiceAccent, ServiceTheme> = {
  green: {
    text: "text-green-600",
    softText: "text-green-300",
    chip: "bg-green-400/10 text-green-300 ring-1 ring-green-400/30",
    glow: "rgba(76,181,133,0.35)",
    bar: "bg-green-500",
    ring: "ring-green-400/30",
    solid: "bg-green-500",
    onSolid: "text-navy-950",
    line: "bg-green-500",
  },
  pink: {
    text: "text-pink-600",
    softText: "text-pink-300",
    chip: "bg-pink-400/10 text-pink-200 ring-1 ring-pink-400/30",
    glow: "rgba(239,87,144,0.3)",
    bar: "bg-pink-500",
    ring: "ring-pink-400/30",
    solid: "bg-pink-500",
    onSolid: "text-navy-950",
    line: "bg-pink-500",
  },
  yellow: {
    text: "text-yellow-600",
    softText: "text-yellow-200",
    chip: "bg-yellow-300/10 text-yellow-200 ring-1 ring-yellow-300/30",
    glow: "rgba(255,199,67,0.3)",
    bar: "bg-yellow-400",
    ring: "ring-yellow-300/30",
    solid: "bg-yellow-400",
    onSolid: "text-navy-950",
    line: "bg-yellow-400",
  },
  navy: {
    text: "text-navy-600",
    softText: "text-navy-200",
    chip: "bg-navy-200/10 text-navy-200 ring-1 ring-navy-300/30",
    glow: "rgba(109,142,193,0.35)",
    bar: "bg-navy-300",
    ring: "ring-navy-300/30",
    solid: "bg-navy-300",
    onSolid: "text-navy-950",
    line: "bg-navy-300",
  },
};

export function serviceTheme(accent: ServiceAccent): ServiceTheme {
  return serviceThemes[accent];
}