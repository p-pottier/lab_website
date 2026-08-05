import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LINKS } from "../content/site";
import { usePublications, useMetrics, type Publication } from "../lib/useData";
import {
  Chip,
  Container,
  GhostButton,
  PageHero,
  Reveal,
  SectionHeading,
  StatTile,
} from "../components/ui";
import { Icon } from "../components/Icons";

const KIND_LABEL: Record<string, string> = {
  all: "All",
  article: "Journal articles",
  preprint: "Preprints",
  software: "Software & data",
  chapter: "Chapters",
};

const KIND_COLOUR: Record<string, string> = {
  article: "#FAD103",
  preprint: "#02B8A6",
  software: "#FA6A03",
  chapter: "#B55EA8",
  other: "#6B7280",
};

type SortKey = "year" | "citations";

/* ------------------------------------------------------------ author line */

/** Renders the author list, marking the PI so a reader can find him quickly. */
function Authors({ pub }: { pub: Publication }) {
  const MAX = 12;
  const shown = pub.authors.slice(0, MAX);
  const hidden = pub.authors.length - shown.length;

  return (
    <p className="text-sm leading-relaxed text-neutral-400">
      {shown.map((a, i) => (
        <span key={`${a.name}-${i}`}>
          <span className={a.isSelf ? "font-semibold text-gold" : undefined}>{a.name}</span>
          {i < shown.length - 1 ? ", " : ""}
        </span>
      ))}
      {hidden > 0 && <span className="text-neutral-500"> … and {hidden} more</span>}
    </p>
  );
}

/* ------------------------------------------------------------------- card */

function PubCard({ pub, rank }: { pub: Publication; rank: number }) {
  const [open, setOpen] = useState(false);
  const colour = KIND_COLOUR[pub.kind] ?? "#6B7280";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(rank, 8) * 0.03 }}
      className="card p-5 sm:p-6"
      style={{ borderColor: `${colour}22` }}
    >
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* citation gutter */}
        <div className="flex shrink-0 flex-row items-center gap-4 sm:w-[86px] sm:flex-col sm:items-start sm:gap-3">
          <div className="text-left">
            <div className="font-display text-2xl font-bold leading-none" style={{ color: colour }}>
              {pub.citations}
            </div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
              {pub.citations === 1 ? "citation" : "citations"}
            </div>
          </div>
          {pub.altmetric && pub.altmetric.score > 0 && (
            <div className="text-left">
              <div className="font-display text-lg font-bold leading-none text-neutral-300">
                {pub.altmetric.score}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                attention
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <Chip color={colour}>{pub.kind === "software" ? "Software / data" : pub.kind}</Chip>
            {pub.year && <span className="text-xs text-neutral-500">{pub.year}</span>}
            {pub.isOA && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan">
                Open access
              </span>
            )}
          </div>

          <h3 className="font-display text-[17px] font-semibold leading-snug text-white sm:text-lg">
            {pub.url ? (
              <a
                href={pub.url}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-gold"
              >
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </h3>

          <div className="mt-2">
            <Authors pub={pub} />
          </div>

          {pub.journal && (
            <p className="mt-2 text-sm italic text-neutral-500">
              {pub.journal}
              {pub.volume ? `, ${pub.volume}` : ""}
              {pub.issue ? `(${pub.issue})` : ""}
              {pub.pages ? `, ${pub.pages}` : ""}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {pub.url && (
              <a
                href={pub.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gold transition hover:text-white"
              >
                {pub.doi ? "DOI" : "Link"}
              </a>
            )}
            {pub.oaUrl && (
              <a
                href={pub.oaUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-cyan transition hover:text-white"
              >
                Full text
              </a>
            )}
            {pub.preprintUrl && (
              <a
                href={pub.preprintUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-neutral-400 transition hover:text-white"
              >
                Preprint
              </a>
            )}
            {pub.abstract && (
              <button
                onClick={() => setOpen((v) => !v)}
                className="font-medium text-neutral-400 transition hover:text-white"
              >
                {open ? "Hide abstract" : "Abstract"}
              </button>
            )}
          </div>

          {open && pub.abstract && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-neutral-400"
            >
              {pub.abstract}
            </motion.p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------- citations chart */

function CitationChart({ data }: { data: { year: number; cited_by_count: number }[] }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.cited_by_count), 1);
  const thisYear = new Date().getFullYear();

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            Citations received per year
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Source: OpenAlex. {thisYear} runs to date, so its bar is incomplete.
          </p>
        </div>
        <span className="text-xs text-neutral-500">
          peak {max.toLocaleString("en-GB")} in {data.find((d) => d.cited_by_count === max)?.year}
        </span>
      </div>

      {/* The bar track needs an explicit height: percentage heights resolve
          against it, so the row of year labels sits outside the track. */}
      <div className="mt-6 flex h-44 items-end gap-2 sm:gap-3">
        {data.map((d, i) => (
          <div key={d.year} className="group relative flex h-full flex-1 items-end">
            <span className="pointer-events-none absolute inset-x-0 -top-1 text-center text-[11px] font-semibold text-neutral-400 opacity-0 transition group-hover:opacity-100">
              {d.cited_by_count.toLocaleString("en-GB")}
            </span>
            <motion.div
              className={`brand-gradient w-full rounded-t-md transition group-hover:opacity-100 ${
                d.year === thisYear ? "opacity-50" : "opacity-85"
              }`}
              initial={{ height: 0 }}
              whileInView={{ height: `${Math.max((d.cited_by_count / max) * 100, 1.5)}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex gap-2 sm:gap-3">
        {data.map((d) => (
          <span
            key={d.year}
            className={`flex-1 text-center text-[11px] ${
              d.year === thisYear ? "text-neutral-600" : "text-neutral-500"
            }`}
          >
            {d.year}
            {d.year === thisYear ? "*" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- page */

export default function Publications() {
  const data = usePublications();
  const metrics = useMetrics();
  const [kind, setKind] = useState("all");
  const [sort, setSort] = useState<SortKey>("year");
  const [query, setQuery] = useState("");

  const pubs = data?.publications ?? [];

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: pubs.length };
    for (const p of pubs) c[p.kind] = (c[p.kind] ?? 0) + 1;
    return c;
  }, [pubs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pubs
      .filter((p) => kind === "all" || p.kind === kind)
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.authorLine.toLowerCase().includes(q) ||
          (p.journal ?? "").toLowerCase().includes(q)
      )
      .sort((a, b) =>
        sort === "citations"
          ? b.citations - a.citations
          : (b.year ?? 0) - (a.year ?? 0) || b.citations - a.citations
      );
  }, [pubs, kind, sort, query]);

  const grouped = useMemo(() => {
    if (sort !== "year") return null;
    const map = new Map<number, Publication[]>();
    for (const p of filtered) {
      const y = p.year ?? 0;
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(p);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered, sort]);

  const scholar = LINKS.find((l) => l.icon === "scholar");
  const orcid = LINKS.find((l) => l.icon === "orcid");

  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Everything we have published"
        lead="This list is generated from OpenAlex and refreshes every night, so it never falls behind. Citation counts come from the same source."
        image="/images/research-synthesis.jpg"
      />

      <Container className="py-16">
        {/* metrics */}
        {metrics && (
          <Reveal>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatTile value={metrics.works} label="Publications" color="#FAD103" />
              <StatTile
                value={metrics.citations.toLocaleString("en-GB")}
                label="Citations"
                color="#FA6A03"
              />
              <StatTile value={metrics.hIndex ?? "—"} label="h-index" color="#02B8A6" />
              <StatTile value={metrics.i10Index ?? "—"} label="i10-index" color="#B80502" />
            </div>
          </Reveal>
        )}

        {metrics && metrics.citationsByYear.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-5">
              <CitationChart data={metrics.citationsByYear} />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {scholar && (
              <GhostButton href={scholar.href}>
                <Icon name="scholar" size={16} /> Google Scholar
              </GhostButton>
            )}
            {orcid && (
              <GhostButton href={orcid.href}>
                <Icon name="orcid" size={16} /> ORCID
              </GhostButton>
            )}
            {metrics && (
              <span className="text-xs text-neutral-500">Last updated {metrics.updated}</span>
            )}
          </div>
        </Reveal>

        {/* controls */}
        <Reveal delay={0.2}>
          <div className="sticky top-[74px] z-20 mt-14 -mx-2 rounded-2xl border border-white/10 bg-ink/85 px-4 py-4 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(KIND_LABEL).map(([key, label]) => {
                const n = counts[key] ?? 0;
                if (key !== "all" && n === 0) return null;
                const active = kind === key;
                return (
                  <button
                    key={key}
                    onClick={() => setKind(key)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-gold bg-gold text-ink"
                        : "border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"
                    }`}
                  >
                    {label}
                    <span className={active ? "ml-1.5 opacity-70" : "ml-1.5 text-neutral-500"}>
                      {n}
                    </span>
                  </button>
                );
              })}

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title, author, journal…"
                  className="w-full rounded-full border border-neutral-700 bg-panel px-4 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-gold focus:outline-none sm:w-64"
                />
                <button
                  onClick={() => setSort(sort === "year" ? "citations" : "year")}
                  className="rounded-full border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition hover:border-cyan hover:text-cyan"
                >
                  Sort: {sort === "year" ? "newest" : "most cited"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* list */}
        <div className="mt-10">
          {!data && <p className="py-16 text-center text-neutral-500">Loading publications…</p>}

          {data && filtered.length === 0 && (
            <p className="py-16 text-center text-neutral-500">
              Nothing matches that filter. Try clearing the search.
            </p>
          )}

          {grouped
            ? grouped.map(([year, items]) => (
                <section key={year} className="mb-12">
                  <div className="mb-5 flex items-center gap-4">
                    <h2 className="font-display text-2xl font-bold text-white">{year || "In press"}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                    <span className="text-sm text-neutral-500">{items.length}</span>
                  </div>
                  <div className="space-y-4">
                    {items.map((p, i) => (
                      <PubCard key={p.id} pub={p} rank={i} />
                    ))}
                  </div>
                </section>
              ))
            : filtered.map((p, i) => (
                <div key={p.id} className="mb-4">
                  <PubCard pub={p} rank={i} />
                </div>
              ))}
        </div>

        <Reveal>
          <div className="mt-12 rounded-2xl border border-white/10 bg-panel/50 p-6">
            <SectionHeading
              title="How this page stays current"
              lead="A scheduled job queries OpenAlex once a night for every work linked to the group's ORCID record, merges preprints with their published versions, and rewrites the data file behind this page. Adding a paper to ORCID is the only step needed to make it appear here."
            />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
