import Link from "next/link";
import Section from "./components/section";
import Button from "./components/button";
import ProjectCard from "./components/project-card";
import LinkContention from "./components/link-contention";
import { getProjects } from "../lib/projects";

const SKILLS = [
  {
    group: "Systems",
    items: ["Linux", "Networking", "Linux tc (HTB/SFQ)", "MikroTik RouterOS"],
  },
  {
    group: "Backend",
    items: ["Python", "Flask", "REST APIs", "OAuth 2.0", "Webhooks", "SQL"],
  },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind"] },
  { group: "Hardware", items: ["Raspberry Pi", "Edge deployment", "GSM"] },
];

export const metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex-1">
      <Section>
        <p className="font-mono text-label uppercase text-amber">
          Software engineer
        </p>
        <h1 className="mt-3 font-display text-display text-ink">
          Aaron Mulandi
        </h1>
        <p className="mt-4 text-body text-muted">
          I build systems that hold up when the infrastructure doesn&rsquo;t —
          offline-first platforms, edge deployments, and the backends behind
          them.
        </p>
        <p className="mt-3 font-mono text-label uppercase text-muted">
          Electronic &amp; Computer Engineering, JKUAT
          <span className="text-line"> · </span>
          Engineers Board of Kenya award, 2026
        </p>
        <p className="mt-6 flex flex-wrap gap-4">
          <Button href="/work/eduaccess" variant="primary">
            See the work
          </Button>
          <Button href="/contact">Get in touch</Button>
        </p>
      </Section>

      <Section>
        <h2 data-reveal className="font-display text-h2 text-ink">
          What a shared uplink does to a classroom
        </h2>
        <p data-reveal className="mt-4 text-body text-muted">
          Four devices, one link, and one of them streaming video. Without fair
          queueing the stream takes what it asks for and the payment request at
          the bottom gets nothing — so a student who just paid can&rsquo;t
          finish paying. Toggle it to see what HTB and SFQ do about that. This
          is a simulation of the scheme designed for{" "}
          <Link
            href="/work/eduaccess"
            className="text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber focus-ring"
          >
            EduAccess
          </Link>
          , not a measurement of it.
        </p>
        <div className="mt-6">
          <LinkContention />
        </div>
      </Section>

      <Section>
        <h2 data-reveal className="font-display text-h2 text-ink">Work</h2>
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
        <h2 data-reveal className="font-display text-h2 text-ink">Stack</h2>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {SKILLS.map(({ group, items }) => (
            <div key={group} data-reveal>
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
