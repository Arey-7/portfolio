import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "../../components/section";
import Chip from "../../components/chip";
import Markdown from "../../components/markdown";
import { getProject, getProjects } from "../../../lib/projects";

const STATUS_LABELS: Record<string, string> = {
  "in-progress": "In development",
  live: "Live",
  shipped: "Shipped",
};

/** One static page per content file — no route list to maintain. */
export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main className="flex-1">
      <Section prose>
        <p className="flex flex-wrap items-center gap-2 font-mono text-label uppercase">
          <span className="text-amber">
            {STATUS_LABELS[project.status] ?? project.status}
          </span>
          <span aria-hidden="true" className="text-line">
            ·
          </span>
          <span className="text-muted">{project.year}</span>
        </p>

        <h1 className="mt-4 font-display text-h2 text-ink">{project.title}</h1>
        <p className="mt-6 text-body text-muted">{project.summary}</p>

        {project.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        )}

        {project.metrics.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-mono text-label uppercase text-muted">
                  {metric.label}
                </dt>
                <dd className="mt-1 font-display text-h3 text-ink tabular-nums">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {(project.repo || project.demo) && (
          <p className="mt-10 flex flex-wrap gap-6 font-mono text-label uppercase">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber"
              >
                Repository
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber"
              >
                Live demo
              </a>
            )}
          </p>
        )}

        <div className="mt-16">
          <Markdown>{project.body}</Markdown>
        </div>

        <nav
          aria-label="Projects"
          className="mt-16 flex justify-between gap-6 border-t border-line pt-6 font-mono text-label uppercase"
        >
          {previous ? (
            <Link
              href={`/work/${previous.slug}`}
              className="text-muted transition-colors duration-180 hover:text-amber"
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="text-right text-muted transition-colors duration-180 hover:text-amber"
            >
              {next.title} →
            </Link>
          )}
        </nav>
      </Section>
    </main>
  );
}
