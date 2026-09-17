import Link from "next/link";
import Section from "./components/section";
import ProjectCard from "./components/project-card";
import LinkContention from "./components/link-contention";
import { getProjects } from "../lib/projects";

const SKILLS = [
  {
    group: "Systems",
    items: ["Linux", "Networking", "Linux tc (HTB/SFQ)", "MikroTik RouterOS"],
  },
  { group: "Backend", items: ["Python", "Flask", "REST APIs", "SQL"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind"] },
  { group: "Hardware", items: ["Raspberry Pi", "Edge deployment", "GSM"] },
];

export default async function Home() {
  const projects = await getProjects();

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
          I build systems that hold up when the infrastructure doesn&rsquo;t —
          offline-first platforms, edge deployments, and the backends behind
          them.
        </p>
        <p className="mt-4 font-mono text-label uppercase text-muted">
          Electronic &amp; Computer Engineering, JKUAT
          <span className="text-line"> · </span>
          Engineers Board of Kenya award, 2026
        </p>
        <p className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work/eduaccess"
            className="min-h-11 rounded-full bg-amber px-6 py-3 font-mono text-label uppercase text-ground transition-colors duration-180 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
          >
            See the work
          </Link>
          <Link
            href="/contact"
            className="min-h-11 rounded-full border border-line px-6 py-3 font-mono text-label uppercase text-ink transition-colors duration-180 hover:border-amber hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
          >
            Get in touch
          </Link>
        </p>
      </Section>

      <Section>
        <LinkContention />
      </Section>

      <Section>
        <h2 className="font-display text-h2 text-ink">Work</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              href={`/work/${project.slug}`}
              title={project.title}
              summary={project.summary}
              status={project.status}
              year={project.year}
              stack={project.stack}
            />
          ))}
          <ProjectCard
            title="A third project"
            summary="In progress. It will appear here when there is something real to read, rather than a placeholder dressed up as a result."
            status="in-progress"
            year="2026"
          />
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-h2 text-ink">Stack</h2>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {SKILLS.map(({ group, items }) => (
            <div key={group}>
              <dt className="font-mono text-label uppercase text-amber">
                {group}
              </dt>
              <dd className="mt-2 text-body text-muted">{items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </main>
  );
}
