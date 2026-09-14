export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{slug}</h1>
    </main>
  );
}
