import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <p className="font-mono text-sm uppercase tracking-widest">
        Software engineer
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Aaron Mulandi
      </h1>
      <p className="mt-6 max-w-xl text-lg">
        I build systems that hold up when the infrastructure doesn’t —
        offline-first platforms, edge deployments, and the backends behind them.
      </p>
      <p className="mt-10">
        <Link href="/work/eduaccess">See the work</Link>
      </p>
    </main>
  );
}
