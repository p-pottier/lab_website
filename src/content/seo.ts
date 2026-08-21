/**
 * Per-route titles and descriptions.
 *
 * The data lives in route-meta.json rather than here, because two things
 * outside the bundle need it: scripts/prerender-routes.mjs writes one real
 * directory per route so GitHub Pages answers 200 instead of 404, and the same
 * script builds sitemap.xml. A JSON file is the only form all three can read,
 * so the route list cannot drift between the app, the pages and the sitemap.
 *
 * Every title carries "Patrice Pottier", because the query the site most needs
 * to win is his name, and the title is the strongest signal a page controls.
 *
 * PageMeta in App.tsx writes these into the document on each navigation.
 */
import meta from "./route-meta.json";

export type RouteMeta = { title: string; description: string };

export const SITE_URL: string = meta.siteUrl;

export const ROUTE_META: Record<string, RouteMeta> = meta.routes;

/** Unknown paths get a title but no canonical, so they cannot dilute a real page. */
export const NOT_FOUND_META: RouteMeta = meta.notFound;
