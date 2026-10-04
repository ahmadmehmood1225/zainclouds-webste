import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Base>
  );
}

export function Check(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12 4 4L19 6" />
    </Base>
  );
}

export function Plus(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Base>
  );
}

export function Minus(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
    </Base>
  );
}

export function Menu(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </Base>
  );
}

export function Close(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Base>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
}

export function ShoppingBag(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </Base>
  );
}

export function Users(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Base>
  );
}

export function Layers(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </Base>
  );
}

export function Grid(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </Base>
  );
}

export function CreditCard(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </Base>
  );
}

export function Code(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m13 4-2 16" />
    </Base>
  );
}

export function Storefront(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 8 4.5 4h15L21 8" />
      <path d="M3 8a2.7 2.7 0 0 0 5 0 2.7 2.7 0 0 0 4 0 2.7 2.7 0 0 0 4 0 2.7 2.7 0 0 0 3 0" />
      <path d="M4 11v9h16v-9" />
      <path d="M9 20v-6h6v6" />
    </Base>
  );
}

export function HeartPulse(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20.4 5.6A5.5 5.5 0 0 0 12 7a5.5 5.5 0 0 0-8.4-1.4A5.4 5.4 0 0 0 2 9.4 5.4 5.4 0 0 0 3.6 12L12 20l8.4-8A5.4 5.4 0 0 0 22 9.4a5.4 5.4 0 0 0-1.6-3.8Z" />
    </Base>
  );
}

export function Factory(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2 20V9l6 4V9l6 4V4h8v16" />
      <path d="M2 20h20" />
    </Base>
  );
}

export function Truck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 6h11v10H3z" />
      <path d="M14 9h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </Base>
  );
}

export function BellHop(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2 8h20v9H2z" />
      <path d="M5 17v2" />
      <path d="M19 17v2" />
      <path d="M5 12.5c2 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0 1.5 1.5 3 1.5 5 0" />
    </Base>
  );
}

export function BookProfile(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </Base>
  );
}

export function Briefcase(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M12 11v2" />
    </Base>
  );
}

export function Building(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
      <path d="M15 9h4a2 2 0 0 1 2 2v10" />
      <path d="M2 21h20" />
      <path d="M8 7h3" />
      <path d="M8 11h3" />
      <path d="M8 15h3" />
    </Base>
  );
}

export function Box(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
      <path d="m12 2 4 2.25-8 4.5-4-2.25" />
      <path d="m20 6.5-8 4.5-8-4.5" />
      <path d="M12 11v9" />
    </Base>
  );
}

export function Phone(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </Base>
  );
}

export function Mail(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Base>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Base>
  );
}

export function Globe(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13 13 0 0 1 0 18" />
      <path d="M12 3a13 13 0 0 0 0 18" />
    </Base>
  );
}

export function Clock(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  );
}

export function Calendar(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 9h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </Base>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a4 4 0 0 1 2-2Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Base>
  );
}

export function Twitter(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 4l7.2 9.3L4.4 20h2.6l5.4-5.5L16.9 20H20l-7.5-9.7L18.9 4h-2.6l-4.8 5L8.1 4H4Z" />
    </Base>
  );
}

export function Instagram(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Base>
  );
}

export function Github(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </Base>
  );
}

export function ShieldCheck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2 20 5v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

export function Chart(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 16v-5" />
      <path d="M12 16V8" />
      <path d="M17 16v-9" />
    </Base>
  );
}

export function Refresh(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M21 12a9 9 0 0 1-13.5 7.5L3 17" />
      <path d="M3 12a9 9 0 0 1 13.5-7.5L21 7" />
      <path d="M3 20v-6h6" />
      <path d="M21 4v6h-6" />
    </Base>
  );
}

export function Headset(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 12a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-2v-7h3" />
      <path d="M3 14h3v7H5a2 2 0 0 1-2-2v-5Z" />
      <path d="M21 14h-1" />
    </Base>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 5.5v13l11-6.5z" />
    </Base>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9.5 5v14" />
      <path d="M14.5 5v14" />
    </Base>
  );
}

export function VolumeOn(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M11 5.5 6.8 9H3.5v6h3.3L11 18.5z" />
      <path d="M15.5 9.2a4 4 0 0 1 0 5.6" />
      <path d="M18.2 6.5a7.8 7.8 0 0 1 0 11" />
    </Base>
  );
}

export function VolumeOff(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M11 5.5 6.8 9H3.5v6h3.3L11 18.5z" />
      <path d="m16 9.5 4.5 5" />
      <path d="m20.5 9.5-4.5 5" />
    </Base>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </Base>
  );
}

export function Scale(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3v18" />
      <path d="M8 21h8" />
      <path d="M12 3 4 7l4 2 4-2V6l4 2V7L12 3Z" />
      <path d="M20 9 12 13l-8-4" />
    </Base>
  );
}

export function DocText(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </Base>
  );
}

export function Commute(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 6h8" />
      <path d="M9 4h6" />
      <path d="M6 6v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6" />
      <path d="M7 18h10" />
      <path d="M9 21c-2 0-2-3 0-3" />
      <path d="M15 21c-2 0-2-3 0-3" />
    </Base>
  );
}

export function Shield(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5 6v5.5c0 4.2 2.8 7.9 7 9.5 4.2-1.6 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </Base>
  );
}

export function DataStack(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </Base>
  );
}

export function Compass(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-2 4.5-4.5 2 2-4.5L15 9Z" />
    </Base>
  );
}

export function CloudOps(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a3.75 3.75 0 0 1 .5 8.5H7Z" />
      <path d="M12 12.5 9.5 15l1.6.4.4 1.6 1.5-2.5L11.4 13l.6-.5Z" />
    </Base>
  );
}

export const iconMap = {
  ecommerce: ShoppingBag,
  crm: Users,
  erp: Layers,
  erpnext: Box,
  pos: CreditCard,
  "custom-software": Code,
  retail: Storefront,
  healthcare: HeartPulse,
  manufacturing: Factory,
  distribution: Truck,
  hospitality: BellHop,
  education: BookProfile,
  "professional-services": Briefcase,
  building: Building,
  box: Box,
  medical: HeartPulse,
  factory: Factory,
  truck: Truck,
  grid: Grid,
  shield: Shield,
  data: DataStack,
  compass: Compass,
  cloud: CloudOps,
} as const;

export type IconName = keyof typeof iconMap;