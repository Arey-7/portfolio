import Section from "../components/section";
import ProjectCard from "../components/project-card";
import { getProjects } from "../../lib/projects";

export const metadata = {
  alternates: { canonical: "/work" },
  title: "Work",
  description:
   "Projects by Aaron Mulandi — offline-first systems, edge infrastructure, and the backends behind them.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main className="flex-1">
      <Section>
        <h1 className="font-display text-h2 text-ink">Work</h1>
        <p className="mt-6 text-body text-muted">
          Two systems and an honest gap. Each page says what works today and
          what doesn&rsquo;t.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              className={i === 0 ? "lg:col-span-2" : ""}
              href={`/work/${project.slug}`}
              title={project.title}
              summary={project.summary}
              status={project.status}
              year={project.year}
              stack={project.stack}
              headingLevel={2}
            />
          ))}
          <ProjectCard
            title="A third project"
            summary="In progress. It will appear here when there is something real to read, rather than a placeholder dressed up as a result."
            status="in-progress"
            year="2026"
            headingLevel={2}
          />
        </div>
      </Section>
    </main>
  );
}
