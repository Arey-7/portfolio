import { stat } from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getProjects } from "../lib/projects";
import { SITE_URL as BASE } from "../lib/site";

/** Real mtime of the content file, so lastModified isn't a fabricated date. */
async function contentModified(slug: string): Promise<Date | undefined> {
  try {
    return (await stat(path.join(process.cwd(), "content", `${slug}.md`))).mtime;
  } catch {
    return undefined;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectEntries = await Promise.all(
    projects.map(async (p) => ({
      // Trailing-slash-free paths are fine; the root must carry its "/".
      url: `${BASE}/work/${p.slug}`,
      lastModified: await contentModified(p.slug),
    })),
  );

  return [
    { url: `${BASE}/` },
    { url: `${BASE}/work` },
    { url: `${BASE}/about`, lastModified: await contentModified("about") },
    { url: `${BASE}/contact`, lastModified: await contentModified("contact") },
    ...projectEntries,
  ];
}
