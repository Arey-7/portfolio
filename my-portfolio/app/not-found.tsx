import Link from "next/link";
import Section from "./components/section";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="flex-1">
      <Section>
        <p className="font-mono text-label uppercase text-amber">Error 404</p>
        <h1 className="mt-4 font-display text-h2 text-ink">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mt-6 text-body text-muted">
          The link is wrong, or the page moved. Neither is your fault.
        </p>
        <p className="mt-10 flex flex-wrap gap-6 font-mono text-label uppercase">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
          >
            The work
          </Link>
        </p>
      </Section>
    </main>
  );
}
