import Link from "next/link";
import Chip from "./chip";

type ProjectCardProps = {
  /** Omit for a placeholder card — it renders as a plain block, not a link. */
  href?: string;
  title: string;
  summary: string;
  /** Real status, not decoration — "in-progress", "live", "shipped". */
  status: string;
  year: string | number;
  stack?: string[];
  /** Heading level is contextual, not a property of the card: under an <h2>
   *  section it must be h3; as the top-level list on /work it must be h2. */
  headingLevel?: 2 | 3;
  className?: string;
};

const STATUS_LABELS: Record<string, string> = {
 "in-progress": "In development",
  live: "Live",
  shipped: "Shipped",
};

export default function ProjectCard({
  href,
  title,
  summary,
  status,
  year,
  stack = [],
  headingLevel = 3,
  className: extra = "",
}: ProjectCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const className =
   "group relative block overflow-hidden rounded-lg border border-muted bg-panel p-4 sm:p-6";
  const interactive =
   " transition-[transform,background-color,border-color] duration-180 hover:-translate-y-0.5 hover:border-amber hover:bg-panel2 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link";

  const inner = (
    <>
      {/* Instrument detail: an amber edge that runs on hover, like a channel
          coming live on a meter. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-amber transition-transform duration-180 group-hover:scale-x-100"
      />

      <div className="flex items-center gap-2 font-mono text-label uppercase">
        <span className="flex items-center gap-2 text-amber">
          <span
            aria-hidden="true"
            className="size-1.5 animate-pulse rounded-full bg-amber"
          />
          {STATUS_LABELS[status] ?? status}
        </span>
        <span aria-hidden="true" className="text-line">
          ·
        </span>
        <span className="text-muted">{year}</span>
      </div>

      <hr className="mt-4 border-line" />

      <Heading className="mt-4 font-display text-h3 text-ink transition-colors duration-180 group-hover:text-amber">
        {title}
      </Heading>

      <p className="mt-4 text-body text-muted">{summary}</p>

      {stack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      )}
    </>
  );

  return href ? (
    <Link
      href={href}
      data-reveal
      className={`${className}${interactive} ${extra}`}
    >
      {inner}
    </Link>
  ) : (
    <div data-reveal className={`${className} ${extra}`}>
      {inner}
    </div>
  );
}
