import type { MetadataRoute } from "next";
import { getProjects } from "../lib/projects";
import { SITE_URL as BASE } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/work`, priority: 0.8 },
    { url: `${BASE}/about`, priority: 0.6 },
    { url: `${BASE}/contact`, priority: 0.6 },
    ...projects.map((p) => ({ url: `${BASE}/work/${p.slug}`, priority: 0.7 })),
  ];
}
