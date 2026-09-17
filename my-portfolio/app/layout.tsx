import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import Link from "next/link";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Ar3y — Aaron Mulandi, Software Engineer";
const description =
  "Aaron Mulandi builds software for places the network doesn't reach — offline-first platforms, edge infrastructure, and the systems that keep them running.";

// Swap to https://aaronmulandi.com once the domain is pointed at Vercel.
const siteUrl = "https://my-portfolio-delta-sable-23.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Aaron Mulandi",
  },
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Ar3y",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="mx-auto flex w-full max-w-shell gap-6 px-5 py-6 font-mono text-label uppercase text-muted sm:px-8 lg:px-12">
          <Link href="/">Home</Link>
          <Link href="/work/eduaccess">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {children}
        <footer className="mx-auto flex w-full max-w-shell flex-wrap gap-6 border-t border-line px-5 py-10 font-mono text-label uppercase text-muted sm:px-8 lg:px-12">
          <a
            href="mailto:aaronmulandi@gmail.com"
            className="transition-colors duration-180 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
          >
            Email
          </a>
          <a
            href="https://github.com/Arey-7"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-180 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/aaron-mulandi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-180 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
          >
            LinkedIn
          </a>
        </footer>
      </body>
    </html>
  );
}
