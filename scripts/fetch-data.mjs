/**
 * Rebuilds public/data/*.json from ORCID, Crossref and OpenAlex.
 *
 * Run locally with `npm run data`, or nightly through
 * .github/workflows/refresh-data.yml, which commits any change.
 *
 * Why three sources rather than one:
 *
 *   ORCID     the curated record of what counts as ours. Used as the spine.
 *   Crossref  authoritative metadata, and the only source that reliably finds
 *             the journal version of a preprint whose title changed in review.
 *   OpenAlex  citation counts, abstracts, and the co-author affiliations that
 *             drive the collaborator map.
 *
 * Neither ORCID nor OpenAlex links a preprint to its published article for
 * EcoEvoRxiv, bioRxiv or Authorea deposits, so a Crossref bibliographic search
 * with an author-overlap test does that job. Pairs it cannot find are listed in
 * scripts/preprint-merges.json.
 *
 * Software, datasets and supplementary-file records are excluded: they are not
 * publications.
 *
 * No API keys are needed. All three services ask only for a contact address.
 */

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, "..", "public", "data");

/* -------------------------------------------------------------- config -- */

const ORCID = "0000-0003-2106-6597";
const MAILTO = "patrice.pottier@bioenv.gu.se";
const UA = `PEACE-lab-website/1.0 (mailto:${MAILTO})`;

/** First year shown in the citations-per-year series on the home page. */
const FIRST_YEAR = 2020;

/**
 * Altmetric closed its free Details Page API on 10 November 2025 and now
 * returns HTTP 403 without a key. Set ALTMETRIC_KEY to switch scores back on.
 */
const ALTMETRIC_KEY = process.env.ALTMETRIC_KEY || null;
const ALTMETRIC_LIMIT = 200;

/** Crossref asks for one request at a time from unauthenticated clients. */
const POLITE_DELAY = 350;

/* ------------------------------------------------------------- helpers -- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(url, { retries = 3, allow404 = false } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if ((res.status === 404 || res.status === 403) && allow404) return null;
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(900 * (attempt + 1));
    }
  }
  return null;
}

const cleanDOI = (doi) =>
  (doi || "").replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").toLowerCase().trim() || null;

/** Crossref returns titles and journal names with HTML entities and markup. */
function decodeText(s) {
  if (!s) return s;
  return s
    .replace(/<\/?(i|em|b|strong|sub|sup|scp|span)[^>]*>/gi, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x?([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, /^x/i.test(code) ? 16 : 10))
    )
    .replace(/\s+/g, " ")
    .trim();
}

const STOP = new Set([
  "a","an","the","of","in","on","for","and","to","with","across","using","from",
  "is","are","by","at","as","that","their","its","how","why","what",
]);

const titleTokens = (t) =>
  new Set(
    (t || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
  );

/** Sørensen-Dice overlap of two token sets. */
function dice(a, b) {
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  return (2 * shared) / (a.size + b.size || 1);
}

const surname = (name) =>
  (name || "").split(/\s+/).pop().toLowerCase().replace(/[^a-zÀ-ɏ]/g, "");

const isSelf = (author) =>
  (author.orcid || "").includes(ORCID) ||
  (surname(author.name) === "pottier" && /^(patrice|p\.?)$/i.test(author.name.split(/\s+/)[0]));

/** OpenAlex inverted index to plain text. */
function deInvert(index) {
  if (!index) return null;
  const words = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const p of positions) words[p] = word;
  }
  const text = words.filter(Boolean).join(" ").trim();
  return text.length > 60 ? text : null;
}

/* --------------------------------------------------------------- ORCID -- */

async function fetchOrcidWorks() {
  const d = await getJSON(`https://pub.orcid.org/v3.0/${ORCID}/works`);
  const out = [];
  for (const group of d.group || []) {
    const summary = group["work-summary"]?.[0];
    if (!summary) continue;
    let doi = null;
    for (const id of group["external-ids"]?.["external-id"] || []) {
      if (id["external-id-type"] === "doi") doi = cleanDOI(id["external-id-value"]);
    }
    out.push({
      doi,
      title: summary.title?.title?.value || "",
      type: summary.type || null,
      year: Number(summary["publication-date"]?.year?.value) || null,
    });
  }
  return out;
}

/* ------------------------------------------------------------ OpenAlex -- */

async function fetchOpenAlexAuthor() {
  const d = await getJSON(`https://api.openalex.org/authors?filter=orcid:${ORCID}&mailto=${MAILTO}`);
  const author = d?.results?.[0];
  if (!author) throw new Error(`No OpenAlex author for ORCID ${ORCID}`);
  return author;
}

async function fetchOpenAlexWorks(authorId) {
  const id = authorId.replace("https://openalex.org/", "");
  const works = [];
  let cursor = "*";
  while (cursor) {
    const page = await getJSON(
      `https://api.openalex.org/works?filter=author.id:${id}` +
        `&per-page=200&cursor=${encodeURIComponent(cursor)}&mailto=${MAILTO}`
    );
    works.push(...(page.results || []));
    cursor = page.meta?.next_cursor || null;
    if (works.length >= (page.meta?.count ?? 0)) break;
  }
  return works;
}

async function openAlexByDOI(doi) {
  return getJSON(`https://api.openalex.org/works/doi:${doi}?mailto=${MAILTO}`, {
    retries: 1,
    allow404: true,
  }).catch(() => null);
}

/* ------------------------------------------------------------ Crossref -- */

async function crossrefWork(doi) {
  const d = await getJSON(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
    retries: 2,
    allow404: true,
  }).catch(() => null);
  return d?.message || null;
}

/**
 * Ask Crossref whether a journal article exists for this preprint.
 *
 * A match must clear three bars at once: most of the preprint's authors appear
 * on the article, at least three named authors are shared, and the titles still
 * overlap. Title alone is not enough, because papers are routinely retitled in
 * review, and author overlap alone is not enough, because the same team
 * publishes repeatedly on the same topic.
 */
async function findPublishedVersion(preprint) {
  const query = encodeURIComponent(preprint.title.slice(0, 220));
  const d = await getJSON(
    `https://api.crossref.org/works?query.bibliographic=${query}` +
      `&filter=type:journal-article&rows=5` +
      `&select=DOI,title,container-title,author,issued,type`,
    { retries: 1, allow404: true }
  ).catch(() => null);

  const preSurnames = new Set(preprint.authors.map((a) => surname(a.name)).filter(Boolean));
  const preTokens = titleTokens(preprint.title);

  for (const item of d?.message?.items || []) {
    const authors = (item.author || []).map((a) => surname(a.family || "")).filter(Boolean);
    if (authors.length === 0) continue;
    const shared = authors.filter((s) => preSurnames.has(s)).length;
    const coverage = shared / Math.min(preSurnames.size, authors.length);
    const similarity = dice(preTokens, titleTokens((item.title || [""])[0]));

    if (shared >= 3 && coverage >= 0.6 && similarity >= 0.3) {
      return { doi: cleanDOI(item.DOI), similarity, shared };
    }
  }
  return null;
}

/* ---------------------------------------------------------- exclusions -- */

/**
 * Records that are not publications. Datasets, software and Zenodo release
 * archives are excluded on request; supplementary-file stubs are noise.
 */
function isExcluded({ title, doi, openalexType, crossrefType, journal }) {
  const t = (title || "").toLowerCase();
  const d = (doi || "").toLowerCase();
  const j = (journal || "").toLowerCase();

  if (/^additional file \d/.test(t)) return "supplementary file";
  if (/^supplementary (material|information|data)\b/.test(t)) return "supplementary file";
  if (d.includes("cran.package")) return "R package deposit";
  if (d.startsWith("10.5281/zenodo")) return "Zenodo deposit";
  if (d.startsWith("10.6084/m9.figshare")) return "figshare deposit";
  if (["dataset", "software", "component", "peer-review", "grant"].includes(crossrefType))
    return `Crossref type ${crossrefType}`;
  if (["dataset", "libguides", "peer-review", "grant"].includes(openalexType))
    return `OpenAlex type ${openalexType}`;
  // Data descriptors in Scientific Data are genuine papers; keep them.
  if (j === "figshare" || j === "zenodo") return "repository record";
  // The Conversation pieces are public writing, not publications. They belong
  // on the Outreach page instead.
  if (d.startsWith("10.64628/")) return "The Conversation article";
  // EGU and similar conference abstracts carry a DOI but are not papers.
  if (d.startsWith("10.5194/egusphere-egu")) return "conference abstract";
  return null;
}

function isPreprintish({ openalexType, crossrefType, journal, doi, orcidType }) {
  const j = (journal || "").toLowerCase();
  const d = (doi || "").toLowerCase();
  if (crossrefType === "posted-content") return true;
  if (openalexType === "preprint" || orcidType === "preprint") return true;
  if (/rxiv|preprint|research square|authorea/.test(j)) return true;
  if (/^10\.(32942|31222|22541|1101|64898)\//.test(d)) return true;
  return false;
}

/* ------------------------------------------------------------ assembly -- */

function authorsFromCrossref(item) {
  return (item.author || [])
    .map((a) => ({
      name: [a.given, a.family].filter(Boolean).join(" ").trim() || a.name || "",
      orcid: a.ORCID || null,
    }))
    .filter((a) => a.name)
    .map((a) => ({ ...a, isSelf: isSelf(a) }));
}

function authorsFromOpenAlex(work) {
  return (work.authorships || [])
    .map((a) => ({ name: a.author?.display_name || "", orcid: a.author?.orcid || null }))
    .filter((a) => a.name)
    .map((a) => ({ ...a, isSelf: isSelf(a) }));
}

function pagesFrom(first, last) {
  if (first && last && first !== last) return `${first}-${last}`;
  return first || last || null;
}

/* ----------------------------------------------------------------- run -- */

async function main() {
  console.log("Fetching ORCID record…");
  const orcid = await fetchOrcidWorks();
  console.log(`  ${orcid.length} works listed on ORCID`);

  console.log("Fetching OpenAlex author and works…");
  const author = await fetchOpenAlexAuthor();
  const oaWorks = await fetchOpenAlexWorks(author.id);
  console.log(`  ${oaWorks.length} OpenAlex records, ${author.cited_by_count} citations`);

  /* --- 1. union of DOIs, with whatever we already know about each --- */

  const byDoi = new Map();
  const note = (doi, patch) => {
    if (!doi) return;
    byDoi.set(doi, { ...(byDoi.get(doi) || { doi }), ...patch });
  };

  for (const w of oaWorks) {
    const doi = cleanDOI(w.doi);
    if (!doi) continue;
    note(doi, {
      oa: w,
      openalexType: w.type,
      title: w.display_name || w.title,
      journal:
        w.primary_location?.source?.display_name || w.best_oa_location?.source?.display_name || null,
      year: w.publication_year ?? null,
    });
  }
  for (const o of orcid) {
    if (!o.doi) continue;
    const existing = byDoi.get(o.doi);
    note(o.doi, {
      orcidType: o.type,
      title: existing?.title || o.title,
      year: existing?.year ?? o.year,
      onOrcid: true,
    });
  }
  console.log(`  ${byDoi.size} distinct DOIs across both sources`);

  /* --- 2. Crossref metadata for everything --- */

  console.log("Fetching Crossref metadata…");
  let crossrefHits = 0;
  for (const rec of byDoi.values()) {
    const cr = await crossrefWork(rec.doi);
    if (cr) {
      crossrefHits++;
      rec.cr = cr;
      rec.crossrefType = cr.type;
      rec.title = decodeText((cr.title || [])[0]) || rec.title;
      rec.journal = decodeText((cr["container-title"] || [])[0]) || rec.journal;
      const year = cr.issued?.["date-parts"]?.[0]?.[0];
      if (year) rec.year = year;
    }
    await sleep(POLITE_DELAY);
  }
  console.log(`  ${crossrefHits}/${byDoi.size} matched in Crossref`);

  /* --- 3. drop everything that is not a publication --- */

  const dropped = [];
  for (const [doi, rec] of [...byDoi]) {
    const why = isExcluded(rec);
    if (why) {
      dropped.push(`${why}: ${(rec.title || doi).slice(0, 60)}`);
      byDoi.delete(doi);
    }
  }
  console.log(`  excluded ${dropped.length} non-publication records`);
  for (const d of dropped) console.log(`    - ${d}`);

  /* --- 4. split preprints from articles --- */

  const records = [...byDoi.values()];
  for (const rec of records) {
    rec.kind = isPreprintish(rec) ? "preprint" : "article";
    rec.authors = rec.cr
      ? authorsFromCrossref(rec.cr)
      : rec.oa
        ? authorsFromOpenAlex(rec.oa)
        : [];
  }

  const articles = records.filter((r) => r.kind === "article");
  const preprints = records.filter((r) => r.kind === "preprint");
  console.log(`  ${articles.length} articles, ${preprints.length} preprints before merging`);

  /* --- 5. link each preprint to its published version --- */

  const manual = JSON.parse(
    await readFile(resolve(HERE, "preprint-merges.json"), "utf8").catch(() => "{}")
  );

  console.log("Resolving preprints against Crossref…");
  const articleByDoi = new Map(articles.map((a) => [a.doi, a]));
  const stillPreprints = [];
  const newlyFound = [];

  /**
   * A preprint that kept its title matches an article we already hold. Require
   * near-identical titles as well as shared authors, since the same team
   * publishes repeatedly on the same topic with similar wording.
   */
  const matchLocally = (pre) => {
    const preTokens = titleTokens(pre.title);
    const preSurnames = new Set(pre.authors.map((a) => surname(a.name)).filter(Boolean));
    for (const art of articles) {
      const similarity = dice(preTokens, titleTokens(art.title));
      if (similarity < 0.75) continue;
      const shared = art.authors.filter((a) => preSurnames.has(surname(a.name))).length;
      if (shared >= 3) return { doi: art.doi, similarity, shared };
    }
    return null;
  };

  for (const pre of preprints) {
    let publishedDoi = manual[pre.doi] ? cleanDOI(manual[pre.doi]) : null;
    let how = publishedDoi ? "manual list" : null;

    if (!publishedDoi) {
      const local = matchLocally(pre);
      if (local) {
        publishedDoi = local.doi;
        how = `same title, ${local.shared} shared authors`;
      }
    }

    if (!publishedDoi) {
      const hit = await findPublishedVersion(pre);
      await sleep(POLITE_DELAY);
      if (hit) {
        publishedDoi = hit.doi;
        how = `Crossref search, ${hit.shared} shared authors`;
      }
    }

    if (!publishedDoi) {
      stillPreprints.push(pre);
      continue;
    }

    let article = articleByDoi.get(publishedDoi);
    if (!article) {
      // Published version neither ORCID nor OpenAlex had attached yet.
      const cr = await crossrefWork(publishedDoi);
      await sleep(POLITE_DELAY);
      if (!cr) {
        stillPreprints.push(pre);
        continue;
      }
      article = {
        doi: publishedDoi,
        cr,
        crossrefType: cr.type,
        title: (cr.title || [])[0] || "",
        journal: (cr["container-title"] || [])[0] || null,
        year: cr.issued?.["date-parts"]?.[0]?.[0] ?? null,
        kind: "article",
        authors: authorsFromCrossref(cr),
      };
      article.oa = await openAlexByDOI(publishedDoi);
      articles.push(article);
      articleByDoi.set(publishedDoi, article);
      newlyFound.push(article);
    }

    article.preprintUrl = `https://doi.org/${pre.doi}`;
    article.preprintCitations = pre.oa?.cited_by_count ?? 0;
    if (!article.oa?.abstract_inverted_index && pre.oa?.abstract_inverted_index) {
      article.abstractFallback = deInvert(pre.oa.abstract_inverted_index);
    }
    console.log(`    merged: ${pre.title.slice(0, 46)} -> ${article.journal} (${how})`);
  }

  if (newlyFound.length) {
    console.log(`  recovered ${newlyFound.length} published articles missing from both sources:`);
    for (const a of newlyFound) console.log(`    + ${a.year} ${a.journal}: ${a.title.slice(0, 58)}`);
  }
  console.log(`  ${stillPreprints.length} works remain unpublished preprints`);
  for (const p of stillPreprints) console.log(`    · ${p.year} ${p.title.slice(0, 66)}`);

  /* --- 6. shape the output --- */

  const toPublication = (rec) => {
    const oa = rec.oa;
    const cr = rec.cr;
    const citations = (oa?.cited_by_count ?? 0) + (rec.preprintCitations ?? 0);
    const oaUrl =
      oa?.open_access?.oa_url ||
      oa?.best_oa_location?.pdf_url ||
      (rec.kind === "preprint" ? `https://doi.org/${rec.doi}` : null);

    return {
      id: rec.doi,
      doi: rec.doi,
      title: (rec.title || "").replace(/\s+/g, " ").trim(),
      authors: rec.authors,
      authorLine: rec.authors.map((a) => a.name).join(", "),
      journal: rec.journal || null,
      year: rec.year ?? null,
      volume: cr?.volume || oa?.biblio?.volume || null,
      issue: cr?.issue || oa?.biblio?.issue || null,
      pages:
        pagesFrom(cr?.page?.split("-")[0], cr?.page?.split("-")[1]) ||
        pagesFrom(oa?.biblio?.first_page, oa?.biblio?.last_page),
      kind: rec.kind,
      isOA: Boolean(oa?.open_access?.is_oa),
      oaUrl,
      url: `https://doi.org/${rec.doi}`,
      citations,
      abstract: deInvert(oa?.abstract_inverted_index) || rec.abstractFallback || null,
      preprintUrl: rec.preprintUrl || null,
      altmetric: null,
    };
  };

  /**
   * Last sweep for the same paper deposited twice under different DOIs, which
   * happens when a repository copy is typed as an article rather than a
   * preprint. Keep the record that names a journal, then the more cited one.
   */
  const deduped = new Map();
  for (const rec of [...articles, ...stillPreprints]) {
    const key = [...titleTokens(rec.title)].sort().join(" ");
    const seen = deduped.get(key);
    if (!seen) {
      deduped.set(key, rec);
      continue;
    }
    const score = (r) =>
      (r.journal ? 100 : 0) + (r.kind === "article" ? 50 : 0) + (r.oa?.cited_by_count ?? 0);
    const [keep, drop] = score(rec) >= score(seen) ? [rec, seen] : [seen, rec];
    if (!keep.preprintUrl && drop.doi !== keep.doi) keep.preprintUrl = `https://doi.org/${drop.doi}`;
    deduped.set(key, keep);
    console.log(`    dropped duplicate record: ${drop.doi} (${drop.title.slice(0, 44)})`);
  }

  const pubs = [...deduped.values()]
    .map(toPublication)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || b.citations - a.citations);

  console.log("Fetching Altmetric scores…");
  await addAltmetric(pubs);

  console.log("Building collaborator list…");
  const collab = await buildCollaborators(oaWorks, author.display_name);
  console.log(`  ${collab.total} co-authors across ${collab.countries} countries`);

  /* --- 7. metrics --- */

  const received = new Map();
  for (const w of oaWorks) {
    for (const y of w.counts_by_year || []) {
      received.set(y.year, (received.get(y.year) || 0) + (y.cited_by_count || 0));
    }
  }
  const citationsByYear = [...received.entries()]
    .filter(([year]) => year >= FIRST_YEAR)
    .sort((a, b) => a[0] - b[0])
    .map(([year, cited_by_count]) => ({ year, cited_by_count }));

  const metrics = {
    updated: new Date().toISOString().slice(0, 10),
    sources: ["ORCID", "Crossref", "OpenAlex"],
    orcid: ORCID,
    citations: author.cited_by_count ?? 0,
    hIndex: author.summary_stats?.h_index ?? null,
    i10Index: author.summary_stats?.i10_index ?? null,
    works: pubs.length,
    articles: pubs.filter((p) => p.kind === "article").length,
    preprints: pubs.filter((p) => p.kind === "preprint").length,
    firstAuthor: pubs.filter((p) => p.authors[0]?.isSelf).length,
    coAuthors: collab.total,
    countries: collab.countries,
    citationsByYear,
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    resolve(OUT_DIR, "publications.json"),
    JSON.stringify({ updated: metrics.updated, publications: pubs }, null, 1)
  );
  await writeFile(resolve(OUT_DIR, "metrics.json"), JSON.stringify(metrics, null, 1));
  await writeFile(resolve(OUT_DIR, "collaborators.json"), JSON.stringify(collab, null, 1));

  console.log(
    `\nWrote ${metrics.articles} articles and ${metrics.preprints} preprints. ` +
      `h-index ${metrics.hIndex}, ${metrics.citations} citations.`
  );
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
    const d = await getJSON(`https://api.altmetric.com/v1/doi/${p.doi}?key=${ALTMETRIC_KEY}`, {
      retries: 1,
      allow404: true,
    }).catch(() => null);
    if (d) {
      hits++;
      p.altmetric = {
        score: Math.round(d.score ?? 0),
        posts: d.cited_by_posts_count ?? 0,
        accounts: d.cited_by_accounts_count ?? 0,
        url: d.details_url || null,
      };
    }
    await sleep(120);
  }
  console.log(`  altmetric: ${hits}/${targets.length} DOIs matched`);
}

/* -------------------------------------------------------- collaborators -- */

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
        workIds: new Set(),
        lastYear: 0,
        institutions: new Map(),
      };
      // Counting work ids rather than authorships keeps the total right when a
      // person is listed twice on one paper, and makes merging exact.
      if (w.id) rec.workIds.add(w.id);
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

  await dedupePeople(people);

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
        works: p.workIds.size,
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

/* ---------------------------------------------------- co-author dedupe -- */

/**
 * Strips the differences that separate one person's OpenAlex entities from
 * each other: case, accents, and the non-ASCII hyphens Wiley and Crossref put
 * in surnames (U+2010 in "Abbey‐Lee", U+2013 in some Chinese given names).
 */
function normName(s) {
  return (s || "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‐‑‒–—]/g, "-")
    .toLowerCase()
    .replace(/[.\-']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Do two display names belong to the same person?
 *
 * A shared ORCID is not enough on its own. OpenAlex attaches Jessica Abbott's
 * ORCID to a Robin Abbey-Lee entity, and merging on the identifier alone would
 * delete a real collaborator. Requiring the surnames to agree blocks that,
 * while the prefix test still joins a truncated surname to its full form
 * ("Gideon Gywa" to "Gideon Gywa Deme").
 */
function namesCompatible(a, b) {
  const na = normName(a);
  const nb = normName(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.startsWith(`${nb} `) || nb.startsWith(`${na} `)) return true;

  const ta = na.split(" ");
  const tb = nb.split(" ");
  if (ta[ta.length - 1] !== tb[tb.length - 1]) return false;

  // Surnames agree, so accept initials against a spelled-out given name
  // ("S. S. Killen" and "Shaun S. Killen") but not two different people.
  const ia = ta.slice(0, -1);
  const ib = tb.slice(0, -1);
  if (!ia.length || !ib.length) return true;
  return ia[0][0] === ib[0][0];
}

const bareOrcid = (o) => (o || "").split("/").pop() || null;

/**
 * Picks the fuller of two spellings of one person's name.
 *
 * The entity with the most papers is not the one with the best name: OpenAlex
 * files Gideon Gywa Deme's larger entity under a truncated "Gideon Gywa". Prefer
 * more name parts, then spelled-out given names over initials, then ordinary
 * case over the block capitals some publishers send.
 */
function fullerName(a, b) {
  if (!b) return a;
  if (!a) return b;
  const parts = (s) => normName(s).split(" ").filter(Boolean);
  const initials = (s) => parts(s).filter((t) => t.length === 1).length;
  const shouting = (s) => s === s.toUpperCase() && s !== s.toLowerCase();

  if (parts(a).length !== parts(b).length) return parts(a).length > parts(b).length ? a : b;
  if (initials(a) !== initials(b)) return initials(a) < initials(b) ? a : b;
  if (shouting(a) !== shouting(b)) return shouting(a) ? b : a;
  return a;
}

/**
 * Folds the several OpenAlex author entities that stand for one person into a
 * single record, in place.
 *
 * OpenAlex is the only source that carries co-author affiliations, and its
 * author entities are not one-to-one with people: Shinichi Nakagawa had three.
 * Left alone, the home page counts him three times.
 *
 * Two rules run automatically, and both are conservative:
 *
 *   1. entities sharing an ORCID, when the names are compatible;
 *   2. entities whose names match once normalised, when one carries no ORCID.
 *
 * Anything else is reported rather than guessed. Two entities with one name and
 * two ORCIDs are either one person registered twice or two people who share a
 * name, and the data cannot tell you which. Those go in
 * scripts/collaborator-merges.json once checked by hand.
 */
async function dedupePeople(people) {
  const overrides = JSON.parse(
    await readFile(resolve(HERE, "collaborator-merges.json"), "utf8").catch(() => "{}")
  );

  const parent = new Map([...people.keys()].map((k) => [k, k]));
  const find = (k) => {
    while (parent.get(k) !== k) {
      parent.set(k, parent.get(parent.get(k)));
      k = parent.get(k);
    }
    return k;
  };
  const members = (root) => [...people.keys()].filter((k) => find(k) === root);

  const pairKey = (a, b) => [a, b].sort().join("\u0000");
  const forbidden = new Set();
  for (const entry of overrides.distinct || []) {
    const ids = (entry.ids || []).map(expandId);
    for (const a of ids) for (const b of ids) if (a !== b) forbidden.add(pairKey(a, b));
  }

  const join = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return false;
    for (const x of members(ra)) {
      for (const y of members(rb)) if (forbidden.has(pairKey(x, y))) return false;
    }
    // Keep the entity with more papers as the root, so its name, ORCID and
    // institution order survive the collapse.
    const [keep, drop] =
      people.get(ra).workIds.size >= people.get(rb).workIds.size ? [ra, rb] : [rb, ra];
    parent.set(drop, keep);
    return true;
  };

  let byOrcid = 0;
  let byName = 0;

  /* --- 1. entities sharing an ORCID --- */
  const orcidGroups = new Map();
  for (const [k, p] of people) {
    const id = bareOrcid(p.orcid);
    if (!id) continue;
    if (!orcidGroups.has(id)) orcidGroups.set(id, []);
    orcidGroups.get(id).push(k);
  }
  const unresolvedOrcid = [];
  for (const [id, keys] of orcidGroups) {
    if (keys.length < 2) continue;
    const base = keys.reduce((a, b) =>
      people.get(a).workIds.size >= people.get(b).workIds.size ? a : b
    );
    for (const k of keys) {
      if (k === base) continue;
      if (namesCompatible(people.get(base).name, people.get(k).name)) {
        if (join(base, k)) byOrcid++;
      } else {
        unresolvedOrcid.push([id, base, k, people.get(base).name, people.get(k).name]);
      }
    }
  }

  /* --- 2. name variants where one entity carries no ORCID --- */
  const nameGroups = new Map();
  for (const [k, p] of people) {
    const n = normName(p.name);
    if (!n) continue;
    if (!nameGroups.has(n)) nameGroups.set(n, []);
    nameGroups.get(n).push(k);
  }
  const unresolvedName = [];
  for (const keys of nameGroups.values()) {
    if (keys.length < 2) continue;
    const withOrcid = keys.filter((k) => bareOrcid(people.get(k).orcid));
    const without = keys.filter((k) => !bareOrcid(people.get(k).orcid));
    const ids = new Set(withOrcid.map((k) => bareOrcid(people.get(k).orcid)));

    if (without.length) {
      // One entity with an ORCID and one without is the common OpenAlex split.
      // Two rival ORCIDs make the target ambiguous, so leave it for a human.
      if (ids.size <= 1) {
        const pool = withOrcid.length ? withOrcid : keys;
        const base = pool.reduce((a, b) =>
          people.get(a).workIds.size >= people.get(b).workIds.size ? a : b
        );
        for (const k of keys) if (k !== base && join(base, k)) byName++;
      }
    }
    if (ids.size > 1) unresolvedName.push([people.get(keys[0]).name, keys, [...ids]]);
  }

  /* --- 3. hand-checked corrections --- */
  let byHand = 0;
  for (const entry of overrides.merge || []) {
    const ids = (entry.ids || []).map(expandId).filter((k) => people.has(k));
    if (ids.length < 2) continue;
    // The first id is canonical, so seed the root with it and let the rest
    // follow, whatever their paper counts say.
    const base = ids[0];
    for (const k of ids.slice(1)) {
      const ra = find(base);
      const rb = find(k);
      if (ra === rb) continue;
      parent.set(rb, ra);
      byHand++;
    }
  }

  /* --- 4. report only what the overrides did not already settle --- */
  const stillApart = (keys) => new Set(keys.map(find)).size > 1;
  const openOrcid = unresolvedOrcid.filter(([, a, b]) => stillApart([a, b]));
  const openName = unresolvedName.filter(([, keys]) => stillApart(keys));

  /*
   * An entity with neither an ORCID nor an OpenAlex id can only be matched on
   * its name, and a given name is not a stable thing to match on: OpenAlex
   * carries Szymon Drobniak's diminutive "Szymek" as a separate person. Merging
   * on a surname and a shared initial would also join two siblings in one lab,
   * so these are reported for confirmation rather than joined.
   */
  const surnameOf = (s) => normName(s).split(" ").pop();
  const candidates = [];
  for (const [k, p] of people) {
    if (p.orcid || p.openalex || find(k) !== k) continue;
    // Group by root, because the entities merged above are still in the map
    // at this point and would otherwise look like several rival matches.
    const near = new Set(
      [...people.keys()]
        .filter((o) => find(o) !== find(k) && surnameOf(people.get(o).name) === surnameOf(p.name))
        .map(find)
    );
    if (near.size !== 1) continue;
    const other = people.get([...near][0]);
    if (namesCompatible(p.name, other.name)) candidates.push([p.name, other.name]);
  }

  /* --- 5. collapse each group into its root --- */
  const before = people.size;
  for (const k of [...people.keys()]) {
    const root = find(k);
    if (root === k) continue;
    const keep = people.get(root);
    const drop = people.get(k);
    for (const id of drop.workIds) keep.workIds.add(id);
    keep.lastYear = Math.max(keep.lastYear, drop.lastYear);
    for (const [id, inst] of drop.institutions) {
      if (!keep.institutions.has(id)) keep.institutions.set(id, inst);
    }
    keep.orcid = keep.orcid || drop.orcid;
    keep.openalex = keep.openalex || drop.openalex;
    keep.name = fullerName(keep.name, drop.name);
    people.delete(k);
  }

  console.log(
    `  merged ${before - people.size} duplicate author entities ` +
      `(${byOrcid} by ORCID, ${byName} by name, ${byHand} by hand)`
  );
  for (const [id, , , a, b] of openOrcid) {
    console.log(`    kept apart: "${a}" and "${b}" share ${id} but are not the same name`);
  }
  for (const [name, , ids] of openName) {
    console.log(`    unresolved: "${name}" holds ${ids.length} ORCIDs (${ids.join(", ")})`);
  }
  for (const [a, b] of candidates) {
    console.log(`    possible pair: "${a}" has no identifier and may be "${b}"`);
  }
  if (openName.length || candidates.length) {
    console.log("    resolve these in scripts/collaborator-merges.json once checked by hand");
  }
}

/** Accepts a bare OpenAlex id or a display name, and returns the map key. */
function expandId(v) {
  return /^A\d+$/.test(v) ? `https://openalex.org/${v}` : v;
}

main().catch((err) => {
  console.error("\nData refresh failed:", err.message);
  process.exit(1);
});
