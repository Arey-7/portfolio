/**
 * Heading id generator. Shared by the markdown renderer and the table of
 * contents so the anchors they produce can never drift apart — if these were
 * two implementations, one would eventually change and the links would 404
 * silently.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[‘’'’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
