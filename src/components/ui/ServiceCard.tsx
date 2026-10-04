import Link from "next/link";
import type { Service } from "@/data/services";
import { ArrowUpRight, iconMap, type IconName } from "@/components/ui/icons";

type ServiceCardProps = {
  service: Service;
  icon?: IconName;
};

export function ServiceCard({ service, icon }: ServiceCardProps) {
  const Icon = iconMap[icon ?? (service.slug as IconName) ?? "grid"];

  return (
    <Link
      href={service.path}
      className="group relative flex min-h-80 flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:bg-brand-500 hover:shadow-[0_24px_60px_-30px_rgba(7,85,233,0.55)] focus-visible:bg-brand-500 sm:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-sm font-semibold tracking-widest text-brand-700 transition-colors group-hover:text-white group-focus-visible:text-white">
          {service.number}
        </span>
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-white/15 group-hover:text-white group-focus-visible:bg-white/15 group-focus-visible:text-white"
        >
          <Icon className="h-6 w-6" />
        </span>
      </div>

      <h3 className="mt-8 text-xl font-semibold tracking-tight text-navy-900 transition-colors group-hover:text-white group-focus-visible:text-white">
        {service.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-navy-700 transition-colors group-hover:text-white/85 group-focus-visible:text-white/85">
        {service.tagline}
      </p>

      <div className="mt-auto flex items-center gap-3 pt-8">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-white group-hover:text-brand-700 group-focus-visible:bg-white group-focus-visible:text-brand-700"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-navy-900 transition-colors group-hover:text-white group-focus-visible:text-white">
          Learn More
        </span>
      </div>
    </Link>
  );
}