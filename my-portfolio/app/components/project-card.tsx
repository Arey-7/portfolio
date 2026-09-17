import Link from "next/link";
import Chip from "./chip";

type ProjectCardProps = {
  href: string;
  title: string;
  summary: string;
  /** Real status, not decoration — "in-progress", "live", "shipped". */
  status: string;
  year: string | number;
  stack?: string[];
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
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-line bg-panel p-4 transition-colors hover:bg-panel2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber sm:p-6"
    >
      <div className="flex items-center gap-2 font-mono text-label uppercase">
        <span className="text-amber">
          {STATUS_LABELS[status] ?? status}
        </span>
        <span aria-hidden="true" className="text-line">
          ·
        </span>
        <span className="text-muted">{year}</span>
      </div>

      <h3 className="mt-2 font-display text-h3 text-ink group-hover:text-amber">
        {title}
      </h3>

      <p className="mt-4 max-w-prose text-body text-muted">{summary}</p>

      {stack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      )}
    </Link>
  );
}
