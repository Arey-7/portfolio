/**
 * EduAccess topology. The point of the drawing is the vertical break: there is
 * no broadband link between the cloud and the school. Bulk content crosses it
 * physically, carried on a Pi; only narrowband payment traffic crosses it over
 * the air.
 */
export default function EduAccessDiagram() {
  return (
    <figure className="mt-10">
      <div className="overflow-x-auto rounded-lg border border-line bg-panel p-4 sm:p-6">
        <svg
          viewBox="0 0 900 430"
          className="h-auto w-[860px] min-w-[860px] sm:w-full sm:min-w-[760px]"
          role="img"
          aria-labelledby="eduaccess-diagram-title eduaccess-diagram-desc"
        >
          <title id="eduaccess-diagram-title">EduAccess system topology</title>
          <desc id="eduaccess-diagram-desc">
            A cloud VPS and Safaricom&rsquo;s M-Pesa service sit on the connected
            side. The school sits on the disconnected side, running an Ubuntu
            edge server with Kolibri and a Flask portal, behind a MikroTik router
            that serves student devices. No broadband link joins the two sides: a
            Raspberry Pi Zero 2W is physically carried across, moving content out
            and student progress back, while only narrowband M-Pesa payment
            traffic crosses over the air.
          </desc>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted" />
            </marker>
            <marker id="arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-amber" />
            </marker>
          </defs>

          <text x="20" y="26" className="fill-muted font-mono text-[11px] uppercase tracking-[0.16em]">Connected</text>
          <text x="470" y="26" className="fill-muted font-mono text-[11px] uppercase tracking-[0.16em]">The school — no dependable uplink</text>

          <line x1="440" y1="40" x2="440" y2="392" className="stroke-line" strokeWidth="1" strokeDasharray="4 6" />
          <text x="440" y="412" textAnchor="middle" className="fill-alert font-mono text-[11px] uppercase tracking-[0.16em]">no broadband link</text>

          <rect x="20" y="50" width="250" height="78" rx="8" className="fill-panel2 stroke-muted" strokeWidth="1" />
          <text x="36" y="80" className="fill-ink font-sans text-[15px]">Cloud VPS</text>
          <text x="36" y="102" className="fill-muted font-mono text-[11px]">payment callbacks</text>
          <text x="36" y="118" className="fill-muted font-mono text-[11px]">sync origin</text>

          <rect x="20" y="250" width="250" height="60" rx="8" className="fill-panel2 stroke-muted" strokeWidth="1" />
          <text x="36" y="278" className="fill-ink font-sans text-[15px]">M-Pesa (Safaricom)</text>
          <text x="36" y="298" className="fill-muted font-mono text-[11px]">STK push · callback</text>

          <rect x="530" y="50" width="280" height="78" rx="8" className="fill-panel2 stroke-muted" strokeWidth="1" />
          <text x="546" y="80" className="fill-ink font-sans text-[15px]">Edge server · Ubuntu</text>
          <text x="546" y="102" className="fill-muted font-mono text-[11px]">Kolibri LMS</text>
          <text x="546" y="118" className="fill-muted font-mono text-[11px]">Flask captive portal</text>

          <rect x="530" y="180" width="280" height="78" rx="8" className="fill-panel2 stroke-amber" strokeWidth="1" />
          <text x="546" y="210" className="fill-ink font-sans text-[15px]">MikroTik router</text>
          <text x="546" y="232" className="fill-amber font-mono text-[11px]">enforcement point</text>
          <text x="546" y="248" className="fill-muted font-mono text-[11px]">firewall · IP bindings</text>

          <rect x="530" y="310" width="280" height="60" rx="8" className="fill-panel2 stroke-muted" strokeWidth="1" />
          <text x="546" y="338" className="fill-ink font-sans text-[15px]">Student devices</text>
          <text x="546" y="358" className="fill-muted font-mono text-[11px]">shared uplink · HTB + SFQ</text>

          <path d="M 270 89 C 350 89, 360 20, 440 20 C 520 20, 470 89, 530 89" className="stroke-amber" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-amber)" markerStart="url(#arrow-amber)" />
          <text x="440" y="52" textAnchor="middle" className="fill-amber font-mono text-[11px] uppercase tracking-[0.16em]">Pi Zero 2W · carried</text>
          <text x="440" y="68" textAnchor="middle" className="fill-muted font-mono text-[11px]">content out · progress back</text>

          <path d="M 530 340 C 400 340, 300 330, 270 300" className="stroke-muted" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
          <path d="M 145 250 L 145 128" className="stroke-muted" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
          <text x="300" y="362" className="fill-muted font-mono text-[11px]">narrowband only</text>

          <line x1="670" y1="128" x2="670" y2="180" className="stroke-muted" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
          <line x1="670" y1="258" x2="670" y2="310" className="stroke-muted" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
        </svg>
      </div>
      <figcaption className="mt-4 font-mono text-label uppercase text-muted">
        Fig. 1 — the break is the design. Content crosses it physically; only
        payments cross it over the air.
      </figcaption>
    </figure>
  );
}
