import { LINKS, SITE, type IconName } from "../content/site";
import { Icon } from "./Icons";
import { Acronym } from "./Header";
import { Container } from "./ui";

/**
 * The two link columns, named by icon so they follow whatever LINKS holds.
 * Email is appended because it is a mailto rather than a profile.
 */
const COLUMN_ONE: IconName[] = ["scholar", "orcid", "github"];
const COLUMN_TWO: IconName[] = ["tea", "bluesky"];

function LinkColumn({ icons, withEmail = false }: { icons: IconName[]; withEmail?: boolean }) {
  const items = icons
    .map((icon) => LINKS.find((l) => l.icon === icon))
    .filter((l): l is (typeof LINKS)[number] => Boolean(l));

  return (
    <ul className="space-y-2.5">
      {items.map((l) => (
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
      {withEmail && (
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
      )}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink">
      <div className="brand-gradient absolute inset-x-0 top-0 h-[2px] opacity-60" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            {/* matches the header wordmark exactly */}
            <div className="flex items-baseline gap-2.5">
              <span className="brand-text font-display text-2xl font-bold tracking-tight">
                PEACE
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-cyan">
                Lab
              </span>
            </div>
            <p className="mt-2.5 max-w-sm text-[11px] font-medium leading-tight tracking-wide text-white">
              <Acronym />
            </p>

            <p className="mt-5 text-sm leading-relaxed text-neutral-500">
              {SITE.institution}
              <br />
              {SITE.university}, {SITE.city}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 inline-block text-sm text-neutral-400 transition hover:text-gold"
            >
              {SITE.email}
            </a>
          </div>

          <div className="md:pt-1">
            <LinkColumn icons={COLUMN_ONE} />
          </div>

          <div className="md:pt-1">
            <LinkColumn icons={COLUMN_TWO} withEmail />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} PEACE Lab · Patrice Pottier · {SITE.university}
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
