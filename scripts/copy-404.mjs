/**
 * GitHub Pages serves 404.html for any path it does not recognise. Copying the
 * built index.html there lets client-side routes such as /people load directly.
 */
import { copyFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
await copyFile(resolve(dist, "index.html"), resolve(dist, "404.html"));
console.log("Copied dist/index.html to dist/404.html for SPA routing.");
