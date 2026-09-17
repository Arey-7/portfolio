import Section from "../components/section";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="flex-1">
      <Section prose>
        <h1 className="font-display text-h2 text-ink">About</h1>
      </Section>
    </main>
  );
}
