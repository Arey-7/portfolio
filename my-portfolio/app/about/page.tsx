import { notFound } from "next/navigation";
import Section from "../components/section";
import Markdown from "../components/markdown";
import { getPage } from "../../lib/projects";

export const metadata = {
  title: "About",
  description:
    "Aaron Mulandi — final-year Electronic and Computer Engineering student at JKUAT, based in New Jersey, building offline-first systems for unreliable infrastructure.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const body = await getPage("about");
  if (!body) notFound();

  return (
    <main className="flex-1">
      <Section>
        <h1 className="font-display text-h2 text-ink">About</h1>
        <div className="mt-10">
          <Markdown>{body}</Markdown>
        </div>
      </Section>
    </main>
  );
}
