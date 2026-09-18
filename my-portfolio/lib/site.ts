/**
 * Single source of truth for the site's public origin.
 *
 * It feeds metadataBase, the Open Graph image URL, the sitemap and robots.txt.
 * Set NEXT_PUBLIC_SITE_URL in the Vercel project to override without a deploy;
 * the fallback is the generated Vercel domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ar3y.tech"
).replace(/\/$/, "");
