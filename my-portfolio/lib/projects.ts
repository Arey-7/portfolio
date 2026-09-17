import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type Project = {
  slug: string;
  title: string;
  status: string;
  year: string;
  summary: string;
  stack: string[];
  /** Optional "value|label" pairs for the metrics row. Omitted when there is
   *  nothing measured to show — an empty row beats an invented number. */
  metrics: { value: string; label: string }[];
  repo?: string;
  demo?: string;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Minimal frontmatter reader. Handles `key: value` and `key: [a, b, c]`,
 * which is all our content uses. It deliberately does not implement YAML —
 * nested structures, block scalars and quoted colons are not supported. If
 * the content ever needs those, reach for a real parser instead of growing
 * this one.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim();
    data[key] = value.startsWith("[")
      ? value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : value;
  }
  return { data, body: raw.slice(match[0].length) };
}

const str = (v: string | string[] | undefined, fallback = "") =>
  typeof v === "string" ? v : fallback;

/** Every content file carrying a `status` is a project; About is not. */
export async function getProjects(): Promise<Project[]> {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));

  const projects = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(CONTENT_DIR, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      if (!data.status) return null;

      const project: Project = {
        slug: file.replace(/\.md$/, ""),
        title: str(data.title, file),
        status: str(data.status),
        year: str(data.year),
        summary: str(data.summary),
        stack: Array.isArray(data.stack) ? data.stack : [],
        metrics: (Array.isArray(data.metrics) ? data.metrics : [])
          .map((m) => {
            const [value, ...rest] = m.split("|");
            return { value: value.trim(), label: rest.join("|").trim() };
          })
          .filter((m) => m.value && m.label),
        repo: str(data.repo) || undefined,
        demo: str(data.demo) || undefined,
        body,
      };
      return project;
    }),
  );

  return projects
    .filter((p): p is Project => p !== null)
    .sort((a, b) => b.year.localeCompare(a.year));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

/** Body text of a content file that isn't a project — the About page. */
export async function getPage(slug: string): Promise<string | null> {
  try {
    const raw = await readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
    return parseFrontmatter(raw).body;
  } catch {
    return null;
  }
}
