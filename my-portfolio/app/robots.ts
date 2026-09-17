import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://my-portfolio-delta-sable-23.vercel.app/sitemap.xml",
  };
}
