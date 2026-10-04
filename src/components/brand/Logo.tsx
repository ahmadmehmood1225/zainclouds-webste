import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <rect width="40" height="40" rx="10" fill="#0a1e3c" />
      <path
        d="M12 14.5 22 8v9l-8 4.8V24h12"
        stroke="#7ecea9"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M28 26.5 22 30v-6.5"
        stroke="#ffaf11"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
