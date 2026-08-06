import { Link } from "react-router-dom";
import { LINKS, SITE } from "../content/site";
import { Icon } from "./Icons";
import { Container } from "./ui";

const PAGES = [
  { to: "/", label: "Home" },
  { to: "/research", label: "Research" },
  { to: "/people", label: "People" },
  { to: "/publications", label: "Publications" },
  { to: "/outreach", label: "Outreach" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink">
      <div className="brand-gradient absolute inset-x-0 top-0 h-[2px] opacity-60" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-bold text-gold">PEACE</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-400">
                Lab
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
              {SITE.expansion}
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              {SITE.institution}
              <br />
              {SITE.university}, {SITE.city}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Pages
            </h3>
            <ul className="space-y-2.5">
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="text-sm text-neutral-300 transition hover:text-gold"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Elsewhere
            </h3>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-neutral-300 transition hover:text-gold"
                  >
                    <span className="text-neutral-500 transition group-hover:text-gold">
                      <Icon name={l.icon} size={16} />
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2.5 text-sm text-neutral-300 transition hover:text-gold"
                >
                  <span className="text-neutral-500 transition group-hover:text-gold">
                    <Icon name="mail" size={16} />
                  </span>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} PEACE Lab · Patrice Pottier ·{" "}
            {SITE.university}
          </p>
          <p>
            Publications and collaborators update automatically from{" "}
            <a
              href="https://openalex.org/"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 underline decoration-neutral-700 underline-offset-2 transition hover:text-gold"
            >
              OpenAlex
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
