import Link from "next/link";

/**
 * Contents for long case studies. Rendered only when a page has enough
 * sections to be worth navigating — a two-item list is noise, not navigation.
 */
const MIN_SECTIONS = 4;

export default function TableOfContents({
  headings,
}: {
  headings: { text: string; slug: string }[];
}) {
  if (headings.length < MIN_SECTIONS) return null;

  return (
    <nav
      aria-labelledby="toc-heading"
      className="mt-10 rounded-lg border border-line bg-panel p-4 sm:p-6"
    >
      <h2 id="toc-heading" className="font-mono text-label uppercase text-muted">
        Contents
      </h2>
      <ol className="mt-4 flex flex-col gap-2">
        {headings.map((h, i) => (
          <li key={h.slug} className="flex gap-3 text-body">
            <span
              aria-hidden="true"
              className="font-mono text-label text-muted tabular-nums"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              href={`#${h.slug}`}
              className="text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber focus-ring"
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
