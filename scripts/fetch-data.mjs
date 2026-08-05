/**
 * Rebuilds public/data/*.json from OpenAlex, Crossref and Altmetric.
 *
 * Run locally with `npm run data`, or nightly through
 * .github/workflows/refresh-data.yml, which commits any change.
 *
 * Outputs
 *   public/data/publications.json  every work, with citation and altmetric counts
 *   public/data/metrics.json       h-index, i10, totals, citations per year
 *   public/data/collaborators.json co-authors, their institutions and countries
 *
 * No API keys. OpenAlex and Crossref ask only for a contact address in the
 * user agent, which raises the rate limit and is set below.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, "..", "public", "data");

/* -------------------------------------------------------------- config -- */

const ORCID = "0000-0003-2106-6597";
const MAILTO = "patrice.pottier@bioenv.gu.se";
const UA = `PEACE-lab-website/1.0 (mailto:${MAILTO})`;

/** Works before this year predate the group and are excluded from nothing;
 *  the value only sets the first bar of the citations-per-year chart. */
const FIRST_YEAR = 2020;

/**
 * Altmetric closed its free Details Page API on 10 November 2025 and now
 * returns HTTP 403 without a key. Set ALTMETRIC_KEY in the environment (or as
 * a GitHub Actions secret) to switch attention scores back on; without it the
 * step is skipped and the site simply shows citations.
 */
const ALTMETRIC_KEY = process.env.ALTMETRIC_KEY || null;
const ALTMETRIC_LIMIT = 200;

/* ------------------------------------------------------------- helpers -- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(url, { retries = 3, allow404 = false } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (res.status === 404 && allow404) return null;
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(800 * (attempt + 1));
    }
  }
  return null;
}

/** OpenAlex inverted index -> plain abstract text. */
function deInvert(index) {
  if (!index) return null;
  const words = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const p of positions) words[p] = word;
  }
  const text = words.filter(Boolean).join(" ").trim();
  return text.length > 40 ? text : null;
}

const normTitle = (t) =>
  (t || "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const cleanDOI = (doi) => (doi || "").replace(/^https?:\/\/(dx\.)?doi\.org\//, "").toLowerCase() || null;

/* --------------------------------------------------------------- works -- */

async function fetchOpenAlexAuthor() {
  const d = await getJSON(
    `https://api.openalex.org/authors?filter=orcid:${ORCID}&mailto=${MAILTO}`
  );
  const author = d?.results?.[0];
  if (!author) throw new Error(`No OpenAlex author for ORCID ${ORCID}`);
  return author;
}

async function fetchAllWorks(authorId) {
  const id = authorId.replace("https://openalex.org/", "");
  const works = [];
  let cursor = "*";
  while (cursor) {
    const url =
      `https://api.openalex.org/works?filter=author.id:${id}` +
      `&per-page=200&cursor=${encodeURIComponent(cursor)}&mailto=${MAILTO}`;
    const page = await getJSON(url);
    works.push(...(page.results || []));
    cursor = page.meta?.next_cursor || null;
    if (works.length >= (page.meta?.count ?? 0)) break;
  }
  return works;
}

/** article | preprint | software | chapter | other */
function classify(w) {
  const type = w.type || "";
  const venue = (w.primary_location?.source?.display_name || "").toLowerCase();
  const doi = cleanDOI(w.doi) || "";
  if (type === "preprint" || /rxiv|preprint|research square|authorea/.test(venue)) return "preprint";
  if (doi.includes("cran.package") || type === "dataset" || type === "software") return "software";
  if (type === "book-chapter" || type === "book") return "chapter";
  if (type === "article" || type === "review") return "article";
  return "other";
}

const RANK = { article: 4, chapter: 3, software: 2, preprint: 1, other: 0 };

/**
 * Zenodo archives a GitHub release under the title "owner/repo: release name",
 * which reads badly in a publication list. Keep the human half.
 */
function tidyTitle(title) {
  const t = (title || "").replace(/\s+/g, " ").trim();
  const m = t.match(/^[\w.-]+\/([\w.-]+):\s*(.+)$/);
  if (!m) return t;
  const [, repo, rest] = m;
  return rest.toLowerCase() === repo.toLowerCase() ? repo : `${rest} (${repo})`;
}

/** first_page and last_page are often identical for article-number journals. */
function formatPages(biblio) {
  const first = biblio?.first_page || null;
  const last = biblio?.last_page || null;
  if (first && last && first !== last) return `${first}-${last}`;
  return first || last || null;
}

function toPublication(w) {
  const source = w.primary_location?.source || w.best_oa_location?.source || null;
  const authors = (w.authorships || []).map((a) => ({
    name: a.author?.display_name || "",
    orcid: a.author?.orcid || null,
    isSelf: (a.author?.orcid || "").includes(ORCID),
  }));
  return {
    id: w.id,
    doi: cleanDOI(w.doi),
    title: tidyTitle(w.display_name || w.title),
    authors,
    authorLine: authors.map((a) => a.name).join(", "),
    journal: source?.display_name || null,
    year: w.publication_year ?? null,
    date: w.publication_date ?? null,
    volume: w.biblio?.volume || null,
    issue: w.biblio?.issue || null,
    pages: formatPages(w.biblio),
    kind: classify(w),
    isOA: Boolean(w.open_access?.is_oa),
    oaUrl: w.open_access?.oa_url || w.best_oa_location?.pdf_url || null,
    url: w.doi || w.primary_location?.landing_page_url || null,
    citations: w.cited_by_count ?? 0,
    abstract: deInvert(w.abstract_inverted_index),
    concepts: (w.topics || []).slice(0, 3).map((t) => t.display_name),
    altmetric: null, // filled below
  };
}

/**
 * A preprint and its journal version are two OpenAlex records with the same
 * title. Keep the published one, but carry over the preprint link so the
 * accepted manuscript stays reachable.
 */
function dedupe(pubs) {
  const byTitle = new Map();
  for (const p of pubs) {
    const key = normTitle(p.title);
    if (!key) continue;
    const seen = byTitle.get(key);
    if (!seen) {
      byTitle.set(key, p);
      continue;
    }
    const [keep, drop] = RANK[p.kind] >= RANK[seen.kind] ? [p, seen] : [seen, p];
    keep.citations = Math.max(keep.citations, drop.citations);
    if (drop.kind === "preprint" && drop.url) keep.preprintUrl = drop.url;
    if (!keep.abstract && drop.abstract) keep.abstract = drop.abstract;
    byTitle.set(key, keep);
  }
  return [...byTitle.values()];
}

/* ----------------------------------------------------------- altmetric -- */

async function addAltmetric(pubs) {
  if (!ALTMETRIC_KEY) {
    console.log("  altmetric: skipped (no ALTMETRIC_KEY set)");
    return;
  }
  const targets = pubs
    .filter((p) => p.doi)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, ALTMETRIC_LIMIT);

  let hits = 0;
  for (const p of targets) {
    const d = await getJSON(
      `https://api.altmetric.com/v1/doi/${p.doi}?key=${ALTMETRIC_KEY}`,
      { retries: 1, allow404: true }
    ).catch(() => null);
    if (d) {
      hits++;
      p.altmetric = {
        score: Math.round(d.score ?? 0),
        posts: d.cited_by_posts_count ?? 0,
        accounts: d.cited_by_accounts_count ?? 0,
        url: d.details_url || null,
      };
    }
    await sleep(120); // Altmetric's free endpoint is politely rate limited
  }
  console.log(`  altmetric: ${hits}/${targets.length} DOIs matched`);
}

/* -------------------------------------------------------- collaborators -- */

/**
 * Every co-author on every work, with the institution recorded on that
 * authorship. Institution coordinates come from a second OpenAlex call so the
 * People map can place a marker without a geocoding service.
 */
async function buildCollaborators(works, selfName) {
  const people = new Map();
  const instIds = new Set();

  for (const w of works) {
    for (const a of w.authorships || []) {
      const name = a.author?.display_name;
      if (!name || name === selfName) continue;
      if ((a.author?.orcid || "").includes(ORCID)) continue;

      const key = a.author?.id || name;
      const rec = people.get(key) || {
        name,
        orcid: a.author?.orcid || null,
        openalex: a.author?.id || null,
        works: 0,
        lastYear: 0,
        institutions: new Map(),
      };
      rec.works += 1;
      rec.lastYear = Math.max(rec.lastYear, w.publication_year ?? 0);
      for (const inst of a.institutions || []) {
        if (!inst.id) continue;
        instIds.add(inst.id.replace("https://openalex.org/", ""));
        rec.institutions.set(inst.id, {
          id: inst.id,
          name: inst.display_name,
          country: inst.country_code || null,
        });
      }
      people.set(key, rec);
    }
  }

  // Institution coordinates, 50 per request.
  const geo = new Map();
  const ids = [...instIds];
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const d = await getJSON(
      `https://api.openalex.org/institutions?filter=openalex_id:${chunk.join("|")}` +
        `&per-page=50&select=id,display_name,country_code,geo&mailto=${MAILTO}`
    );
    for (const inst of d?.results || []) {
      geo.set(inst.id, {
        lat: inst.geo?.latitude ?? null,
        lon: inst.geo?.longitude ?? null,
        city: inst.geo?.city ?? null,
        country: inst.geo?.country ?? inst.country_code ?? null,
        countryCode: inst.country_code ?? null,
      });
    }
    await sleep(150);
  }

  const collaborators = [...people.values()]
    .map((p) => {
      const insts = [...p.institutions.values()].map((inst) => ({
        ...inst,
        ...(geo.get(inst.id) || {}),
      }));
      const primary = insts.find((i) => i.lat != null) || insts[0] || null;
      return {
        name: p.name,
        orcid: p.orcid,
        openalex: p.openalex,
        works: p.works,
        lastYear: p.lastYear,
        institution: primary?.name || null,
        city: primary?.city || null,
        country: primary?.country || null,
        countryCode: primary?.countryCode || null,
        lat: primary?.lat ?? null,
        lon: primary?.lon ?? null,
      };
    })
    .sort((a, b) => b.works - a.works || a.name.localeCompare(b.name));

  const byCountry = {};
  for (const c of collaborators) {
    if (!c.country) continue;
    byCountry[c.country] = (byCountry[c.country] || 0) + 1;
  }

  return {
    updated: new Date().toISOString().slice(0, 10),
    total: collaborators.length,
    countries: Object.keys(byCountry).length,
    institutions: new Set(collaborators.map((c) => c.institution).filter(Boolean)).size,
    byCountry,
    collaborators,
  };
}

/* ----------------------------------------------------------------- run -- */

async function main() {
  console.log("Fetching OpenAlex author record…");
  const author = await fetchOpenAlexAuthor();
  console.log(`  ${author.display_name} — ${author.works_count} works, ${author.cited_by_count} citations`);

  console.log("Fetching works…");
  const raw = await fetchAllWorks(author.id);
  console.log(`  ${raw.length} records`);

  const pubs = dedupe(raw.map(toPublication)).sort(
    (a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.citations ?? 0) - (a.citations ?? 0)
  );
  console.log(`  ${pubs.length} after merging preprint/journal duplicates`);

  console.log("Fetching Altmetric scores…");
  await addAltmetric(pubs);

  console.log("Building collaborator list…");
  const collab = await buildCollaborators(raw, author.display_name);
  console.log(`  ${collab.total} co-authors across ${collab.countries} countries`);

  const counts = (kind) => pubs.filter((p) => p.kind === kind).length;

  /**
   * Citations RECEIVED in each year, summed over every work.
   *
   * The author record's own counts_by_year looks like the same thing but is
   * not: there, cited_by_count is the citations accrued by works PUBLISHED in
   * that year, which falls away for recent years and would read as a collapse
   * in impact. Each work carries its own counts_by_year of citations received,
   * and summing those gives the series a reader expects.
   */
  const received = new Map();
  for (const w of raw) {
    for (const y of w.counts_by_year || []) {
      received.set(y.year, (received.get(y.year) || 0) + (y.cited_by_count || 0));
    }
  }
  const perYear = [...received.entries()]
    .filter(([year]) => year >= FIRST_YEAR)
    .sort((a, b) => a[0] - b[0])
    .map(([year, cited_by_count]) => ({ year, cited_by_count }));

  /** Works published per year, from the deduplicated list. */
  const publishedPerYear = Object.entries(
    pubs.reduce((acc, p) => {
      if (p.year && p.year >= FIRST_YEAR) acc[p.year] = (acc[p.year] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([year, works]) => ({ year: Number(year), works }))
    .sort((a, b) => a.year - b.year);

  const metrics = {
    updated: new Date().toISOString().slice(0, 10),
    source: "OpenAlex",
    orcid: ORCID,
    citations: author.cited_by_count ?? 0,
    hIndex: author.summary_stats?.h_index ?? null,
    i10Index: author.summary_stats?.i10_index ?? null,
    works: pubs.length,
    articles: counts("article"),
    preprints: counts("preprint"),
    software: counts("software"),
    firstAuthor: pubs.filter((p) => p.authors[0]?.isSelf).length,
    coAuthors: collab.total,
    countries: collab.countries,
    /** Citations received in each calendar year. */
    citationsByYear: perYear,
    /** Works published in each calendar year. */
    worksByYear: publishedPerYear,
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    resolve(OUT_DIR, "publications.json"),
    JSON.stringify({ updated: metrics.updated, publications: pubs }, null, 1)
  );
  await writeFile(resolve(OUT_DIR, "metrics.json"), JSON.stringify(metrics, null, 1));
  await writeFile(resolve(OUT_DIR, "collaborators.json"), JSON.stringify(collab, null, 1));

  console.log(`\nWrote 3 files to public/data. h-index ${metrics.hIndex}, ${metrics.citations} citations.`);
}

main().catch((err) => {
  console.error("\nData refresh failed:", err.message);
  process.exit(1);
});
