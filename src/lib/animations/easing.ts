export const easing = {
  smooth: "power4.out",
  soft: "power2.out",
  steady: "power3.out",
  inOut: "power3.inOut",
  hero: "expo.out",
  none: "none",
} as const;

export type EasingKey = keyof typeof easing;