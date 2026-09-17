import { notFound } from "next/navigation";
import Section from "../components/section";
import Markdown from "../components/markdown";
import { getPage } from "../../lib/projects";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Aaron Mulandi — email, LinkedIn and GitHub. Based in New Jersey, authorized to work in the US.",
};

const CHANNELS = [
  {
    label: "Email",
    value: "aaronmulandi@gmail.com",
    href: "mailto:aaronmulandi@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aaron-mulandi",
    href: "https://linkedin.com/in/aaron-mulandi",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/Arey-7",
    href: "https://github.com/Arey-7",
    external: true,
  },
];

export default async function ContactPage() {
  const body = await getPage("contact");
  if (!body) notFound();

  return (
    <main className="flex-1">
      <Section prose>
        <h1 className="font-display text-h2 text-ink">Contact</h1>

        <div className="mt-10">
          <Markdown>{body}</Markdown>
        </div>

        <dl className="mt-16 flex flex-col border-t border-line">
          {CHANNELS.map(({ label, value, href, external }) => (
            <div
              key={label}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line py-6"
            >
              <dt className="w-24 shrink-0 font-mono text-label uppercase text-muted">
                {label}
              </dt>
              <dd>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 items-center text-body text-link underline underline-offset-4 transition-colors duration-180 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
                >
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </main>
  );
}
