# PEACE Lab website

The site for the PEACE Lab (Plasticity and Ecological Adaptations to Changing Environments),
University of Gothenburg. React, Vite, Tailwind and Framer Motion, deployed to GitHub Pages.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # writes dist/, then copies index.html to 404.html
npm run data       # refreshes publications, metrics and collaborators
npm run typecheck
```

`node scripts/smoke.mjs` loads every page in a real browser, reports console
errors and broken requests, and writes screenshots to `.smoke/`. Run it before
pushing anything that touches layout.

## Where the content lives

Everything written by hand sits in **`src/content/site.ts`**. That one file holds
the people, news items, positions, fellowship schemes, research themes, outreach
entries and every external link. Editing it is the normal way to update the site.

| Change | Edit |
| --- | --- |
| Add a news item | `NEWS` array, newest first; date sets the order, tag sets the colour |
| Add a group member | `CURRENT_MEMBERS`, or move an entry to `PAST_MEMBERS` |
| Name a key collaborator | `MAIN_COLLABORATORS`, shown under the map on the People page |
| Pin a paper to the top of Publications | `HIGHLIGHTED_DOIS`, in the order you want them |
| Change a position | `POSITIONS` |
| Add a fellowship scheme | `FELLOWSHIPS` |
| Reword a research theme | `THEMES` |
| Add a poster or a media piece | `POSTERS` or `MEDIA`; PDFs go in `public/posters/` |
| Swap a photograph | drop the file in `public/images/`, reference it as `/images/name.jpg` |

Publications and collaborators are **not** in that file. They are generated.

## How publications stay current

`scripts/fetch-data.mjs` uses three sources, because no single one is enough:

| Source | What it provides |
| --- | --- |
| ORCID | the curated list of what counts as ours, used as the spine |
| Crossref | authoritative metadata, and the journal version of a retitled preprint |
| OpenAlex | citation counts, abstracts, and co-author affiliations for the map |

It writes three files into `public/data`: `publications.json`, `metrics.json`
and `collaborators.json`. `.github/workflows/refresh-data.yml` runs it nightly
and commits any change. Adding a paper to ORCID is enough to make it appear.

Three behaviours worth knowing about:

- **Preprints are folded into their published version.** Neither ORCID nor
  OpenAlex links the two for EcoEvoRxiv, bioRxiv or Authorea deposits, so the
  script matches them itself: first on an identical title with shared authors,
  then through a Crossref bibliographic search. Papers retitled beyond
  recognition in review need one line in `scripts/preprint-merges.json`, and
  every run prints the preprints it could not resolve so you can spot new ones.
  This step also recovers articles that OpenAlex has not yet attached to the
  author record.
- **Software, datasets and supplementary files are excluded**, along with
  conference abstracts and The Conversation pieces. Those last two are listed
  under Outreach instead.
- **Citations come from OpenAlex, not Google Scholar.** Scholar has no public
  API and blocks scraping, so its numbers cannot be fetched honestly. Its counts
  run higher because it indexes theses, reports and preprint servers more
  aggressively. Both links appear on the Publications page.
- **Altmetric attention scores are off by default.** Altmetric closed its free
  API on 10 November 2025. Add an `ALTMETRIC_KEY` repository secret to switch
  them back on; without it the step is skipped.

`public/data/countries-110m.json` is a vendored copy of Natural Earth's 110m
country boundaries, used by the collaborator map so the page does not depend on
a CDN.

## Deployment

`.github/workflows/pages.yml` builds and publishes to GitHub Pages on every push
to `main`. Once a domain is bought, uncomment the `cname` line in that workflow
and point the domain's DNS at GitHub Pages.

Routing is client-side, so `dist/404.html` is a copy of `index.html`. That is
what makes a direct visit to `/people` work on Pages.

## Design

Black background, gold `#FAD103` for primary emphasis, cyan `#02B8A6` for
secondary, with orange `#FA6A03` and red `#B80502` completing the four-stop
gradient used on rules, pills and the map legend. The palette is carried over
from the Thermal Ecology Alliance site so the two read as related.

The header is fixed and stays visible on scroll. Motion is used sparingly:
a parallax hero, reveal-on-scroll for sections, and a staggered mobile menu.
Everything respects `prefers-reduced-motion`.
