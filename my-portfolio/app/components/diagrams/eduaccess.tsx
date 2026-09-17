/**
 * EduAccess topology, built from HTML rather than SVG so the labels stay real
 * text: they reflow, scale with the type tokens, and are readable at 375px
 * without a scroll container. The layout stacks on mobile and splits either
 * side of the break on wide screens.
 */

function Node({
  title,
  lines,
  accent = false,
}: {
  title: string;
  lines: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border bg-panel2 p-4 ${
        accent ? "border-amber" : "border-muted"
      }`}
    >
      <p className="text-body text-ink">{title}</p>
      {lines.map((line) => (
        <p
          key={line}
          className={`mt-1 font-mono text-label ${
            accent && line === lines[0] ? "text-amber" : "text-muted"
          }`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function ZoneLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-label uppercase text-muted">{children}</p>
  );
}

export default function EduAccessDiagram() {
  return (
    <figure className="mt-10">
      <div className="rounded-lg border border-line bg-panel p-4 sm:p-6">
        {/* What crosses the break, and how */}
        <div className="rounded-lg border border-amber/60 bg-panel2 p-4">
          <p className="font-mono text-label uppercase text-amber">
            ↑ Raspberry Pi Zero 2W · physically carried ↓
          </p>
          <p className="mt-1 font-mono text-label text-muted">
            content and packages out · student progress back
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          {/* Connected side */}
          <div className="flex flex-col gap-4">
            <ZoneLabel>Connected</ZoneLabel>
            <Node title="Cloud VPS" lines={["payment callbacks", "sync origin"]} />
            <Node title="M-Pesa · Safaricom" lines={["STK push · callback"]} />
          </div>

          {/* The break */}
          <div className="flex items-center gap-4 lg:flex-col">
            <span className="h-px w-full bg-line lg:h-full lg:w-px" />
            <span className="shrink-0 whitespace-nowrap font-mono text-label uppercase text-alert lg:[writing-mode:vertical-rl]">
              no broadband link
            </span>
            <span className="h-px w-full bg-line lg:h-full lg:w-px" />
          </div>

          {/* The school */}
          <div className="flex flex-col gap-4">
            <ZoneLabel>The school — no dependable uplink</ZoneLabel>
            <Node
              title="Edge server · Ubuntu"
              lines={["Kolibri LMS", "Flask captive portal"]}
            />
            <Node
              title="MikroTik router"
              accent
              lines={["enforcement point", "firewall · IP bindings"]}
            />
            <Node
              title="Student devices"
              lines={["shared uplink · HTB + SFQ"]}
            />
          </div>
        </div>

        {/* The only thing that crosses over the air */}
        <p className="mt-6 rounded-lg border border-line bg-panel2 p-4 font-mono text-label text-muted">
          <span className="uppercase text-ink">Over the air:</span> payment
          traffic only — narrowband, and the sole reason the school needs any
          signal at all.
        </p>
      </div>

      <figcaption className="mt-4 font-mono text-label uppercase text-muted">
        Fig. 1 — the break is the design. Content crosses it physically; only
        payments cross it over the air.
      </figcaption>
    </figure>
  );
}
