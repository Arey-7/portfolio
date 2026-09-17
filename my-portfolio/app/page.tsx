import Link from "next/link";
import Section from "./components/section";

export default function Home() {
  return (
    <main className="flex-1">
      <Section>
        <p className="font-mono text-label uppercase text-amber">
          Software engineer
        </p>
        <h1 className="mt-4 font-display text-display text-ink">
          Aaron Mulandi
        </h1>
        <p className="mt-6 max-w-prose text-body text-muted">
          I build systems that hold up when the infrastructure doesn’t —
          offline-first platforms, edge deployments, and the backends behind
          them.
        </p>
        <p className="mt-10">
          <Link
            href="/work/eduaccess"
            className="font-mono text-label uppercase text-link underline underline-offset-4"
          >
            See the work
          </Link>
        </p>
      </Section>
    </main>
  );
}
