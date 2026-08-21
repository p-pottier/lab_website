/**
 * Per-route titles and descriptions.
 *
 * Every route serves the same index.html, so without this the whole site hands
 * a crawler one title and one description across eight pages, which reads as
 * eight near-duplicates. PageMeta in App.tsx writes these in on navigation.
 *
 * Every title carries "Patrice Pottier", because the query the site most needs
 * to win is his name, and the title is the strongest signal a page controls.
 *
 * Adding a route here means adding it to public/sitemap.xml too.
 */

export const SITE_URL = "https://patricepottierlab.com";

export type RouteMeta = { title: string; description: string };

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "PEACE Lab | Patrice Pottier, University of Gothenburg",
    description:
      "The PEACE Lab, led by Patrice Pottier at the University of Gothenburg, studies how plasticity and adaptation shape animal vulnerability to climate change.",
  },
  "/research": {
    title: "Research | PEACE Lab | Patrice Pottier",
    description:
      "How the PEACE Lab studies thermal sensitivity across the life cycle, from laboratory experiments to global comparative analyses and evidence synthesis.",
  },
  "/people": {
    title: "People | PEACE Lab | Patrice Pottier",
    description:
      "Patrice Pottier leads the PEACE Lab at the University of Gothenburg. Meet the people working on how animals cope with a rapidly warming climate.",
  },
  "/publications": {
    title: "Publications | PEACE Lab | Patrice Pottier",
    description:
      "Peer-reviewed papers and preprints by Patrice Pottier and the PEACE Lab, on thermal tolerance, developmental plasticity and climate change vulnerability.",
  },
  "/outreach": {
    title: "Outreach | PEACE Lab | Patrice Pottier",
    description:
      "Talks, posters, teaching and science communication from Patrice Pottier and the PEACE Lab at the University of Gothenburg.",
  },
  "/opportunities": {
    title: "Opportunities | PEACE Lab | Patrice Pottier",
    description:
      "Funded PhD and postdoctoral positions in the PEACE Lab at the University of Gothenburg, plus fellowship routes for researchers bringing their own funding.",
  },
  "/news": {
    title: "News | PEACE Lab | Patrice Pottier",
    description:
      "Recent news from the PEACE Lab: new papers, grants, open positions and talks by Patrice Pottier at the University of Gothenburg.",
  },
  "/contact": {
    title: "Contact | PEACE Lab | Patrice Pottier",
    description:
      "Contact Patrice Pottier and the PEACE Lab at the Department of Biological and Environmental Sciences, University of Gothenburg.",
  },
};

/** Unknown paths get a title but no canonical, so they cannot dilute a real page. */
export const NOT_FOUND_META: RouteMeta = {
  title: "Page not found | PEACE Lab | Patrice Pottier",
  description: "That page does not exist. Use the navigation to find your way back.",
};
