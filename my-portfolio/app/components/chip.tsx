import type { ReactNode } from "react";

/**
 * Stack metadata. Mono, outlined, muted — never coloured, because a chip
 * is information about the project, not emphasis within it.
 */
export default function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2 py-1 font-mono text-label uppercase text-muted">
      {children}
    </span>
  );
}
