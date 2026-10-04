import Image from "next/image";
import Link from "next/link";
import type { Industry } from "@/data/industries";
import { ArrowUpRight } from "@/components/ui/icons";

export function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  return (
    <Link
      href={industry.path}
      data-cursor="explore"
      className="group relative flex min-h-[21rem] flex-col justify-end overflow-hidden rounded-2xl bg-navy-950 p-6 sm:p-7"
    >
      <Image
        src={`/images/industries/${industry.slug}.svg`}
        alt=""
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="absolute inset-0 object-cover opacity-40 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-55"
        aria-hidden
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/15"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-green-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <div className="relative flex items-center justify-between gap-4">
        <span className="font-display text-sm font-semibold tracking-widest text-white/60 transition-colors duration-300 group-hover:text-green-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-green-400 group-hover:bg-green-400 group-hover:text-navy-950">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
      <div className="relative mt-10">
        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {industry.name}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-100/70 transition-transform duration-300 group-hover:translate-y-0.5">
          {industry.short}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-green-300">
          Explore
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}