"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Signature element: what a shared uplink does to four clients when one of
 * them is greedy, with and without fair queueing.
 *
 * This is a simulation of the HTB + SFQ scheme designed for EduAccess, not a
 * measurement of it. The numbers are computed from the model below, in the
 * browser — they are a demonstration of the mechanism, not a published result.
 */

const CLIENTS = [
  { name: "client 1", label: "video lesson", demand: 0.92 },
  { name: "client 2", label: "reading", demand: 0.18 },
  { name: "client 3", label: "quiz submit", demand: 0.12 },
  { name: "client 4", label: "payment", demand: 0.08 },
] as const;

const LERP = 0.12;

/** Unshaped: demand wins. The greedy flow takes what it asks for first. */
function unshaped() {
  let left = 1;
  return CLIENTS.map((c) => {
    const got = Math.min(c.demand, left);
    left -= got;
    return got;
  });
}

/** Shaped: each class is capped, and unused headroom is shared out. */
function shaped() {
  const caps = [0.4, 0.2, 0.2, 0.2];
  const got = CLIENTS.map((c, i) => Math.min(c.demand, caps[i]));
  const spare = 1 - got.reduce((a, b) => a + b, 0);
  const hungry = CLIENTS.map((c, i) => c.demand > got[i]);
  const share = spare / Math.max(hungry.filter(Boolean).length, 1);
  return got.map((g, i) => (hungry[i] ? g + share : g));
}

/**
 * Jain's Fairness Index, computed over how *satisfied* each client is
 * (allocated / demanded) rather than raw throughput.
 *
 * Raw throughput is the wrong measure when demands differ: a client that only
 * wants 8% of the link would drag the index down for being small, even though
 * it got everything it asked for. Satisfaction asks the question that matters —
 * did each flow get its share of what it needed?
 *
 * 1.0 means everyone is equally served; 1/n means one flow took everything.
 */
function jain(allocated: number[]) {
  const ratios = allocated.map((got, i) => got / CLIENTS[i].demand);
  const sum = ratios.reduce((a, b) => a + b, 0);
  const sumSq = ratios.reduce((a, b) => a + b * b, 0);
  return sumSq === 0 ? 1 : (sum * sum) / (ratios.length * sumSq);
}

export default function LinkContention() {
  const [isShaped, setIsShaped] = useState(false);
  const [bars, setBars] = useState<number[]>(() => unshaped());
  const values = useRef<number[]>(unshaped());
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const target = isShaped ? shaped() : unshaped();

    // Reduced motion snaps: a lerp factor of 1 reaches the target in one frame,
    // so the same code path serves both cases.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const factor = reduced ? 1 : LERP;

    const tick = () => {
      const next = values.current.map((v, i) => v + (target[i] - v) * factor);
      const settled = next.every((v, i) => Math.abs(target[i] - v) < 0.001);

      values.current = settled ? target : next;
      setBars(values.current);

      if (!settled) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [isShaped]);

  const index = jain(bars);
  const starved = bars.some((b) => b < 0.05);

  return (
    <figure className="rounded-lg border border-line bg-panel p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-label uppercase text-muted">
          Link contention — one shared uplink
        </span>
        <button
          type="button"
          onClick={() => setIsShaped((v) => !v)}
          aria-pressed={isShaped}
          className="min-h-11 rounded-full border border-muted px-4 font-mono text-label uppercase text-ink transition-colors duration-180 hover:border-amber hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
        >
          {isShaped ? "Fair queueing: on" : "Fair queueing: off"}
        </button>
      </figcaption>

      <ul className="mt-6 flex flex-col gap-4">
        {CLIENTS.map((client, i) => (
          <li key={client.name} className="flex items-center gap-4">
            <span className="w-24 shrink-0 font-mono text-label uppercase text-muted">
              {client.label}
            </span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-panel2">
              <span
                className={`block h-full rounded-full ${
                  bars[i] < 0.05 ? "bg-alert" : "bg-amber"
                }`}
                style={{ width: `${Math.max(bars[i] * 100, 0.5)}%` }}
              />
            </span>
            <span className="w-12 shrink-0 text-right font-mono text-label text-muted tabular-nums">
              {Math.round(bars[i] * 100)}%
            </span>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="mt-6 font-mono text-label text-muted">
        <span className="uppercase">Jain&rsquo;s fairness index (simulated) </span>
        <span className="text-ink tabular-nums">{index.toFixed(2)}</span>
        <span className="text-line"> · </span>
        {starved
          ? "one flow is starving the rest"
          : "every client gets a usable share"}
      </p>
    </figure>
  );
}
