import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A content block. Owns the shell width and the vertical rhythm between major
 * sections, so pages never set their own gutters. Every page uses the same
 * shell so headings line up with the nav and footer above and below them;
 * running text is constrained to the prose measure by the page, not here.
 */
export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section
      className={`mx-auto w-full max-w-shell px-5 py-16 sm:px-8 lg:px-12 lg:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
