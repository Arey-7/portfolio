import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Constrain to the prose measure (66ch) instead of the full shell. */
  prose?: boolean;
  className?: string;
};

/**
 * A content block. Owns the shell width and the vertical rhythm between
 * major sections, so pages never set their own gutters.
 */
export default function Section({
  children,
  prose = false,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`mx-auto w-full px-5 py-16 sm:px-8 lg:px-12 lg:py-24 ${
        prose ? "max-w-prose" : "max-w-shell"
      } ${className}`}
    >
      {children}
    </section>
  );
}
