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
| Change a position | `POSITIONS` |
| Add a fellowship scheme | `FELLOWSHIPS` |
| Reword a research theme | `THEMES` |
| Swap a photograph | drop the file in `public/images/`, reference it as `/images/name.jpg` |

Publications and collaborators are **not** in that file. They are generated.

## How publications stay current

`scripts/fetch-data.mjs` queries OpenAlex for every work attached to the ORCID
record, then writes three files into `public/data`:

- `publications.json` — one entry per work, with authors, venue, DOI, open-access
  link, abstract and citation count. Preprints are merged into their published
  version, keeping the preprint link.
- `metrics.json` — h-index, i10-index, totals, citations received per year and
  works published per year.
- `collaborators.json` — every co-author with their institution, country and
  coordinates, which drives the map on the People page.

`.github/workflows/refresh-data.yml` runs this nightly and commits any change.
Adding a paper to ORCID is enough to make it appear on the site; no edit here is
needed.

Two notes on the data:

- **Citations come from OpenAlex, not Google Scholar.** Scholar has no public
  API and blocks scraping, so its numbers cannot be fetched honestly. OpenAlex
  counts are lower than Scholar's because Scholar indexes theses, reports and
  preprint servers more aggressively. Both links appear on the Publications page.
- **Altmetric attention scores are off by default.** Altmetric closed its free
  API on 10 November 2025. Add an `ALTMETRIC_KEY` repository secret and the
  pipeline will pick the scores up again; without it the step is skipped.

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
