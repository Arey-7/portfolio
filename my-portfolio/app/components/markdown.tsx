import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Markdown rendered straight to React elements — no dangerouslySetInnerHTML,
 * and every element mapped onto a design token so prose can't drift away from
 * the rest of the site.
 */
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-16 font-display text-h2 text-ink first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 font-display text-h3 text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-6 text-body text-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-6 flex list-disc flex-col gap-4 pl-6 text-body text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 flex list-decimal flex-col gap-4 pl-6 text-body text-muted">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="text-ink">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded border border-line bg-panel px-1 py-0.5 font-mono text-label text-ink">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-lg border border-line bg-panel p-4 font-mono text-label text-ink">
      {children}
    </pre>
  ),
  hr: () => <hr className="mt-16 border-line" />,
  // Tables can exceed the measure, so each gets its own scroll container.
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-body text-muted">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-line px-3 py-2 text-left font-mono text-label uppercase text-amber">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line px-3 py-2 align-top">{children}</td>
  ),
};

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
