"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/animations/motion";
import type { HeroEcosystem } from "@/data/hero";
import { cn } from "@/lib/cn";

type OperationsEcosystemProps = {
  data: HeroEcosystem;
  className?: string;
};

const statusTone: Record<string, string> = {
  paid: "bg-teal-500/15 text-teal-300 ring-teal-400/25",
  picking: "bg-yellow-400/12 text-yellow-200 ring-yellow-300/25",
  ready: "bg-white/8 text-navy-100 ring-white/15",
};

const statusDot: Record<string, string> = {
  paid: "bg-teal-400",
  picking: "bg-yellow-300",
  ready: "bg-navy-200",
};

const formatNumber = (value: number) => Math.round(value).toLocaleString("en-US");

/**
 * The hero product visual.
 *
 * Rather than an abstract 3D object, this shows the actual thing the company
 * sells: one operations console where the storefront, the order queue, the
 * counter, stock and the ledger share the same records. Every figure comes from
 * the region data set, so switching region switches what the console reports.
 *
 * Motion is limited to what a real operations screen does: panels settle in,
 * numbers count once, the order queue advances, and a sync pulse travels along
 * the connection rail. Nothing floats, nothing spins.
 */
export function OperationsEcosystem({ data, className }: OperationsEcosystemProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [orderCursor, setOrderCursor] = useState(0);
  const [ledgerCursor, setLedgerCursor] = useState(0);
  const [posCursor, setPosCursor] = useState(0);
  const [liveTick, setLiveTick] = useState(0);

  const reduced = useReducedMotion();

  const orders = useMemo(() => {
    if (data.orders.length === 0) return [];
    const start = orderCursor % data.orders.length;
    return data.orders.map((_, index) => {
      const order = data.orders[(start + index) % data.orders.length];
      if (index !== 0) return order;
      return { ...order, id: `SO-LIVE-${String(orderCursor + 1).padStart(4, "0")}` };
    });
  }, [data.orders, orderCursor]);

  const ledger = useMemo(() => {
    if (data.ledger.length === 0) return [];
    const start = ledgerCursor % data.ledger.length;
    return data.ledger.map((_, index) => data.ledger[(start + index) % data.ledger.length]);
  }, [data.ledger, ledgerCursor]);

  const posRecord = data.posRecords[posCursor % data.posRecords.length];

  // Panels settle in sequence, once, on first view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-panel]",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.1 },
      );
      gsap.fromTo(
        "[data-rail-line]",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut", transformOrigin: "left center", delay: 0.2 },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  // Rotate the queue, ledger and receipt frequently enough to read as a live system.
  useEffect(() => {
    if (reduced) return;
    if (data.orders.length < 2 && data.ledger.length < 2 && data.posRecords.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setOrderCursor((value) => value + 1);
      setLedgerCursor((value) => value + 1);
      setPosCursor((value) => value + 1);
      setLiveTick((value) => value + 1);
    }, 1800);
    return () => window.clearInterval(id);
  }, [reduced, data.orders.length, data.ledger.length, data.posRecords.length]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/80 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* Console header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-50 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            <span className="truncate font-display text-sm font-semibold tracking-tight text-white">
              {data.workspace}
            </span>
          </span>
          <span className="hidden text-xs text-navy-300/70 sm:inline">
            {data.consoleLabel}
          </span>
        </div>
        <span className="num shrink-0 rounded-full border border-white/12 px-2.5 py-1 text-[11px] font-medium tracking-wide text-navy-200">
          {data.currency}
        </span>
      </div>

      {/* Connection rail: the modules and what they feed */}
      <div className="border-b border-white/10 px-4 py-3.5 sm:px-5">
        <div className="relative">
          <span
            data-rail-line
            aria-hidden="true"
            className="absolute inset-x-0 top-[13px] h-px origin-left bg-white/12"
          />
          <ul className="relative grid grid-cols-3 gap-y-3 sm:grid-cols-6 sm:gap-2">
            {data.modules.map((module) => (
              <li key={module.id} className="flex flex-col items-center gap-2 text-center">
                <span className="num flex h-[26px] w-[26px] items-center justify-center rounded-md border border-white/15 bg-navy-800 text-[10px] font-semibold tracking-wider text-teal-300 uppercase">
                  {module.code}
                </span>
                <span className="text-[10px] leading-tight font-medium text-navy-200/85">
                  {module.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key figures */}
      <dl className="grid grid-cols-2 gap-px border-b border-white/10 bg-white/10 lg:grid-cols-4">
        {data.metrics.map((metric) => (
          <div key={metric.id} data-panel className="bg-navy-900 px-4 py-4 sm:px-5">
            <dt className="text-[11px] font-medium tracking-wide text-navy-300/75 uppercase">
              {metric.label}
            </dt>
            <dd className="mt-1.5 flex items-baseline gap-2">
              <span className="num font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
                <span
                  key={liveTick}
                  className="motion-safe:animate-[zc-record-enter_450ms_ease-out_both]"
                >
                  {formatNumber(
                    metric.value +
                      liveTick *
                        (metric.id === "revenue"
                          ? 1250
                          : metric.id === "orders"
                            ? 2
                            : metric.id === "aov"
                              ? 1
                              : 0),
                  )}
                </span>
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium",
                  metric.tone === "warn" ? "text-yellow-200" : "text-teal-300",
                )}
              >
                {metric.delta}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {/* Order queue and counter */}
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div data-panel className="border-b border-white/10 px-4 py-4 sm:px-5 lg:col-span-3 lg:border-e lg:border-b-0">
          <PanelHeader label={data.ordersLabel} trailing={data.syncedLabel} />
          <ul className="mt-3 space-y-2">
            {orders.slice(0, 4).map((order, index) => (
              <li
                key={`${order.id}-${orderCursor}`}
                className={cn(
                  "motion-safe:animate-[zc-record-enter_450ms_ease-out_both] grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-white/8 bg-navy-800/60 px-3 py-2",
                  index === 0 && "border-teal-400/25 bg-teal-500/[0.06]",
                )}
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <span className="flex w-16 flex-col">
                  <span className="num text-[11px] font-semibold text-navy-100">
                    {order.id}
                  </span>
                  <span className="text-[10px] text-navy-300/70">{order.channel}</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-medium text-navy-100">
                    {order.customer}
                  </span>
                  <span className="block truncate text-[10px] text-navy-300/65">
                    {order.place}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="num text-[12px] font-semibold text-white">
                    {order.total}
                  </span>
                  <span
                    className={cn(
                      "hidden rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 sm:inline",
                      statusTone[order.status],
                    )}
                  >
                    <span
                      className={cn(
                        "me-1 inline-block h-1.5 w-1.5 rounded-full",
                        statusDot[order.status],
                      )}
                    />
                    {data.statusLabels[order.status]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-panel className="px-4 py-4 sm:px-5 lg:col-span-2">
          <PanelHeader label={data.posLabel} trailing={data.posPaid} />
          <div
            key={posRecord.id}
            className="motion-safe:animate-[zc-record-enter_450ms_ease-out_both] mt-3 flex items-center justify-between gap-3 rounded-md bg-white/[0.06] px-2.5 py-2 text-[10px] text-navy-200/80"
          >
            <span className="truncate">{posRecord.customer}</span>
            <span className="num shrink-0 text-white/80">{posRecord.id}</span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {posRecord.lines.map((line, index) => (
              <li
                key={`${posRecord.id}-${line.name}`}
                className="motion-safe:animate-[zc-record-enter_450ms_ease-out_both] flex items-baseline justify-between gap-3 border-b border-dashed border-white/10 pb-1.5 text-[12px] text-navy-100/85 last:border-b-0"
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <span className="truncate">
                  {line.name} <span className="num text-navy-300/60">×{line.qty}</span>
                </span>
                <span className="num shrink-0 font-medium text-white">{line.amount}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-baseline justify-between border-t border-white/12 pt-2.5">
            <span className="text-[11px] tracking-wide text-navy-300/75 uppercase">
              {data.totalLabel}
            </span>
            <span className="num font-display text-base font-semibold text-white">
              {posRecord.total}
            </span>
          </div>
        </div>
      </div>

      {/* Stock and ledger */}
      <div className="grid grid-cols-1 border-t border-white/10 lg:grid-cols-5">
        <div data-panel className="border-b border-white/10 px-4 py-4 sm:px-5 lg:col-span-3 lg:border-e lg:border-b-0">
          <PanelHeader label={data.inventoryLabel} trailing={`${data.branches}`} />
          <ul className="mt-3 space-y-2.5">
            {data.stock.slice(0, 3).map((item) => {
              const ratio = Math.min(1, item.onHand / item.capacity);
              const low = ratio <= 0.25;
              return (
                <li key={item.sku} className="grid grid-cols-[1fr_auto] items-center gap-3">
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-[12px] text-navy-100/90">{item.name}</span>
                      <span className="num shrink-0 text-[11px] text-navy-300/70">
                        {item.onHand} / {item.capacity} {item.unit}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/8">
                      <span
                        className={cn(
                          "block h-full rounded-full",
                          low ? "bg-yellow-300" : "bg-teal-400",
                        )}
                        style={{
                          width: `${Math.max(6, ratio * 100)}%`,
                          transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                    </div>
                  </div>
                  <span className="num w-14 text-right text-[11px] text-navy-300/60">
                    {item.sku}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div data-panel className="px-4 py-4 sm:px-5 lg:col-span-2">
          <PanelHeader label={data.ledgerLabel} />
          <ul className="mt-3 space-y-2">
            {ledger.slice(0, 3).map((entry) => (
              <li
                key={entry.ref}
                className="flex items-center justify-between gap-3 border-b border-dashed border-white/10 pb-1.5 last:border-b-0"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="num text-[11px] font-medium text-navy-100/90">
                    {entry.ref}
                  </span>
                  <span className="truncate text-[10px] text-navy-300/65">{entry.label}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="num text-[12px] font-medium text-white">{entry.amount}</span>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      entry.state === "posted" ? "bg-teal-400" : "bg-yellow-300",
                    )}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compliance footer */}
      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 sm:px-5">
        <span className="flex min-w-0 items-center gap-2 text-[10px] tracking-wide text-navy-300/70">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/70" />
          <span className="truncate">{data.compliance}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-[10px] text-navy-300/60">
          <span className="hidden sm:inline">{data.currency}</span>
          <svg viewBox="0 0 48 8" className="h-2 w-12 text-teal-400/60" aria-hidden="true">
            <path
              d="M0 4h44"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 4"
              className="motion-safe:animate-[zc-flow_2.4s_linear_infinite]"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

function PanelHeader({ label, trailing }: { label: string; trailing?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-[11px] font-semibold tracking-widest text-navy-200/80 uppercase">
        {label}
      </h3>
      {trailing ? (
        <span className="text-[10px] tracking-wide text-navy-300/60">{trailing}</span>
      ) : null}
    </div>
  );
}
