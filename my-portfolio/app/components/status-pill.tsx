/**
 * Project status — real information, not decoration. This replaces the
 * "01 / 02 / 03" numbering most portfolios use and actually tells the reader
 * something. The label map lives here only; it was duplicated in the card and
 * the project page, so adding a status meant editing two files.
 */
const STATUS_LABELS: Record<string, string> = {
  "in-progress": "In development",
  live: "Live",
  shipped: "Shipped",
};

export function statusLabel(status: string) {
  return STATUS_LABELS[status] ?? status;
}

export default function StatusPill({
  status,
  year,
  /** A pulsing dot reads as a live readout; omit it where that's too loud. */
  pulse = false,
}: {
  status: string;
  year: string | number;
  pulse?: boolean;
}) {
  return (
    <p className="flex flex-wrap items-center gap-2 font-mono text-label uppercase">
      <span className="flex items-center gap-2 text-amber">
        {pulse && (
          <span
            aria-hidden="true"
            className="size-1.5 animate-pulse rounded-full bg-amber"
          />
        )}
        {statusLabel(status)}
      </span>
      <span aria-hidden="true" className="text-line">
        ·
      </span>
      <span className="text-muted">{year}</span>
    </p>
  );
}
