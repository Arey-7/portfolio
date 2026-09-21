import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Two variants only, per the design doc: solid amber for the single primary
 * action in a view, outlined for everything else. No third variant.
 *
 * Renders a Link when given an href, a <button> otherwise, so call sites don't
 * re-derive the styling for each case.
 */
type Variant = "primary" | "secondary";

const BASE =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 font-mono text-label uppercase transition-colors duration-180 focus-ring";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-amber text-ground",
  secondary: "border border-muted text-ink hover:border-amber hover:text-amber",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export default function Button({
  children,
  variant = "secondary",
  className = "",
  href,
  ...rest
}: CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: string }) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
