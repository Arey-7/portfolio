import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="mx-auto flex w-full max-w-3xl gap-6 px-6 py-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/work/eduaccess">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {children}
        <footer className="mx-auto flex w-full max-w-3xl gap-6 px-6 py-12 text-sm">
          <a
            href="https://github.com/Arey-7"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link href="/contact">Contact</Link>
          {/* TODO: LinkedIn and résumé links — Milestone 7 */}
        </footer>
      </body>
    </html>
  );
}
