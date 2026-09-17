import Section from "../../components/section";

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;

  return (
    <main className="flex-1">
      <Section prose>
        <h1 className="font-display text-h2 text-ink">{slug}</h1>
      </Section>
    </main>
  );
}
