import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
